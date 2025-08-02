const express = require('express');
const { execFile } = require('child_process');

const app = express();

app.get('/marina', (req, res) => {
    const rawLaza = req.query.laza;

    if (!rawLaza || typeof rawLaza !== 'string') {
        return res.status(400).json({ error: "Missing or invalid 'laza' parameter" });
    }

    // Nettoyage et validation rapide
    let laza = rawLaza.trim().replace(/^["']|["']$/g, '');

    const parensDiff = (laza.match(/\(/g) || []).length - (laza.match(/\)/g) || []).length;
    if (parensDiff !== 0) {
        return res.status(400).json({ error: "Unbalanced parentheses in formula" });
    }

    execFile('./marina', [laza], { timeout: 5000 }, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: stderr?.trim() || error.message });
        }

        res.json({ result: stdout.trim() });
    });
});

const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
});
