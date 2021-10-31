export const configs = {
    token: getToken(),
    credential: "./optical-legend-292212-a4b8b442a8ba.json"
  }

function getToken():string{
  const token = process.env["TOKEN"]
  if(token) return token;
    else process.exit(1); 

}