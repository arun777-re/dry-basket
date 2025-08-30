import { ImSpinner3 } from "react-icons/im";

type SpinnerProps = {
  size?: number;
  className?: string;
};

const Spinner: React.FC<SpinnerProps> = ({ size = 20, className }) => {
  return (
    <div
      role="status"
      className={`flex items-center justify-center animate-spin text-head ${className}`}
    >
      <ImSpinner3 size={size} aria-hidden="true" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
