const webpackConfigures = require('./webpack.config')
module.exports = webpackConfigures({
  entry: {
    'devplatform.a95c34d8f29d429c83f5fb646e79d6095': 'devplatform.tsx'
  },
  distPath: 'dist'
});
