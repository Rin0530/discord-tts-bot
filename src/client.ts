import { Client, Interaction, Message, VoiceState } from 'discord.js'
import * as voice from '@discordjs/voice'
import { register, commandProcess } from './commands/mod'
import { guildArray, channelArray, TextQue, playerArray } from './voice/wordsQue'
import { configs } from './configs'
import { tts } from './voice/tts'
import { disconnect } from './voice/disconnection'

const client = new Client({
  intents : ['GUILDS','GUILD_VOICE_STATES','GUILD_INTEGRATIONS','GUILD_MESSAGES','GUILD_MESSAGE_REACTIONS']
})

function addQue(message: Message){
  const guildId = message.guildId;
  if(!guildId || (!guildArray[guildId])) return;
  if(message.channel != channelArray[guildId]) return;
  if(!playerArray[guildId]) playerArray[guildId] = voice.createAudioPlayer();
  guildArray[guildId].push(new TextQue(message.content,message.author.createdTimestamp));
}

function onInteraction(interaction:Interaction){
  if(interaction.isCommand()){
    commandProcess(interaction);
  }
}

function isOnlyBot(voiceState:VoiceState){
  const connection = voice.getVoiceConnection(voiceState.guild.id)
  if(connection && voiceState.channel && voiceState.channel.members.size < 2){
    disconnect(connection, voiceState.guild.id);
  }
}

client.on('messageCreate', message => addQue(message))

client.on('ready', async () => {
  const applicationManager = client.application;
  if(!applicationManager) process.exit(1);
  applicationManager.commands.set(register);
  console.log("login succeed!")
  
  setInterval(async () => await tts(), 1000)
});

client.on("interactionCreate", (interaction:Interaction) => onInteraction(interaction))

client.on("voiceStateUpdate",(oldState) =>isOnlyBot(oldState))

client.login(configs.token);
