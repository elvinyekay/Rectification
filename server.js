import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;
const distPath = join(__dirname, 'dist');

// dist folder mövcud olub olmadığını yoxla
if (!existsSync(distPath)) {
    console.error(`✗ Error: dist folder not found at ${distPath}`);
    process.exit(1);
}

// Statik faylları serve et
app.use(express.static(distPath));

// SPA üçün fallback
app.get('*', (req, res) => {
    const indexPath = join(distPath, 'index.html');
    if (!existsSync(indexPath)) {
        console.error(`✗ Error: index.html not found at ${indexPath}`);
        return res.status(500).send('index.html not found');
    }
    res.sendFile(indexPath);
});

// Error handler
app.use((err, req, res, next) => {
    console.error('✗ Server error:', err);
    res.status(500).send('Internal Server Error');
});

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✓ Server running on http://0.0.0.0:${PORT}`);
    console.log(`✓ Listening on port ${PORT}`);
});

// Graceful shutdown
server.on('error', (err) => {
    console.error('✗ Server error:', err);
    process.exit(1);
});
