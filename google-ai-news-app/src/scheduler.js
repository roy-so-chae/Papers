const cron = require('node-cron');
const { collectAllNews } = require('./newsCollector');

/**
 * Initialize news collection scheduler
 * Runs every day at 7:00 AM
 */
function initScheduler() {
  // Schedule: Run at 7:00 AM every day
  // Cron format: minute hour day month weekday
  const schedule = '0 7 * * *';

  console.log('📅 Scheduler initialized');
  console.log(`   Schedule: Every day at 7:00 AM`);
  console.log(`   Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}\n`);

  // Schedule the task
  cron.schedule(schedule, async () => {
    console.log(`\n🔔 Scheduled task triggered at ${new Date().toLocaleString()}`);
    try {
      await collectAllNews();
    } catch (error) {
      console.error('Error in scheduled news collection:', error);
    }
  });

  // Also collect news immediately on startup
  console.log('🚀 Collecting initial news on startup...');
  collectAllNews().catch(error => {
    console.error('Error in initial news collection:', error);
  });
}

module.exports = { initScheduler };
