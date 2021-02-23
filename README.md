# Memetron

A Discord bot that can be configured to regularly post memes from Reddit in a text channel.

![Example](https://cdn.discordapp.com/attachments/786717922504212510/813856871794081812/unknown.png)

## How it works
Memetron uses Reddit's API to see if any new posts have made it to the "Hot" section in a 
subreddit. If so, it grabs the image(s) posted and embeds them in a message.

## Bugs and limitations
* Currently only static images work. Gifs and videos do not embed properly.
* Configuration is currently done from a `config.json` file. As such, I am not hosting
a public bot which you can add to your Discord server freely. If you wish to add this bot, you
  will need to host it yourself.
  
## Self Hosting
Requires Node.js and NPM installed as well as a registered Discord Bot account.
Familiarity with the JSON format is needed in order to configure the bot.

### 1. Clone the repository
```bash
git clone https://github.com/dpleshkov/memetron-bot.git
```

### 2. Install dependencies
```bash
cd memetron-bot/
npm install
```
### 3. Configure the bot
Configuration is done through the `config.json` file. An example `config.example.json` is
included with the repo.

Copy over the example file:
```bash
cp config.example.json config.json
```
And edit it with a text editor:
![config.example.json](https://cdn.discordapp.com/attachments/786717922504212510/813859227335524392/unknown.png)

Replace `your bot token` with your bot's API token. Then, specify subreddits to watch,
such as `r/dankmemes`. For each subreddit, specify one or more channels that the bot
will output to. You can get channel IDs by enabling developer mode in the Discord app,
then right clicking on a text channel's name. 

![How to get Channel IDs](https://cdn.discordapp.com/attachments/791194104604000297/813860140381896724/unknown.png)


   
### 4. Run
```bash
npm start
```