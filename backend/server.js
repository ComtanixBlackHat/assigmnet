const express = require('express');
const morgan  = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(cors());


const HTTP_PORT = 3333;

// Start server
app.listen(HTTP_PORT, () => {
    console.log('Server running on port: ' + HTTP_PORT);
});


app.use(morgan('tiny'));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res, next) => {
    res.json({'status': 'Alive'});
});


const authRoutes = require('./app/routes/auth.routes');
app.use('/auth', authRoutes);
const postRoutes = require('./app/routes/post.server.routes');
app.use('/posts', postRoutes);

app.use((req, res) => {
    res.sendStatus(404);
});
