import { Component, OnInit } from '@angular/core';
import { DeveloperService } from '../service/developer.service';
import { Router } from '@angular/router';
import { DeveloperModel } from '../model/developer.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss'],
})
export class DeveloperComponent implements OnInit {
  public developerList: DeveloperModel[] = [];

  constructor(
    private developerService: DeveloperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllDevelopers();
  }

  getAllDevelopers() {
    this.developerService
      .getAllDeveloper()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.developerList = res;
        },
        error: () => {
          alert(`An error has occured. Please try again later `);
        },
      });
  }
}
