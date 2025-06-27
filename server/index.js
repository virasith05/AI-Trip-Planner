const express = require('express');
const app = express();
const dbconfig = require('./Config/dbConfig');
const userRoutes = require('./Routes/userRoutes');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// ✅ Apply CORS first, before any routes
app.use(cors({
    origin: '*'
}));
const tripRoutes = require('./Routes/userRoutes');
app.use('/api/trips', tripRoutes);


app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(8086, () => {
    console.log("Server is running at port 8086");
});
