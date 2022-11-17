import authFetch from "./authFetch"
export default async function updateDayplanGoal(token,dayplan_id,goal)
{
  const url = process.env.REACT_APP_API + `dayplan/dayplans/${dayplan_id}/goal/`
  
  const bodd = JSON.stringify({"goal":goal})
  const res = await authFetch(url, {
    token:token,
    method: "POST",
    body:bodd
  })

  const data = await res.json()
}