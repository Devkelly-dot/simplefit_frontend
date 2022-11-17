import authFetch from "./authFetch"
export default async function updateDayplanItem(token,type,object)
{
  if(type === 'lift')
    type+='s'
  const url = process.env.REACT_APP_API + `dayplan/${type}/${object.id}/update/`
  const allowed_params = ["name","description","complete","goal","weight","reps","measurement"]
  let update = {}
  for(let i in allowed_params)
  {
    const field = allowed_params[i]
    if(object[field]!==null)
      update[field] = object[field]
  }
  const bodd = JSON.stringify(update)
  const res = await authFetch(url, {
    token:token,
    method: "POST",
    body:bodd
  })

  const data = await res.json()
}