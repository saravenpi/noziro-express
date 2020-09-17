module.exports = function(Discord, Canvas, AntiSpam) {
var client = new Discord.Client();
client.login(process.env.DISCORDTOKEN2);
const { registerFont } = require('canvas')
const antiSpam = new AntiSpam({
    warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
    kickThreshold: 5, // Amount of messages sent in a row that will cause a ban.
    banThreshold: 5, // Amount of messages sent in a row that will cause a ban.
    maxInterval: 3000, // Amount of time (in milliseconds) in which messages are considered spam.
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
var prefix = "!"
client.on('message', async message => {
var command = prefix + message.content
          antiSpam.message(message)
          if (message.content.includes('discord.gg/'||'discordapp.com/invite/')) {
            if (!message.member.hasPermission('ADMINISTRATOR')) {
              message.delete() //delete the message
                .then(message.reply('**Invite links are not permitted on this server**'))
            }
            }
          if(command === "purge"){
             if(!message.member.hasPermission("MANAGE_MESSAGES")) return perm("MANAGE_MESSAGES")
             var messagecount = 100;

               if (!args[1]) return us("clear <@ ou id de membre> <number>")
               if(args.isNaN) return us("clear <@ ou id de membre> <number>")
               var memb = message.mentions.members.first() || message.guild.members.get(arg[0])

               if (args.length > 0) {
                   messagecount = parseInt(args[1]);
                   }

               message.channel.fetchMessages({limit: 100}).then(function(messages) {
                 var messageArray = messages.array();

                   messageArray.length = messagecount;

                   ok("clear effectué pour les messages de " + memb.user.tag,messageArray.length + " messages")
               messageArray.map(function(m) { m.delete().catch(e => console.log(e.stack)); })});
           }

          // mute

          if(command === "mute"){
             if(message.member.roles.has(cfg[message.guild.id].role.mod) || message.member.hasPermission("ADMINISTRATOR")) {
               var m = message.mentions.members.first() || message.guild.members.get(arg[0])
               var r = args.slice(1).join(" ") || "pas de raison"
               if(!m) return us("mute <@ ou id de membre> (raison)")

               if(message.user === m.user) return imp("rendre muet ce membre")
               if(m.roles.has(cfg[message.guild.id].role.mod) || m.hasPermission("ADMINISTRATOR") || m.roles.has(cfg[message.guild.id].role.mute)) return imp("rendre muet ce membre")

               var test2 = message.guild.roles.get(cfg[message.guild.id].role.mute)
               if(!test2){
                 try{
                     var rol = await message.guild.createRole({
                       name: "muted",
                       color: "#010101",
                       permissions:[]
                     })
                     message.guild.channels.forEach(async (channel, id) => {
                       await channel.overwritePermissions(rol, {
                         SEND_MESSAGES: false,
                         ADD_REACTIONS: false
                       });
                     });

                   cfg[message.guild.id].role.mute = rol.id
                   if(m.roles.has(cfg[message.guild.id].role.mute)) return imp("rendre muet cet utilisateur")
                   }catch(e){
                     console.log(e.stack);
                   }
                 }

               await(m.addRole(cfg[message.guild.id].role.mute)).catch(e => { imp("rendre muet cet utilisateur")})
               ok(m.user.tag + " à été mute avec succès", r)
               dm(m,"server: " + message.guild.name,"vous avez été mute par " + message.author.tag,r)

             } else {
               perm("ADMINISTRATOR | role de modérateur")
             }

             fs.writeFile('./config.json', JSON.stringify(cfg, null, 2), (err) => {
               if (err) console.log(err)
             })
           }

          // clear ( clear que les message de la personne mentionnée si tu remplace par client.user.id sans le filtre ça clear que les messages de l'utilisateur du self )

           if(command === "clear"){
             if(!message.member.hasPermission("MANAGE_MESSAGES")) return perm("MANAGE_MESSAGES")
             var messagecount = 100;

               if (!args[1]) return us("clear <@ ou id de membre> <number>")
               if(args.isNaN) return us("clear <@ ou id de membre> <number>")
               var memb = message.mentions.members.first() || message.guild.members.get(arg[0])

               if (args.length > 0) {
                   messagecount = parseInt(args[1]);
                   }

               message.channel.fetchMessages({limit: 100}).then(function(messages) {
                 var messageArray = messages.array();

                   messageArray = messageArray.filter(function(m) { return m.author.id === memb.user.id; });
                   messageArray.length = messagecount;

                   ok("clear effectué pour les messages de " + memb.user.tag,messageArray.length + " messages")
               messageArray.map(function(m) { m.delete().catch(e => console.log(e.stack)); })});
           }

          //et la le say ( il pue la merde pcq c un vieux )





          if (command.startsWith("kick")) {
            var member = message.mentions.members.first();
            member.kick().then(member => {
              message.channel
                .send(":wave: " + member.displayName + "has been kicked")
                .catch(() => {
                  message.channel.send("You don't have permissions for that");
                });
            });
          }
          if (command.startsWith("ban")) {
            var member = message.mentions.members.first();
            member.ban().then(member => {
              message.channel
                .send(":wave: " + member.displayName + "has been banned")
                .catch(() => {
                  message.channel.send("You don't have permissions for that");
                });
            });
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
