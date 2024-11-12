import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mes'
})

connection.connect()

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
    if (err) throw err

    console.log('The solution is: ', rows[0].solution)
})

app.get('/getMetricsData', (req, res) => {
    const query1 = 'SELECT * FROM metrics';

    connection.query(query1, (err, results) => {
        if (err) {
            res.status(500).send('Database query error');
            return;
        }
        res.json(results);
    });
});

app.get('/getProductionRecords', (req, res) => {
    const query2 = 'SELECT * FROM production';
    connection.query(query2, (err, results) => {
        if (err) {
            res.status(500).send('Database query error');
            return;
        }
        res.json(results);
        console.log(results);
    });
});

app.post('/addProductRecord', (req, res) => {

    const { pname, status, quantity, date } = req.body;

    console.log(req.body);

    const query3 = `INSERT INTO production (product_name, status, quantity, date) VALUES (?, ?, ?, ?)`;

    connection.query(query3, [pname, status, quantity, date], (err, result) => {

        if (err) {

            return res.status(500).json({ error: err.message });

        }

        res.status(201).json({ message: 'Record added successfully', data: result });
    });
});

app.put('/updateProductRecord/:id', (req, res) => {

    const { id } = req.params;
    
    const { pname, status, quantity, date } = req.body;

    const query4 = 'UPDATE production SET (product_name, status, quantity, date) VALUES (?, ?, ?, ?) WHERE id = ?';

    connection.query(query4, [pname, status, quantity, date, id], (err, result) => {

        if (err) {

            return res.status(500).json({ error: err.message });

        }

        res.status(201).json({ message: 'Record added successfully', data: result });
    });
});


app.listen(3000, () => {
    console.log('Server running on port 3000');
});
