const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM categories ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Kategoriler getirilirken bir hata oluştu!' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = await pool.query(
            'INSERT INTO categories (name) VALUES ($1) RETURNING *',
            [name]
        );
        res.json({ message: 'Kategori başarıyla eklendi!', category: newCategory.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Kategori eklenirken bir hata oluştu!' });
    }
});

module.exports = router;