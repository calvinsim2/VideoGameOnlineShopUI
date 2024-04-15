export interface GameModel {
  id: string;
  name: string;
  description: string;
  codeMatureRating: string;
  rating: number;
  price: number;
  imageUrl: string;
  developerId: string;
  codeGenre: string;
  codePlatform: string;
}

export interface GameListModel {
  games: GameModel[];
}
