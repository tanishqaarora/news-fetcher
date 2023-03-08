import mongoose from 'mongoose';

import {
    MONGO_URI
} from '../utilities/constants.js';

const db = mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
})
.then(() => console.log("database connected successfully"))
.catch(err => console.log("Error is: ", err))

export default db;