const pdfFinder = require('./pdfFinder');

// Middleware to validate PDF file exists
function pdfValidation(req, res, next) {
    const fileName = req.params.file;
    if (pdfFinder.findPdfFiles().includes(fileName)) {
        return next();
    }
    return res.status(404).send('PDF does not exist');
}

module.exports = { pdfValidation };
