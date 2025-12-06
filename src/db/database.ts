import { createClient } from '@supabase/supabase-js'
import { Database } from './models'
import { Guild } from 'discord.js'
import { configs } from '../configs'
import { pitchArray, wordsArray } from '../util/arrays'

// Create a single supabase client for interacting with your database
const client = createClient<Database>(
    configs.db_env.url,
    configs.db_env.api_key,
    {
        auth: {
            persistSession: false
        }
    }
)

export async function registerWord(guild: Guild, before: string, after: string): Promise<boolean> {
    const table = client.from('wordsdict');
    // @ts-ignore
    const { data, error } = await table.upsert(
        {
            before: before,
            after: after,
            guild_id: guild.id
        },
        {
            onConflict: "before,guild_id"
        }
    )

    return !!data
}

export async function getWords(guildId: string): Promise<{ [key: string]: string; }> {
    const table = client.from('wordsdict');
    const { data, error } = await table.select()
    //.eq('guild_id', guildId)

    if (data) {
        const result: { [key: string]: string; } = {};
        for (const v of (data as Database['public']['Tables']['wordsdict']['Row'][])) {
            if (v.guild_id == guildId)
                result[v.before] = v.after;
        }
        return result
    } else
        return {}
}

export async function deleteWord(guildId: string, word: string): Promise<boolean> {
    const table = client.from('wordsdict');
    const { data, error } = await table.delete()
        .eq("guild_id", guildId)
        .eq('before', word)
    return !!data
}

export async function registerPitch(userId: string, pitch: number): Promise<boolean> {
    const table = client.from('pitch');
    // @ts-ignore
    const { data, error } = await table.upsert(
        {
            id: userId,
            pitch: pitch
        },
        {
            onConflict: "id"
        }
    )

    if (!error)
        pitchArray[userId] = pitch

    return !!data
}

export async function getPitch(userId: string): Promise<number> {
    const table = client.from("pitch");
    const { data, error } = await table.select()
    //.eq('id',userId)

    if (data) {
        const res = (data as Database['public']['Tables']['pitch']['Row'][]).find(row => row.id == userId)
        return res?.pitch || -100
    }
    else
        return -100
}