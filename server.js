const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Serve static files from the root directory
app.use(express.static('./'));

// Endpoint to get images
app.get('/get-images', (req, res) => {
    const imageDirectory = path.join(__dirname, 'images');
    
    fs.readdir(imageDirectory, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return res.status(500).json({ error: 'Error reading images directory' });
        }

        // Filter for image files
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext);
        });

        res.json(imageFiles);
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 