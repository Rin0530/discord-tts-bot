# discord-tts-bot

このbotを自前のサーバで動かすためにはこの階層に
- TOKEN // discordBotのトークン
- MARIADB_USER　// データベースに接続するユーザ
- MARIADB_PASSWORD // データベースに接続するためのパスワード
- MARIADB_ROOT_PASSWORD // rootでデータベースに接続するためのパスワード

を記述した.envファイルが必要です。  
TOKEN以外の環境変数は任意のもので良いです。  

また、[Google CloudのText-to-Speech](https://cloud.google.com/text-to-speech)を使用しているので、サービスアカウントのjsonファイルをclient_secret.jsonという名前でshovel以下に配置してください

2つのファイルが用意できれば
```bash
docker-compose up
```
で起動することができます。