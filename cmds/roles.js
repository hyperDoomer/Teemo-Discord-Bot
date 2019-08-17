const Discord = module.require("discord.js");
module.exports = {
	name: 'roles',
	description: 'Roles',
        cooldown: 10,
        guildOnly: true,
    aliases: ['role'],
    args: false,
	execute(bot, message, args) {
        let embed = new Discord.RichEmbed();
        embed.setAuthor('Teemo Bot, for server: '+message.guild.name, message.guild.iconURL);
        embed.setTitle("**<:borderarrowhover5432523452345234:603725501672062987>TEEMO BOT ROLES<:borderarrowhover2451253412321312:603725502770839572>**");
        embed.setColor("RED");
        embed.setThumbnail(`https://cdn.glitch.com/a90c18e0-56f5-4217-a721-f16cb4d618d4%2F190-1900167_super-teemo.png?v=1563898152547`);
        embed.setDescription(message.member + ", сhoose your preferred roles: \n" +
        "<:rankposition_challengertop:609438100329988171> - TOP\n" +
        "<:rankposition_challengerjungle:609438100011221025> - JUNGLE\n" + 
        "<:rankposition_challengermid:609438100292370442> - MID\n" +
        "<:rankposition_challengerbot:609438100263010314> - ADC\n" +
        "<:rankposition_challengersupport:609438103236640787>- SUPPORT\n");
        embed.setFooter('Invite Teemo to your server !t invite', 'https://cdn.glitch.com/a90c18e0-56f5-4217-a721-f16cb4d618d4%2F190-1900167_super-teemo.png?v=1563898152547');
        message.channel.send(embed);
	},
};