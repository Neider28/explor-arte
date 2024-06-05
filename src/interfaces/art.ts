export interface ArtI {
  links: {
    self: string;
    web: string;
  };
  id: string;
  objectNumber: string;
  title: string;
  hasImage: boolean;
  principalOrFirstMaker: string;
  longTitle: string;
  showImage: boolean;
  permitDownload: boolean;
  webImage: {
    guid: string;
    offsetPercentageX: number;
    offsetPercentageY: number;
    width: number;
    height: number;
    url: string;
  };
  headerImage: {
    guid: string;
    offsetPercentageX: number;
    offsetPercentageY: number;
    width: number;
    height: number;
    url: string;
  };
  productionPlaces: string[];
}

export interface FavoriteArtI {
  id: number;
  idArt: string;
  title: string;
  longTitle: string;
  link: string;
  webImage: string;
  principalOrFirstMaker: string;
  createdAt: Date;
  updatedAt: Date;
}
