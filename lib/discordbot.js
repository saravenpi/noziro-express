module.exports = function(Discord, Canvas) {
var client = new Discord.Client();
client.login(process.env.DISCORDTOKEN);
const { registerFont } = require('canvas')
client.on("ready", function(){
  console.log("yay");
});
client.on("message", message => {

  if(message.content === "!ping") {
    message.reply("pong!")
  }
});

client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('/app/ressources/brown.png');
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

	channel.send(`Welcome to the server, ${member}!`, attachment);
});



};
