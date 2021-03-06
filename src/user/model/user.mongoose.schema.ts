import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
        trim: true,
        minlength: 1,
    },
    email: {
        type: Schema.Types.String,
        required: true,
        trim: true,
        minlength: 5,
    },
    passwordHash: {
        type: Schema.Types.String,
        required: true,
        trim: true,
        minlength: 1
    },
    isAdmin: {
        type: Schema.Types.Boolean,
        required: true,
    }
}, { collection: 'user' });