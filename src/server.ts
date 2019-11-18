import express from 'express'
import { AuthControllerRouting } from './controller/authController';

export class Server {

    private app: express.Application;
    private port = process.env.PORT || 3000;
    constructor() {
        this.app = express()
        this.routes()
    }

    private routes() {
        this.app.use('/auth', AuthControllerRouting.routes());
    }

    public start() {
        this.app.listen(this.port, () => {
            console.log(`Server running on ${this.port}`)
        })
    }
}