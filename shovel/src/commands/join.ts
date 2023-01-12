import { CommandInteraction, GuildMember, MessageEmbed, ApplicationCommandData } from "discord.js"
import * as voice from "@discordjs/voice"
import { initialize} from '../db/database'
import { guildArray, playerArray } from "../util/arrays"
import { PLayerOptions } from "../voice/wordsQue"

export const registerJoin:ApplicationCommandData = {
    name: "join",
    description: "join your VC",
    options: []
}

export async function join(interaction:CommandInteraction) {
    const clientUser = interaction.client.user
    const member = interaction.member; 
    const guild = interaction.guild
    
    if(!(member instanceof GuildMember)) return interaction.reply("API guild user can not use this command!")

    if(interaction.channel?.type != "GUILD_TEXT" || !guild) return interaction.reply("this command is unable exclude textChannel!")

    const textChannelName = interaction.channel.name;
    const VC = member.voice.channel
    
    if(!VC?.joinable) return interaction.reply("You have to connect any VC!!")
    
    await interaction.reply("接続中")

    const conn = voice.joinVoiceChannel({
        channelId: VC.id,
        guildId: VC.guildId,
        adapterCreator: VC.guild.voiceAdapterCreator as voice.DiscordGatewayAdapterCreator
    })
    const reply:MessageEmbed = new MessageEmbed({
        author: {
            name: clientUser?.username
        },
        description: "`接続を完了しました。読み上げを開始します`",
        color: "GREEN",           
    })
    
    reply.addField(
        `${textChannelName}チャンネル`,
        "のテキストを",
        true
    );
    reply.addField(
        `\`${VC.name}\``,
        "で読み上げます",
        true
    );
    reply.setFooter({
        text: "/helpでコマンド一覧を表示できます"
    })

    guildArray[guild.id] = [];
    playerArray[guild.id] = new PLayerOptions(interaction.channel, voice.createAudioPlayer()); 

    initialize(guild);

    if(conn){
        interaction.editReply({
            embeds: [reply]
        })
    }else {
        interaction.editReply("エラー")
    }
}