import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import dashboardRoutes from './routes/dashboard.js';
import production from './routes/productionTracking.js';
import qualityControl from './routes/qualityControl.js';

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
    }
});

//Using MySQL 
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

//using routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/production', production(io));
app.use('/api/qc', qualityControl(io));


export { connection };
