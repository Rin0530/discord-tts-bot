import { VoiceState } from "discord.js";
import * as voice from '@discordjs/voice'
import { disconnect } from "../util/disconnection";

export function onVoiceStateUpdate(oldState:VoiceState, newState:VoiceState, ){
    const connection = voice.getVoiceConnection(oldState.guild.id)
    
    if(connection && oldState.channel && oldState.channel.members.filter(fn => !fn.user.bot).size == 0){
        disconnect(connection, oldState.guild.id);
    }
  }