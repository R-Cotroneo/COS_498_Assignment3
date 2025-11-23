const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'db', 'myDocs.db');
const db = new Database(dbPath);

// Storing new PDF resource to database
function addPdfResource(name, filePath, description) {
    try {
        const insert = db.prepare('INSERT INTO documents (name, path, desc) VALUES (?, ?, ?)');
        insert.run(name, filePath, description);
        console.log(`PDF resource added: ${name}, ${filePath}`);
    } catch (error) {
        console.error("Error adding PDF resource:", error);
    }
}

// Removing a PDF resource from database
function removePdfResource(filePath) {
    try {
        const del = db.prepare('DELETE FROM documents WHERE path = ?');
        del.run(filePath);
    } catch (error) {
        console.error("Error removing PDF resource:", error);
    }
}

// Querying PDF resources
function getAllPdfResources() {
    try {
        const getAll = db.prepare('SELECT * FROM documents');
        return getAll.all();
    } catch (error) {
        console.error("Error querying PDF resources:", error);
        return [];
    }
}

// Update PDF resource details
function updatePdfResource(name, filePath, description) {
    try {
        const update = db.prepare('UPDATE documents SET name = ?, desc = ? WHERE path = ?');
        update.run(name, description, filePath);
        console.log(`PDF resource updated: ${name}, ${filePath}`);
    } catch (error) {
        console.error("Error updating PDF resource:", error);
    }
}

module.exports = { 
    addPdfResource,
    removePdfResource,
    getAllPdfResources,
    updatePdfResource 
};
