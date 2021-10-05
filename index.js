const discord = require("discord.js");
const client = new discord.Client();
const ytdl = require('ytdl-core');
const LINK = '#Youtube Live link';
const Channel = '#Your Channel ID';
const Server = '#Your Server ID';
const TOKEN = '#Your Bot Token';

client.on('ready', async () => {
  let channel = client.channels.cache.get(Channel) || await client.channels.fetch(Channel)
  if(!channel) return console.log('Not Found Channel to Join')
  const connection = await channel.join();
  const dispenser =  connection.play(ytdl(LINK), { highWaterMark: 1 << 150, quality:'highestaudio', filter:'audioonly'})
  dispenser.setVolume(0.5)
})

setInterval(async function() {
  if(!client.voice.connections.get(Server)) {
    let channel = client.channels.cache.get(Channel) || await client.channels.fetch(Channel)
    if(!channel) return console.log('Not Found Channel to Join')
    const connection = await channel.join();
    const dispenser = connection.play(ytdl(LINK), { highWaterMark: 1 << 150, quality:'highestaudio', filter:'audioonly'})
    dispenser.setVolume(0.5)
  }
}, 10000)

client.login(TOKEN)
