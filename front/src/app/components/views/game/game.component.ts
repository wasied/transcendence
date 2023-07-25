import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Phaser from 'phaser';
import { PongScene } from 'src/app/scenes/pong-scene';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy, AfterViewInit {

  phaserGame?: Phaser.Game;
  gameContainer?: HTMLElement;

  @ViewChild('gameContainer', { static: true }) gameContainerRef!: ElementRef;

  constructor () {};

  ngOnInit(): void {
  
  }

  ngAfterViewInit(): void {
    this.gameContainer = this.gameContainerRef.nativeElement;

    let config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      height: 600,
      width: 800,
      scene: [PongScene],
      parent: this.gameContainer,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
          gravity: {y: 0} // no gravity needed with pong game
        }
      }
    };
  
    this.phaserGame = new Phaser.Game(config);
  }
  
  ngOnDestroy(): void {
    this.phaserGame?.destroy(true); // kill game when killing component
  }
}
