const express = require('express')
const connectDB = require('./config/db');
const cors = require('cors');
const multer = require('multer');

const app = express();


//Allow requests from the specific origin (e.g., http://localhost:5173)

const allowedOrigins = ['http://localhost:5173','http://localhost:5001'];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };

const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions))

app.use('/uploads',express.static('uploads'))
app.use('/itemUploads',express.static('itemUploads'))

// Use middleware to parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect Database
connectDB();
// const PORT = process.env.PORT || 5000 ;
const PORT = 5001;

app.get('/',(req,res)=>res.send('API Running'));

app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/items',require('./routes/api/items'));
//app.use('/api/trails',require('./routes/api/trails'));

app.listen(PORT, ()=> console.log(`Server started on PORT - ${PORT}`));