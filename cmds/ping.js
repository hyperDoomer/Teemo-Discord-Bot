module.exports = {
	name: 'ping',
	description: 'Ping!',
  	cooldown: 3,
  	aliases: ['pingg'],
	execute(bot, message, args) {
	const embed = new Discord.RichEmbed()
    	.setColor('GREEN')
    	.setAuthor('Ping-Pong! 🏓')
    	.setDescription(`${Date.now() - message.createdTimestamp}`+ ' ms')
    	.setTimestamp()
 	message.channel.send(embed);
	},
};