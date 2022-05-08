import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import routes from '../routes/index';
import dotenv from 'dotenv';


interface Error {
    status?: number;
    message?: string;
}

dotenv.config({ path: './src/config/env/.env.development' });
const host = process.env.HOST;

var corsOptions = {
    origin: `http://${host}:3001/`,
    optionsSuccessStatus: 200
}

const app = express();

app.use(helmet());
app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', host);
    res.header('Vary', 'Origin');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    app.use(cors(corsOptions));

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
        return res.status(200).json({
            URL: `http://${host}:${process.env.PORT}/api`,
            Version: process.env.npm_package_version,
            Options: 'GET, PUT, POST, DELETE'
        });
    }
    next();
});

app.use('/api', routes);

app.get('/', (req, res, next) => res.send(`WebServer running on ${process.env.HOST} - port ${process.env.PORT} - ${new Date}`));

app.use((req, res, next) => {
    const error = new Error('Route not found.') as Error;
    error.status = 404;
    next(error);
});

app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(error.status || 500);
    return res.send({
        error: error.message
    });
});

export default app;