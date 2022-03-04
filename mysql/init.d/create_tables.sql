 -- データベース作成
 CREATE DATABASE IF NOT EXISTS tts;

 -- ピッチ管理テーブル
 CREATE TABLE IF NOT EXISTS `tts`.`pitch` (
   `id` CHAR(18) NOT NULL ,
   `pitch` INT NOT NULL ,
   PRIMARY KEY (`id`));

 -- 単語辞書管理テーブル
 CREATE TABLE IF NOT EXISTS `tts`.`wordsDict` (
   `before` VARCHAR(255) PRIMARY KEY,
   `after` VARCHAR(255) NOT NULL,
   `guild_id` CHAR(18) NOT NULL ,
   FOREIGN KEY (`guild_id`) 
    REFERENCES `guilds`(`id`)
 );

 -- ギルド管理テーブル
 CREATE TABLE IF NOT EXISTS `tts`.`guilds` (
   `id` CHAR(18) NOT NULL ,
   `name` NVARCHAR(255) NOT NULL ,
   PRIMARY KEY (`id`));