const discord = require("discord.js");
const Voice = require("@discordjs/voice");
const client = new discord.Client();
const ytdl = require('ytdl-core');
const MusicLink = '#Youtube Live link';
const MusicChannelID = '#Your Channel ID';
const ServerID = '#Your Server ID';
const TOKEN = '#Your Bot Token';

/*----------------------------------------------------- FUNCTIONS -----------------------------------------------------*/
async function Music247() {
    const guild = client.guilds.cache.get(ServerID);
    const MusicChannel = guild.channels.cache.get(MusicChannelID);
    const roomone = Voice.joinVoiceChannel({
        channelId: MusicChannelID,
        guildId: ServerID,
        adapterCreator: MusicChannel.guild.voiceAdapterCreator
    });
    const player = Voice.createAudioPlayer({
        behaviors: {
            noSubscriber: Voice.NoSubscriberBehavior.Play,
            maxMissedFrames: Math.round(2000 / 20),
        }
    });
    // noinspection JSCheckFunctionSignatures
    const resource = await Voice.createAudioResource(ytdl(MusicLink), {
        inlineVolume: true,
        highWaterMark: 1 << 25, // 64 MB
        seek: Math.floor(-1800 / 2)
    });
    resource.volume.setVolume(0.075);
    await player.play(resource);
    if (!Voice.getVoiceConnections(ServerID)) {
        roomone.subscribe(player);
    }
}

/*----------------------------------------------------- FUNCTIONS -----------------------------------------------------*/

client.on('ready', async () => {
    await Music247();
    setInterval(async () => {
        await Music247();
    }, 10000);
});

client.login(TOKEN)
