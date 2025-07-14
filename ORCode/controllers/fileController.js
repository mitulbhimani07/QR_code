const path = require('path');
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');
const File = require('../db/File');

const BASE_URL = process.env.BASE_URL || 'https://qr-code-90c2.onrender.com';

exports.showHome = (req, res) => {
  res.render('index');
};

exports.uploadFile = async (req, res) => {
  if (!req.file) return res.render('index', { error: 'No file uploaded!' });

  const uuid = uuidv4();
  const { originalname, filename, size, mimetype } = req.file;

  await File.create({
    uuid,
    originalName: originalname,
    uniqueName: filename,
    size,
    mimeType: mimetype,
  });

  const downloadLink = `${BASE_URL}/download/${uuid}`; 
  const qrCode = await QRCode.toDataURL(downloadLink);

  res.render('result', {
    downloadLink,
    qrCode,
    fileId: uuid,
    error: null,
  });
};

exports.downloadFile = async (req, res) => {
  const { fileId } = req.params;
  const file = await File.findOne({ uuid: fileId });
  if (!file) return res.status(404).send('File not found');

  const filePath = path.join(__dirname, '..', 'uploads', file.uniqueName);

  // Increment download count
  file.downloadCount += 1;
  await file.save();

  res.download(filePath, file.originalName);
}; 