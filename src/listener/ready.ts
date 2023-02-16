import { ActivityType, Client } from "discord.js";
import { register } from "../commands/mod";
import { loadDeleteCommand } from "../util/loadDeleteCommand";
import { pitchArray, wordsArray } from "../util/arrays";
import { getPitch, getWords } from "../db/database";

export async function ready(client:Client){
    const applicationManager = client.application;
    if(!applicationManager) process.exit(1);
    applicationManager.commands.set(register);
    loadDeleteCommand(client)
    client.user?.setActivity(
        "/helpでコマンド一覧表示",
        {
          type: ActivityType.Playing
        }
      )
    console.log("login succeed!")

    loadWordsDict(client)

    loadPitchs(client)
}

function loadWordsDict(client:Client){
  const guilds = client.guilds.cache
  guilds.forEach(async (guild) => {
    const words = await getWords(guild.id)
    wordsArray[guild.id] = []
    wordsArray[guild.id].push(words)
  })
}

function loadPitchs(client:Client){
  const users = client.users.cache
  users.forEach(async (user) => {
    const pitch = await getPitch(user.id)
    pitchArray[user.id] = pitch
  })
}