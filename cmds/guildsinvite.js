const Discord = module.require("discord.js");
module.exports = {
	name: 'ginvite',
	description: 'Guild invite',
  	cooldown: 10,
    aliases: ['gi'],
	execute(bot, message, args) {
var arg0 = bot.guilds.get(args[0])
if(!arg0)return console.error('[err] Укажите айди сервера');
bot.guilds.get(args[0]).channels.filter(i => i.type == 'text').first()
.createInvite().then(i => console.log(`Invite on ${bot.guilds.get(args[0]).name}: ${i.url}`));
    }
};
