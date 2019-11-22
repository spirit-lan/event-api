import express from "express";
import { createConnection } from "typeorm";
import { AuthControllerRouting } from "./controller/authController";
import passport from "passport";
import authConfig from "./config/authConfig";
import { RoleControllerRouting } from "./controller/roleController";
import cors from 'cors';

export class Server {
  private app: express.Application;
  private port = process.env.PORT || 3000;
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private routes() {
    this.app.use("/auth", AuthControllerRouting.routes());
    this.app.use("/role", RoleControllerRouting.routes());
  }
  private config() {
    this.app.set("port", this.port);
    this.app.use(cors())
    this.app.use(express.json()); // to support JSON-encoded bodies
    this.app.use(passport.initialize()) //configuration de l'authentification
    authConfig.initialize()
  }

  public start() {
    createConnection().then(connection => {
      this.app.listen(this.app.get("port"), () => {
        console.log(`Server running on ${this.port}`);
      });
    });
  }
}

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
