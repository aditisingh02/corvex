const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const colors = require('colors');
const path = require('path');

// Load environment variables
dotenv.config();

// Import database connection
const connectDB = require('./src/config/database');

// Import routes
const authRoutes = require('./src/routes/auth');
const employeeRoutes = require('./src/routes/employees');
const departmentRoutes = require('./src/routes/departments');
const attendanceRoutes = require('./src/routes/attendance');
const leaveRoutes = require('./src/routes/leave');
const payrollRoutes = require('./src/routes/payroll');
const performanceRoutes = require('./src/routes/performance');
const trainingRoutes = require('./src/routes/training');
const analyticsRoutes = require('./src/routes/analytics');
const interviewRoutes = require('./src/routes/interviews');
const candidateRoutes = require('./src/routes/candidates');

// Import middleware
const errorHandler = require('./src/middleware/errorHandler');

// Connect to database
connectDB();

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: (process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000, // 15 minutes
  max: process.env.RATE_LIMIT_MAX_REQUESTS || 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://corvex-delta.vercel.app'
  ],
  credentials: true,
}));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Add a root route for health check
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Corvex HR System API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Corvex HR API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Debug route to list available routes
app.get('/api/debug/routes', (req, res) => {
  const routes = [];
  const routeInfo = [];
  
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      routes.push({
        path: middleware.route.path,
        methods: Object.keys(middleware.route.methods)
      });
    } else if (middleware.name === 'router') {
      const basePath = middleware.regexp.source
        .replace('^\\/api\\/([^\\/]+)(?:\\/(?=.*?))?', '/api/$1')
        .replace(/\\\//g, '/')
        .replace(/\?\$/, '')
        .replace(/\^/, '');
      
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          routes.push({
            path: handler.route.path,
            methods: Object.keys(handler.route.methods),
            mountPath: basePath
          });
        }
      });
    }
  });
  
  res.status(200).json({
    success: true,
    routes: routes,
    totalRoutes: routes.length
  });
});

// Test route specifically for auth
app.get('/api/debug/auth-test', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Auth route mounting test successful',
    timestamp: new Date().toISOString()
  });
});

// Temporary direct auth login route for testing
app.post('/api/auth/login-direct', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Direct auth login route working!',
    body: req.body,
    timestamp: new Date().toISOString()
  });
});

// Mount API Routes with explicit logging and error handling
console.log('Mounting API routes...');

try {
  console.log('authRoutes type:', typeof authRoutes);
  console.log('authRoutes:', authRoutes);
  app.use('/api/auth', authRoutes);
  console.log('Auth routes mounted on /api/auth successfully');
} catch (error) {
  console.error('Error mounting auth routes:', error);
}

app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/candidates', candidateRoutes);
console.log('All API routes mounted successfully');

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});

module.exports = app;