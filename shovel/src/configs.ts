export const configs = {
  token: getToken(),
  credential: getCredential(),
  db_env: getDBENV()
}

function getToken():string{
  const token = process.env["TOKEN"]
  if(token) return token;
  else {
    console.log("TOKEN not found error");
    process.exit(1);
  }
}

function getCredential():string{
  const token = process.env["GOOGLE_APPLICATION_CREDENTIALS"]
  if(token) return token;
  else {
    console.log("GOOGLE_APPLICATION_CREDENTIALS not found error");
    process.exit(1);
  } 
}

function getDBENV() {
  const user = process.env["MARIADB_USER"];
  const passwd = process.env["MARIADB_PASSWORD"];
  const database = process.env["MARIADB_DATABASE"];
  if(!user || !passwd || !database){
    console.log("DB envs not found error");
    process.exit(1);
  }
  return {
    user: user,
    password: passwd,
    database: database
  } as const
}

