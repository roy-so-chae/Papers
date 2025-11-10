/**
 * Google AI News Daily - Frontend App
 * Version: 1.0.0
 * Description: Client-side JavaScript for news display
 */

const VERSION = '1.0.0';

// DOM Elements
const newsContent = document.getElementById('newsContent');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const refreshBtn = document.getElementById('refreshBtn');
const lastUpdated = document.getElementById('lastUpdated');

// API Configuration
const API_BASE = window.location.origin;

// Log version on load
console.log(`Google AI News Daily v${VERSION}`);

/**
 * Format date for display
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
        return `${diffMins}분 전`;
    } else if (diffHours < 24) {
        return `${diffHours}시간 전`;
    } else if (diffDays < 7) {
        return `${diffDays}일 전`;
    } else {
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

/**
 * Show loading state
 */
function showLoading() {
    loading.classList.remove('hidden');
    newsContent.classList.add('hidden');
    error.classList.add('hidden');
}

/**
 * Hide loading state
 */
function hideLoading() {
    loading.classList.add('hidden');
    newsContent.classList.remove('hidden');
}

/**
 * Show error message
 */
function showError(message) {
    error.textContent = `❌ ${message}`;
    error.classList.remove('hidden');
    loading.classList.add('hidden');
}

/**
 * Update last updated time
 */
function updateLastUpdated(timestamp) {
    const date = new Date(timestamp);
    lastUpdated.textContent = `Last updated: ${formatDate(timestamp)}`;
}

/**
 * Create article card HTML
 */
function createArticleCard(article, index) {
    const pubDate = formatDate(article.pubDate);

    return `
        <div class="article-card">
            <div class="article-header">
                <div class="article-number">${index + 1}</div>
                <div class="article-source">${escapeHtml(article.source)}</div>
            </div>
            <h3 class="article-title">
                <a href="${escapeHtml(article.link)}" target="_blank" rel="noopener noreferrer">
                    ${escapeHtml(article.title)}
                </a>
            </h3>
            ${article.description ? `
                <p class="article-description">${escapeHtml(article.description)}</p>
            ` : ''}
            <div class="article-footer">
                <div class="article-date">
                    <span>🕐</span>
                    <span>${pubDate}</span>
                </div>
                <a href="${escapeHtml(article.link)}"
                   class="article-link"
                   target="_blank"
                   rel="noopener noreferrer">
                    Read More →
                </a>
            </div>
        </div>
    `;
}

/**
 * Create news section HTML
 */
function createNewsSection(title, icon, articles, language) {
    if (!articles || articles.length === 0) {
        return `
            <div class="news-section">
                <div class="section-header">
                    <span class="section-icon">${icon}</span>
                    <h2 class="section-title">${title}</h2>
                </div>
                <div class="empty-state">
                    <div class="empty-state-icon">📭</div>
                    <p class="empty-state-text">No news articles available</p>
                </div>
            </div>
        `;
    }

    const articlesHtml = articles
        .map((article, index) => createArticleCard(article, index))
        .join('');

    return `
        <div class="news-section">
            <div class="section-header">
                <span class="section-icon">${icon}</span>
                <h2 class="section-title">${title}</h2>
                <span class="section-count">${articles.length} articles</span>
            </div>
            <div class="articles-grid">
                ${articlesHtml}
            </div>
        </div>
    `;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Render news data
 */
function renderNews(data) {
    const englishSection = createNewsSection(
        'English News',
        '🇺🇸',
        data.english,
        'en'
    );

    const koreanSection = createNewsSection(
        'Korean News',
        '🇰🇷',
        data.korean,
        'ko'
    );

    newsContent.innerHTML = englishSection + koreanSection;
    updateLastUpdated(data.lastUpdated);
}

/**
 * Fetch news from API
 */
async function fetchNews() {
    try {
        showLoading();

        const response = await fetch(`${API_BASE}/api/news`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.error || 'Failed to fetch news');
        }

        renderNews(result.data);
        hideLoading();

    } catch (err) {
        console.error('Error fetching news:', err);
        showError('Failed to load news. Please try again later.');
    }
}

/**
 * Refresh news (trigger collection)
 */
async function refreshNews() {
    try {
        refreshBtn.disabled = true;
        refreshBtn.innerHTML = `
            <span class="btn-icon">⏳</span>
            <span class="btn-text">Refreshing...</span>
        `;

        const response = await fetch(`${API_BASE}/api/news/refresh`, {
            method: 'POST'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.error || 'Failed to refresh news');
        }

        renderNews(result.data);

        // Show success message
        const originalHtml = refreshBtn.innerHTML;
        refreshBtn.innerHTML = `
            <span class="btn-icon">✓</span>
            <span class="btn-text">Updated!</span>
        `;

        setTimeout(() => {
            refreshBtn.innerHTML = `
                <span class="btn-icon">🔄</span>
                <span class="btn-text">Refresh News</span>
            `;
            refreshBtn.disabled = false;
        }, 2000);

    } catch (err) {
        console.error('Error refreshing news:', err);
        showError('Failed to refresh news. Please try again later.');

        refreshBtn.innerHTML = `
            <span class="btn-icon">🔄</span>
            <span class="btn-text">Refresh News</span>
        `;
        refreshBtn.disabled = false;
    }
}

// Event Listeners
refreshBtn.addEventListener('click', refreshNews);

// Auto-refresh every 30 minutes
setInterval(fetchNews, 30 * 60 * 1000);

// Initial load
fetchNews();
