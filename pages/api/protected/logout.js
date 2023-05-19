import { USER_TOKEN } from '../../../lib/constants'
export default async function handler(req, res) {
  const { method} = req;
  switch (method) {
    case "POST":
      try {
        res.setHeader("Set-Cookie",[`${USER_TOKEN}=""; Path=/; Max-Age=2600000;`,`token=${null}; Path=/; Max-Age=480000;`]);
        res.status(200).json({message:"logout successfull"})
           } catch (err) {
        console.log(err)
        res.status(404).json(err);
      }
      break;
    default:
      res.status(404).json({ error: `mehtod ${method} is not allowed ` }).redirect("/");
      break; 
  }
}