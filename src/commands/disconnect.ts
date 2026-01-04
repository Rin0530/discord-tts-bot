import { getVoiceConnection } from "@discordjs/voice";
import { ApplicationCommandData, ChatInputCommandInteraction, CommandInteraction } from "discord.js"
import { disconnect } from "../util/disconnection";

export const registerDc: ApplicationCommandData = {
    name: "dc",
    description: "diconnect from VC"
}

export async function dc(interaction: ChatInputCommandInteraction) {
    const guildID = interaction.guildId;
    if (!guildID) return interaction.reply("this command is unable exclude textChannel!")
    const connection = getVoiceConnection(guildID);

    if (!connection) return interaction.reply("Bot does not connect any VC!");

    disconnect(connection, guildID);
    return interaction.reply("disconnected")
}