import { ApplicationCommandData, CommandInteraction } from "discord.js/typings/index.js"
import { createWriteStream, exists } from "fs"
import { getWords } from "../db/database";

export const registerList:ApplicationCommandData = {
    name: "list",
    description: "Send word dictionary file."
}

export async function list(interaction:CommandInteraction) {
    const guildId = interaction.guildId;
    if(!guildId)
        return interaction.reply("this command is unable exclude textChannel!");
    
    await interaction.reply("処理中");

    const result = await getWords(guildId);
    if(result["before"] === "")
        return interaction.editReply("辞書ファイルは存在しません")
    
    const stream = createWriteStream("./list.txt")
    for(let before in result)
        stream.write(`${before}, ${result[before]}\n`)
    stream.end("\n")

    interaction.editReply({files: ["./list.txt"]})
}