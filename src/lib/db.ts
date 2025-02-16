// Import the mongoose library for MongoDB interaction
import mongoose from 'mongoose';

// Define an asynchronous function to connect to the MongoDB database
// NOTE: This function uses a singleton pattern to ensure only one connection is created
const connectDB = async () => {
  
  // Check if there's already an active connection
  // mongoose.connections[0].readyState returns 1 if connected, 0 if disconnected
  // NOTE: This check prevents unnecessary reconnection attempts
  if (mongoose.connections[0].readyState) return;

  // If no active connection, establish a new connection
  // process.env.MONGO_URI! is the connection string stored in environment variables
  // The '!' asserts that the MONGO_URI is definitely defined (TypeScript non-null assertion)
  // NOTE: Ensure MONGO_URI is set in your .env file or deployment environment
  return mongoose.connect(process.env.MONGO_URI!);
};

// Export the connectDB function as the default export
// NOTE: Import and call this function in your app's entry point or API routes
export default connectDB;
