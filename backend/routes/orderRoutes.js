const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM orders ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Siparişler getirilirken bir hata oluştu!' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { table_id, product_id, quantity } = req.body;
        const newOrder = await pool.query(
            'INSERT INTO orders (table_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
            [table_id, product_id, quantity]
        );
        res.json({ message: 'Sipariş başarıyla alındı!', order: newOrder.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Sipariş alınırken bir hata oluştu!' });
    }
});

module.exports = router;