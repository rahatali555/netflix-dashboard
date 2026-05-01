const express = require('express');
const cors = require('cors');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();
app.use(cors());

const port = 5000;

// The "Route" section
app.get('/api/stats/genres', (req, res) => {
    const genreCounts = {};

    fs.createReadStream('netflix_titles.csv')
        .pipe(csv())
        .on('data', (row) => {
            if (row.listed_in) {
                const genres = row.listed_in.split(',');
                genres.forEach(genre => {
                    const cleanGenre = genre.trim();
                    genreCounts[cleanGenre] = (genreCounts[cleanGenre] || 0) + 1;
                });
            }
        })
        .on('end', () => {
            const formattedData = Object.keys(genreCounts).map(name => ({
                name: name,
                value: genreCounts[name]
            }));
            res.json(formattedData.sort((a, b) => b.value - a.value));
        }) // No semicolon here! The chain continues...
        .on('error', (err) => {
            res.status(500).json({ error: "Failed to read CSV" });
        }); 
}); // This semicolon ends the "app.get" sentence.

// The "Start Server" section
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
