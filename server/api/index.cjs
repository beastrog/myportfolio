let cachedApp;
module.exports = async (req, res) => {
  if (!cachedApp) {
    const mod = await import('../dist/app.js');
    cachedApp = mod.default;
  }
  return cachedApp(req, res);
}; 