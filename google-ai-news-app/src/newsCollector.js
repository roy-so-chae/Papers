/**
 * Google AI News Daily - News Collector
 * Version: 1.0.0
 * Description: Collects news from Google News RSS feeds
 */

const Parser = require('rss-parser');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const VERSION = '1.0.0';

const parser = new Parser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
});

// Google News RSS URLs for AI news
const NEWS_SOURCES = {
  en: 'https://news.google.com/rss/search?q=Google+AI+OR+Google+Gemini+OR+Google+Bard+when:2d&hl=en-US&gl=US&ceid=US:en',
  ko: 'https://news.google.com/rss/search?q=' + encodeURIComponent('구글 AI OR 구글 제미나이 OR 인공지능 구글') + '+when:2d&hl=ko&gl=KR&ceid=KR:ko'
};

/**
 * Collect news articles from Google News RSS
 * @param {string} language - 'en' or 'ko'
 * @param {number} limit - Number of articles to collect
 * @returns {Promise<Array>} Array of news articles
 */
async function collectNews(language, limit = 5) {
  try {
    console.log(`Collecting ${language.toUpperCase()} news...`);
    const feed = await parser.parseURL(NEWS_SOURCES[language]);

    const articles = feed.items.slice(0, limit).map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      source: item.source?.name || extractSource(item.title),
      description: cleanDescription(item.contentSnippet || item.content),
      language: language
    }));

    console.log(`✓ Collected ${articles.length} ${language.toUpperCase()} articles`);
    return articles;
  } catch (error) {
    console.error(`Error collecting ${language} news:`, error.message);
    return [];
  }
}

/**
 * Extract source from title (Google News format: "Title - Source")
 */
function extractSource(title) {
  const match = title.match(/\s-\s([^-]+)$/);
  return match ? match[1].trim() : 'Unknown Source';
}

/**
 * Clean and truncate description
 */
function cleanDescription(description) {
  if (!description) return '';
  return description
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
    .substring(0, 300); // Limit to 300 characters
}

/**
 * Collect all news (English and Korean)
 */
async function collectAllNews() {
  console.log('\n📰 Starting news collection...');
  console.log(`Time: ${new Date().toLocaleString()}\n`);

  const [englishNews, koreanNews] = await Promise.all([
    collectNews('en', 5),
    collectNews('ko', 5)
  ]);

  const newsData = {
    lastUpdated: new Date().toISOString(),
    english: englishNews,
    korean: koreanNews,
    totalArticles: englishNews.length + koreanNews.length
  };

  // Save to file
  const dataPath = path.join(__dirname, '../data/news.json');
  await fs.writeFile(dataPath, JSON.stringify(newsData, null, 2));

  console.log(`\n✓ News collection completed!`);
  console.log(`  English articles: ${englishNews.length}`);
  console.log(`  Korean articles: ${koreanNews.length}`);
  console.log(`  Saved to: ${dataPath}\n`);

  return newsData;
}

/**
 * Get cached news data
 */
async function getCachedNews() {
  try {
    const dataPath = path.join(__dirname, '../data/news.json');
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, collect news
    console.log('No cached news found, collecting fresh news...');
    return await collectAllNews();
  }
}

module.exports = {
  collectAllNews,
  getCachedNews
};
