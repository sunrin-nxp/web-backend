interface User {
    nxpid: String;
    nxppw?: String;
    nickname?: String;
    description?: String;
    associated?: String;
    mailaddr?: String;
    profilePhoto?: String;
    rank?: String;
    solved_problems?: Array<String>;
    wrong_problems?: Array<String>;
    my_problems?: Array<String>;
    contributed_problems?: Array<String>;
    refreshToken: String;
};

export default User;