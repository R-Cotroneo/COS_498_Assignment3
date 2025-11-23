const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const pdfDirectory = path.join(__dirname, '..', 'documents');

const dbPath = path.join(__dirname, '..', 'db', 'myDocs.db');
const db = new Database(dbPath);

// PDF File Cache
let cache = { files: null };

// Function to find PDF files with caching
function findPdfFiles() {    
    // Check if cache is valid and should be used
    if (cache.files) {
        console.log('Returning cached PDF files');
        return cache.files;
    }
    
    try {
        // Read PDF directory for files
        const files = fs.readdirSync(pdfDirectory);
        const pdfFiles = files.filter(file => path.extname(file).toLowerCase() === '.pdf');
        console.log('PDF files found in directory: ', pdfFiles);

        // Validate files against database entries
        // let validPdfFiles = pdfFiles; // Temporarily bypassing DB check
        let validPdfFiles = [];
        for (const file of pdfFiles) {
            // Check if file is in database
            const validFile = db.prepare('SELECT name, path, desc FROM documents WHERE path = ?').get(file);
            if (validFile) {
                validPdfFiles.push({ name: validFile.name, path: validFile.path, desc: validFile.desc });
            } else {
                // This is specifically to test that files can still be displayed even if not in DB
                // Utilizes the 'Kogan Volsche 2020 Cat Dating.pdf' test file
                validPdfFiles.push({ name: file, path: file, desc: 'N/A' });
            }
        }
        
        // Update cache
        cache.files = validPdfFiles;
        console.log('PDF Files: ', validPdfFiles);
        
        return validPdfFiles;
    } catch (error) {
        console.error("Error reading PDF directory:", error);
        // Return cached files if available
        return cache.files || [];
    }
}

// Function to manually clear cache
function clearCache() {
    cache.files = null;
    console.log('PDF cache cleared');
}

module.exports = { findPdfFiles, clearCache };
