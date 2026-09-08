import express from "express";
import dotenv from "dotenv";
import app from "./app.js"
import connectDB from "./db/db.js"


dotenv.config({
    path: ".env"
});


connectDB().
then(() => {
    app.listen(process.env.PORT, () => {
         console.log(`Server is running on port http://localhost:${process.env.PORT}`);
    });
}).catch((err) => {
    console.error("Failed to connect to the database", err);
});

