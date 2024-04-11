export interface GameModel {
  name: string;
  description: string;
  codeMatureRating: string;
  rating: number;
  price: number;
  imageUrl: string;
  developerId: string;
  codeGenre: string;
}

export interface GameListModel {
  games: GameModel[];
}
