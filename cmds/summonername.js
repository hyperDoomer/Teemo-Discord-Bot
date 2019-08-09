const Discord = module.require("discord.js");
const fs = require ("fs");
const config = require ('../botconfig.json');
let riotkey = config.riotkey;
var mysql      = require('mysql');
var con = mysql.createConnection({
  host     : 'remotemysql.com',
  user     : 'OqaV0Qt4wl',
  password : 'uSVnIjf1mp',
  database : 'OqaV0Qt4wl'
});


module.exports = {
	name: 'save',
	description: 'Save data in db',
	usage: 'region nickname',
	cooldown: 5,
	async execute(bot, message, args) {

let regions = ['EUW', 'NA', 'EUNE', 'BR', 'JP', 'KR', 'LAN', 'LAS', 'OCE', 'TR', 'RU'];
if(regions.indexOf(args[0].toUpperCase()) ==-1)  {
     let i = new Discord.RichEmbed()
    .addField(":interrobang: TEEMO BOT :interrobang:"," Invalid region")
    .setColor('RED')
    .addField("Please, choose region:", regions.join(', '))
    .setFooter('Invite Teemo to your server !t invite', 'https://cdn.glitch.com/a90c18e0-56f5-4217-a721-f16cb4d618d4%2F190-1900167_super-teemo.png?v=1563898152547');
    return message.channel.send(i);
};

let nickname = args.slice(1).join(' ')

let playerurl = (`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(nickname)+'?api_key='+riotkey}`);
const json = await request({uri: playerurl, json: true}).catch(() => {return false})

//ПРОВЕРКА НИКНЕЙМА
if(!json){
     let je = new Discord.RichEmbed()
    .setThumbnail(`https://cdn.glitch.com/a90c18e0-56f5-4217-a721-f16cb4d618d4%2F190-1900167_super-teemo.png?v=1563898152547`)
    .addField(":interrobang: TEEMO BOT :interrobang:", "**Player information:**")
    .addField("<:borderarrowhover5432523452345234:603725501672062987>**Error: 'Wrong name'**<:borderarrowhover2451253412321312:603725502770839572>","**!t player REGION NICKNAME**")
    .setColor('RED')
    .setFooter('Invite Teemo to your server !t invite', 'https://cdn.glitch.com/a90c18e0-56f5-4217-a721-f16cb4d618d4%2F190-1900167_super-teemo.png?v=1563898152547');
    return message.channel.send(je)};

let duserid = message.author.id;
let sql = `INSERT INTO summoners (duserid, region, nickname) VALUES ('${duserid}', '${args[0]}', '${nickname}') ON DUPLICATE KEY UPDATE region = '${args[0]}', nickname = '${nickname}'`;
con.query(sql, function (err, result) {
    if (err){
    console.log(err);
    message.channel.send("Error");
} else{
    message.channel.send("Saved");
    console.log("Внесен в базу");
  }});
  }};