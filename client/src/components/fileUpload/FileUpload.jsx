import { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';

const FileUpload = () => {
  const [fileName, setFileName] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const [modelFile, setModelFile] = useState(null);
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);


  const onSubmit = async e => {
    e.preventDefault();
    setUserId('64e0b2cdce70f7d21c7849b8');
    const formData = new FormData();
    formData.append('userId', userId); //userId to create a sub-folder to save file and save item location in database
    formData.append('fileName', fileName);
    formData.append('imgFile', imgFile);
    formData.append('modelFile', modelFile);

    try {
      /*const res = await */axios.post(`${import.meta.env.VITE_BACKEND_API}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        }
      });
      
      // Clear percentage in 3 second
      setTimeout(() => setUploadPercentage(0), 3000);

      setMessage('File Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
      setFileName('');
      setImgFile(null);
      setModelFile(null);
      setUploadPercentage(0);
    }
  };

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit} className='flex flex-col'>

        <div className='mx-auto flex flex-col'>

          <div className='grid grid-cols-2 p-2'>
            <label className='custom-file-label' htmlFor='customFile'>
              Filename
            </label>
            <input
            type='text'
            className='custom-file-input border border-gray-400'
            id='customFile'
            onChange={e => setFileName(e.target.value)}
            value={fileName}
            />
          </div>

          <div className='grid grid-cols-2 p-2'>
          <label className='custom-file-label' htmlFor='customFile'>
            Choose Image
          </label>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={e => setImgFile(e.target.files[0])}
          />
          </div>

          <div className='grid grid-cols-2 p-2'>
          <label className='custom-file-label' htmlFor='customFile'>
            Choose Model
          </label>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={e => setModelFile(e.target.files[0])}
          />  
          </div>
          
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
      {/*uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null*/}
    </Fragment>
  );
};

export default FileUpload;
