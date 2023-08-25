import PropTypes from 'prop-types';

const Message = ({ msg }) => {
  return (
    <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 rounded relative" role="alert">
      <span className="block sm:inline">{msg}</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg className="fill-current h-6 w-6 text-blue-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title>Close</title>
          <path d="M14.348 5.652a.999.999 0 1 0-1.414 1.414L11 7.414l-1.934 1.934a.999.999 0 1 0 1.414 1.414L12.414 9l1.934 1.934a.999.999 0 1 0 1.414-1.414L13.828 7l1.52-1.52z"/>
        </svg>
      </span>

      {/*<div className='alert alert-info alert-dismissible fade show' role='alert'>
      {msg}
      <button
        type='button'
        className='close'
        data-dismiss='alert'
        aria-label='Close'
      >
        <span aria-hidden='true'>&times;</span>
      </button>
  </div>*/}
  
    </div>
  );
};

Message.propTypes = {
  msg: PropTypes.string.isRequired
};

export default Message;
