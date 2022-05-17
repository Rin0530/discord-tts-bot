import { Client } from "discord.js"
import { registerDeleteWordForGuild } from "../commands/deleteWord"

export async function loadDeleteCommand(client:Client) {
  const guilds = client.guilds.cache
  for(let guild of guilds){    
    guild[1].commands.create(await registerDeleteWordForGuild(guild[0]))
  }
}