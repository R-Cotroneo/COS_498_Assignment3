const express = require('express');
const router = express.Router();
const path = require('path');
const { findPdfFiles, clearCache } = require('../middleware/pdfFinder');
const { pdfValidation } = require('../middleware/pdfValidation');
const { addPdfResource, removePdfResource, getAllPdfResources, updatePdfResource } = require('../middleware/database');

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

/*
============ 
Admin routes
============ 
*/
// Admin home route
router.get("/admin", (req, res) => {
    res.render("admin");
});

// Admin PDF upload route
router.post("/admin/uploadPdf", (req, res) => {
    addPdfResource(req.body.pdfName, req.body.pdfPath, req.body.pdfDesc);
    clearCache(); // Clear cache so new entries appear in the list
    res.redirect('/admin');
});

// Admin PDF removal route
router.post("/admin/deletePdf", (req, res) => {
    removePdfResource(req.body.pdfPath);
    clearCache(); // Clear cache so removed entries disappear from the list
    res.redirect('/admin');
});

// Adming Update PDF route
router.post("/admin/updatePdf", (req, res) => {
    updatePdfResource(req.body.pdfName, req.body.pdfPath, req.body.pdfDesc);
    clearCache(); // Clear cache so updated entries appear in the list
    res.redirect('/admin');
});

// Admin Get All PDFs route
router.get("/admin/getAllPdfs", (req, res) => {
    try {
        const pdfFiles = getAllPdfResources();
        res.render("admin", { 
            pdfFiles: pdfFiles
        });
    } catch (error) {
        console.error("Error in getAllPdfs route:", error);
        res.render("admin", { 
            error: "Error loading PDF resources",
            pdfFiles: []
        });
    }
});

module.exports = router;
