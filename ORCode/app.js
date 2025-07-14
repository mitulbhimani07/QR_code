require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('./db/db');
const fileRoutes = require('./routes/fileRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));

app.use('/', fileRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`)); 