const express = require('express');
const path = require('path');
const app = express();

const appDirectory = process.cwd();
console.log('Application directory:', appDirectory);

const distPath = path.join(appDirectory, 'dist/timeline_angular/browser');
console.log('Dist path:', distPath);

console.log('Directory contents:', require('fs').readdirSync(appDirectory));
if (require('fs').existsSync(path.join(appDirectory, 'dist'))) {
    console.log('Dist contents:', require('fs').readdirSync(path.join(appDirectory, 'dist')));
}

app.use(express.static(distPath));
app.get('/*', function(req, res) {
    const indexPath = path.join(distPath, 'index.html');
    console.log('Trying to serve:', indexPath);
    
    if (require('fs').existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send('index.html not found. Path: ' + indexPath);
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Server is running on port', port);
    console.log('Serving files from:', distPath);
});