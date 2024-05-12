import { Component, OnInit } from '@angular/core';
import { DeveloperService } from '../service/developer.service';
import { Router } from '@angular/router';
import { DeveloperModel } from '../model/developer.model';
import { take } from 'rxjs';
import { Urls } from '../constant/seeddata';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss'],
})
export class DeveloperComponent implements OnInit {
  public defaultUrl: Urls = new Urls();
  public developerList: DeveloperModel[] = [];
  public defaultImage: string = 'https://imgur.com/CoQemnM.jpg';
  public selectedDeveloperId: string = '';

  public developerForm!: FormGroup;

  constructor(
    private developerService: DeveloperService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.developerForm = this.formBuilder.group({
      name: ['', Validators.required],
      slogan: [''],
      logo: [''],
    });

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

  assignDeleteDeveloperId(id: string) {
    this.selectedDeveloperId = id;
  }

  onClose() {
    this.developerForm.reset();
    this.selectedDeveloperId = '';
  }

  addNewDeveloper() {
    if (this.developerForm.valid) {
      this.developerService
        .addNewDeveloper(this.developerForm.value)
        .subscribe({
          next: () => {
            alert(`Developer Added successfully! `);
            document.getElementById('close-add-developer')?.click();
          },
          error: () => {
            alert(`An error has occured. Please try again later `);
          },
        });
    } else {
      alert(`An error has occured. Please try again later `);
    }
  }

  deleteSelectedDeveloper(id: string) {
    this.developerService.deleteDeveloper(id).subscribe({
      next: () => {
        this.selectedDeveloperId = '';
        alert(`Developer deleted successfully! `);
        document.getElementById('close-delete-developer')?.click();
      },
      error: () => {
        alert(`An error has occured. Please try again later `);
      },
    });
  }
}
