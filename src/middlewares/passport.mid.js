import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { createHashUtil, verifyHashUtil } from "../utils/hash.util.js";
import { readByEmail, create } from "../data/managers/user.manager.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        if (!email || !password) {
          return done(new Error("Email and password are required"));
        }
        const isUser = await readByEmail(email);
        if (isUser) {
          return done(new Error("Email is already in use"));
        }
        req.body.password = createHashUtil(password);
        const user = await create(req.body);
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await readByEmail(email);
        if (!user) {
            return done(new Error("User  not found"));
        }
        const pwd = verifyHashUtil(password,user.password)
        if(!pwd){
            return done(new Error("Invalid password"))
        }
        req.session.userId = user.id;
        return done(null,user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
