module.exports = {
	name: 'invite',
	description: 'Bot invite',
  	cooldown: 5,
    aliases: ['i'],
    args: false,
	execute(bot, message, args) {
        bot.generateInvite(["ADMINISTRATOR"]).then(link=>
            message.author.send(link));
	},
};