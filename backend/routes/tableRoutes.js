const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tables ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Masalar getirilirken bir hata oluştu!' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { table_number } = req.body;
        const newTable = await pool.query(
            'INSERT INTO tables (table_number) VALUES ($1) RETURNING *',
            [table_number]
        );
        res.json({ message: 'Masa başarıyla eklendi!', table: newTable.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Masa eklenirken bir hata oluştu!' });
    }
});

module.exports = router;