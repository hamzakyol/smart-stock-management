const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const tableRoutes = require('./routes/tableRoutes');
const orderRoutes = require('./routes/orderRoutes');


app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/orders', orderRoutes);

const PORT = 5000;
app.listen(PORT, async () => {
    console.log(`Sunucu ${PORT} portunda başarıyla ayağa kalktı!`);
});