import Phaser from "phaser";

export class PongScene extends Phaser.Scene {

	constructor () {
		super({ key: 'PongScene' });
	}

	// will load assets when trigger the component
	preload() {
		this.load.image('');
		this.load.image('');
	}

	create() {
		
	}

	override update(time: number, delta: number): void {
		
	}
}
