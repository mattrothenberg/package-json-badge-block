import { XCircleIcon } from "@heroicons/react/24/solid";
import { tw } from "twind";

export function ErrorState() {
  return (
    <div className={tw`rounded-md bg-red-50 p-4`}>
      <div className={tw`flex`}>
        <div className={tw`flex-shrink-0`}>
          <XCircleIcon
            className={tw`h-5 w-5 text-red-400`}
            aria-hidden="true"
          />
        </div>
        <div className={tw`ml-3`}>
          <h3 className={tw`text-sm font-medium text-red-800`}>
            This block only works on package.json
          </h3>
        </div>
      </div>
    </div>
  );
}
