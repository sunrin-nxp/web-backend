import mongoose, { Document, Schema } from 'mongoose';

export interface IUserStreak extends Document {
    userId: string;
    currentStreak: number;
    longestStreak: number;
    lastActiveDate: Date | null;
}

const UserStreakSchema: Schema = new Schema({
    userId: { type: mongoose.Types.ObjectId, required: true, unique: true, ref: 'User' },
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    lastActiveDate: { type: Date, default: null }
});

export const UserStreak = mongoose.model<IUserStreak>('UserStreak', UserStreakSchema);
