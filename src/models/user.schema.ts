import mongo from 'mongoose';

const userSchema = new mongo.Schema({
    nxpid: { type: String, required: true },
    nxppw: { type: String, required: true }, // bcrypt 이용한 암호화 필요
    nickname: { type: String, required: true },
    description: { type: String, default: "" },
    associated: { type: String, default: "" },
    mailaddr: { type: String, required: true },
    profilePhoto: { type: String, required: true }, // 저장된 파일명
    rank: { type: String, default: "none"},
    solved_problems: { type: Array<Number>  },
    wrong_problems: { type: Array<Number> },
    my_problems: { type: Array<Number> },
    contributed_problems: { type: Array<Number> },
});

export default mongo.model('user_data', userSchema);