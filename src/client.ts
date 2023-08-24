import { Client, GatewayIntentBits, Interaction, VoiceState } from 'discord.js'
import { configs } from './configs'
import { ready, onMessageCreate, onInteraction, onVoiceStateUpdate } from './listener/mod'

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
})

client.on('messageCreate', (message) => onMessageCreate(message));

client.on('ready', () => ready(client));

client.on("interactionCreate", (interaction: Interaction) => onInteraction(interaction))

client.on("voiceStateUpdate", (oldState: VoiceState, newState: VoiceState) => onVoiceStateUpdate(oldState, newState))

client.on("error", error => {
  console.log(error.message);
  process.exit(1)
})

client.login(configs.token);
