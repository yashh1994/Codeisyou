
// Done Problem solved, contests, user info


class UserHackerrank {
    language: [];
    badges: [];
    contests: [];
    calander: {};
    card: any;
    solvedProblems: any[] = [];

    constructor();
    constructor(
        language?: [],
        badges?: [],
        contests?: [],
        calander?: {},
        card?: any
    ) {
        this.language = language ?? [];
        this.badges = badges ?? [];
        this.contests = contests ?? [];
        this.calander = calander ?? {};
        this.card = card ?? {};
    }
}


// fetch("https://www.hackerrank.com/rest/contests/master/submissions?offset=0&limit=10", {
//   "headers": {
//     "accept": "application/json",
//     "accept-language": "en-US,en;q=0.5",
//     "content-type": "application/json",
//     "if-none-match": "W/\"c4a875f30dde627b90ff077eabd35966\"",
//     "newrelic": "eyJ2IjpbMCwxXSwiZCI6eyJ0eSI6IkJyb3dzZXIiLCJhYyI6IjMxMTA1NjMiLCJhcCI6IjE4MzUwNjA3MDUiLCJpZCI6IjU5MjNjNmQwMmVlMWU1YTAiLCJ0ciI6Ijc3ZmQ2YmNkZmFlNDk1OTYyOTBlNTE3YmIyMWYyNzFhIiwidGkiOjE3NTQ4MjY0NDg5MzR9fQ==",
//     "priority": "u=1, i",
//     "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Brave\";v=\"138\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"Linux\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "sec-gpc": "1",
//     "traceparent": "00-77fd6bcdfae49596290e517bb21f271a-5923c6d02ee1e5a0-01",
//     "tracestate": "3110563@nr=0-1-3110563-1835060705-5923c6d02ee1e5a0----1754826448934",
//     "x-csrf-token": "C/VeCPktk2NjZuMFCl4H5ew4xBDO0SrVzqS1Fpi/GsQh/hRM7fgY/EpoPVqqaJse4+zAAzn8ulARtxE18hnXbA==",
//     "x-newrelic-id": "VwcGUVNVCxABU1NRBwcOUF0H",
//     "cookie": "hackerrankx_mixpanel_token=2b48922f-419f-4e0b-b4f0-f7a93dbe9d51; _vwo_uuid_v2=D17169AE01D608B647767761F2973C275|1f0a81fe04db2e161d3cdc7fbf22bfbc; remember_hacker_token=eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaGJDRnNHYVFSaml6UUJJaUlrTW1Fa01UQWtkRXRuV2s1UWJpNUNVMjFTTlM5UVZ6aFNUalp5VDBraUZ6RTNOVE0zTURjd05EUXVNREUwTmpnd09RWTZCa1ZHIiwiZXhwIjoiMjAyNS0wOC0xMVQxMjo1MDo0NC4wMTRaIiwicHVyIjpudWxsfX0%3D--599e4e14bd770b026786e5558c34eb19314e3b06; hackerrank_mixpanel_token=2b48922f-419f-4e0b-b4f0-f7a93dbe9d51; _vis_opt_exp_15_goal_3=4; _vis_opt_exp_15_goal_4=4; newhomepage=false; _vwo_uuid=D7CE29CAB688D2017F2B1DB6C5557603E; _vwo_ds=3%241754824883%3A92.58862083%3A%3A; _vis_opt_s=1%7C; _vis_opt_test_cookie=1; _vwo_sn=0%3A2; react_var=false__cnt3; react_var2=false__cnt3; hrc_l_i=T; metrics_user_identifier=1348b63-91eabc1d2f3292f8fedcfb6370ebd5b04caffa9c; _hrank_session=05dde27ddd6fd2c8c0f499e444f80d28; user_type=hacker; session_id=hm4e8wku-1754825028960",
//     "Referer": "https://www.hackerrank.com/submissions/all/1"
//   },
//   "body": null,
//   "method": "GET"
// });



const main = async () => {
    const res_user_submissions = await fetch(
        "https://www.hackerrank.com/rest/contests/master/submissions?offset=0&limit=100000",
        {
            headers: {
                "cookie":
                    "hackerrankx_mixpanel_token=2b48922f-419f-4e0b-b4f0-f7a93dbe9d51; _vwo_uuid_v2=D17169AE01D608B647767761F2973C275|1f0a81fe04db2e161d3cdc7fbf22bfbc; remember_hacker_token=eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaGJDRnNHYVFSaml6UUJJaUlrTW1Fa01UQWtkRXRuV2s1UWJpNUNVMjFTTlM5UVZ6aFNUalp5VDBraUZ6RTNOVE0zTURjd05EUXVNREUwTmpnd09RWTZCa1ZHIiwiZXhwIjoiMjAyNS0wOC0xMVQxMjo1MDo0NC4wMTRaIiwicHVyIjpudWxsfX0%3D--599e4e14bd770b026786e5558c34eb19314e3b06; hackerrank_mixpanel_token=2b48922f-419f-4e0b-b4f0-f7a93dbe9d51; _vis_opt_exp_15_goal_3=4; _vis_opt_exp_15_goal_4=4; newhomepage=false; _vwo_uuid=D7CE29CAB688D2017F2B1DB6C5557603E; _vwo_ds=3%241754824883%3A92.58862083%3A%3A; _vis_opt_s=1%7C; _vis_opt_test_cookie=1; _vwo_sn=0%3A2; react_var=false__cnt3; react_var2=false__cnt3; hrc_l_i=T; metrics_user_identifier=1348b63-91eabc1d2f3292f8fedcfb6370ebd5b04caffa9c; _hrank_session=05dde27ddd6fd2c8c0f499e444f80d28; user_type=hacker; session_id=hm4e8wku-1754825028960"
            },
            body: null,
            method: "GET",
        }
    )

    const res_user_info = await fetch("https://www.hackerrank.com/rest/contests/master/hackers/fadaduyash123/profile",
        {
            headers: {
                cookie:
                    "_hrank_session=fb46fdb92f936f9e85bdcfbeff74ffb8;",
            },
            body: null,
            method: "GET",
        }
    )

    const res_score_elo = await fetch("https://www.hackerrank.com/rest/hackers/fadaduyash123/scores_elo",
        {
            headers: {
                cookie:
                    "_hrank_session=fb46fdb92f936f9e85bdcfbeff74ffb8;",
            },
            body: null,
            method: "GET",
        }
    )

    const res_user_badges = await fetch("https://www.hackerrank.com/rest/hackers/fadaduyash123/badges", {
        headers: {
            "cookie":
                "hackerrankx_mixpanel_token=2b48922f-419f-4e0b-b4f0-f7a93dbe9d51; _vwo_uuid_v2=D17169AE01D608B647767761F2973C275|1f0a81fe04db2e161d3cdc7fbf22bfbc; remember_hacker_token=eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaGJDRnNHYVFSaml6UUJJaUlrTW1Fa01UQWtkRXRuV2s1UWJpNUNVMjFTTlM5UVZ6aFNUalp5VDBraUZ6RTNOVE0zTURjd05EUXVNREUwTmpnd09RWTZCa1ZHIiwiZXhwIjoiMjAyNS0wOC0xMVQxMjo1MDo0NC4wMTRaIiwicHVyIjpudWxsfX0%3D--599e4e14bd770b026786e5558c34eb19314e3b06; hackerrank_mixpanel_token=2b48922f-419f-4e0b-b4f0-f7a93dbe9d51; _vis_opt_exp_15_goal_3=4; _vis_opt_exp_15_goal_4=4; newhomepage=false; _vwo_uuid=D7CE29CAB688D2017F2B1DB6C5557603E; _vwo_ds=3%241754824883%3A92.58862083%3A%3A; _vis_opt_s=1%7C; _vis_opt_test_cookie=1; _vwo_sn=0%3A2; react_var=false__cnt3; react_var2=false__cnt3; hrc_l_i=T; metrics_user_identifier=1348b63-91eabc1d2f3292f8fedcfb6370ebd5b04caffa9c; _hrank_session=05dde27ddd6fd2c8c0f499e444f80d28; user_type=hacker; session_id=hm4e8wku-1754825028960"
        },
        body: null,
        method: "GET"
    }
    )

    const data_user_info = await res_user_info.json()
    const data_score_elo = await res_score_elo.json()
    const data_user_badges = await res_user_badges.json()

    const data_user_submissions = await res_user_submissions.json()
    // console.log(data.models[0].challenge.name)
    // console.log(data2)


    const language = new Set();
    const contest = []
    let calander = {}
    const uniqueSubmissions = [];
    const seen = new Set();
    let streak = 0
    const acceptedUniqueSubmissions = [];

    // ! Calculate Contests
    for (let i = 0; i < data_score_elo.length; i++) {
        contest.push({
            name: data_score_elo[i].name,
            score: data_score_elo[i].contest.score,
            rank: data_score_elo[i].contest.rank,
            level: data_score_elo[i].contest.level,
        })
    }




    // ! Calculate Unique Submissions, accepted Submissions, Languages
    for (const prob of data_user_submissions.models) {
        if (!seen.has(prob.challenge_id)) {
            seen.add(prob.challenge_id);
            uniqueSubmissions.push(prob);
            if (prob.status === "Accepted") {
                acceptedUniqueSubmissions.push(prob);
            }
            language.add(prob.language);
        }
    }



    // ! Calculate calendar
    const dailyCounts: any = {};

    for (const sub of uniqueSubmissions) {
        const day = new Date(sub.created_at * 1000).toISOString().split('T')[0];

        if (!dailyCounts[day]) dailyCounts[day] = new Set();
        dailyCounts[day].add(sub.challenge_id);
    }

    calander = Object.fromEntries(
        Object.entries(dailyCounts).map(([day, ids]) => [day, (ids as Set<any>).size])
    );


    // ! Calculate streak
    let last;
    let currentStreak = 0;
    for (const [key, value] of Object.entries(calander)) {
        if (!last) {
            last = key
            currentStreak = 1
        } else {
            if (areDatesAdjacent(last, key)) {
                currentStreak++;
            } else {
                streak = Math.max(streak, currentStreak);
                currentStreak = 1;
            }
            last = key;
        }
    }
    streak = Math.max(streak, currentStreak);


    const userHackerrank = new UserHackerrank()



    userHackerrank.solvedProblems = acceptedUniqueSubmissions;

    userHackerrank.card['Streak'] = streak;
    userHackerrank.card['Total Solved'] = acceptedUniqueSubmissions.length;
    userHackerrank.card['Contests'] = contest.length;
    userHackerrank.card['Acceptance Rate'] = acceptedUniqueSubmissions.length / uniqueSubmissions.length * 100 || 0;

    userHackerrank.calander = calander;
    userHackerrank.language = Array.from(language) as [];

    userHackerrank.badges = data_user_badges.models.map((badge: any) => ({
        name: badge.badge_name,
        solved: badge.solved,
        hacker_rank: badge.hacker_rank,
        stars: badge.stars,
    }));

    console.log(contest);

}

main().catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
});










function areDatesAdjacent(date1: string, date2: string): boolean {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diff = d2.getTime() - d1.getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.abs(diff) === oneDay;
}

