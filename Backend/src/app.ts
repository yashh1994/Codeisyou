import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import errorHandler from './middlewares/errorHandler';

dotenv.config();
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

export default app;
