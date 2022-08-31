import { tw } from "twind";

export function LoadingState() {
  return (
    <div className={tw`p-4`}>
      <p className={tw`text-gray-600 text-sm text-center animate-pulse`}>
        Fetching package details...
      </p>
    </div>
  );
}
