import { CommandInteraction, GuildMember, MessageEmbed, ApplicationCommandData } from "discord.js"
import * as voice from "@discordjs/voice"
import { guildArray, playerArray, PLayerOptions,} from '../voice/wordsQue'

export const registerJoin:ApplicationCommandData = {
    name: "join",
    description: "join your VC",
    options: []
}

export async function join(interaction:CommandInteraction) {
    const clientUser = interaction.client.user
    const member = interaction.member; 
    const guildID = interaction.guildId

    if(!(member instanceof GuildMember)) return interaction.reply("API guild user can not use this command!")

    if(interaction.channel?.type != "GUILD_TEXT" || !guildID) return interaction.reply("this command is unable exclude textChannel!")

    const textChannelName = interaction.channel.name;
    const VC = member.voice.channel
    
    if(!VC?.joinable) return interaction.reply("You have to connect any VC!!")
    
    voice.joinVoiceChannel({
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

    guildArray[guildID] = [];
    playerArray[guildID] = new PLayerOptions(interaction.channel, voice.createAudioPlayer()); 

    interaction.reply({
        embeds: [reply]
    })
}
//declare type DiscordGatewayAdapterCreator = (methods: DiscordGatewayAdapterLibraryMethods) => DiscordGatewayAdapterImplementerMethods;

//type InternalDiscordGatewayAdapterCreator = (methods: InternalDiscordGatewayAdapterLibraryMethods,) => InternalDiscordGatewayAdapterImplementerMethods;