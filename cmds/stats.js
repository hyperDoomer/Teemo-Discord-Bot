const Discord = module.require("discord.js");
module.exports = {
	name: 'stats',
	description: 'Bot statistics',
  	cooldown: 10,
  	aliases: ['st'],
	execute(bot, message, args) {
		if(!message.author.id === '209035820248596480') return;
		message.author.send(bot.guilds.map(i => `${i.name}: ${i.id}`).join("\n"))
	},
};