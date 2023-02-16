# discord-tts-bot

このbotを自前のサーバで動かすためにはこの階層に
- TOKEN // discordBotのトークン
- PROJECT_URL // supabaseのプロジェクトURL
- API_KEY // supabaseのプロジェクトのAPIキー

を記述した.envファイルが必要です。  

また、[Google CloudのText-to-Speech](https://cloud.google.com/text-to-speech)を使用しているので、サービスアカウントのjsonファイルをclient_secret.jsonという名前でshovel以下に配置してください.

さらに[supabase](https://app.supabase.com)のプロジェクトからSQL Editorで
```sql
set time zone "Asia/Tokyo";

create table wordsDict (
  before text not null,
  after text not null,
  guild_id text not null,
  primary key (before, guild_id)
);


alter table wordsDict
  enable row level security;

create table pitch (
  id text,
  pitch float not null,
  primary key (id)
);

alter table pitch
  enable row level security;
```
を実行し、テーブルを作成してください。

2つのファイルが用意できれば、
```bash
docker-compose up
```
で起動することができます。