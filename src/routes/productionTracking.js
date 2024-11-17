import { connection } from '../server.js';
import express from 'express';

const app = express();
const router = express.Router();


const production = (io) => {

    router.get('/getProductionRecords', (req, res) => {

        const query2 = 'SELECT * FROM production';
        connection.query(query2, (err, results) => {
            if (err) {
                res.status(500).send('Database query error');
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        });
    });

    router.post('/addProductRecord', (req, res) => {

        const { pname, batchNo, status, quantity, date } = req.body;

        const query3 = `INSERT INTO production (product_name, batch_number, status, quantity, date) VALUES (?, ?, ?, ?, ?)`;

        connection.query(query3, [pname, batchNo, status, quantity, date], (err, result) => {

            if (err) {
                res.status(500).send('Database query error');
                return res.status(500).json({ error: err.message });

            }

            io.emit('dataProductionUpdated');
            res.status(200).json({ message: 'Record added successfully', data: result });
        });
    });

    router.put('/updateProductRecord/:id', (req, res) => {

        const { id } = req.params;

        const { pname, batchNo, status, quantity, date } = req.body;

        const query4 = 'UPDATE production SET product_name = ?, batch_number = ?, status = ?, quantity = ?, date = ? WHERE id = ?';

        connection.query(query4, [pname, batchNo, status, quantity, date, id], (err, result) => {

            if (err) {
                res.status(500).send('Database query error');

                return res.status(500).json({ error: err.message });

            }
            io.emit('dataProductionUpdated');
            res.status(200).json({ message: 'Record updated successfully' });
        });
    });

    router.delete('/deleteProductRecord/:id', (req, res) => {

        const { id } = req.params;

        const query5 = 'DELETE FROM production WHERE id = ?';

        connection.query(query5, [id], (err, result) => {

            if (err) {
                res.status(500).send('Database query error');

                return res.status(500).json({ error: err.message });

            }
            io.emit('dataProductionUpdated');
            res.status(200).json({ message: 'Record deleted successfully' });
        });
    });

    return router;
};

export default production;