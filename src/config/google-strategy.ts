import { Strategy, VerifyCallback } from 'passport-google-oauth20';

export class GoogleStrategy extends Strategy {
  constructor() {
    super(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: '/auth/google/redirect',
        scope: ['email', 'profile'],
      },
      GoogleStrategy.validate,
    );
  }

  static validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    const { name, emails } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      accessToken,
    };
    done(null, user);
  }
}
