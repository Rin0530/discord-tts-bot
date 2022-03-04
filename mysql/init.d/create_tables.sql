 -- データベース作成
 CREATE DATABASE IF NOT EXISTS tts;

 -- ピッチ管理テーブル
 CREATE TABLE IF NOT EXISTS `tts`.`pitch` (
   `id` CHAR(18) NOT NULL ,
   `pitch` INT NOT NULL ,
   PRIMARY KEY (`id`));

 -- ギルド管理テーブル
 CREATE TABLE IF NOT EXISTS `tts`.`guilds` (
   `id` CHAR(18) NOT NULL ,
   `name` NVARCHAR(255) NOT NULL ,
   PRIMARY KEY (`id`));