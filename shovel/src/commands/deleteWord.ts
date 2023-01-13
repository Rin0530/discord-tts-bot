import { ApplicationCommandOptionType } from "discord-api-types/v10"
import { CommandInteraction, ApplicationCommandData, Colors, EmbedBuilder } from "discord.js"
import { deleteWord, getWords } from "../db/database";
import { loadDeleteCommand } from "../util/loadDeleteCommand";

export const registerDeleteWord:ApplicationCommandData = {
    name: "deleteword",
    description: "delete registered word(Deprecated)",
    options: [
        {
            name: "word",
            description: "delete this word",
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ]
}

export async function registerDeleteWordForGuild(guildId:string):Promise<ApplicationCommandData> {
    const words = await getWords(guildId);
    const choices:[{ name: string; value: string; }] = [{
        name: "dummy",
        value: "dummy"
    }]
    for(let before in words){        
        choices.push({
            name: before,
            value: before
        })
    }
    
    //dummy削除
    choices.shift()
    
    return new Promise(resolve => {
        resolve(
            {
                name: "deleteword",
                description: "delete registered word",
                options: [
                    {
                        name: "word",
                        description: "delete this word",
                        type: ApplicationCommandOptionType.String,
                        required: true,
                        choices: choices
                    }
                ]
            }
        )
    })
}

export async function deleteword(interaction:CommandInteraction){
    const clientUser = interaction.client.user
    const {guildId, options} = interaction;
    const word = options.get("word", true).value;
    if(!guildId) return interaction.reply("this command is unable exclude textChannel!");
    await interaction.reply("処理中");
    if(!word) return
    const result = await deleteWord(guildId, word.toString());
    const embed = new EmbedBuilder({
        author: {
            name: clientUser?.username
        }       
    });
    if(result){
        embed.setDescription("削除成功");
        embed.setColor(Colors.Blue);
        embed.addFields({
            name: word.toString(),
            value:"を単語辞書から削除しました"
        });
    }else {
        embed.setDescription("エラー");
        embed.setColor("#ff0000");
        if(result != null)
            embed.addFields(
                {
                    name: word.toString(),
                    value:"は単語辞書に存在しません"
                }
            );
        else
            embed.addFields(
                {
                    name: "予期せぬエラー",
                    value:"開発者に問い合わせください"
                }
            );
    }

    interaction.editReply({embeds: [embed]});
    loadDeleteCommand(interaction.client)
}