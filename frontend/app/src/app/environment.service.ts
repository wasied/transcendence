import { Injectable } from '@angular/core';
import * as dotenv from 'dotenv';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  private env: { [key: string]: string };

  constructor() {
    dotenv.config();
    this.env = process.env;
  }

  get(key: string): string {
    return this.env[key];
  }
}
