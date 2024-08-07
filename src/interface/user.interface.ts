interface User {
    nxpid: String;
    nxppw?: String;
    nickname?: String;
    description?: String;
    associated?: String;
    mailaddr?: String;
    profilePhoto?: String;
    rank?: String;
    solved_problems?: Array<Number>;
    wrong_problems?: Array<Number>;
    my_problems?: Array<Number>;
    contributed_problems?: Array<Number>;
};

export default User;