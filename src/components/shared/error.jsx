import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const Error = ({ text }) => {
  return (
    <div className="alert alert-error">
      <div>
        <ExclamationCircleIcon className="h-6 w-6" />{" "}
        {text || "Something wrong..."}
      </div>
    </div>
  );
};

export default Error;
