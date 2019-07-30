const Discord = module.require("discord.js");
const request = require('request-promise');
const config = require ('../botconfig.json');
const changereg = require('../changereg.js');
const changemod = require('../changemod.js');
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
let playerurl = (`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(nickname)+'?api_key='+riotkey}`);
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

//SUMMONER LEAGUE
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
    jsonc.push(result)};

//SUMMONER LEVEL EMOJI
let elevel;
if(json.summonerLevel >=40 && json.summonerLevel <50) { elevel = "<:prestige_lvl_40_inventory1:605440391868710947>"}
else if(json.summonerLevel >=50 && json.summonerLevel <75) { elevel = "<:prestige_lvl_50_inventory1:605440394368647169>"}
else if(json.summonerLevel >=75 && json.summonerLevel <100) { elevel = "<:prestige_lvl_75_inventory1:605440395928797204>"}
else if(json.summonerLevel >=100 && json.summonerLevel <125) { elevel = "<:prestige_lvl_100_inventory1:605440396742623243>"}
else if(json.summonerLevel >=125 && json.summonerLevel <150) { elevel = "<:prestige_lvl_125_inventory1:605440398789181440>"}
else if(json.summonerLevel >=150 && json.summonerLevel <175) { elevel = "<:prestige_lvl_150_inventory1:605441159782989887>"}
else if(json.summonerLevel >=175 && json.summonerLevel <200) { elevel = "<:prestige_lvl_175_inventory1:605441160369930241>"}
else if(json.summonerLevel >=200 && json.summonerLevel <225) { elevel = "<:prestige_lvl_200_inventory1:605440396616531978>"}
else if(json.summonerLevel >=225 && json.summonerLevel <250) { elevel = "<:prestige_lvl_225_inventory1:605440397166247941>"}
else if(json.summonerLevel >=250 && json.summonerLevel <275) { elevel = "<:prestige_lvl_250_inventory1:605441159480999955>"}
else if(json.summonerLevel >=275 && json.summonerLevel <300) { elevel = "<:prestige_lvl_275_inventory1:605440397086294076>"}
else if(json.summonerLevel >=300 && json.summonerLevel <325) { elevel = "<:prestige_lvl_300_inventory1:605440399305080842>"}
else if(json.summonerLevel >=325 && json.summonerLevel <350) { elevel = "<:prestige_lvl_325_inventory1:605441159845773334>"}
else if(json.summonerLevel >=350 && json.summonerLevel <375) { elevel = "<:prestige_lvl_350_inventory1:605441159753367583>"}
else if(json.summonerLevel >=375 && json.summonerLevel <400) { elevel = "<:prestige_lvl_375_inventory1:605441160458010675>"}
else if(json.summonerLevel >=400 && json.summonerLevel <425) { elevel = "<:prestige_lvl_400_inventory1:605441159636189194>"}
else if(json.summonerLevel >=425 && json.summonerLevel <450) { elevel = "<:prestige_lvl_425_inventory:605477510343426120>"}
else if(json.summonerLevel >=450 && json.summonerLevel <475) { elevel = "<:prestige_lvl_450_inventory:605455923430948884>"}
else if(json.summonerLevel >=475 && json.summonerLevel <500) { elevel = "<:prestige_lvl_475_inventory:605455922805866497>"}
else if(json.summonerLevel >=500                           ) { elevel = "<:prestige_lvl_500_inventory:605455923166576670>"};

//НАЧАЛО ЭМБЕДА
let embed = new Discord.RichEmbed()
    .setAuthor('Teemo Bot, for server: '+message.guild.name, message.guild.iconURL)
    .setTitle(`<:borderarrowhover5432523452345234:603725501672062987> SUMMONER INFORMATION: **${json.name}** <:borderarrowhover2451253412321312:603725502770839572>`)
    .setColor('RED')
    .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/${version[0]}/img/profileicon/${json.profileIconId}.png`)
    .addField('<:Level12134424857261940547571:603310507763564592>LEVEL<:Level12134424857261940547571:603310507763564592>', elevel+"** "+json.summonerLevel+" **"+elevel, true)
    .addField(':earth_americas:REGION', "**:earth_asia:"+region+"**", true)

//Live game
let liveurl = (`https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${json.id+'?api_key='+riotkey}`);
const jsonlive = await request({uri :liveurl, json: true}).catch(() => {return false})
if(!jsonlive) 
{embed.addField('LIVE GAME', "Not playing");}
else{
let playtimem = (Date.now() - jsonlive.gameStartTime)/1000;
let playtimes = (Date.now() - jsonlive.gameStartTime)/1000;
let lmode = changemod(jsonlive.gameQueueConfigId);
let lplayer = jsonlive.participants.find(n => n.summonerId === json.id);
let lchampion = `https://cdn.communitydragon.org/${version[0]}/champion/${lplayer.championId}/data`;
const lresult = await request({uri: lchampion, json: true});
var lemojichamp = bot.emojis.find(e => e.name === lresult.name.replace(' ', '').replace("'", "") && ['597817432840601600','602587428682989568','602587024251420672'].includes(e.guild.id));
embed.addField('LIVE GAME', 'Playing '+lmode+" as "+lemojichamp+"**"+lresult.name+"**"+" ("+`${playtimem / 60 | 0}:${playtimes % 60}`+")");};

//SOLO
var ranksolo = jsonid.find(n => n.queueType === 'RANKED_SOLO_5x5');
if(!ranksolo) {embed.addField('<:iconvictory231412342134213444:605430936900993035>__RANKED SOLO/DUO__<:iconvictory231412342134213444:605430936900993035>', "<:unranked123563425435234523453245:603727489680015360>**UNRANKED**<:unranked123563425435234523453245:603727489680015360>", true);} else{
var emojirank = bot.emojis.find(e => e.name === `${ranksolo.tier}` && ['401153786674151424'].includes(e.guild.id));
let rswinrate = (100*(ranksolo.wins/(ranksolo.wins+ranksolo.losses))).toFixed(1);
embed.addField('<:iconvictory231412342134213444:605430936900993035>__RANKED SOLO/DUO__<:iconvictory231412342134213444:605430936900993035>', emojirank + "**"+ranksolo.tier + ' ' + ranksolo.rank+"**" +" "+ranksolo.leaguePoints+'LP'+ emojirank + '\n **Wins**: '+ranksolo.wins+' **Losses**: '+ranksolo.losses+'\n **Winrate**: '+rswinrate+"%" , true);
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
if(!rankflex) {embed.addField('<:iconvictory231412342134213444:605430936900993035>__RANKED FLEX__<:iconvictory231412342134213444:605430936900993035>', "<:unranked123563425435234523453245:603727489680015360>**UNRANKED**<:unranked123563425435234523453245:603727489680015360>", true);} else{
var emojirankf = bot.emojis.find(e => e.name === `${rankflex.tier}` && ['401153786674151424'].includes(e.guild.id));
let fwinrate = (100*(rankflex.wins/(rankflex.wins+rankflex.losses))).toFixed(1);
embed.addField('<:iconvictory231412342134213444:605430936900993035>__RANKED FLEX__<:iconvictory231412342134213444:605430936900993035>', emojirankf + "**"+rankflex.tier + ' ' + rankflex.rank+"**" +" "+rankflex.leaguePoints+'LP'+ emojirankf + '\n **Wins**: '+rankflex.wins+' **Losses**: '+rankflex.losses+'\n **Winrate**: '+fwinrate+"%"  ,true);
};

//TFT
var ranktft = jsonid.find(n => n.queueType === 'RANKED_TFT');
if(!ranktft) {embed.addField('<:iconvictory2123123123214154545:605431423351914499>__RANKED TFT__<:iconvictory2123123123214154545:605431423351914499>', "<:unranked123563425435234523453245:603727489680015360>**UNRANKED**<:unranked123563425435234523453245:603727489680015360>", true);} else{
var emojiranktft = bot.emojis.find(e => e.name === `${ranktft.tier}` && ['401153786674151424'].includes(e.guild.id));
let tftwinrate = (100*(ranktft.wins/(ranktft.wins+ranktft.losses))).toFixed(1);
embed.addField('<:iconvictory2123123123214154545:605431423351914499>__RANKED TFT__<:iconvictory2123123123214154545:605431423351914499>', emojiranktft + "**"+ranktft.tier + ' ' + ranktft.rank+"**" +" "+ranktft.leaguePoints+'LP'+ emojiranktft +'\n **Wins**: '+ranktft.wins+' **Losses**: '+ranktft.losses+'\n **Winrate**: '+tftwinrate+"%"  ,true);}; 


//
embed.setFooter('Teemo bot, created by hyperDoomer. Invite Teemo to your server !t invite', 'https://cdn.glitch.com/a90c18e0-56f5-4217-a721-f16cb4d618d4%2F190-1900167_super-teemo.png?v=1563898152547');
message.channel.send(embed)
  
}};
