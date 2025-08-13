
// Check for Total Problme solved, Contest.

// Done Solved Problme solved, Languages, Card.

// TODO: Contest

import axios from "axios";
import config from "../config/config"
import * as cheerio from 'cheerio';
 

class UserCodechef {
    contest: any[]
    problemSolved: any[]
    totalSolved: string
    rating: string
    globalRank: string
    card: { [key: string]: any }
    constructor() {
        this.contest = [];
        this.problemSolved = [];
        this.totalSolved = "";
        this.rating = "";
        this.globalRank = "";
        this.card = {};
    }
}

const main = async () => {
    const userCodechef = new UserCodechef();
    const url1 = "https://cp-rating-api.vercel.app/codechef/";



    let totalSolved = 0
    let unique = 0
    const solvedProblmes = []
    const languages = new Set()
    const calender = new Set();

    console.log(url1 + config.codechef_username);
    const response = await axios.get(url1 + config.codechef_username);

    userCodechef.card['globalRank'] = response.data.globalRank;
    userCodechef.card['rating'] = response.data.rating;
    userCodechef.card['stars'] = response.data.stars;
    userCodechef.card['countryRank'] = response.data.countryRank;
    

    const totalProblems = await fetchAllRecentSubmissions('yash_fadadu')
    const uniqueProblems = new Set()
    if (totalProblems && Array.isArray(totalProblems)) {
        for (const problem of totalProblems) {
            if(problem.accepted){
                solvedProblmes.push(problem)
            }
            if(!uniqueProblems.has(problem.problemName)){
                uniqueProblems.add(problem.problemName)
            }
            languages.add(problem.language)
        }
    }


    //   const dailyCounts: any = {};

    // for (const sub of uniqueSubmissions) {
    //     const day = new Date(sub.created_at * 1000).toISOString().split('T')[0];

    //     if (!dailyCounts[day]) dailyCounts[day] = new Set();
    //     dailyCounts[day].add(sub.challenge_id);
    // }

    //     calander = Object.fromEntries(
    //         Object.entries(dailyCounts).map(([day, ids]) => [day, (ids as Set<any>).size])
    //     );



    console.log(totalProblems.length)



    
}

main().catch((error) => {
    console.error("Error occurred:", error);
});













async function fetchAllRecentSubmissions(userHandle: string) {
  let page = 0;
  let allSubmissions: any[] = [];

  while (true) {
    console.log(`Fetching page ${page}...`);

    try {
      const url = `https://www.codechef.com/recent/user?page=${page}&user_handle=${userHandle}`;
      const response = await axios.get(url, { withCredentials: true });

      const content = response.data.content;
      const submissions = parseSubmissions(content);

      if (submissions.length === 0) {
        console.log(`No more submissions found at page ${page}. Stopping...`);
        break; // exit loop
      }

      allSubmissions.push(...submissions);
      page++;
    } catch (error: any) {
      console.error(`Error fetching page ${page}:`, error.message);
      break;
    }
  }

  return allSubmissions;
}

function parseSubmissions(htmlString: string) {
  const $ = cheerio.load(htmlString);
  const submissions: any[] = [];

  $('table.dataTable tbody tr').each((_, row) => {
    const tds = $(row).find('td');

    // check if it's a "no activity" row
    if (tds.length === 1 && $(tds[0]).text().toLowerCase().includes("no recent activity")) {
      return; // skip
    }

    const time = $(tds[0]).attr('title')?.trim() || $(tds[0]).text().trim();

    const problemCell = $(tds[1]);
    const problemLink = problemCell.find('a').first();
    const problemName = problemLink.text().trim() || problemCell.text().trim();
    const problemUrl = problemLink.attr('href') || '';

    const result = $(tds[2]).text().trim();
    const accepted = /AC|Accepted/i.test(result);

    const language = $(tds[3]).text().trim();

    const solutionUrl = $(tds[4]).find('a').attr('href') || '';

    const dateMatch = time.match(/\d{2}\/\d{2}\/\d{2,4}/);
    const date = dateMatch ? dateMatch[0] : '';

    submissions.push({
      date,
      problemName,
      problemUrl,
      result,
      accepted,
      language,
      solutionUrl
    });
  });

  return submissions;
}
