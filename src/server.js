import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
    }
});


app.use(cors());

app.use(express.json());


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mes'
})

connection.connect()

httpServer.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    connection.query('SELECT * FROM production', (err, results) => {
        if (err) {
            console.error('Error fetching production records:', err);
            return;
        }
        socket.emit('initialData', results);
    });
});


app.get('/getMetricsData', (req, res) => {
    const status = 'SELECT * FROM metrics WHERE title="Production Status"';
    const defectRate = 'SELECT (SUM(total_defected) / SUM(total_produced)) * 100 AS defectRate FROM inspection';

    connection.query(status, (err, productionStatus) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: err.message });
        }

        connection.query(defectRate, (err, defectResult) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).json({ error: err.message });
            }

            res.json({
                status: productionStatus[0].value,
                defectRate: defectResult[0].defectRate,
            });
        });
    });
});

app.get('/getProductionRecords', (req, res) => {

    const query2 = 'SELECT * FROM production';
    connection.query(query2, (err, results) => {
        if (err) {
            res.status(500).send('Database query error');
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json(results);
    });
});

app.post('/addProductRecord', (req, res) => {

    const { pname, batchNo, status, quantity, date } = req.body;

    const query3 = `INSERT INTO production (product_name, batch_number, status, quantity, date) VALUES (?, ?, ?, ?, ?)`;

    connection.query(query3, [pname, batchNo, status, quantity, date], (err, result) => {

        if (err) {
            res.status(500).send('Database query error');
            return res.status(500).json({ error: err.message });

        }

        io.emit('dataProductionUpdated');
        res.status(201).json({ message: 'Record added successfully', data: result });
    });
});

app.put('/updateProductRecord/:id', (req, res) => {

    const { id } = req.params;

    const { pname, batchNo, status, quantity, date } = req.body;

    const query4 = 'UPDATE production SET product_name = ?, batch_number = ?, status = ?, quantity = ?, date = ? WHERE id = ?';

    connection.query(query4, [pname, batchNo, status, quantity, date, id], (err, result) => {

        if (err) {
            res.status(500).send('Database query error');

            return res.status(500).json({ error: err.message });

        }
        io.emit('dataProductionUpdated');
        res.status(201).json({ message: 'Record updated successfully' });
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
        io.emit('dataProductionUpdated');
        res.status(201).json({ message: 'Record added successfully' });
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

    const { title, date, status, defect } = req.body;

    const query7 = 'INSERT INTO inspection (title, date, status, defect) VALUES (?,?,?,?)';

    connection.query(query7, [title, date, status, defect], (err, result) => {

        if (err) {
            res.status(500).send('Database query error');

            return res.status(500).json({ error: err.message });

        }

        res.status(201).json({ message: 'Record added successfully' });
    });
});

app.put('/changeStatusData/:id/:status', (req, res) => {

    const { id, status } = req.params;


    const query8 = 'UPDATE inspection SET status = ? WHERE id = ?';

    connection.query(query8, [status, id], (err) => {

        if (err) {

            res.status(500).send('Database query error');

            return res.status(500).json({ error: err.message });

        }

        res.status(201).json({ message: 'Data updated successfully' });
    });
});

app.put('/addDefectDesc/:id', (req, res) => {

    const { id } = req.params;

    const { produceNo, defectNo, desc } = req.body;


    const query9 = 'UPDATE inspection SET defect = 1, total_produced = ?, total_defected = ?, defect_details = ?, updated_at = NOW() WHERE id = ?';

    connection.query(query9, [produceNo, defectNo, desc, id], (err) => {

        if (err) {

            res.status(500).send('Database query error');

            return res.status(500).json({ error: err.message });

        }

        res.status(201).json({ message: 'Data Added successfully' });
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

        res.status(201).json({ message: 'Record deleted successfully' });
    });
});
