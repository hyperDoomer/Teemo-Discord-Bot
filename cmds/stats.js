const Discord = module.require("discord.js");
module.exports = {
	name: 'stats',
	description: 'Bot statistics',
  	cooldown: 10,
  	aliases: ['st'],
	execute(bot, message, args) {
		console.log(bot.guilds.map(i => `${i.name}: ${i.id}`).join("\n"))
	},
};