const {
    S3Client,
    HeadObjectCommand,
    PutObjectCommand,
    ListObjectsV2Command,
    DeleteObjectCommand,
    DeleteObjectsCommand,
    //GetObjectCommand
} = require('@aws-sdk/client-s3');

const keys = require('../config/keys');
const bucketName = keys.cloudFlare.bucketName;

const s3Client = new S3Client({
    region: "auto",
    endpoint: `https://${keys.cloudFlare.accountId}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: keys.cloudFlare.accessKeyID,
        secretAccessKey: keys.cloudFlare.secretAccessKey,
    },
});

async function checkDirectoryExistOrNot(directory) {

    try {
        // Create a new instance of S3Client and HeadObjectCommand
        const params = {
            Bucket: bucketName,
            Key: directory + "/"
        }
        await s3Client.send(new HeadObjectCommand(params));

    } catch (error) {
        if (error.$metadata.httpStatusCode === 404) {
            // Create the subfolder by uploading an empty object with a trailing slash
            const params = {
                Bucket: bucketName,
                Key: directory + "/",
                Body: ''
            }
            await s3Client.send(new PutObjectCommand(params));
        } else {
            console.log(error);
        }
    }
}

function uploadFile(fileBody, fileName, fileMimetype) {
    const uploadParams = {
        Bucket: bucketName,
        Body: fileBody,
        Key: fileName,
        ContentType: fileMimetype
    }

    return s3Client.send(new PutObjectCommand(uploadParams));
}

function deleteFile(fileName) {
    const deleteParams = {
        Bucket: bucketName,
        Key: fileName,
    }

    return s3Client.send(new DeleteObjectCommand(deleteParams));
}

async function deleteFolder(fileName) {
    const listParams = {
        Bucket: bucketName,
        Prefix: fileName
    };

    const listResult = await s3Client.send(new ListObjectsV2Command(listParams));

    // //this will only work if the listResult.Contents array has less than 1000 objects, because the deleteObjects method has a limit of 1000 objects per request. If you have more than 1000 objects in the directory, you will need to use pagination or batching to delete them in multiple requests.
    const deleteParams = {
        Bucket: bucketName,
        Delete: {
            Objects: listResult.Contents
        }
    }

    return s3Client.send(new DeleteObjectsCommand(deleteParams));
}

// async function getObjectSignedUrl(key) {
//     const params = {
//         Bucket: bucketName,
//         Key: key
//     }

//     // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
//     const command = new GetObjectCommand(params);
//     const seconds = 60
//     const url = await getSignedUrl(s3Client, command, {
//         expiresIn: seconds
//     });

//     return url
// }


module.exports = {
    checkDirectoryExistOrNot,
    uploadFile,
    deleteFile,
    deleteFolder,
    //getObjectSignedUrl
};