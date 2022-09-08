import { ArrowPathIcon } from "@heroicons/react/24/outline";

const Loading = () => {
  return (
    <div className="alert alert-info">
      <div>
        <ArrowPathIcon className="h-6 w-6 animate-spin" /> Loading...
      </div>
    </div>
  );
};

export default Loading;
