import { ApplicationCommandData, CommandInteraction } from "discord.js"
import { ApplicationCommandOptionType } from "discord-api-types/v10";
import { createWriteStream } from "fs"
import { getWords } from "../db/database";

const METHOD = {
    file: "file",
    codeBlock: "codeBlock"
}

export const registerList:ApplicationCommandData = {
    name: "list",
    description: "Send word dictionary.",
    options: [
        {
            name: "method",
            description: "TransmissionMethod",
            type: ApplicationCommandOptionType.String,
            required: false,
            choices: [
                {
                    name: METHOD.codeBlock,
                    value: METHOD.codeBlock
                },
                {
                    name: METHOD.file,
                    value: METHOD.file
                }
            ]
        }
    ]
}

export async function list(interaction:CommandInteraction) {
    const guildId = interaction.guildId;
    const option = interaction.options.get("method",false)
    const method = option?.value ? option.value : METHOD.codeBlock
    if(!guildId)
        return interaction.reply("this command is unable exclude textChannel!");
    
    await interaction.reply("処理中");

    const result = await getWords(guildId);        
    if(Object.keys(result).length == 0)
        return interaction.editReply("辞書ファイルは存在しません")
    
    switch(method){
        case METHOD.codeBlock:
            let text = "\`\`\`\n"
            for(let before in result)
                text += `${before}, ${result[before]}\n`
            text += "\`\`\`"
            interaction.editReply(text)
            break;
        case METHOD.file:
            const stream = createWriteStream("./list.txt")
            for(let before in result)
                stream.write(`${before}, ${result[before]}\n`)
            stream.end("\n")
            interaction.editReply({
                files: ["./list.txt"],
                content: ""
            })
            break;
    }    
}