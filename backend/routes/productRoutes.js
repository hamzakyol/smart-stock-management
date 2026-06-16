const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Ürünler getirilirken bir hata oluştu!' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, price, category_id } = req.body;
        const newProduct = await pool.query(
            'INSERT INTO products (name, price, category_id) VALUES ($1, $2, $3) RETURNING *',
            [name, price, category_id]
        );
        res.json({ message: 'Ürün başarıyla eklendi!', product: newProduct.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Ürün eklenirken bir hata oluştu!' });
    }
});

module.exports = router;