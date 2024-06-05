import { HeartOff } from "lucide-react";

export default function Empty() {
  return (
    <div className="w-full flex flex-col items-center justify-center h-full gap-4">
      <HeartOff size={48} />
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold">No Favorites</h3>
        <p className="text-gray-500 dark:text-gray-400">
          Your favorites list is currently empty. Add some items to your favorites to see them here.
        </p>
      </div>
    </div>
  );
}
