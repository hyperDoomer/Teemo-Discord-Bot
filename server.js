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

bot.on('message',async message => {
  if(message.author.bot)
{
if(message.embeds)
{
  const embedMsg = message.embeds.find(msg => msg.title === '**<:borderarrowhover5432523452345234:603725501672062987>TEEMO BOT ROLES<:borderarrowhover2451253412321312:603725502770839572>**');
  if(embedMsg)
  {
    await embedMsg.message.react('609438100329988171');
    await message.react('609438100011221025');
    await message.react('609438100292370442');
    await message.react('609438100263010314');
    await message.react('609438103236640787');
    await message.delete(20000);
    await (err => console.error);
  }
}
return;
}
});

bot.on('messageReactionAdd',async (reaction, user) => {

var roles = ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'];

  if(user.bot)
    return;

  var roleName = reaction.emoji.name;
  if(!roles.includes(roleName)) return;
  var role = reaction.message.guild.roles.find(role => role.name.toLowerCase() === roleName.toLowerCase());
  if(!role){
    role = await reaction.message.guild.createRole({name: roleName, color: '#c09e16', mentionable: true,});
  };
  var member = reaction.message.guild.members.find(member => member.id === user.id);

  if(member.roles.has(role.id))
  {
    member.removeRole(role.id)
    reaction.remove(user);
    reaction.message.channel.send(member.user.username + "**Removed **" + "**role **" + roleName ); 
  } 
  else {
  member.addRole(role.id);
  reaction.remove(user); 
  reaction.message.channel.send(member.user.username + "** Added **" + "** role **" + roleName );
}});

let shtyka = process.openStdin()
shtyka.addListener("data", r => {
    let x = r.toString().trim().split(/ +/g)
        bot.channels.get("597554655937036313").send(x.join(" "));
    });
process.openStdin().addListener("data", c => {
    const args = c.toString().slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
        if(c.indexOf('!') !== 0)return;
        switch(command){
            case 'guilds':
            console.log(bot.guilds.map(i => `${i.name}: ${i.id}`).join("\n"))
            break;
            
            case 'invite':
            var arg0 = bot.guilds.get(args[0])
            if(!arg0)return console.error('[err] Укажите айди сервера');
            bot.guilds.get(args[0]).channels.filter(i => i.type == 'text').first()
            .createInvite().then(i => console.log(`Invite on ${bot.guilds.get(args[0]).name}: ${i.url}`))
            break;
        }
	});

bot.login(token);