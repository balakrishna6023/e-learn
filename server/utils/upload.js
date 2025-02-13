const multer = require('multer');

// Set storage options
const storage = multer.memoryStorage();  // Store files in memory (buffer)

const upload = multer({ storage: storage });

module.exports = upload;
