import Testcases from "./testcase.interface";
import UserRate from "./userRate.interface";

interface Problems {
    creator?: String;
    problemNumber: Number;
    rankPoint: Number;
    subject?: String;
    content?: String;
    testcases: [ Testcases ];
    answerCode?: String;
    userRate: [ UserRate ];
    createdAt?: Number;
}

export default Problems;