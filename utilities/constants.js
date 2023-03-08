import * as dotenv from 'dotenv';
dotenv.config();

export const MONGO_URI = process.env.MONGO_URI;

export const NEWS_CHANNELS = {
    NEWS: "news",
};