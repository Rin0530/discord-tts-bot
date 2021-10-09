import { CommandInteraction } from "discord.js"
import * as join from "./join"
import * as disconnect from "./disconnect"

export const register = [join.registerJoin, disconnect.registerDc]

export function commandProcess(interaction:CommandInteraction) {
    switch(interaction.commandName){
        case "join": return join.join(interaction);
        case "dc" : return disconnect.dc(interaction);
        default: return interaction.reply(`${interaction.commandName} is undefined`)
    }
}