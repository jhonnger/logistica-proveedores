import express from 'express';
import * as bodyParser from "body-parser";
import cors from "cors";
import { Sequelize } from 'sequelize';
import { sequelize} from './database/config';
import { SERVER_PORT } from './global/environment';
import rutasIndex from './routes/router';
import { createServer, Server } from 'http';
import * as path from "path";
require('dotenv').config();


class App {

    public app: express.Application;
    private server: Server;
    
    public port: Number;

    public sequelize: Sequelize;

    constructor() {

        this.app = express();
        this.port = SERVER_PORT;
        this.server = createServer(this.app);

        this.config();
        this.sequelize = sequelize;

    }

    private config(): void{

        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // CORS
        this.app.use( cors({ origin: true, credentials: true  }) );
        //PORT

        this.server.listen( SERVER_PORT );

        this.app.use('/logistica', rutasIndex );
        this.app.use(express.static(path.join(__dirname, 'dist')));

        this.app.all('*', (req, res) => {
            res.sendFile(path.join(__dirname + '/dist/index.html'));
        });


    }
}
let app = new App();
export default app;
