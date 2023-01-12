#!/bin/bash -eu

mysql=( mysql --protocol=socket -uroot -p"${MARIADB_ROOT_PASSWORD}" )

"${mysql[@]}" <<-EOSQL
    CREATE OR REPLACE USER '${MARIADB_USER}'@'%' IDENTIFIED BY '${MARIADB_PASSWORD}';
    GRANT ALL ON tts.* TO '${MARIADB_USER}'@'%' ;
EOSQL