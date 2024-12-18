const express = require('express');
const cors = require("cors")

const { Pool } = require('pg');
require('dotenv').config()
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors())
// Connect to PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Create tasks table
pool.query(
    `CREATE TABLE IF NOT EXISTS tasks (id SERIAL PRIMARY KEY, task TEXT NOT NULL)`,
    (err) => {
        if (err) console.error('Error creating table:', err);
        else console.log('Tasks table ready');
    }
);

// Add task
app.post('/tasks', async (req, res) => {
    const { task } = req.body;
    try {
        const result = await pool.query('INSERT INTO tasks (task) VALUES ($1) RETURNING *', [task]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get tasks
app.get('/tasks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
