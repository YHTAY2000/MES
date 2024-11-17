import { connection } from '../server.js';
import express from 'express';

const router = express.Router()

router.get('/getMetricsData', (req, res) => {
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

            res.status(200).json({
                status: productionStatus[0].value,
                defectRate: defectResult[0].defectRate,
            });
        });
    });
});


export default router;
