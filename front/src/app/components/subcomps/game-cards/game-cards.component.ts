import { Component, OnInit } from '@angular/core';
import { Gamecard } from 'src/app/models/game-card.model';
import { GamecardService } from 'src/app/services/game-card.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-cards',
  templateUrl: './game-cards.component.html',
  styleUrls: ['./game-cards.component.css']
})
export class GameCardsComponent implements OnInit{

  gameCards$!: Observable<Gamecard[]>;

  constructor (private gamecardService: GamecardService) {}
  
  ngOnInit(): void {
    this.gameCards$ = this.gamecardService.getAllGameCards();
  }
}
