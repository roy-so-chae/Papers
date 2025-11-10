const express = require('express');
const cors = require('cors');
const path = require('path');
const { getCachedNews, collectAllNews } = require('./src/newsCollector');
const { initScheduler } = require('./src/scheduler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes

/**
 * GET /api/news - Get cached news data
 */
app.get('/api/news', async (req, res) => {
  try {
    const news = await getCachedNews();
    res.json({
      success: true,
      data: news
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch news'
    });
  }
});

/**
 * POST /api/news/refresh - Manually trigger news collection
 */
app.post('/api/news/refresh', async (req, res) => {
  try {
    console.log('Manual news refresh triggered');
    const news = await collectAllNews();
    res.json({
      success: true,
      message: 'News refreshed successfully',
      data: news
    });
  } catch (error) {
    console.error('Error refreshing news:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to refresh news'
    });
  }
});

/**
 * GET /api/health - Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Serve index.html for all other routes (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Initialize scheduler
initScheduler();

// Start server
app.listen(PORT, () => {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`🚀 Google AI News Daily App`);
  console.log(`${'='.repeat(50)}`);
  console.log(`📡 Server running on port ${PORT}`);
  console.log(`🌐 Open http://localhost:${PORT}`);
  console.log(`${'='.repeat(50)}\n`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\nSIGINT signal received: closing HTTP server');
  process.exit(0);
});
