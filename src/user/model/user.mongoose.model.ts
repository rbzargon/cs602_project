import { model } from 'mongoose';
import { UserSchema } from './user.mongoose.schema';

export const UserMongoose = model('User', UserSchema);