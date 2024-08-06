interface User {
    nxpid: String;
    nxppw?: String;
    description?: String;
    associated?: String;
    mailaddr?: String;
    rank?: String;
    solved_problems?: Array<String>;
    wrong_problems?: Array<String>;
};

export default User;