import mongo from 'mongoose';

const userSchema = new mongo.Schema({
    nxpid: { type: String, required: true },
    nxppw: { type: String, required: true }, // bcrypt 이용한 암호화 필요
    description: { type: String, required: true },
    associated: { type: String, required: true },
    mailaddr: { type: String, required: true },
    rank: { type: String, default: "none"},
    solved_problems: { type: Array<String>, required: true }
});

export default mongo.model('user_data', userSchema);