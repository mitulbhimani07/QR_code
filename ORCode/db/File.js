const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true },
  originalName: String,
  uniqueName: String,
  size: Number,
  mimeType: String,
  downloadCount: { type: Number, default: 0 },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('File', fileSchema); 