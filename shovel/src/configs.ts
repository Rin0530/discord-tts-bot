export const configs = {
  token: getToken(),
  guildId: "728459402641670244",
  credential: getCredential()
}

function getToken():string{
const token = process.env["TOKEN"]
if(token) return token;
  else process.exit(1); 

}

function getCredential():string{
  const token = process.env["GOOGLE_APPLICATION_CREDENTIALS"]
if(token) return token;
  else process.exit(1); 
}