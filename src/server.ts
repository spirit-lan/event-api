import express from "express";
import bodyParser from "body-parser";
import { createConnection } from "typeorm";
import { AuthControllerRouting } from "./controller/authController";

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
  }
  private config() {
    this.app.set("port", this.port);
    this.app.use(express.json()); // to support JSON-encoded bodies
    this.app.use(express.urlencoded()); // to support URL-encoded bodies
    this.app.use(bodyParser());
  }

  public start() {
    createConnection().then(connection => {
      this.app.listen(this.app.get("port"), () => {
        console.log(`Server running on ${this.port}`);
      });
    });
  }
}
