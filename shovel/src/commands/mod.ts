import { CommandInteraction } from "discord.js"
import * as join from "./join"
import * as disconnect from "./disconnect"
import * as setPitch from "./setPitch"
import * as addWord from "./addWord"

const processes = [join.join, disconnect.dc, setPitch.setpitch, addWord.addword]
export const register = [join.registerJoin, disconnect.registerDc,setPitch.registerSetPitch, addWord.registerAddWord]

export function commandProcess(interaction:CommandInteraction) {
    const process = processes.find(value => value.name === interaction.commandName);
    if(!process) 
        return interaction.reply(`${interaction.commandName} was not found`);
    else 
        return process(interaction);
}