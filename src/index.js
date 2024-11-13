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
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json(results);
    });
});

app.get('/getProductionRecords', (req, res) => {
    
    const query2 = 'SELECT * FROM production';
    connection.query(query2, (err, results) => {
        if (err) {
            res.status(500).send('Database query error');
            return res.status(500).json({ error: err.message });
        }
        console.log(results);
        res.status(201).json(results);
    });
});

app.post('/addProductRecord', (req, res) => {

    const { pname, status, quantity, date } = req.body;

    const query3 = `INSERT INTO production (product_name, status, quantity, date) VALUES (?, ?, ?, ?)`;

    connection.query(query3, [pname, status, quantity, date], (err, result) => {

        if (err) {
            res.status(500).send('Database query error');

            return res.status(500).json({ error: err.message });

        }

        res.status(201).json({ message: 'Record added successfully', data: result });
    });
});

app.put('/updateProductRecord/:id', (req, res) => {

    const { id } = req.params;
    
    const { pname, status, quantity, date } = req.body;

    const query4 = 'UPDATE production SET product_name = ?, status = ?, quantity = ?, date = ? WHERE id = ?';

    connection.query(query4, [pname, status, quantity, date, id], (err, result) => {

        if (err) {
            res.status(500).send('Database query error');

            return res.status(500).json({ error: err.message });

        }

        res.status(201).json({ message: 'Record updated successfully', data: result });
    });
});

app.delete('/deleteProductRecord/:id', (req, res) => {

    const { id } = req.params;
    
    const query5 = 'DELETE FROM production WHERE id = ?';

    connection.query(query5, [id], (err, result) => {

        if (err) {
            res.status(500).send('Database query error');

            return res.status(500).json({ error: err.message });

        }

        res.status(201).json({ message: 'Record added successfully', data: result });
    });
});

///inspection module db
app.get('/getInspectionData', async (req, res) => {

        const query2 = 'SELECT * FROM inspection';
        
        connection.query(query2, (err, results) => {
            if (err) {
                res.status(500).send('Database query error');
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Record added successfully', data: results });
        });

});

app.post('/addInspection', (req, res) => {

    const { title, date, status, defect} = req.body;
    console.log(req.body);
    
    const query7 = 'INSERT INTO inspection (title, date, status, defect) VALUES (?,?,?,?)';

    connection.query(query7, [title, date, status, defect], (err, result) => {

        if (err) {
            res.status(500).send('Database query error');

            return res.status(500).json({ error: err.message });

        }

        res.status(201).json({ message: 'Record added successfully', data: result });
    });
});

app.put('/changeStatusData/:id/:status', (req, res) => {
    
    const { id, status } = req.params;

    
    const query8 = 'UPDATE inspection SET status = ? WHERE id = ?';

    connection.query(query8, [status,id], (err) => {

        if (err) {

            res.status(500).send('Database query error');

            return res.status(500).json({ error: err.message });

        }

        res.status(201).json({ message: 'Data updated successfully'});
    });
});

app.put('/addDefectDesc/:id', (req, res) => {
    
    const { id } = req.params;
    
    const { desc } = req.body;

    
    const query9 = 'UPDATE inspection SET defect = 1, defect_details = ?, updated_at = NOW() WHERE id = ?';

    connection.query(query9, [desc, id], (err) => {

        if (err) {

            res.status(500).send('Database query error');

            return res.status(500).json({ error: err.message });

        }

        res.status(201).json({ message: 'Data Added successfully'});
    });
});

app.delete('/deleteRecord/:id', (req, res) => {

    const { id } = req.params;
    
    const query10 = 'DELETE FROM inspection WHERE id = ?';

    connection.query(query10, [id], (err) => {

        if (err) {
            res.status(500).send('Database query error');

            return res.status(500).json({ error: err.message });

        }

        res.status(201).json({ message: 'Record deleted successfully'});
    });
});


app.listen(3000, () => {
    console.log('Server running on port 3000');
});
