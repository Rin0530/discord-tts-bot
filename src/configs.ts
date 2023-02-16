export const configs = {
  token: getToken(),
  credential: getCredential(),
  db_env: getDBENV()
} as const satisfies {
  token: string,
  credential:string,
  db_env:{
    url:string,
    api_key:string
  }
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
  const url = process.env["PROJECT_URL"];
  const api_key = process.env["API_KEY"]
  if(!url || !api_key){
    console.log(url,api_key);
    
    console.log("DB envs not found error");
    process.exit(1);
  }
  return {
    url: url,
    api_key: api_key
  } as const
}

