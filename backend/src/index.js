require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { initDb, pool } = require('./config/db');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

// Health Check
app.get('/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.status(200).json({
            status: 'healthy',
            database: 'connected',
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        res.status(200).json({
            status: 'healthy',
            database: 'disconnected',
            timestamp: new Date().toISOString()
        });
    }
});

const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/payments', paymentRoutes);

const testRoutes = require('./routes/testRoutes');
app.use('/api/v1/test', testRoutes);

// Start Server and Init DB
// Start Server and Init DB
const startServer = async () => {
    await initDb(); // Ensure DB is ready before listening
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};

startServer();
