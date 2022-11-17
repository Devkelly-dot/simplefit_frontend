import authFetch from "./authFetch"
export default async function deleteDayplanExcersize(token,type,lift_id)
{
  if(type === 'lift')
    type='lifts'
  const url = process.env.REACT_APP_API + `dayplan/${type}/${lift_id}/delete/`
  
  const res = await authFetch(url, {
    token:token,
    method: "POST"
  })

  const data = await res.json()
  return data
}