const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); 
const cors = require('cors');

const userRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const connectDB = require('./config/db');

connectDB(); 
console.log("Trying to connect to MongoDB...");

const app = express();

app.use(cors());


app.use(express.json()); 


app.use('/api/users', userRoutes);   
app.use('/api/recipes', recipeRoutes); 


app.use(notFound);     
app.use(errorHandler); 

const PORT = process.env.PORT || 5009;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
