const Discord = module.require("discord.js");

module.exports = {
	name: 'stats',
	description: 'Bot statistics',
  	cooldown: 10,
	aliases: ['st'],
	guildOnly: false,
	execute(bot, message, args) {

		if(!message.author.id === ('209035820248596480' || '209032148349353984' || '284696813494337536')) return;
		message.author.send("Серверов: "+bot.guilds.size.toLocaleString()+
		"\nКаналов: "+bot.channels.size.toLocaleString()+ 
		"\nПользователей: "+bot.users.size.toLocaleString());
		message.author.send(bot.guilds.sort((p,n) => n.memberCount-p.memberCount).map(g=>g.name).first(5).join(' '));
		console.log(bot.guilds.map(i => `${i.name}: ${i.id}`).join("\n"))
	},
};