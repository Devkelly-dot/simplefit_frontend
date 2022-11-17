import authFetch from "./authFetch"
export default async function retrieveDayplanGeneral(token)
{
  if(!token || token==="")
    return {"Error":"No Token Provided"}

  const url = process.env.REACT_APP_API+'dayplan/dayplans/mydayplans/'

  const res = await authFetch(url, {
      token:token
  })
  const data = await res.json()

  let dayplans = {}
  const days = {
    "SU":"Sunday",
    "MO":"Monday",
    "TU":"Tuesday",
    "WE":"Wednesday",
    "TH":"Thursday",
    "FR":"Friday",
    "SA":"Saturday"
  }

  const day_innitials = ["SU","MO","TU","WE","TH","FR","SA"]
  let calorie_dict = {}

  for(let i in data)
  {
    if(data[i].extra)
    {
      calorie_dict = data[i].extra
      continue
    }

    let dayplan = {}
    dayplan["id"] = data[i].id
    dayplan["goal"] = data[i].goal
    dayplan["day"] = days[data[i].day]

    for(let j in days)
    {
      dayplan["lift"] = []
      dayplan["cardio"] = []
      dayplan["food"] = []
    }

    dayplans[data[i].day] = dayplan
    
  }

  for(let j in day_innitials)
  {
    dayplans[day_innitials[j]]["complete"] = calorie_dict[day_innitials[j]]
  }

  return {"Success":dayplans}
}