import dotenv from "dotenv";
dotenv.config({
    path: "./config/config.env",
});


import { app } from "./app.js";
import { connectDB } from "./config/db.js";

//connecton to database

connectDB();

// Start server
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port:${process.env.PORT} in ${process.env.NODE_ENV} mode `);
});
