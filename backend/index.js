const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const {connectDB} = require('./lib/database.js');
const authRoutes = require('./routes/authRoutes.js');
const messageRoutes = require('./routes/messageRoutes');
const cors= require('cors');
const {app, server} = require('./lib/socket.js');

dotenv.config();
//const app = express(); not required here as we have created one in socket.js file

const PORT = process.env.PORT;


app.use(express.json({ limit: "10mb" })); // Increase limit for JSON payloads
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Increase limit for form-data
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});