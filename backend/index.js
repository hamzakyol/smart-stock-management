const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('SmartStock Backend Sunucusu Sorunsuz Çalışıyor!');
});

const PORT = 5000;
app.listen(PORT, async () => {
    console.log(`Sunucu ${PORT} portunda başarıyla ayağa kalktı!`);
    
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('PostgreSQL Veritabanı Bağlantısı Başarılı! Sunucu Saati:', res.rows[0].now);
    } catch (err) {
        console.error('Veritabanı Bağlantı Hatası Detayı:', err);
    }
});