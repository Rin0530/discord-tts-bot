import { Client, Interaction } from 'discord.js'
import { configs } from './configs'
import { ready, onMessageCreate, onInteraction,  onVoiceStateUpdate} from './listener/mod'

const client = new Client({
  intents : ['GUILDS','GUILD_VOICE_STATES','GUILD_INTEGRATIONS','GUILD_MESSAGES','GUILD_MESSAGE_REACTIONS']
})

client.on('messageCreate', (message) => onMessageCreate(message));

client.on('ready', () => ready(client));

client.on("interactionCreate", (interaction:Interaction) => onInteraction(interaction))

client.on("voiceStateUpdate",(oldState, newState) =>onVoiceStateUpdate(oldState, newState))

client.login(configs.token);
