//include area
const Discord = require('discord.js');
const { on } = require('nodemon');
const holo = new Discord.Client();
require('dotenv').config();
const prefix = process.env.prefix;
const { ReactionRoleMessage } = require('./Config/Config.json');
const fs = require('fs');

//Extension init
holo.commands = new Discord.Collection();
const commandCore = fs.readdirSync('./Extension/Core').filter((file) => file.endsWith('.js'));
const commandCustom = fs.readdirSync('./Extension/Custom').filter((file) => file.endsWith('.js'));
const commandError = fs.readdirSync('./Extension/Error').filter((file) => file.endsWith('.js'));
const commandEvents = fs.readdirSync('./Extension/Events').filter((file) => file.endsWith('.js'));
const commandFun = fs.readdirSync('./Extension/Fun').filter((file) => file.endsWith('.js'));
const commandModerations = fs.readdirSync('./Extension/Moderations').filter((file) => file.endsWith('.js'));
const commandUtilities = fs.readdirSync('./Extension/Utilities').filter((file) => file.endsWith('.js'));

//Call Extension
for (const file of commandCore) {
  const command = require(`./Extension/Core/${file}`);
  holo.commands.set(command.name, command);
}
for (const file of commandCustom) {
  const command = require(`./Extension/Custom/${file}`);
  holo.commands.set(command.name, command);
}
for (const file of commandError) {
  const command = require(`./Extension/Error/${file}`);
  holo.commands.set(command.name, command);
}
for (const file of commandEvents) {
  const command = require(`./Extension/Events/${file}`);
  holo.commands.set(command.name, command);
}
for (const file of commandFun) {
  const command = require(`./Extension/Fun/${file}`);
  holo.commands.set(command.name, command);
}
for (const file of commandModerations) {
  const command = require(`./Extension/Moderations/${file}`);
  holo.commands.set(command.name, command);
}
for (const file of commandUtilities) {
  const command = require(`./Extension/Utilities/${file}`);
  holo.commands.set(command.name, command);
}

//Actions of bot ready
holo.on('ready', () => {
  holo.user.setPresence({ activity: { name: 'Powered by 結城あやの | Using /help', type: 'STREAMING' }, status: 'dnd' });
  console.log(`Logged in as ${holo.user.tag}!`);
});

//Commands with out prefix
holo.on('message', (msg) => {
  if (msg.content === '標我') {
    if (msg.channel.id !== '819553695766413334') {
      msg.channel.send('請至<#819553695766413334>使用');
    } else {
      // if (msg.author.id === '607446184847605800') {
      // msg.channel.send('我完全不想理你=.=')
      // } else if (msg.author.id === '573089564051111937') {
      // msg.channel.send('再說')
      // } else if (msg.author.id === '277389659947008001') {
      // msg.channel.send('作者還敢玩啊')
      // } else if (msg.author.id === '487804795902492712') {
      // msg.channel.send('你不要以為你開小號我就不會發現')
      // } else {
      holo.commands.get('tag').execute(msg);
      // }
    }
  }
});

//Commands require prefix
holo.on('message', (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'shutdown') {
    if (msg.author.id === '277389659947008001' || msg.author.id === '487804795902492712') {
      holo.commands.get('shutdown').execute(msg);
    } else {
      holo.commands.get('shutdownerror').execute(msg);
    }
  } else if (command === 'help') {
    holo.commands.get('help').execute(msg);
  } else if (command === 'h') {
    holo.commands.get('help').execute(msg);
  } else if (command === 'ping') {
    holo.commands.get('ping').execute(msg);
  } else if (command === 'shig') {
    holo.commands.get('shig').execute(msg);
  } else if (command === 'ui') {
    holo.commands.get('ui').execute(msg);
  } else if (command === 'skill') {
    holo.commands.get('skill').execute(msg);
  } else if (command === '日麻') {
    holo.commands.get('日麻').execute(msg);
  } else if (command === 'shiar') {
    holo.commands.get('shiar').execute(msg);
  } else if (command === 'vote') {
    holo.commands.get('vote').execute(msg);
  } else if (command === 'ばかみたい') {
    holo.commands.get('ばかみたい').execute(msg);
  } /*else if (command === '') {
    holo.commands.get('shig').execute(msg);
  } else if (command === '') {
    holo.commands.get('shig').execute(msg);
  } else if (command === '') {
    holo.commands.get('shig').execute(msg);
  } else if (command === '') {
    holo.commands.get('shig').execute(msg);
  } else if (command === '') {
    holo.commands.get('shig').execute(msg);
  } else if (command === '') {
    holo.commands.get('shig').execute(msg);
  } else if (command === '') {
    holo.commands.get('shig').execute(msg);
  } else if (command === '') {
    holo.commands.get('shig').execute(msg);
  } */ else {
    return;
  }
  //TODO: get info command
});

//Auto add role to new members
holo.on('guildMemberAdd', (member) => {
  holo.commands.get('welcome').execute(member);
});

//Reaction role
holo.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.channel.id == ReactionRoleMessage) {
    /*Reaction Set*/
    if (reaction.emoji.name === ':YAGOO_AND_GUN:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('763739420863102976');
    } else if (reaction.emoji.name === ':watame_2:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('763641242310410261');
    } else if (reaction.emoji.name === ':watame_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('763727368392540160');
    } else if (reaction.emoji.name === ':Wake_up:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('767320685097254912');
    } else if (reaction.emoji.name === ':Waifu:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('779092504728830013');
    } else if (reaction.emoji.name === ':uto_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('777212872035926076');
    } else if (reaction.emoji.name === ':suisei_2:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('779403802439974953');
    } else if (reaction.emoji.name === ':sora_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('779404650784227358');
    } else if (reaction.emoji.name === ':shion_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('817400820705394689');
    } else if (reaction.emoji.name === ':rushia_6:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('771661750453403734');
    } else if (reaction.emoji.name === ':rushia_5:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('763059383579443211');
    } else if (reaction.emoji.name === ':rushia_4:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('777212938183245886');
    } else if (reaction.emoji.name === ':rushia_3:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('764499423307759616');
    } else if (reaction.emoji.name === ':rushia_2:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('779403176750219326');
    } else if (reaction.emoji.name === ':rushia_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('779406886553256006');
    } else if (reaction.emoji.name === ':polka_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('764871823069675570');
    } else if (reaction.emoji.name === ':pekora_4:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('764871662684209192');
    } else if (reaction.emoji.name === ':pekora_3:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('779715864424874013');
    } else if (reaction.emoji.name === ':pekora_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('779405390856716318');
    } else if (reaction.emoji.name === ':pekora_2:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('783330286904541186');
    } else if (reaction.emoji.name === ':padoru_aloe:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('779715735273603093');
    } else if (reaction.emoji.name === ':okayu_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('764797599295209502');
    } else if (reaction.emoji.name === ':noel_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('779092377968443403');
    } else if (reaction.emoji.name === ':neee_ayame:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('765597332154351660');
    } else if (reaction.emoji.name === ':neee_aqua:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('763059462549798946');
    } else if (reaction.emoji.name === ':neee_anemachi:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('783442151387168818');
    } else if (reaction.emoji.name === ':Nakiri_axe:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('784477287117750347');
    }
  } else return;
});

holo.on('messageReactionRemove', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.channel.id == ReactionRoleMessage) {
    /*Reaction Set*/
    if (reaction.emoji.name === ':YAGOO_AND_GUN:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('763739420863102976');
    } else if (reaction.emoji.name === ':watame_2:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('763641242310410261');
    } else if (reaction.emoji.name === ':watame_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('763727368392540160');
    } else if (reaction.emoji.name === ':Wake_up:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('767320685097254912');
    } else if (reaction.emoji.name === ':Waifu:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('779092504728830013');
    } else if (reaction.emoji.name === ':uto_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('777212872035926076');
    } else if (reaction.emoji.name === ':suisei_2:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('779403802439974953');
    } else if (reaction.emoji.name === ':sora_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('779404650784227358');
    } else if (reaction.emoji.name === ':shion_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('817400820705394689');
    } else if (reaction.emoji.name === ':rushia_6:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('771661750453403734');
    } else if (reaction.emoji.name === ':rushia_5:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('763059383579443211');
    } else if (reaction.emoji.name === ':rushia_4:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('777212938183245886');
    } else if (reaction.emoji.name === ':rushia_3:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('764499423307759616');
    } else if (reaction.emoji.name === ':rushia_2:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('779403176750219326');
    } else if (reaction.emoji.name === ':rushia_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('779406886553256006');
    } else if (reaction.emoji.name === ':polka_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('764871823069675570');
    } else if (reaction.emoji.name === ':pekora_4:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('764871662684209192');
    } else if (reaction.emoji.name === ':pekora_3:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('779715864424874013');
    } else if (reaction.emoji.name === ':pekora_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('779405390856716318');
    } else if (reaction.emoji.name === ':pekora_2:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('783330286904541186');
    } else if (reaction.emoji.name === ':padoru_aloe:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('779715735273603093');
    } else if (reaction.emoji.name === ':okayu_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('764797599295209502');
    } else if (reaction.emoji.name === ':noel_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('779092377968443403');
    } else if (reaction.emoji.name === ':neee_ayame:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('765597332154351660');
    } else if (reaction.emoji.name === ':neee_aqua:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('763059462549798946');
    } else if (reaction.emoji.name === ':neee_anemachi:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('783442151387168818');
    } else if (reaction.emoji.name === ':Nakiri_axe:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('784477287117750347');
    }
  } else return;
});

//Login
holo.login(process.env.token);
