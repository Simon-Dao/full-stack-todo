import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const API_KEY = process.env.DB_HOST;