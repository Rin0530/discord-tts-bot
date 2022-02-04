#!/bin/bash -eu

mysql=( mysql --protocol=socket -uroot -p"${MYSQL_ROOT_PASSWORD}" )

"${mysql[@]}" <<-EOSQL
    CREATE DATABASE IF NOT EXISTS tts;
    GRANT ALL ON tts.* TO '${MYSQL_USER}'@'%' ;
EOSQL