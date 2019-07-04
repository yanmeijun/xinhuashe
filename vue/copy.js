const path = require('path'), fs = require('fs');
const rootPath = path.dirname(__dirname);
fs.writeFileSync(
  path.join(rootPath, 'back', 'dist', 'static', 'css', 'glyphicons.9b7959ad8f764cc2b467f7013efa785f.min.css'),
  fs.readFileSync(
    path.join(rootPath, 'vue', 'src', 'assets', 'css', 'glyphicons.9b7959ad8f764cc2b467f7013efa785f.min.css')
  )
);
fs.writeFileSync(
  path.join(rootPath, 'back', 'dist', 'static', 'js', 'init.9b7959ad8f764cc2b467f7013efa785f.js'),
  fs.readFileSync(
    path.join(rootPath, 'vue', 'src', 'assets', 'js', 'init.9b7959ad8f764cc2b467f7013efa785f.js')
  )
);

