import { Component, ElementRef, HostListener, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
  encapsulation: ViewEncapsulation.None, ///Needed for CCS animation
  template: `
    <canvas #canvas></canvas>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      canvas {
        display: block;
        border: 1px solid #000;
      }
    `,
  ],
})
export class MainMenuComponent {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef;
  private ctx!: CanvasRenderingContext2D;
  private aspectRatio = 16 / 9;
  private paddleHeightPercentage = 15;
  private paddleWidth = 10;
  private paddleSpeedPercentage = 1;
  private paddle1Y = 50;
  private paddle2Y = 50;
  private maxPaddleY = 100 - this.paddleHeightPercentage;

  private ballRadiusPercentage = 1;
  private ballX = 5;
  private ballY = 50;
  private ballSpeedPercentage = 0.1;
  private ballSpeedX = 0.1;
  private ballSpeedY = 0.1;

  private canvasWidth = 0;
  private canvasHeight = 0;

  constructor() {}

  ngAfterViewInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    this.resizeCanvas();
    this.draw();
    this.registerEventListeners();
  }

  private registerEventListeners(): void {
    window.addEventListener('resize', this.onResize.bind(this));
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));
    this.animate();
  }

  private onResize(): void {
    this.resizeCanvas();
    this.draw();
  }

  private onKeyDown(event: KeyboardEvent): void {
    this.keys[event.key.toLowerCase()] = true;
  }

  private onKeyUp(event: KeyboardEvent): void {
    this.keys[event.key.toLowerCase()] = false;
  }

  private resizeCanvas(): void {
    this.canvasWidth = window.innerWidth * 0.9;
    this.canvasHeight = this.canvasWidth / this.aspectRatio;

    this.canvasRef.nativeElement.width = this.canvasWidth;
    this.canvasRef.nativeElement.height = this.canvasHeight;
  }

  private animate(): void {
    this.update();
    this.draw();
    requestAnimationFrame(this.animate.bind(this));
  }

  private keys: { [key: string]: boolean } = {};

  private update(): void {
    this.updateBallZoneFlags();
    const paddleSpeed = (this.paddleSpeedPercentage / 100) * this.canvasHeight;
    const ballSpeed = (this.ballSpeedPercentage / 100) * this.canvasWidth;
    const ballSpeedX = (this.ballSpeedX / 100) * this.canvasWidth;
    const ballSpeedY = (this.ballSpeedY / 100) * this.canvasHeight;

    if (this.keys['arrowup']) {
      this.paddle1Y = Math.max(this.paddle1Y - paddleSpeed, 0);
    }

    if (this.keys['arrowdown']) {
      this.paddle1Y = Math.min(this.paddle1Y + paddleSpeed, this.maxPaddleY);
    }

    if (this.keys['w']) {
      this.paddle2Y = Math.max(this.paddle2Y - paddleSpeed, 0);
    }

    if (this.keys['s']) {
      this.paddle2Y = Math.min(this.paddle2Y + paddleSpeed, this.maxPaddleY);
    }

    this.ballX = (this.ballX + ballSpeedX + 100) % 100;
    this.ballY = (this.ballY + ballSpeedY + 100) % 100;

    if (this.ballX - this.ballRadiusPercentage < 0 || this.ballX + this.ballRadiusPercentage > 100) {
      this.ballSpeedX = -this.ballSpeedX;
    }

    if (this.ballY - this.ballRadiusPercentage < 0 || this.ballY + this.ballRadiusPercentage > 100) {
      this.ballSpeedY = -this.ballSpeedY;
    }

    if (this.ballX + this.ballRadiusPercentage <= 2 && 
        this.ballY > this.paddle1Y && 
        this.ballY < (this.paddle1Y + this.paddleHeightPercentage)) {
      this.ballSpeedY = -this.ballSpeedY;
      this.ballSpeedX = -this.ballSpeedX;
    }

    if (this.ballX + this.ballRadiusPercentage >= 98 && 
      this.ballY > this.paddle2Y && 
      this.ballY < (this.paddle2Y + this.paddleHeightPercentage) ) {
    this.ballSpeedY = -this.ballSpeedY;
    this.ballSpeedX = -this.ballSpeedX;
  }
  }

  private draw(): void {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    const paddle1X = 0 * this.canvasWidth;
    const paddle2X = 0.98 * this.canvasWidth;
    const paddleHeight = (this.paddleHeightPercentage / 100) * this.canvasHeight;
    const paddle1Y = (this.paddle1Y / 100) * this.canvasHeight;
    const paddle2Y = (this.paddle2Y / 100) * this.canvasHeight;
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(paddle1X, paddle1Y, this.paddleWidth, paddleHeight);
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(paddle2X, paddle2Y, this.paddleWidth, paddleHeight);

    const ballRadius = (this.ballRadiusPercentage / 100) * this.canvasWidth;
    const ballX = (this.ballX / 100) * this.canvasWidth;
    const ballY = (this.ballY / 100) * this.canvasHeight;
    this.ctx.beginPath();
    this.ctx.fillRect(ballX, ballY, 15,15);
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
    this.ctx.closePath();
  }

  isBallInReadyZone = false;
  isBallInSteadyZone = false;
  isBallInPongZone = false;
  updateBallZoneFlags(): void {
    if (this.ballX < 33) {
      this.isBallInReadyZone = true;
      this.isBallInSteadyZone = false;
      this.isBallInPongZone = false;
    }
    if (this.ballX > 33 && this.ballX < 66) {
      this.isBallInReadyZone = false;
      this.isBallInSteadyZone = true;
      this.isBallInPongZone = false;
    }
    if (this.ballX > 66) {
      this.isBallInReadyZone = false;
      this.isBallInSteadyZone = false;
      this.isBallInPongZone = true;
    }
  }
  
}