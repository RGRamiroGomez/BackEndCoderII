import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { createHashUtil, verifyHashUtil } from "../utils/hash.util.js";
import { readByEmail, create } from "../data/managers/user.manager.js";
import { createTokenUtil } from "../utils/token.util.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        if (!email || !password) {
          const info = { message: "Invalid Credentials", statusCode: 401 };
          return done(null, false, info);
        }
        const isUser = await readByEmail(email);
        if (isUser) {
          return done(new Error("Email is already in use"));
        }
        req.body.password = createHashUtil(password);
        const user = await create(req.body);
        const info = { message: "User created successfully", statusCode: 201 };
        return done(null, user, info);
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
    async (email, password, done) => {
      try {
        const user = await readByEmail(email);
        if (!user) {
          return done(new Error("User  not found"));
        }
        const pwd = verifyHashUtil(password, user.password);
        if (!pwd) {
          return done(new Error("Invalid password"));
        }
        const token = createTokenUtil({ role: user.role, id: user._id });
        const info = {
          message: "User logged in successfully",
          statusCode: 200,
        };
        return done(null, token, info);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  "admin",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
      secretOrKey: process.env.SECRET_KEY,
    },
    async (data, done) => {
      try {
        const { id, role } = data;
        if (role !== "admin") {
          const info = {message:"Not Authorized",statusCode:403}
          return done(null,false,info);
        }
        const user = await readById(id);
        const info = {message:"Is Admin",statusCode:200}
        return done(null, user,info);
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "sign-out",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
      secretOrKey: process.env.SECRET_KEY,
    },
    async (data, done) => {
      try {
        const { id } = data;
        const user = await readById(id);
        const info = {message:"User logged out successfully",statusCode:200}
        return done(null, user,info);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use("online",new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
    secretOrKey: process.env.SECRET_KEY,
  },
  async (data, done) => {
    try {
      const { id } = data;
      const user = await readById(id);
      const info = {message:"User is online",statusCode:200}
      return done(null,false,info)
    }catch(error){
      return done(error)
    }
  }
))
export default passport;
