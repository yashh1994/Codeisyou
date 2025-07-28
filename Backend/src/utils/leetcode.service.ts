import { LeetCode,LeetCodeCN, ChallengeQuestion, Problem } from "leetcode-query";
import config from "../config/config"



import fetch from 'node-fetch';


const LEETCODE_GRAPHQL_URL = 'https://leetcode.com/graphql/';



class UserLeetcode {
  totalSolved: number;
  currentRating: number;
  globalRank: number;
  streak: number;
  language: string[];
  badges: [];
  contests: [];
  calander: [];

  constructor();
  constructor(
    totalSolved?: number,
    currentRating?: number,
    globalRank?: number,
    streak?: number,
    language?: string[],
    badges?: [],
    contests?: [],
    calander?: []
  ) {
    this.totalSolved = totalSolved ?? 0;
    this.currentRating = currentRating ?? 0;
    this.globalRank = globalRank ?? 0;
    this.streak = streak ?? 0;
    this.language = language ?? [];
    this.badges = badges ?? [];
    this.contests = contests ?? [];
    this.calander = calander ?? [];
  }
}



const main = async () => {

  const leetcode = new LeetCode();


  let usercontests = []
  let calander = []
  let badges = []
  const langs = []
  let streak = 0
  const QUERY = `
query GetLangAndStreak($username: String!) {
  matchedUser(username: $username) {
    languageProblemCount {
      languageName
    }
    userCalendar {
      streak
      totalActiveDays
    }
  }
}
`;
  const user = await leetcode.user(config.sample_leetcode_username);;
  const contests = await leetcode.user_contest_info(config.sample_leetcode_username);


  let submissionthings = await user.matchedUser?.submitStats;
  const userLeetcode = new UserLeetcode();



  for (const badge of user.matchedUser?.badges || []) {
    badges.push(badge);
  }
  for (const contest of contests.userContestRankingHistory) {
    if (contest.attended) {
      usercontests.push({
        title: contest.contest.title,
        startTime: contest.contest.startTime,
        rank: contest.ranking,
      });
    }
  }

  const submissionCalendarStr = user.matchedUser?.submissionCalendar;
  let submissionCalendarArr: { date: string; count: number }[] = [];
  if (submissionCalendarStr) {
    const calendarObj = JSON.parse(submissionCalendarStr);
    submissionCalendarArr = Object.entries(calendarObj).map(([date, count]) => ({
      date,
      count: Number(count),
    }));
    for (let i = 0; i < submissionCalendarArr.length; i++) {
      calander.push({
        date: submissionCalendarArr[i].date,
        count: submissionCalendarArr[i].count,
      });
    }
  }

  const response = await fetch(LEETCODE_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: QUERY,
        variables: {
          username: config.sample_leetcode_username,
        },
      }),
    });

    const lang_str_data = await response.json()
    for (const lang of lang_str_data['data']['matchedUser']['languageProblemCount']) {
      langs.push(lang.languageName);
    }
    streak = lang_str_data['data']['matchedUser']['userCalendar']['streak'];

    userLeetcode.totalSolved = submissionthings?.acSubmissionNum[0].count || 0;
    userLeetcode.globalRank = user.matchedUser?.profile.ranking || 0;
    userLeetcode.currentRating = contests.userContestRanking.rating || 0;  
    userLeetcode.contests = JSON.parse(JSON.stringify(usercontests));
    userLeetcode.badges = JSON.parse(JSON.stringify(badges));  
    userLeetcode.calander = JSON.parse(JSON.stringify(calander));
    userLeetcode.language = JSON.parse(JSON.stringify(langs));
    userLeetcode.streak = streak || 0;


    console.log(userLeetcode);

}



main().catch(console.error);

// // An Example for leetcode.cn endpoint
// import { LeetCodeCN } from "leetcode-query";

// const leetcodeCN = new LeetCodeCN();
// const user = await leetcodeCN.user(config.sample_leetcode_username);

// console.log(user);






