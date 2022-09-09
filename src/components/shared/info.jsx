import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function Info({ text }) {
  return (
    <div className="alert alert-info">
      <div>
        <InformationCircleIcon className="h-6 w-6" /> {text || "Loading..."}
      </div>
    </div>
  );
}
