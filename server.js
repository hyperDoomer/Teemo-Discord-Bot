const fs = require('fs');
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const cmdFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));
for (const file of cmdFiles) {
	const command = require(`./cmds/${file}`);
	bot.commands.set(command.name, command);
}
const config = require('./botconfig.json');
let prefix = config.prefix;
let token = config.token;
    

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.username}!`);
  bot.generateInvite(["ADMINISTRATOR"]).then(link=>
    console.log(link));

});

bot.on('message',async message => {

if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

const command = bot.commands.get(commandName)
|| bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command) bot.commands.get('help').execute(bot, message, ['']);
  
  if (command.guildOnly && message.channel.type !== 'text') {
	return message.reply('I can\'t execute that command inside DMs!');
}
  
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;
  
  if (command.usage) {
  reply += `\nThe proper usage would be: \`${prefix} ${command.name} ${command.usage}\``;
  }
  return message.channel.send(reply);
  }
  
  if (!cooldowns.has(command.name)) {
	cooldowns.set(command.name, new Discord.Collection());
}

const now = Date.now();
const timestamps = cooldowns.get(command.name);
const cooldownAmount = (command.cooldown || 3) * 1000;

if (timestamps.has(message.author.id)) {

const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

	if (now < expirationTime) {
		const timeLeft = (expirationTime - now) / 1000;
		return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
	}
}
timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(bot, message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

bot.on("ready", message => {
bot.user.setActivity('!t help', { type: 'WATCHING' })
});


bot.login(token);