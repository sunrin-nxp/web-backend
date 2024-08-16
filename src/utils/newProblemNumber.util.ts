import problemsSchema from "src/models/problems.schema";

export async function newProblemNumber() {
    const problems = await problemsSchema.find();
    return problems.length + 100;
}