import { CommandInteraction, ApplicationCommandData, MessageEmbed } from "discord.js"
import { deleteWord } from "../db/database";

export const registerDeleteWord:ApplicationCommandData = {
    name: "deleteword",
    description: "delete registered word",
    options: [
        {
            name: "word",
            description: "delete this word",
            type: "STRING",
            required: true,
        }
    ]
}

export　async function deleteword(interaction:CommandInteraction){
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
}