import mongo from 'mongoose';

const userSchema = new mongo.Schema({
    nxpid: { type: String, required: true },
    nxppw: { type: String, required: true }, // bcrypt 이용한 암호화 필요
    description: { type: String, default: "" },
    associated: { type: String, default: "" },
    mailaddr: { type: String, required: true },
    rank: { type: String, default: "none"},
    solved_problems: { type: Array<String>  },
    wrong_problems: { type: Array<String> }
});

export default mongo.model('user_data', userSchema);