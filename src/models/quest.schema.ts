import mongo from "mongoose";

const questSchema = new mongo.Schema({
    userid: { type: String, required: true },
    questProblems: { type: Array, required: true }
});

export default mongo.model('quest', questSchema);