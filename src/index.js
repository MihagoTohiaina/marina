const express = require('express');
const { execFile } = require('child_process');

const app = express();

app.get('/marina', (req, res) => {
    const laza = req.query.laza;
    if (!laza) {
        return res.status(400).json({ error: "Missing 'laza' parameter" });
    }
    execFile('./marina', [laza], (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: stderr.toString() });
        }
        return res.json({ result: stdout.toString().trim() });
    });
});

const PORT = 3000;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});
