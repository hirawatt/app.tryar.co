module.exports = {
    google: {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    },
    session: {
        cookieKey: process.env.COOKIE_KEY
    },
    mongoURI: process.env.MONGO_URI,
    cloudFlare: {
        bucketName: process.env.BUCKET_NAME,
        tokenValue: process.env.TOKEN_VALUE,
        accessKeyID: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        accountId: process.env.ACCOUNT_ID,
        s3BucketAPI: process.env.S3_BUCKET_API
    }
};