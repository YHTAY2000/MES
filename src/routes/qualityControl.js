import { connection } from '../server.js';
import express from 'express';

const app = express();
const router = express.Router();

const qualityControl = (io) => {

    router.get('/getInspectionData', async (req, res) => {

        const query2 = 'SELECT * FROM inspection';

        connection.query(query2, (err, results) => {
            if (err) {
                res.status(500).send('Database query error');
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Record added successfully', data: results });
        });

    });

    router.post('/addInspection', (req, res) => {

        const { title, date, status, defect } = req.body;

        const query7 = 'INSERT INTO inspection (title, date, status, defect) VALUES (?,?,?,?)';

        connection.query(query7, [title, date, status, defect], (err, result) => {

            if (err) {
                res.status(500).send('Database query error');

                return res.status(500).json({ error: err.message });

            }
            io.emit('updateInspectionData');
            res.status(200).json({ message: 'Record updated successfully', data: result });
        });
    });

    router.put('/changeStatusData/:id/:status', (req, res) => {

        const { id, status } = req.params;


        const query8 = 'UPDATE inspection SET status = ? WHERE id = ?';

        connection.query(query8, [status, id], (err) => {

            if (err) {

                res.status(500).send('Database query error');

                return res.status(500).json({ error: err.message });

            }
            io.emit('updateInspectionData');

            res.status(200).json({ message: 'Data updated successfully' });
        });
    });

    router.put('/addDefectDesc/:id', (req, res) => {

        const { id } = req.params;

        const { produceNo, defectNo, desc } = req.body;


        const query9 = 'UPDATE inspection SET defect = 1, total_produced = ?, total_defected = ?, defect_details = ?, updated_at = NOW() WHERE id = ?';

        connection.query(query9, [produceNo, defectNo, desc, id], (err) => {

            if (err) {

                res.status(500).send('Database query error');

                return res.status(500).json({ error: err.message });

            }
            io.emit('updateInspectionData');

            res.status(200).json({ message: 'Data Added successfully' });
        });
    });

    router.delete('/deleteRecord/:id', (req, res) => {

        const { id } = req.params;

        const query10 = 'DELETE FROM inspection WHERE id = ?';

        connection.query(query10, [id], (err) => {

            if (err) {
                res.status(500).send('Database query error');

                return res.status(500).json({ error: err.message });

            }
            io.emit('updateInspectionData');

            res.status(200).json({ message: 'Record deleted successfully' });
        });
    });

    return router;
};

export default qualityControl;