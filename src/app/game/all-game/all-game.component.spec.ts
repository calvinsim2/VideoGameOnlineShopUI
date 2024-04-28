import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGameComponent } from './all-game.component';
import { GameService } from '../service/game.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GameModel } from '../model/game.model';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

fdescribe('AllGameComponent', () => {
  let component: AllGameComponent;
  let fixture: ComponentFixture<AllGameComponent>;
  let router: Router;
  let mockGameService = jasmine.createSpyObj(['getAllGame', 'getGamebyId']);

  const mockSingleGameResponse: GameModel[] = [
    {
      id: 'string',
      name: 'string',
      description: 'string',
      codeMatureRating: 'string',
      rating: 10,
      price: 10,
      imageUrl: 'string',
      developerId: 'string',
      codeGenre: 'string',
      codePlatform: 'string',
    },
  ];

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AllGameComponent],
      providers: [
        AllGameComponent,
        { provide: GameService, useValue: mockGameService },
        HttpClient,
      ],
      imports: [HttpClientModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(AllGameComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router)
    mockGameService.getAllGame.and.returnValue(of(mockSingleGameResponse));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return an array of one single GameModel item on getAllGame_POSITIVE', () => {
    component.getAllGames();

    expect(component.gameList.length).toEqual(1);
    expect(component.gameList[0].description).toEqual('string');
  });

  it('should return an array of multiple GameModel item on getAllGame_POSITIVE', () => {
    const mockMultipleGameResponse: GameModel[] = [
      {
        id: 'string',
        name: 'string',
        description: 'string',
        codeMatureRating: 'string',
        rating: 10,
        price: 10,
        imageUrl: 'string',
        developerId: 'string',
        codeGenre: 'string',
        codePlatform: 'string',
      },
      {
        id: 'string',
        name: 'string',
        description: 'string',
        codeMatureRating: 'string',
        rating: 12,
        price: 10,
        imageUrl: 'string',
        developerId: 'string',
        codeGenre: 'string',
        codePlatform: 'string',
      },
      {
        id: 'string',
        name: 'string',
        description: 'string',
        codeMatureRating: 'string',
        rating: 14,
        price: 10,
        imageUrl: 'string',
        developerId: 'string',
        codeGenre: 'string',
        codePlatform: 'string',
      },
    ];
    mockGameService.getAllGame.and.returnValue(of(mockMultipleGameResponse));

    component.getAllGames();

    expect(component.gameList).toEqual(mockMultipleGameResponse);
  });

  it('should call navigate with the specified route on viewGame_POSITIVE', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.viewGame('1');

    expect(navigateSpy).toHaveBeenCalledWith(['game/game/1']);
  });
});
