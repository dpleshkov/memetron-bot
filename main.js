const Discord = require("discord.js");
const axios = require("axios");
const fs = require("fs");

const config = JSON.parse(String(fs.readFileSync("config.json")));
const client = new Discord.Client();

function getPostInfo(rawResponse) {
    let result = [];
    for (let post of rawResponse.data.children) {
        post.data.created = Math.round(post.data.created || 0);
        if (post.data.preview) {
            result.push ({
                author: post.data.author,
                imageURL: post.data.preview.images[0].source.url,
                title: post.data.title,
                id: post.data.created,
            });
        }
    }
    return result;
}

async function fetchHotPosts(subreddit) {
    let response = await axios.get(`https://www.reddit.com/r/${subreddit}/hot/.json?count=10&raw_json=1`).catch(reason => {
        console.log(`Failed to fetch hot posts from ${subreddit}. Reason: ${reason}`);
    });
    if (response) {
        return getPostInfo(response.data);
    }
    return [];
}

async function getSubredditState(config) {  // O(N)
    config.subreddits = config.subreddits || {};
    let result = {

    }
    for (let subreddit of Object.keys(config.subreddits)) {
        result[subreddit] = new Set();
        let posts = await fetchHotPosts(subreddit);
        for (let post of posts) {
            result[subreddit].add(post.imageURL);
        }
    }
    return result;
}

async function tick(config, client, oldState, delay) {
    let newState = await getSubredditState(config);
    for (let subreddit of Object.keys(newState)) {
        let newPosts = newState[subreddit] || new Set();
        let oldPosts = oldState[subreddit] || new Set();
        let difference = new Set([...newPosts].filter(x => !oldPosts.has(x)));
        for (let post of difference) {
            for (let channel of config.subreddits[subreddit]) {
                let embed = new Discord.MessageEmbed()
                    .setImage(post);
                client.channels.fetch(channel).then(channel => {
                    channel.send(embed);
                });
            }
        }
    }
    setTimeout(function() {
        tick(config, client, newState, delay)
    }, delay);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    getSubredditState(config).then(state => {
        tick(config, client, state, 300000).then();
    });
});

client.login(config.token).then();
