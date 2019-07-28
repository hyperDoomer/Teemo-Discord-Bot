module.exports = {
	name: 'ping',
	description: 'Ping!',
  cooldown: 5,
  aliases: ['pingg'],
	execute(bot, message, args) {
		message.channel.send('Pong.');
	},
};