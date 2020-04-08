const Discord = module.require("discord.js");
const config = require('../botconfig.json');

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['','commands'],
	usage: '[commands]',
	cooldown: 5,
  args: false,
  guildOnly: true,
	execute(bot, message, args) {
   
let embed = new Discord.RichEmbed()
  .setAuthor('Teemo Bot, for server: '+message.guild.name, message.guild.iconURL)
  .setThumbnail(`https://cdn.glitch.com/a90c18e0-56f5-4217-a721-f16cb4d618d4%2F190-1900167_super-teemo.png?v=1563898152547`)
  .setColor('RED')
  .setTitle("**TEEMO BOT COMMANDS:**")
  .addField("**!t player region nickname**", "**(For information about player.)**",true)
  .addField("**!t save region nickname**", "**(This command will save you in data base,\n then you can use _'!t player'_  without region and nickname.)**",true)
  .addField("**!t player @discordUser**", "**(If player saved in data base.)**",true)
  .addField("**!t roles **", "**(Preferred Role Selection: TOP/MID/JUNGLE/ADC/SUPPORT)**",true)
  .setFooter('Invite Teemo to your server !t invite', 'https://cdn.glitch.com/a90c18e0-56f5-4217-a721-f16cb4d618d4%2F190-1900167_super-teemo.png?v=1563898152547');
 message.channel.send(embed);

}};