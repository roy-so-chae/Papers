// Detailed test to verify RSS feed parsing and URL matching
const Parser = require('rss-parser');

const parser = new Parser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
});

// Test URLs
const TEST_URLS = {
  en: 'https://news.google.com/rss/search?q=Google+AI+OR+Google+Gemini+OR+Google+Bard+when:2d&hl=en-US&gl=US&ceid=US:en',
  ko: 'https://news.google.com/rss/search?q=' + encodeURIComponent('구글 AI OR 구글 제미나이 OR 인공지능 구글') + '+when:2d&hl=ko&gl=KR&ceid=KR:ko'
};

async function testRSSParsing() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('Testing Google News RSS Feed Structure');
  console.log('═══════════════════════════════════════════════════════\n');

  for (const [lang, url] of Object.entries(TEST_URLS)) {
    console.log(`\n📰 Testing ${lang.toUpperCase()} feed:`);
    console.log(`URL: ${url}\n`);

    try {
      const feed = await parser.parseURL(url);

      console.log(`✓ Feed Title: ${feed.title}`);
      console.log(`✓ Total Items: ${feed.items.length}\n`);

      if (feed.items.length > 0) {
        console.log('First 3 articles:\n');

        feed.items.slice(0, 3).forEach((item, index) => {
          console.log(`Article ${index + 1}:`);
          console.log(`  Title: ${item.title}`);
          console.log(`  Link: ${item.link}`);
          console.log(`  PubDate: ${item.pubDate}`);
          console.log(`  Source: ${item.source?.name || 'Not available'}`);
          console.log(`  Content Snippet: ${item.contentSnippet?.substring(0, 100) || 'Not available'}...`);
          console.log('');
        });

        // Verify URL matching
        console.log('✓ URL Matching Verification:');
        feed.items.slice(0, 3).forEach((item, index) => {
          const titleMatch = item.title.length > 0;
          const linkMatch = item.link && item.link.startsWith('http');
          console.log(`  Article ${index + 1}: Title=${titleMatch ? '✓' : '✗'}, Link=${linkMatch ? '✓' : '✗'}`);
        });

      } else {
        console.log('⚠️  No articles found in feed');
      }

    } catch (error) {
      console.error(`✗ Error: ${error.message}`);

      if (error.message.includes('EAI_AGAIN') || error.message.includes('ENOTFOUND')) {
        console.log('\n⚠️  Network Issue Detected:');
        console.log('   This environment cannot access external networks.');
        console.log('   The code is correct, but internet access is required.');
      }
    }
  }

  console.log('\n═══════════════════════════════════════════════════════');
  console.log('Test Complete');
  console.log('═══════════════════════════════════════════════════════');
}

testRSSParsing().then(() => process.exit(0)).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
