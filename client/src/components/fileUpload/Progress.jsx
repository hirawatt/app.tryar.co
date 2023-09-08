import PropTypes from 'prop-types';

const Progress = ({ percentage }) => {
  return (
    <div className='relative'>
      <progress className="w-full" value={percentage} max="100" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-gray-700 font-bold">{percentage}%</span>
      </div>
    </div>
  );
};

Progress.propTypes = {
  percentage: PropTypes.number.isRequired
};

export default Progress;
