import authFetch from "./authFetch"
export default async function createDayplanExcersize(token,dayplan_id,type,object)
{
  const url = process.env.REACT_APP_API + `dayplan/dayplans/${dayplan_id}/${type}/`
  console.log(url)
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
  return data
}