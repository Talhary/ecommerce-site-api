import passport from 'passport'
import GoogleStrategy0 from  'passport-google-oauth2' ;
import 'dotenv/config'
import User from '../models/user.js'
const GoogleStrategy = GoogleStrategy0.Strategy
passport.use (
    new GoogleStrategy (
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/auth/google/callback',
        passReqToCallback: true,
      },
      async function (request, accessToken, refreshToken, profile, done) {

        try {
            let user = await User.findOne({ id: profile.id });
        
            if (!user) {
              user = new User({
                provider: 'google',
                sub: profile.id,
                id: profile.id,
                displayName: profile.displayName,
                name: {
                  givenName: profile.name.givenName,
                  familyName: profile.name.familyName
                },
                given_name: profile.name.givenName,
                family_name: profile.name.familyName,
                email_verified: profile.emails[0].verified || false,
                verified: profile.emails[0].verified || false,
                language: profile._json.locale,
                email: profile.emails[0].value,
                emails: profile.emails.map(email => ({
                  value: email.value,
                  type: email.type
                })),
                photos: profile.photos.map(photo => ({
                  value: photo.value,
                  type: photo.type
                })),
                picture: profile.photos[0].value,
                _raw: JSON.stringify(profile._raw),
                _json: profile._json
              });
        
              await user.save();
            }
        
            return done(null, user);
          } catch (error) {
            return done(error, null);
          }
      }
    )
  );
  
  passport.serializeUser ((user, done) => {
    done (null, user);
  });
  
  passport.deserializeUser ((user, done) => {
    done (null, user);
  });