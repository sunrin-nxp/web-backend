import { UserStreak } from '../models/streak.schema';

export async function checkStreaks() {
    const allStreaks = await UserStreak.find();
    
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayDate = yesterday.toISOString().split('T')[0];

    for (const streak of allStreaks) {
        if (!streak.lastActiveDate || streak.lastActiveDate.toISOString().split('T')[0] !== yesterdayDate) {
            streak.currentStreak = 0;
            streak.lastActiveDate = null;
            await streak.save();
        }
    }
}