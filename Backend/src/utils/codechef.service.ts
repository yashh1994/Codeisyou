
// Check for Total Problme solved, Contest.

// Done Solved Problme solved, Languages, Card, Calender.

// TODO: Contest

import axios from "axios";
import config from "../config/config"
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import { areDatesAdjacent } from "./utils";
 

class UserCodechef {
    contest: any[]
    problemSolved: any[]
    card: { [key: string]: any }
    calender: {}
    languages: {}
    constructor() {
        this.contest = [];
        this.problemSolved = [];
        this.card = {};
        this.calender = {};
        this.languages = {};
    }
}

const main = async () => {
    const userCodechef = new UserCodechef();
    const url1 = "https://cp-rating-api.vercel.app/codechef/";



    let totalSolved = 0
    let unique = 0
    const solvedProblmes = []
    const languages: any = {}
    const calender = new Set();

    console.log(url1 + config.codechef_username);
    const response = await axios.get(url1 + config.codechef_username);



    let totalProblems: any[] = [];
    const filePath = path.join(__dirname, 'codechef_response.json');
    if (fs.existsSync(filePath)) {
        const fileData = await fs.promises.readFile(filePath, 'utf-8');
        totalProblems = JSON.parse(fileData);
    } else {
        totalProblems = await fetchAllRecentSubmissions(config.codechef_username);
        await saveResponseToFile(totalProblems);
    }




    // Calculating the total solved problems and languages

    let AcceptedProblems = 0
    const uniqueSubmissions = new Set();
    const dailyCounts: any = {};

    if (totalProblems && Array.isArray(totalProblems)) {
        for (const problem of totalProblems) {
            if(problem.accepted){

                dailyCounts[problem.date] = (dailyCounts[problem.date] || 0) + 1;

                AcceptedProblems++;
                if (!uniqueSubmissions.has(problem.problemUrl)) {
                    uniqueSubmissions.add(problem.problemUrl);
                    userCodechef.problemSolved.push(problem);
                }
            }
            languages[problem.language] = (languages[problem.language] || 0) + 1;
        }
    }




    // ! Calculate streak
    // let streak = 0;
    // let last;
    // let currentStreak = 0;
    // for (const [key, value] of Object.entries(dailyCounts)) {
    //     if (!last) {
    //         last = key
    //         currentStreak = 1
    //     } else {
    //         if (areDatesAdjacent(last, key)) {
    //             currentStreak++;
    //         } else {
    //             streak = Math.max(streak, currentStreak);
    //             currentStreak = 1;
    //         }
    //         last = key;
    //     }
    // }
    // streak = Math.max(streak, currentStreak);
    

    


    userCodechef.card['globalRank'] = response.data.globalRank;
    userCodechef.card['rating'] = response.data.rating;
    userCodechef.card['Acceptance Rate'] = ((AcceptedProblems / totalProblems.length) * 100).toFixed(2) + "%";
    userCodechef.card['Total Problems Solved'] = uniqueSubmissions.size;

    userCodechef.languages = languages
    userCodechef.calender = dailyCounts;


    console.log(userCodechef);
}

main().catch((error) => {
    console.error("Error occurred:", error);
});












//! Helpers



async function saveResponseToFile(data: any, filename: string = 'codechef_response.json') {
    const filePath = path.join(__dirname, filename);
    try {
        await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
        console.log(`Response saved to ${filePath}`);
    } catch (err) {
        console.error('Error saving response:', err);
    }
}

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

    const resultSpan = $(tds[2]).find('span');
    const result = resultSpan.attr('title')?.trim() || resultSpan.text().trim() || $(tds[2]).text().trim();
    const accepted = /accepted|ac/i.test(result);

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
