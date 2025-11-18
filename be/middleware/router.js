const express = require('express');
const router = express.Router();
const path = require('path');
const { findPdfFiles } = require('../middleware/pdfFinder');
const { pdfValidation } = require('../middleware/pdfValidation');

// Home route
router.get("/", (req, res) => {
    res.render("home");
});

// Route to PDF files list
router.get("/pdfFiles", (req, res) => {
    const pdfFiles = findPdfFiles();
    res.render("pdfFiles", {
        pdfFiles: pdfFiles
    });
});

// Route to serve individual PDF files with validation
router.get("/pdfFiles/:file", pdfValidation, (req, res) => {
    const filePath = path.join(__dirname, '..', 'documents', req.params.file);
    res.sendFile(filePath);
});

module.exports = router;
