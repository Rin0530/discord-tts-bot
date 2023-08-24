import {
    ApplicationCommandData,
    Colors,
    CommandInteraction,
    EmbedBuilder,
    InteractionReplyOptions
} from "discord.js";
import { ApplicationCommandOptionType } from "discord-api-types/v10"
import { registerPitch } from "../db/database";

export const registerSetPitch: ApplicationCommandData = {
    name: "setpitch",
    description: "Set pitch when this bot speak your text.",
    options: [
        {
            name: "pitch",
            description: "set between -20.0 and 20.0",
            type: ApplicationCommandOptionType.Number,
            required: true
        }
    ]
}

export async function setpitch(interaction: CommandInteraction) {
    const member = interaction.member;
    if (!member) return interaction.reply("API guild user can not use this command!");

    const userId = member.user.id;
    const pitch = interaction.options.get("pitch", true).value as number;
    if (!pitch) return
    if (pitch < -20 || pitch > 20)
        return interaction.reply("The pitch must range between -20.0 and 20.0.");

    await interaction.reply({
        content: "処理中",
        ephemeral: true
    })

    const result = await registerPitch(userId, parseFloat(pitch.toString()));
    const success = new EmbedBuilder({
        author: {
            name: interaction.client.user?.username
        }, description: "pitchの設定が完了しました",
        color: Colors.Green,
        fields: [
            {
                name: member.user.username + "のピッチを",
                value: pitch + "に設定しました"
            }

        ]
    });
    const failed = new EmbedBuilder({
        author: {
            name: interaction.client.user?.username
        }, description: "pitchの設定に失敗しました",
        color: Colors.Green,
        fields: [
            {
                name: "ピッチの設定に失敗しました。",
                value: "何度か試しても成功しない場合は開発者にご連絡ください"
            }

        ]
    });

    const replyOption: InteractionReplyOptions = { embeds: [result ? success : failed], ephemeral: true }
    return interaction.editReply(replyOption);
}