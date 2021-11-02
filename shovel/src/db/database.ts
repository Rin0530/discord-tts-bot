import { Guild } from "discord.js";
import * as mariadb from "mariadb";

const pool = mariadb.createPool({
    host: "mariadb",
    user: "root",
    password: process.env["MARIADB_PASSWORD"],
    database: process.env["MARIADB_DATABASE"]
});


export async function registerWord(guild:Guild, before:string, after:string):Promise<boolean>{  
    const exist = await isExistTable(guild);
    if(!exist)
        await createTable(guild);
    return await new Promise((resolve, reject )=> {
        pool.getConnection().then(conn => {
            const query = `INSERT INTO \`${guild.id}\` VALUES (\"${before}\", \"${after}\") ON DUPLICATE KEY UPDATE \`after\` = \"${after}\";`;
            conn.query(query)
                .then(res =>{
                    console.log("query success")
                    conn.end()
                    resolve(true);
                })
                .catch(err => {
                    console.log("query failed")
                    console.log(err)
                    conn.end()
                    //resolve(false);
                    reject(false)
                })
        });
    });
}

export async function getWords(guildId:string):Promise<{[key:string]: string;}> {
    return await new Promise((resolev, reject) => {
        pool.getConnection().then(conn => {
            const query = `SELECT * FROM \`${guildId}\``
            conn.query(query)
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

export async function registerPitch(userId:string, pitch:number):Promise<boolean>{
    return new Promise(resolve => {
        pool.getConnection().then(async conn => {
            const query = `INSERT INTO pitch VALUES (\'${userId}\', \'${pitch}\') ON DUPLICATE KEY UPDATE pitch = \'${pitch}\'`;
            conn.query(query)
                .then(res => {
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
    return new Promise(resolve => {
        pool.getConnection().then(conn => {
            const query = `SELECT pitch FROM pitch WHERE id = ${userId}`
            conn.query(query)
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

async function createTable(guild:Guild):Promise<number>{
    return new Promise(() => {
        pool.getConnection().then(conn => {
            const query = `CREATE TABLE \`${guild.id}\` ( \`before\` VARCHAR(255) PRIMARY KEY, \`after\` VARCHAR(255) NOT NULL );`;
            conn.query(query)
                .then(() => console.log(guild.id))
                .catch(err => console.log(err))
                .finally(() => conn.end())
        })
        pool.getConnection().then(conn => {
            const query = `INSERT INTO guilds VALUES (\"${guild.id}\", \"${guild.name}\") ON DUPLICATE KEY UPDATE id = \'${guild.id}\'`;
            conn.query(query)
                .finally(() => conn.end())
        })
    })
}

async function isExistTable(guild:Guild):Promise<boolean>{
    return await new Promise(resolve => {
        pool.getConnection().then(conn =>{
            const query = `SELECT 1 FROM \`${guild.id}\` LIMIT 1;`
            conn.query(query)
                .then(() => resolve(true))
                .catch(async () => {
                    resolve(false)
                })
                .finally(() => conn.end())
        })
    });
}
