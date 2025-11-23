const fs = require('fs');
const path = require('path');

const documentsDir = path.join(__dirname, '..', 'documents');

// Middleware to validate PDF file exists
function pdfValidation(req, res, next) {
    const fileName = req.params.file;
    const filePath = path.join(documentsDir, fileName);
    
    // Check if file exists in documents directory
    if (fs.existsSync(filePath)) {
        return next();
    }
    return res.status(404).send('PDF does not exist');
}

module.exports = { pdfValidation };
