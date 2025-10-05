const { createServer } = require('./createServer');

const PORT = 5701;

createServer().listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started! on port http://localhost:${PORT} 🚀`);
});
