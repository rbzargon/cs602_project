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
        type: Schema.Types.Number,
        required: true,
        trim: true,
        minlength: 1
    },
    isVendor: {
        type: Schema.Types.Boolean,
        required: true,
    }
});