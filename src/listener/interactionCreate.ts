import { Interaction } from "discord.js";
import { commandProcess } from "../commands/mod";

export function onInteraction(interaction:Interaction){
    if(interaction.isCommand())
        commandProcess(interaction);
}