import { LoadingIcon } from "@/components/icon/draw-icon";

export const LoadingIconSkeleton = () => (
  <div className="w-screen h-screen overflow-hidden fixed z-50 backdrop-filter backdrop-blur-sm bg-opacity-20 top-0 left-0 flex items-center justify-center">
    <LoadingIcon className="h-14 md:w-auto md:h-auto" />
  </div>
);
