import PropTypes from 'prop-types';

const Message = ({ msg }) => {
  return (
    <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 rounded relative" role="alert">
      <span className="block sm:inline">{msg}</span>
    </div>
  );
};

Message.propTypes = {
  msg: PropTypes.string.isRequired
};

export default Message;
