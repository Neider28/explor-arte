import React, { useContext, createContext, useState } from "react";

import { FavoriteArtI } from "@/interfaces/art";

type ContextType = {
  favoriteArts: FavoriteArtI[];
  setFavoriteArts: React.Dispatch<React.SetStateAction<FavoriteArtI[]>>;
};

const MyContext = createContext<ContextType | undefined>(undefined);

export interface ContextProps {
  children: React.ReactNode;
}

export function MainContext({ children }: ContextProps) {
  const [favoriteArts, setFavoriteArts] = useState<FavoriteArtI[]>([]);

  return (
    <MyContext.Provider
      value={{
        favoriteArts,
        setFavoriteArts,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export const useMyContext = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error(
      "¡useYourContext debe usarse dentro de un YourContextProvider!",
    );
  }

  return context;
};
