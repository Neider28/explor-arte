"use client";
import Empty from "@/components/empty";
import { FavoriteArtItem } from "@/components/favorite-art-item";
import Loading from "@/components/loading";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useMyContext } from "@/context/MainContext";
import { FavoriteArtI } from "@/interfaces/art";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const { favoriteArts, setFavoriteArts } = useMyContext();

  useEffect(() => {
    const fetchFavoriteArts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/favorites");

        const data = await res.json();

        setFavoriteArts(data);
        setIsLoading(false);
      } catch (error) {
        setFavoriteArts([]);
        setIsLoading(false);
      }
    };

    fetchFavoriteArts();
  }, [setFavoriteArts]);

  return (
    <div className="w-full flex flex-col min-h-[100dvh]">
      <div className="bg-gray-100 dark:bg-gray-800 py-8 px-4 md:px-6 rounded-t-lg">
        <div className="container mx-auto flex flex-col items-center gap-4 md:flex-row md:gap-8">
          <Avatar className="h-20 w-20 md:h-24 md:w-24">
            <AvatarImage src="https://avatars.githubusercontent.com/u/95157364?v=4" alt="@shadcn" />
            <AvatarFallback>NS</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold">Neider Silva</h1>
            <p className="text-gray-500 dark:text-gray-400">Full Stack Developer | admin@example.com</p>
            <p className="max-w-[500px] text-sm text-gray-600 dark:text-gray-300">
              Passionate about building beautiful and performant web applications. I love exploring new technologies and
              sharing my knowledge with the community.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex-1 bg-gray-50 dark:bg-gray-900 py-8 px-4 md:px-6 rounded-b-lg">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="w-full">
            {favoriteArts.length === 0 ? (
              <Empty />
            ) : (
              <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-3 lg:grid-cols-4">
                {favoriteArts.map((item: FavoriteArtI) => (
                  <FavoriteArtItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
