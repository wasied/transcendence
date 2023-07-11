import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OAuth42Strategy extends PassportStrategy(Strategy, 'oauth42') {
  constructor(private configService: ConfigService) {
    super({
      authorizationURL: configService.get('AUTH_42_AUTH_URL'),
      tokenURL: 'https://api.intra.42.fr/oauth/token',
      clientID: configService.get('AUTH_42_CLIENT_KEY'),
      clientSecret: configService.get('AUTH_42_SECRET_KEY'),
      callbackURL: configService.get('AUTH_42_REDIRECT_URI'),
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