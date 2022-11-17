import authFetch from "./authFetch"
export default async function attemptLogin(username,password)
{
  if(!username || username==="")
    return {"Error":"No Username Provided"}
  
  if(!password || password==="")
    return {"Error":"No Password Provided"}

  const url = process.env.REACT_APP_API+'dayplan/users/login/'

  const bodd = JSON.stringify(
    {
        username:username,
        password:password
    }
  )

  const res = await authFetch(url, {
      method: "POST",
      body:bodd
  })
  const data = await res.json()
  const token = data["token"]
  if(token)
  {
    return {"Success":token}
  }
  else
  {
    return {"Error":"Couldn't login"}
  }
}