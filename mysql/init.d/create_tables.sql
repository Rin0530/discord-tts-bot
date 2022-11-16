 -- データベース作成
 CREATE DATABASE IF NOT EXISTS tts;

 -- ピッチ管理テーブル
 CREATE TABLE IF NOT EXISTS `tts`.`pitch` (
   `id` bigint(18) unsigned NOT NULL ,
   `pitch` INT NOT NULL ,
   PRIMARY KEY (`id`));

 -- ギルド管理テーブル
 CREATE TABLE IF NOT EXISTS `tts`.`guilds` (
   `id` bigint(18) unsigned NOT NULL ,
   `name` NVARCHAR(255) NOT NULL ,
   PRIMARY KEY (`id`));

 -- 単語辞書管理テーブル
 CREATE TABLE IF NOT EXISTS `tts`.`wordsDict` (
   `before` VARCHAR(255) NOT NULL,
   `after` VARCHAR(255) NOT NULL,
   `guild_id` bigint(18) unsigned NOT NULL ,
   PRIMARY KEY (`before`,`guild_id`),
   FOREIGN KEY (`guild_id`) 
    REFERENCES `guilds`(`id`)
 );