const express = require('express');
const router = express.Router();
const path = require('path');
const { findPdfFiles } = require('../middleware/pdfFinder');

router.get("/", (req, res) => {
    res.render("home");
});

router.get("/pdfFiles", (req, res) => {
    const pdfFiles = findPdfFiles();

    res.render("pdfFiles", {
        pdfFiles: pdfFiles
    });

    for (const file of pdfFiles) {
        console.log("Found PDF file:", file);
        const filePath = path.join(__dirname, '..', 'documents', file);
        router.get(`/pdfFiles/${file}`, (req, res) => {
            res.sendFile(filePath);
        });
    }
});

module.exports = router;
