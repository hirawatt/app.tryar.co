import { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
import PropTypes from 'prop-types';

const FileUpload = ({ userId }) => {
  const [fileName, setFileName] = useState('');
  const [imgFile, setImgFile] = useState('');
  const [modelFile, setModelFile] = useState('');
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);


  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userId', userId); //userId to create a sub-folder to save file and save item location in database
    formData.append('fileName', fileName);
    formData.append('imgFile', imgFile);
    formData.append('modelFile', modelFile);

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_API}/upload`, formData, {
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

      setMessage('File Uploaded Successfully');  

      // Clear percentage and message in 3 second
      setTimeout(() => {
        setUploadPercentage(0);
        setMessage('');
      }, 3000);

    
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }

    //clear input fields
    setFileName('');
    document.getElementById('imgFile').value = '';
    document.getElementById('modelFile').value = '';
    
  };

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit} className='flex flex-col'>

        <div className='mx-auto flex flex-col'>

          <div className='grid grid-cols-2 p-2'>
            <label className='block text-gray-700 text-sm font-bold' htmlFor='fileName'>
              Filename
            </label>
            <input
            type='text'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='fileName'
            onChange={e => setFileName(e.target.value)}
            value={fileName}
            required
            />
          </div>

          <div className='grid grid-cols-2 p-2'>
          <label className='block text-gray-700 text-sm font-bold' htmlFor='imgFile'>
            Choose Image
          </label>
          <input
            type='file'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='imgFile'
            accept='image/*'
            required
            onChange={e => setImgFile(e.target.files[0])}
          />
          </div>

          <div className='grid grid-cols-2 p-2'>
          <label className='block text-gray-700 text-sm font-bold' htmlFor='modelFile'>
            Choose Model
          </label>
          <input
            type='file'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='modelFile'
            accept=".glb"
            required
            onChange={e => setModelFile(e.target.files[0])}
          />  
          </div>
          
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type='submit'
          value='Upload'
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full block w-full mt-4"
        />
      </form>
    </Fragment>
  );
};

FileUpload.propTypes = {
  userId: PropTypes.string.isRequired
};

export default FileUpload;
