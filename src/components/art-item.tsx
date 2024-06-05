import { ArtI } from "@/interfaces/art";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Heart, SquareArrowOutUpRight } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { Skeleton } from "./ui/skeleton"
import { useState } from "react";

interface ArtItemProps {
  item: ArtI;
}

export const ArtItem: React.FC<ArtItemProps> = ({ item }) => {
  const { toast } = useToast();
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const addToFavorites = async () => {
    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idArt: item.id,
          title: item.title,
          longTitle: item.longTitle,
          link: item.links.web,
          webImage: item.webImage.url,
          principalOrFirstMaker: item.principalOrFirstMaker,
        }),
      });

      if (res.status === 409) {
        toast({
          variant: "destructive",
          description: "Oops! This work of art is already added to favorites.",
        });
      } else if (res.status === 200) {
        toast({
          variant: "default",
          description: "Successfully added to favorites!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Oops! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  return (
    <Card className="w-full h-fit">
      <CardHeader className="p-4">
        {imageLoading && (
          <Skeleton className="w-[600px] h-auto aspect-video w-full rounded-t-lg object-cover" />
        )}
        <Image
          src={item.webImage.url}
          alt="Project Thumbnail"
          width={600}
          height={400}
          priority
          onLoad={handleImageLoad}
          className={`aspect-video w-full rounded-t-lg object-cover ${imageLoading ? "hidden" : ""}`}
        />
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold leading-6">{item.title}</h3>
        <p className="text-md text-gray-500 dark:text-gray-400 capitalize font-medium">
          {item.principalOrFirstMaker}
        </p>
      </CardContent>
      <CardFooter className="p-4 flex flex-row gap-2">
        <Button className="w-full" asChild>
          <a href={item.links.web} target="_blank" className="flex flex-row gap-1">
            <SquareArrowOutUpRight size={16} />
            Visit
          </a>
        </Button>
        <Button className="w-full flex flex-row gap-1" variant="destructive" onClick={addToFavorites}>
          <Heart size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};
