import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/auth.routes';
import cors from 'cors';
import { engine } from 'express-handlebars';
import swaggerUi from 'swagger-ui-express'; 
import swaggerDocument from './swagger.json';

dotenv.config();
connectDB();

const app = express();

app.engine('hbs',engine({extname:'.hbs'}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customSiteTitle: 'FastCart Admin API Docs',
  swaggerOptions: {
    persistAuthorization: true,
    docExpansion: 'list',
    defaultModelsExpandDepth: -1
  }
}));

app.use('/api/admin', authRoutes);

app.get('/', (_req, res) => {
  res.render('home');
});

app.get('/api/time', (req, res) => {
    const now = new Date();
    const serverTime = now.toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata', 
        hour12: true,
    });
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    res.render('time', {
        serverTime,
        timezone,
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
