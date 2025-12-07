import {
    ApplicationCommandData,
    ChatInputCommandInteraction,
    Colors,
    CommandInteraction,
    EmbedBuilder,
    MessageFlags
} from "discord.js"

export const registerHelp: ApplicationCommandData = {
    name: "help",
    description: "help Command",

}

export async function help(interaction: ChatInputCommandInteraction) {
    const client = interaction.client
    const commands = client.application?.commands.cache
    const guildCommands = interaction.guild?.commands.cache.first()
    if (!commands) return interaction.reply("コマンドは存在しません")

    const embeds = new EmbedBuilder({
        author: {
            name: client.user?.username
        },
        description: "コマンド一覧",
        color: Colors.Yellow,
    })

    for (let command of commands) {
        embeds.addFields(
            {
                name: command[1].name,
                value: `\`${command[1].description}\``,
                inline: false
            }
        )
    }

    if (guildCommands != undefined)
        embeds.addFields(
            {
                name: guildCommands.name,
                value: `\`${guildCommands.description}\``,
                inline: false
            }
        )

    interaction.reply({ embeds: [embeds] , flags: MessageFlags.Ephemeral})
}