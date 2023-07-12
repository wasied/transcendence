import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';

@Injectable()
export class OAuth42Strategy extends PassportStrategy(Strategy, 'oauth42') {
  constructor() {
    super({
      authorizationURL: process.env.AUTH_42_AUTH_URL,
      tokenURL: 'https://api.intra.42.fr/oauth/token',
      clientID: process.env.AUTH_42_CLIENT_KEY,
      clientSecret: process.env.AUTH_42_SECRET_KEY,
      callbackURL: process.env.AUTH_42_RETURN_URI,
      scope: 'public'
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {

    // We can do what we can with user informations here
    // and return a user to passport to put it in session

    // just for example, we return informations without any treatment
    done(null, { accessToken, refreshToken, profile });
  }
}