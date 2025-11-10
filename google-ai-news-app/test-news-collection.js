// Test script to collect real news
const { collectAllNews } = require('./src/newsCollector');

console.log('Starting manual news collection test...\n');

collectAllNews()
  .then(data => {
    console.log('\n✅ Success! Collected real news:');
    console.log(`   English articles: ${data.english.length}`);
    console.log(`   Korean articles: ${data.korean.length}`);
    console.log('\nFirst English article:');
    if (data.english.length > 0) {
      console.log(`   Title: ${data.english[0].title}`);
      console.log(`   Source: ${data.english[0].source}`);
      console.log(`   Link: ${data.english[0].link}`);
    }
    console.log('\nFirst Korean article:');
    if (data.korean.length > 0) {
      console.log(`   Title: ${data.korean[0].title}`);
      console.log(`   Source: ${data.korean[0].source}`);
      console.log(`   Link: ${data.korean[0].link}`);
    }
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  });
