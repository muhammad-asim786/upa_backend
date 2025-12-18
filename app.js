import express from 'express';
import cors from 'cors';
import { connectDB } from './src/config/db.js';
import authRoutes from './src/routes/auth.routes.js';
import userRoutes from './src/routes/user.routes.js';
import { env } from './src/config/env.js';
import dashboardRoutes from './src/routes/dashboard.routes.js'
import employeeRoutes from './src/routes/employee.routes.js'
import locationRoutes from './src/routes/location.routes.js'
import activityRoutes from './src/routes/activity.routes.js'
import incidentRoutes from './src/routes/incident.routes.js'
/**
 * Express Application Setup
 * Configures middleware, routes, and error handling
 */

// Create Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/dashboard', dashboardRoutes)
app.use('/employee', employeeRoutes)
app.use('/location', locationRoutes)
app.use('/activity', activityRoutes)
app.use('/incident', incidentRoutes)
// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

export default app;

