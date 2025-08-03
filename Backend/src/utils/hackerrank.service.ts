

const main = async () => {
    const response = await fetch(
        "https://www.hackerrank.com/rest/contests/master/submissions?offset=0&limit=50",
        {
            headers: {
                cookie:
                    "_hrank_session=fb46fdb92f936f9e85bdcfbeff74ffb8;",
            },
            body: null,
            method: "GET",
        }
    )

    const res2 = await fetch("https://www.hackerrank.com/rest/contests/master/hackers/fadaduyash123/profile",
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

    const data2 = await res2.json()
    const data_score_elo = await res_score_elo.json()
    
    const data = await response.json()
    // console.log(data.models[0].challenge.name)
    // console.log(data2)


    const contest = []

    for (let i = 0; i < data_score_elo.length; i++) {
        contest.push({
            name: data_score_elo[i].name,
            score: data_score_elo[i].contest.score,
            rank: data_score_elo[i].contest.rank,
            level: data_score_elo[i].contest.level,
        })
    }
    

    console.log(contest);
}

main().catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
});







