import axios from "axios";
import * as crypto from "crypto";
import config from "../config/config";


class UserCodeforces {
  totalSolved: string;
  currentRating: string;
  globalRank: string;
  streak: string;
  language: string[];
  badges: any[];
  contests: any[];
  calander: Map<number, any>;
  solvedProblems: any[];

  constructor();
  constructor(
    totalSolved?: string,
    currentRating?: string,
    globalRank?: string,
    streak?: string,
    language?: string[],
    badges?: [],
    contests?: [],
    calander?: Map<number, any>,
    solvedProblems?: any[]
  ) {
    this.totalSolved = totalSolved ?? "0";
    this.currentRating = currentRating ?? "0";
    this.globalRank = globalRank ?? "0";
    this.streak = streak ?? "0";
    this.language = language ?? [];
    this.badges = badges ?? [];
    this.contests = contests ?? [];
    this.calander = calander ?? new Map<number, any>();
    this.solvedProblems = solvedProblems ?? [];
  }
}


async function getCodeforcesUserInfo(username: string, apiKey: string, secret: string) {
  
    const userCodeforces = new UserCodeforces();

  const baseUrl = "https://codeforces.com/api/user.info?handles=" + username + "&checkHistoricHandles=false";

  const baseUrl2 = "https://codeforces.com/api/user.rating?handle=" + username;

  const baseUrl3 = "https://codeforces.com/api/user.status?handle=" + username;
  
  try {
    const response = await axios.get(baseUrl);

    const userstatusResponse = await axios.get(baseUrl2);
    
    
    const userStatus = await axios.get(baseUrl3);
    // console.log("User Status:", userStatus .data);
    
    
    const contests = [];
    const languages = new Set<string>();
    const calander = new Map<any, any>();
    let streak = 0
    let totalSolved = 0

    const solvedProblems: any[] = [];

    for(const contest of userstatusResponse.data.result) {
        contests.push({
        title: contest.contestName,
        startTime: contest.ratingUpdateTimeSeconds,
        rank: contest.rank,
        rating: contest.newRating,
        ratingUpdateTimeSeconds: contest.ratingUpdateTimeSeconds
        });
    }


    for (const status of userStatus.data.result) {
      if (status.verdict === "OK") {
        
        const date = new Date(status.creationTimeSeconds * 1000);
        const day = date.toISOString().split('T')[0];
        solvedProblems.push(status.problem);
        calander.set(
            day,
            (calander.get(day) ?? 0) + 1
        );
        totalSolved++;
        languages.add(status.programmingLanguage);
      }
    }


    let last;
    let currentStreak = 0;
    for(const [key, value] of calander) {
      if(!last){
        last = key 
        currentStreak = 1
      }else{
        if(areDatesAdjacent(last, key)){
          currentStreak++;
        }else{
          streak = Math.max(streak, currentStreak);
          currentStreak = 1;
        }
        last = key;
      }
    }
    streak = Math.max(streak, currentStreak);


    userCodeforces.contests = contests;
    userCodeforces.currentRating = response.data.result[0].rating || 0;
    userCodeforces.globalRank = response.data.result[0].rank || 0;
    userCodeforces.totalSolved = totalSolved.toString();
    userCodeforces.language = Array.from(languages);
    userCodeforces.calander = calander;
    userCodeforces.solvedProblems = solvedProblems;
    userCodeforces.streak = streak.toString()

    console.log("User ------------------\n", userCodeforces);

    
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
}

function areDatesAdjacent(date1: string, date2: string): boolean {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diff = d2.getTime() - d1.getTime();
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.abs(diff) === oneDay;
}






// Example usage:
// Replace with your actual Codeforces username, API key, and secret
getCodeforcesUserInfo(config.codeforces_username, config.codeforces_api_key, config.codeforces_secret);
