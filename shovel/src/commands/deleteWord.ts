import { ApplicationCommandOptionChoice } from "discord.js/typings"
import { CommandInteraction, ApplicationCommandData, MessageEmbed } from "discord.js"
import { deleteWord, getWords } from "../db/database";
import { loadDeleteCommand } from "../client";

export const registerDeleteWord:ApplicationCommandData = {
    name: "deleteword",
    description: "delete registered word(Deprecated)",
    options: [
        {
            name: "word",
            description: "delete this word",
            type: "STRING",
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
                        type: "STRING",
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
    const word = options.getString("word", true);
    if(!guildId) return interaction.reply("this command is unable exclude textChannel!");
    await interaction.reply("処理中");

    const result = await deleteWord(guildId, word);
    const embed = new MessageEmbed({
        author: {
            name: clientUser?.username
        }       
    });
    if(result){
        embed.setDescription("削除成功");
        embed.setColor("BLUE");
        embed.addField(word,"を単語辞書から削除しました");
    }else {
        embed.setDescription("エラー");
        embed.setColor("RED");
        if(result != null)
            embed.addField(word,"は単語辞書に存在しません");
        else
            embed.addField("予期せぬエラー","開発者に問い合わせください");
    }

    interaction.editReply({embeds: [embed]});
    loadDeleteCommand()
}