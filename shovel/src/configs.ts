export const configs = {
  token: getToken(),
  credential: getCredential()
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