import mongoose from "mongoose";

const connectDB = async () => {
    try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URL)
    console.log("MongoDB connected:", connectionInstance.connection.host);
} catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with a failure code
}
}

export default connectDB;

