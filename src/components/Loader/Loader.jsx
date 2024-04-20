import { ThreeDots } from 'react-loader-spinner';

const Loader = ({ isLoading }) => {
  return isLoading ? (
    <div
      style={{
        position: 'fixed',
        top: '4%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 100,
      }}
    >
      <ThreeDots height={90} width={90} radius={9} color="#3f51b5" />
    </div>
  ) : null;
};

export default Loader;
