import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import routes from '../routes/index';

interface Error {
    status?: number;
    message?: string;
}

const URL = `http://${process.env.HOST}:${process.env.PORT}/api`;
const CORS_URL = `${process.env.CLIENT_HOST}`;

var corsOptions = {
    origin: CORS_URL,
    optionsSuccessStatus: 200
}

const app = express();

app.use(helmet());
app.use(compression());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', CORS_URL);
    res.header('Vary', 'Origin');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    app.use(cors(corsOptions));
    //app.use(cors());

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
        return res.status(200).json({
            URL: URL,
            Version: process.env.npm_package_version,
            Options: 'GET, POST'
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