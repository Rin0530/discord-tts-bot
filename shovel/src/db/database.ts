import { Guild } from "discord.js";
import * as mariadb from "mariadb";

const pool = mariadb.createPool({
    host: "mariadb",
    user: process.env["MARIADB_USER"],
    password: process.env["MARIADB_PASSWORD"],
    database: process.env["MARIADB_DATABASE"]
});


export async function registerWord(guild:Guild, before:string, after:string):Promise<boolean>{  
    await initialize(guild)
    return await new Promise((resolve )=> {
        pool.getConnection().then(conn => {
            const query = `INSERT INTO wordsDict VALUES (?) ON DUPLICATE KEY UPDATE \`before\` = ? AND \`guild_id\` = ?;`;
            conn.query(query, [[before, after, guild.id], after, guild.id])
                .then(res =>{
                    console.log("query success")
                    console.log(res)
                    conn.end()
                    resolve(true);
                })
                .catch(err => {
                    console.log("query failed")
                    console.log(err)
                    conn.end()
                    resolve(false)
                })
        });
    });
}

export async function getWords(guildId:string):Promise<{[key:string]: string;}> {
    return await new Promise((resolev) => {
        pool.getConnection().then(conn => {
            const query = `SELECT * FROM wordsDict WHERE \`guild_id\` = ?`
            conn.query(query,guildId)
                .then(res => {
                    conn.end()
                    //レスポンスをjson形式にパース
                    const result:{[key:string]: string;} = {};
                    for(let v of res) result[v.before] = v.after;
                    resolev(result)
                })
                .catch(err => {
                    console.log(err)
                    conn.end()
                    resolev({"before":""})
                })
        })
    })
}

export async function deleteWord(guildId:string, word:string):Promise<boolean|null>{
    return await new Promise(resolve => {
        pool.getConnection().then(async conn => {
            const query = `DELETE FROM wordsDict WHERE (\`before\` = ? AND \`guild_id\` = ?)`;
            conn.query(query, [word, guildId])
            .then(res => {
                conn.end();
                if(res["affectedRows"] >= 1)
                    resolve(true)
                else
                    resolve(false)
            })
            .catch(err => {
                console.log(err);
                conn.end();
                resolve(null)
            })
        })
    })
}

export async function registerPitch(userId:string, pitch:number):Promise<boolean>{
    return await new Promise(resolve => {
        pool.getConnection().then(async conn => {
            const query = "INSERT INTO pitch VALUES (?) ON DUPLICATE KEY UPDATE pitch = ?";
            conn.query(query, [[userId, pitch.toString()], pitch.toString()])
                .then(() => {
                    conn.end();
                    resolve(true);
                })
                .catch(err => {
                    console.log(err);
                    conn.end();
                    resolve(false);
                })
        });
    })
}

export async function getPitch(userId:string):Promise<number>{
    return await new Promise(resolve => {
        pool.getConnection().then(conn => {
            const query = "SELECT pitch FROM pitch WHERE id = ?"
            conn.query(query, userId)
                .then(res => {
                    const pitch:number = res[0]["pitch"];
                    conn.end();
                    resolve(pitch);
                })
                .catch(err => {
                    console.log(err);
                    conn.end();
                    resolve(-100);
                })
        })
    })
}

async function isExistTable(guild:Guild):Promise<boolean>{
    return await new Promise(resolve => {
        pool.getConnection().then(conn =>{
            const query = `SELECT 1 FROM wordsDict WHERE \`guild_id\` = ?;`
            let bool:boolean;
            conn.query(query, guild.id)
                .then(res => {
                    if(res.length >= 1)
                        bool = true
                    else
                        bool = false
                })
                .catch(() => bool = false)
                .finally(() => {
                    conn.end();
                    resolve(bool)
                })
        })
    });
}

function updateGuildName(guild:Guild){
    pool.getConnection().then(conn => {
        const query = "INSERT INTO guilds VALUES (?) ON DUPLICATE KEY UPDATE id = ?";
        conn.query(query, [[guild.id, guild.name], guild.id] )
            .catch(err => console.log(err))
            .finally(() => conn.end())
    })
}

export async function initialize(guild:Guild){
    const exist = await isExistTable(guild);
    if(!exist){
        updateGuildName(guild)
    }
}
