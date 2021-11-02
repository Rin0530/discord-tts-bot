import { CommandInteraction,ApplicationCommandData } from "discord.js"
import * as join from "./join"
import * as disconnect from "./disconnect"
import * as addWord from "./addWord"
import * as setPitch from "./setPitch"
import * as list from "./list"

const processes = [join.join,disconnect.dc,addWord.addword,setPitch.setpitch, list.list];

export const register:Array<ApplicationCommandData> = [join.registerJoin, disconnect.registerDc,addWord.registerAddWord,setPitch.registerSetPitch, list.registerList]

export function commandProcess(interaction:CommandInteraction) {
    const process = processes.find(value => value.name === interaction.commandName);
    if(!process) 
        return interaction.reply(`${interaction.commandName} was not found`);
    else 
        return process(interaction);
}
