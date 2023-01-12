import { ActivityOptions, ActivityType, Client } from "discord.js";
import { register } from "../commands/mod";
import { loadDeleteCommand } from "../util/loadDeleteCommand";
import { tts } from "../voice/tts";

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

    setInterval(async () => await tts(), 1000)
}