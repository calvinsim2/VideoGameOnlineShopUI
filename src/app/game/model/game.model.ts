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

export interface GameSubmissionModel {
  name: string;
  description: string;
  codeMatureRating: string;
  codePlatform: string;
  price: number;
  imageUrl: string;
  developerId: string;
  codeGenre: string;
}
