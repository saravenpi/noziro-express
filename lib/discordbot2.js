module.exports = function(Discord, Canvas) {
var client = new Discord.Client();
client.login(process.env.DISCORDTOKEN2);
const { registerFont } = require('canvas')
const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
    warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
    kickThreshold: 7, // Amount of messages sent in a row that will cause a ban.
    banThreshold: 7, // Amount of messages sent in a row that will cause a ban.
    maxInterval: 2000, // Amount of time (in milliseconds) in which messages are considered spam.
    warnMessage: '{@user}, Please stop spamming.', // Message that will be sent in chat upon warning a user.
    kickMessage: '**{user_tag}** has been kicked for spamming.', // Message that will be sent in chat upon kicking a user.
    banMessage: '**{user_tag}** has been banned for spamming.', // Message that will be sent in chat upon banning a user.
    maxDuplicatesWarning: 5, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesKick: 8, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesBan: 10, // Amount of duplicate messages that trigger a warning.
    exemptPermissions: [ 'ADMINISTRATOR'], // Bypass users with any of these permissions.
    ignoreBots: true, // Ignore bot messages.
    verbose: true, // Extended Logs from module.
    ignoredUsers: [], // Array of User IDs that get ignored.
    // And many more options... See the documentation.
});

client.on('message', (message) => antiSpam.message(message));
client.on("message", message => {

  if((message.content.startsWith("!ban")) {
  const args = message.content.split(' ').slice(1); // All arguments behind the command name with the prefix

              const user = message.mentions.users.first(); // returns the user object if an user mention exists
              const banReason = args.slice(1).join(' '); // Reason of the ban (Everything behind the mention)
              ​
              // Check if an user mention exists in this message
              if (!user) {
              try {
              // Check if a valid userID has been entered instead of a Discord user mention
              if (!message.guild.members.get(args.slice(0, 1).join(' '))) throw new Error('Couldn\' get a Discord user with this userID!');
              // If the client (bot) can get a user with this userID, it overwrites the current user variable to the user object that the client fetched
              user = message.guild.members.get(args.slice(0, 1).join(' '));
              user = user.user;
              } catch (error) {
              return message.reply('Couldn\' get a Discord user with this userID!');
              }
              }
              if (user === message.author) return message.channel.send('You can\'t ban yourself'); // Check if the user mention or the entered userID is the message author himsmelf
              if (!reason) return message.reply('You forgot to enter a reason for this ban!'); // Check if a reason has been given by the message author
              if (!message.guild.member(user).bannable) return message.reply('You can\'t ban this user because you the bot has not sufficient permissions!'); // Check if the user is bannable with the bot's permissions
              ​
              await message.guild.ban(user).catch(() => {
                message.channel.send("You don't have permissions for that");
              }); // Bans the user
              ​
              const Discord = require('discord.js'); // We need Discord for our next RichEmbeds
              const banConfirmationEmbed = new Discord.RichEmbed()
              .setColor('RED')
              .setDescription(`✅ ${user.tag} has been successfully banned!`);
              .addField("Reason: ", reason)
              message.channel.send({
              embed: banConfirmationEmbed
              }); // Sends a confirmation embed that the user has been successfully banned

  }
});

client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === '🛬-welcome-🛫');
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('/app/ressources/yay.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
  registerFont('/app/ressources/anonymous_pro.ttf', { family: 'anonymouspro' })



	ctx.font = '28px anonymouspro';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);



  const applyText = (canvas, text) => {
  	const ctx = canvas.getContext('2d');

  	// Declare a base size of the font
  	let fontSize = 70;

  	do {
  		// Assign the font to the context and decrement it so it can be measured again
  		ctx.font = `${fontSize -= 10}px anonymouspro`;
  		// Compare pixel width of the text to the canvas minus the approximate avatar size
  	} while (ctx.measureText(text).width > canvas.width - 300);

  	// Return the result to use in the actual canvas
  	return ctx.font;
  };


	// Add an exclamation point here and below
	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Welcome to the Code & Chill, ${member}!`, attachment);
});



};
