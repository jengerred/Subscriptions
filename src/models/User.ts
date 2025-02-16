// Import necessary modules from mongoose for schema definition and model creation
import { Document, Schema, model, models } from 'mongoose';

// Import bcrypt for password hashing
// NOTE: bcrypt is used for secure password hashing, which is crucial for user data protection
import bcrypt from 'bcryptjs';

// Define the User interface extending Mongoose's Document interface
// NOTE: This interface defines the structure and methods of a User document
export interface IUser extends Document {
    email: string;
    password: string;
    firstName: string;
    createdAt: Date;

    // Method to compare a candidate password with the stored hashed password
    // NOTE: This method will be implemented on the schema below
    comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define the Mongoose schema for the User model
// NOTE: This schema defines the structure and validation rules for User documents in MongoDB
const userSchema = new Schema<IUser>({
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true, // Ensure email addresses are unique
    match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Invalid email format'], // Validate email format
    trim: true, // Remove whitespace from both ends
    lowercase: true // Convert email to lowercase
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [12, 'Password must be at least 12 characters'],
    select: false // Exclude password field from query results by default for security
  },
  firstName: { 
    type: String, 
    required: [true, 'First name is required'],
    trim: true, // Remove whitespace from both ends
    maxlength: [50, 'First name cannot exceed 50 characters'],
    match: [/^[a-zA-Z-' ]+$/, 'Invalid characters in first name'] // Validate first name format
  },
  createdAt: { 
    type: Date, 
    default: Date.now, // Set default value to current date/time
    immutable: true // Prevent modifications to this field after creation
  }
});

// Middleware to hash password before saving
// NOTE: This pre-save hook ensures passwords are always hashed before being stored
userSchema.pre<IUser>('save', async function(next) {
    
  // Only hash the password if it has been modified (or is new)
  // NOTE: This check prevents unnecessary hashing on updates that don't modify the password
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12); // Generate a salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare a candidate password with the stored hashed password
// NOTE: This method allows secure password comparison without exposing the hash
userSchema.methods.comparePassword = async function(
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create and export the User model, preventing overwrite in development
// NOTE: This check prevents model compilation errors in development due to hot reloading
export const User = models.User || model<IUser>('User', userSchema);
