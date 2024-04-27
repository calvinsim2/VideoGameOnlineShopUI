import { FormControl } from '@angular/forms';

export interface CodesTableModel {
  id: string;
  code: string;
  decodeValue: string;
}

export interface GenreFormControls {
  [key: string]: FormControl; // Define a string index signature
}
