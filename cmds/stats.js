const Discord = module.require("discord.js");
module.exports = {
	name: 'stats',
	description: 'Bot statistics',
  	cooldown: 10,
  	aliases: ['st'],
	execute(bot, message, args) {
		if(!message.author.id === '209035820248596480') return;
		message.author.send("Серверов: "+bot.guilds.size.toLocaleString()+
		"\nКаналов: "+bot.channels.size.toLocaleString()+ 
		"\nПользователей: "+bot.users.size.toLocaleString());
		console.log(bot.guilds.map(i => `${i.name}: ${i.id}`).join("\n"))
	},
};