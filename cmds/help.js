const Discord = module.require("discord.js");
const config = require('../botconfig.json');

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['','commands'],
	usage: '[commands]',
	cooldown: 5,
  args: false,
	execute(bot, message, args) {
   
let embed = new Discord.RichEmbed()
  .setThumbnail(`https://cdn.glitch.com/a90c18e0-56f5-4217-a721-f16cb4d618d4%2F190-1900167_super-teemo.png?v=1563898152547`)
  .setColor('RED')
  .setTitle("<:borderarrowhover5432523452345234:603725501672062987>**Avaible TEEMO Bot commands:**<:borderarrowhover2451253412321312:603725502770839572>")
  .addField("<:borderarrowhover5432523452345234:603725501672062987>**!t player region nickname**<:borderarrowhover2451253412321312:603725502770839572>", "**(For information about player.)**",true)
  .addField("<:borderarrowhover5432523452345234:603725501672062987>**!t player @👾hyperDoomer👾**<:borderarrowhover2451253412321312:603725502770839572>", "**(If player saved in data base)**",true)
  .addField("<:borderarrowhover5432523452345234:603725501672062987>**!t save region nickname**<:borderarrowhover2451253412321312:603725502770839572>", "**(This command will save you in data base,\n then you can use _'!t player'_  without region and nickname.)**",true)
  .setFooter('Teemo bot, created by hyperDoomer. Invite Teemo to your server !t invite', 'https://cdn.glitch.com/a90c18e0-56f5-4217-a721-f16cb4d618d4%2F190-1900167_super-teemo.png?v=1563898152547');
message.channel.send(embed);

}};