const Discord = module.require("discord.js");
module.exports = {
	name: 'stats',
	description: 'Bot statistics',
  	cooldown: 3,
  	aliases: ['st'],
	execute(bot, message, args) {
let g = bot.guilds.size;
message.author.send("Guilds= "+g);
	},
};