import { MessageEmbed, ApplicationCommandData, CommandInteraction, EmbedField } from "discord.js"

export const registerHelp:ApplicationCommandData = {
    name: "help",
    description: "help Command",
    
}

export async function help(interaction:CommandInteraction){
    const client = interaction.client
    const commands = client.application?.commands.cache
    const guildCommands = interaction.guild?.commands.cache.first()
    if(!commands || !guildCommands) return interaction.reply("コマンドは存在しません")

    const embeds:MessageEmbed = new MessageEmbed({
        author: {
            name: client.user?.username
        },
        description: "コマンド一覧",
        color: "YELLOW",
    })
    
    for(let command of commands){
        embeds.addField(command[1].name,`\`${command[1].description}\``,false)
    }

    embeds.addField(guildCommands.name, `\`${guildCommands.description}\``, false)

    interaction.reply({embeds:[embeds], ephemeral: true})
}