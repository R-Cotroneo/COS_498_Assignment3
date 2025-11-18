const path = require('path');
const fs = require('fs');

const pdfDirectory = path.join(__dirname, '..', 'documents');

// PDF File Cache
let cache = { files: null };

function findPdfFiles() {
    const now = Date.now();
    
    // Check if cache is valid and should be used
    if (cache.files) {
        console.log('Returning cached PDF files');
        return cache.files;
    }
    
    try {
        // Read PDF directory for files
        const files = fs.readdirSync(pdfDirectory);
        const pdfFiles = files.filter(file => path.extname(file).toLowerCase() === '.pdf');
        
        // Update cache
        cache.files = pdfFiles;
        
        return pdfFiles;
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
