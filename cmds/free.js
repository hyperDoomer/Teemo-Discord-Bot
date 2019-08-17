const Discord = module.require("discord.js");
const request = require('request-promise');
const config = require ('../botconfig.json');
const changereg = require('../changereg.js');
let riotkey = config.riotkey;
const version = config.version;

module.exports = {
	name: 'free',
	description: 'Free champions',
	aliases: ['f'],
	usage: '[f]',
        cooldown: 15,
        guildOnly: true,
	async execute(bot, message, args) {

//ПРОВЕРКА РЕГИОНА
let regions = ['EUW', 'NA', 'EUNE', 'BR', 'JP', 'KR', 'LAN', 'LAS', 'OCE', 'TR', 'RU'];
if(regions.indexOf(args[0].toUpperCase()) ==-1)  {
     let r = new Discord.RichEmbed()
    .addField(":interrobang: TEEMO BOT :interrobang:"," Invalid region")
    .setColor('RED')
    .addField("Please, choose region:", regions.join(', '));
    return message.channel.send(r)
};
let region = (changereg(args[0].toUpperCase()));

//JSON Данные
let freeurl = (`https://${region}.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${riotkey}`);
const json = await request({uri: freeurl, json: true});

let jsonc= [];
for (let i = 0; i < 14; i++) {
    let champion = `https://cdn.communitydragon.org/${version}/champion/${json.freeChampionIds[i]}/data`;
    const result = await request({uri: champion, json: true});
    jsonc.push(result)};
let jsonc2= [];
    for (let i = 0; i < 10; i++) {
        let champion2 = `https://cdn.communitydragon.org/${version}/champion/${json.freeChampionIdsForNewPlayers[i]}/data`;
        const result2 = await request({uri: champion2, json: true});
        jsonc2.push(result2)};

let jsonce= [];
for (let i = 0; i < 14; i++) {
    var emojichamp = bot.emojis.find(e => e.name === jsonc[i].name.replace(' ', '').replace("'", "") && ['597817432840601600','602587428682989568','602587024251420672'].includes(e.guild.id));
    jsonce.push(emojichamp);};
let jsonce2= [];
    for (let i = 0; i < 10; i++) {
        var emojichamp2 = bot.emojis.find(e => e.name === jsonc2[i].name.replace(' ', '').replace("'", "") && ['597817432840601600','602587428682989568','602587024251420672'].includes(e.guild.id));
        jsonce2.push(emojichamp2);};


//EMBED
let embed = new Discord.RichEmbed()
    .setAuthor('Teemo Bot, for server: '+message.guild.name, message.guild.iconURL)
    .setTitle(`<:borderarrowhover5432523452345234:603725501672062987> FREE CHAMPIONS FOR THIS WEEK: <:borderarrowhover2451253412321312:603725502770839572>`)
    .setColor('RED')
    .setThumbnail(`https://cdn.glitch.com/a90c18e0-56f5-4217-a721-f16cb4d618d4%2F190-1900167_super-teemo.png?v=1563898152547`)
    .addField(jsonce[0]+jsonce[1]+jsonce[2]+jsonce[3]+jsonce[4]+jsonce[5]+jsonce[6],jsonce[7]+jsonce[8]+jsonce[9]+jsonce[10]+jsonce[11]+jsonce[12]+jsonce[13] , true)
    .addField(':earth_americas:REGION', "**:earth_asia:"+region+"**", true)
    .addField("**FOR NEW PLAYERS:**", "_(Until the Level 10)_")
    .addField(jsonce2[0]+jsonce2[1]+jsonce2[2]+jsonce2[3]+jsonce2[4],jsonce2[5]+jsonce2[6]+jsonce2[7]+jsonce2[8]+jsonce2[9] , true)
    .setFooter('Invite Teemo to your server !t invite', 'https://cdn.glitch.com/a90c18e0-56f5-4217-a721-f16cb4d618d4%2F190-1900167_super-teemo.png?v=1563898152547');
message.channel.send(embed)

}};
