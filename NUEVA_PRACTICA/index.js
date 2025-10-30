try {
  require('./src/index.js');
} catch (err) {
  console.error('Failed to require ./src/index.js:', err);
  process.exit(1);
}
