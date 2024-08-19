import questSchema from "src/models/quest.schema";
import userSchema from "src/models/user.schema";
import problemsSchema from "src/models/problems.schema";
import rankPoint from "src/enums/rankPoint.enum";

export async function setDailyQuest() {
    const allUsers = await userSchema.find();
    await questSchema.deleteMany();
    for (const user of allUsers) {
        const minRankIndex = Math.max(rankPoint[user.rank] - 3, rankPoint.none);
        const maxRankIndex = Math.min(rankPoint[user.rank] + 3, rankPoint.Master);

        let problems = (await problemsSchema.find()).filter(problem => {
            const problemRankIndex = Object.values(rankPoint).indexOf(problem.rankPoint);
            return problemRankIndex >= minRankIndex && problemRankIndex <= maxRankIndex;
        });
        
        await new questSchema({
            userid: user.nxpid,
            questProblems: problems
        }).save();
    }
}