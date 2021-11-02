import { ApplicationCommandData, CommandInteraction, InteractionReplyOptions, MessageEmbed } from "discord.js";
import { registerPitch } from "../db/database";

export const registerSetPitch:ApplicationCommandData = {
    name: "setpitch",
    description: "Set pitch when this bot speak your text.",
    options: [
        {
            name: "pitch",
            description: "set between -20.0 and 20.0",
            type: "NUMBER",
            required: true
        }
    ]
}

export async function setpitch(interaction:CommandInteraction){
    const member = interaction.member;
    if(!member) return interaction.reply("API guild user can not use this command!");

    const userId = member.user.id;
    const pitch = interaction.options.getNumber("pitch",true);

    if(pitch < -20 || pitch > 20)
        return interaction.reply("The pitch must range between -20.0 and 20.0.");
    
    const result = await registerPitch(userId, pitch);
    const success = new MessageEmbed({
        author: {
            name: interaction.client.user?.username
        },description: "pitchの設定が完了しました",
        color: "GREEN",
        fields: [
            {
                name: member.user.username+"のピッチを",
                value: pitch+"に設定しました"
            }
            
        ]
    });
    const failed = new MessageEmbed({
        author: {
            name: interaction.client.user?.username
        },description: "pitchの設定に失敗しました",
        color: "GREEN",
        fields: [
            {
                name: "ピッチの設定に失敗しました。",
                value: "何度か試しても成功しない場合は開発者にご連絡ください"
            }
            
        ]
    });

    const replyOption:InteractionReplyOptions = {embeds:[result ? success : failed], ephemeral:true}
    return interaction.reply(replyOption);
}