import axios from "axios";
import config from "../config/config"

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

    console.log(url1 + config.codechef_username);
    const response = await axios.get(url1 + config.codechef_username);

    userCodechef.card['globalRank'] = response.data.globalRank;
    userCodechef.card['rating'] = response.data.rating;
    userCodechef.card['stars'] = response.data.stars;
    userCodechef.card['countryRank'] = response.data.countryRank;
    
    
    console.log("Response ", response.data);
}

main().catch((error) => {
    console.error("Error occurred:", error);
});
