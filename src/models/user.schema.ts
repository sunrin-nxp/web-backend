import mongo from 'mongoose';

const userSchema = new mongo.Schema({
    nxpid: { type: String, required: true },
    nxppw: { type: String, required: true }, // bcrypt 이용한 암호화 필요
    nickname: { type: String, required: true },
    description: { type: String, default: "" },
    associated: { type: String, default: "" },
    mailaddr: { type: String, required: true },
    profilePhoto: { type: String, default: "default.png" }, // 저장된 파일명
    rank: { type: String, default: "none" },
    solved_problems: { type: Array<String>, default: [] },
    wrong_problems: { type: Array<String>, default: [] },
    my_problems: { type: Array<String>, default: [] },
    contributed_problems: { type: Array<String>, default: [] },
    refreshToken: { type: String, default: "" },
});

export default mongo.model('user_data', userSchema);