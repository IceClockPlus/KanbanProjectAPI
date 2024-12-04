require('dotenv').config();
require('module-alias/register');
const express = require('express');
const WebSocket = require('ws');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const http = require('http');
const {Server} = require('socket.io');

const boardRoutes = require('@routes/board-routes');
const userRoutes = require('@routes/user-routes');
const issueRoutes = require('@routes/issue-routes');


const errorHadlerMiddleware = require('@middlewares/error-middleware')

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Kanban Project API",
            version: "1.0.0",
            description: "This is a API documentation"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: ["./routes/*.js"]

};

const specs = swaggerJsdoc(options);
const mongoose = require('mongoose');
const Board = require('@domain/entities/board.model');
const app = express();

const server = http.createServer(app); // Crear el servidor HTTP
const io = new Server(server, {
    cors:{
        origin: '*',
        methods: ['GET', 'POST']
    }
}); // Enlazar Socket.IO con el servidor
const port = process.env.PORT || 80;



app.use('/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

app.use(express.json());
app.use(errorHadlerMiddleware);
app.use('/api/v1/boards', boardRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/issues', issueRoutes);

io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on("boards", async (boardId) => {
        try 
        {
            if(!mongoose.Types.ObjectId.isValid(boardId)){
                socket.emit('error', {message: 'Board ID not valid'});
            }

            let boardAggr = await Board.aggregate([
                {
                    $match:{_id: mongoose.Types.ObjectId.createFromHexString(boardId)}
                },
                {
                    $lookup:{
                        from: 'lists',
                        let: { boardId: '$_id' },
                        pipeline: [
                            { $match: {$expr: {$eq: ['$boardId', '$$boardId']} } },
                            { $sort: {position: 1}}
                        ],
                        as: 'lists'
                    }
                }
            ]);

            if(boardAggr.length === 0){
                socket.emit('error', {message: 'Board not found'});
            }
        
            const board = boardAggr[0];
            socket.join(boardId);
            socket.emit('boardData', board);
    
        }catch(e) {
            console.error('Error al obtener el tablero:', e);
            socket.emit('error', { message: 'Unexpected error.' });
        }
    });
  
    // Handle messages from the client
    socket.on('message', (message) => {
      console.log('Message received:', message);
      
      // Send message to all clients, including the one that sent the message
      io.emit('message', message);
    });
  
    // Handle disconnections
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
});

const dbConnection = process.env.MONGO_DB_CONNECTION || '';

server.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});


mongoose.connect(dbConnection)
.then(() => console.log('Connection to MongoDB established'))
.catch((err) => console.error('Unexpected error when trying to connect MongoDB', err));
