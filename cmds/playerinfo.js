const Discord = module.require("discord.js");
const request = require('request-promise');
const config = require ('../botconfig.json');
const changereg = require('../changereg.js');
let riotkey = config.riotkey;

module.exports = {
	name: 'player',
	description: 'Player information',
	aliases: ['info','profile','p'],
	usage: '[!t player REGION NICKNAME]',
	cooldown: 5,
	async execute(bot, message, args) {

const version = await request({uri: "http://ddragon.leagueoflegends.com/api/versions.json", json: true});

var mysql = require('mysql2/promise');
var con = await mysql.createConnection({
  host     : 'remotemysql.com',
  user     : 'OqaV0Qt4wl',
  password : 'uSVnIjf1mp',
  database : 'OqaV0Qt4wl'
});

//Работа через БД
let db;
    if(message.mentions.users.first()){
[db] = await con.execute('SELECT * FROM summoners WHERE duserid = ?',[message.guild.member(message.mentions.users.first()).user.id]);}
  else if(!args[0]){
[db] = await con.execute('SELECT * FROM summoners WHERE duserid = ?', [message.author.id])}
  else {db=args[0]};
if(!db[0]){
let i = new Discord.RichEmbed()
    .setThumbnail(`https://cdn.glitch.com/a90c18e0-56f5-4217-a721-f16cb4d618d4%2F190-1900167_super-teemo.png?v=1563898152547`)
    .addField(":interrobang: TEEMO BOT :interrobang:","**Player not saved**")
    .setColor('RED')
    .addField("**If you want to save: **", "**!t save REGION NICKNAME**")
    .setFooter('Teemo bot, created by hyperDoomer. Invite Teemo to your server !t invite', 'https://cdn.glitch.com/a90c18e0-56f5-4217-a721-f16cb4d618d4%2F190-1900167_super-teemo.png?v=1563898152547');

    return message.channel.send(i)};
let chregion = (db[0].region || args[0]);
let nickname = (args.slice(1).join(' ') || db[0].nickname);

//ПРОВЕРКА РЕГИОНА
let regions = ['EUW', 'NA', 'EUNE', 'BR', 'JP', 'KR', 'LAN', 'LAS', 'OCE', 'TR', 'RU'];
if(regions.indexOf(chregion.toUpperCase()) ==-1)  {
     let i = new Discord.RichEmbed()
    .setThumbnail(`https://cdn.glitch.com/a90c18e0-56f5-4217-a721-f16cb4d618d4%2F190-1900167_super-teemo.png?v=1563898152547`)
    .addField(":interrobang: TEEMO BOT :interrobang:","**Wrong region**")
    .setColor('RED')
    .addField("**Please, choose region:** \n**"+regions.join(', ')+"**", "**!t player REGION NICKNAME**")
    .setFooter('Teemo bot, created by hyperDoomer. Invite Teemo to your server !t invite', 'https://cdn.glitch.com/a90c18e0-56f5-4217-a721-f16cb4d618d4%2F190-1900167_super-teemo.png?v=1563898152547');

    return message.channel.send(i)};
let region = (changereg(chregion.toUpperCase()));

//JSON данные
let playerurl = (`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickname+'?api_key='+riotkey}`);
const json = await request({uri: playerurl, json: true}).catch(() => {return false})

//ПРОВЕРКА НИКНЕЙМА
if(!json){
     let je = new Discord.RichEmbed()
    .setThumbnail(`https://cdn.glitch.com/a90c18e0-56f5-4217-a721-f16cb4d618d4%2F190-1900167_super-teemo.png?v=1563898152547`)
    .addField(":interrobang: TEEMO BOT :interrobang:", "**Player information:**")
    .addField("<:borderarrowhover5432523452345234:603725501672062987>**Error: 'Wrong name'**<:borderarrowhover2451253412321312:603725502770839572>","**!t player REGION NICKNAME**")
    .setColor('RED')
    .setFooter('Teemo bot, created by hyperDoomer. Invite Teemo to your server !t invite', 'https://cdn.glitch.com/a90c18e0-56f5-4217-a721-f16cb4d618d4%2F190-1900167_super-teemo.png?v=1563898152547');
    return message.channel.send(je)};
//SUMMONER ID
let playeridurl = (`https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${json.id+'?api_key='+riotkey}`);
const jsonid = await request({uri: playeridurl, json: true});
//SUMMONER MASTERY
let playermsturl = (`https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${json.id+'?api_key='+riotkey}`);
const jsonmst = await request({uri: playermsturl, json: true});
//CHAMPION ID
let jsonc= [];
for (let i = 0; i < 3; i++) {
    let champion = `https://cdn.communitydragon.org/${version[0]}/champion/${jsonmst[i].championId}/data`;
    const result = await request({uri: champion, json: true});
    jsonc.push(result)}

//НАЧАЛО ЭМБЕДА
let embed = new Discord.RichEmbed()
    .setAuthor('Teemo Bot, for server: '+message.guild.name, message.guild.iconURL)
    .setTitle(`<:borderarrowhover5432523452345234:603725501672062987> SUMMONER INFORMATION: **${json.name}** <:borderarrowhover2451253412321312:603725502770839572>`)
    .setColor('RED')
    .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/${version[0]}/img/profileicon/${json.profileIconId}.png`)
    .addField('<:Level12134424857261940547571:603310507763564592>LEVEL<:Level12134424857261940547571:603310507763564592>', "**<:Level12134424857261940547571:603310507763564592>"+json.summonerLevel+"<:Level12134424857261940547571:603310507763564592>**", true)
    .addField(':earth_americas:REGION', "**:earth_asia:"+region+"**", true)

//Live game
let liveurl = (`https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${json.id+'?api_key='+riotkey}`);
const jsonlive = await request({uri :liveurl, json: true}).catch(() => {return false})
if(!jsonlive) {embed.addField('Live Game', "Not playing");} else{
embed.addField('Live game', 'Playing');};

//SOLO
var ranksolo = jsonid.find(n => n.queueType === 'RANKED_SOLO_5x5');
if(!ranksolo) {embed.addField('<:map1153212353243241234123123:603315526852411403>__RANKED SOLO/DUO__<:map1153212353243241234123123:603315526852411403>', "<:unranked123563425435234523453245:603727489680015360>**UNRANKED**<:unranked123563425435234523453245:603727489680015360>", true);} else{
var emojirank = bot.emojis.find(e => e.name === `${ranksolo.tier}` && ['401153786674151424'].includes(e.guild.id));
let rswinrate = (100*(ranksolo.wins/(ranksolo.wins+ranksolo.losses))).toFixed(1);
embed.addField('<:map1153212353243241234123123:603315526852411403>__RANKED SOLO/DUO__<:map1153212353243241234123123:603315526852411403>', emojirank + "**"+ranksolo.tier + ' ' + ranksolo.rank+"**" +" "+ranksolo.leaguePoints+'LP'+ emojirank + '\n **Wins**: '+ranksolo.wins+' **Losses**: '+ranksolo.losses+'\n **Winrate**: '+rswinrate+"%" , true);
};

//MASTERY
//эмодзи мастери ранга
let jsone= [];
for (let i = 0; i < 3; i++) {
    var emojim = bot.emojis.find(e => e.name === `${jsonmst[i].championLevel+"_"}` && ['401153786674151424'].includes(e.guild.id));
jsone.push(emojim)}

//Эмодзи иконок персов
var emojichamp1 = bot.emojis.find(e => e.name === jsonc[0].name.replace(' ', '').replace("'", "") && ['597817432840601600','602587428682989568','602587024251420672'].includes(e.guild.id));
var emojichamp2 = bot.emojis.find(e => e.name === jsonc[1].name.replace(' ', '').replace("'", "") && ['597817432840601600','602587428682989568','602587024251420672'].includes(e.guild.id));
var emojichamp3 = bot.emojis.find(e => e.name === jsonc[2].name.replace(' ', '').replace("'", "") && ['597817432840601600','602587428682989568','602587024251420672'].includes(e.guild.id));

//MASTERY EMBED
embed.addField('<:chest_130543654324234643544:603718133374779392>__CHAMPIONS MASTERY__<:chest_130543654324234643544:603718133374779392>', jsone[0]+emojichamp1+'**[1]'+jsonc[0].name+":** "+(jsonmst[0].championPoints/1000)+ '\n'+jsone[1]+emojichamp2+'**[2]'+jsonc[1].name+":** "+(jsonmst[1].championPoints/1000)+ '\n'+jsone[2]+emojichamp3+'**[3]'+jsonc[2].name+":** "+(jsonmst[2].championPoints/1000),true);

//FLEX
var rankflex = jsonid.find(n => n.queueType === 'RANKED_FLEX_SR');
if(!rankflex) {embed.addField('<:map1153212353243241234123123:603315526852411403>__RANKED FLEX__<:map1153212353243241234123123:603315526852411403>', "<:unranked123563425435234523453245:603727489680015360>**UNRANKED**<:unranked123563425435234523453245:603727489680015360>", true);} else{
var emojirankf = bot.emojis.find(e => e.name === `${rankflex.tier}` && ['401153786674151424'].includes(e.guild.id));
let fwinrate = (100*(rankflex.wins/(rankflex.wins+rankflex.losses))).toFixed(1);
embed.addField('<:map1153212353243241234123123:603315526852411403>__RANKED FLEX__<:map1153212353243241234123123:603315526852411403>', emojirankf + "**"+rankflex.tier + ' ' + rankflex.rank+"**" +" "+rankflex.leaguePoints+'LP'+ emojirankf + '\n **Wins**: '+rankflex.wins+' **Losses**: '+rankflex.losses+'\n **Winrate**: '+fwinrate+"%"  ,true);
};

//TFT
var ranktft = jsonid.find(n => n.queueType === 'RANKED_TFT');
if(!ranktft) {embed.addField('<:tft4212354325983923740723042:603314634501390366>__RANKED TFT__<:tft4212354325983923740723042:603314634501390366>', "<:unranked123563425435234523453245:603727489680015360>**UNRANKED**<:unranked123563425435234523453245:603727489680015360>", true);} else{
var emojiranktft = bot.emojis.find(e => e.name === `${ranktft.tier}` && ['401153786674151424'].includes(e.guild.id));
let tftwinrate = (100*(ranktft.wins/(ranktft.wins+ranktft.losses))).toFixed(1);
embed.addField('<:tft4212354325983923740723042:603314634501390366>__RANKED TFT__<:tft4212354325983923740723042:603314634501390366>', emojiranktft + "**"+ranktft.tier + ' ' + ranktft.rank+"**" +" "+ranktft.leaguePoints+'LP'+ emojiranktft +'\n **Wins**: '+ranktft.wins+' **Losses**: '+ranktft.losses+'\n **Winrate**: '+tftwinrate+"%"  ,true);}; 


//
embed.setFooter('Teemo bot, created by hyperDoomer. Invite Teemo to your server !t invite', 'https://cdn.glitch.com/a90c18e0-56f5-4217-a721-f16cb4d618d4%2F190-1900167_super-teemo.png?v=1563898152547');
message.channel.send(embed)
  
}};
