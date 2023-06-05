// Imports
import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

// Application Routes
import { UserRoutes } from './app/modules/user/user.route';

// Express App
const app: Application = express();

// Using cors
app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', UserRoutes);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
