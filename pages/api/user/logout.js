export default async function handler(req, res) {
  await dbConnect();
  const { method} = req;
  switch (method) {
    case "POST":
      try {
        res.cookies.set(USER_TOKEN, '', { httpOnly: true, maxAge: 24*60*60*1000 })
      } catch (err) {
        res.status(404).json(err);
      }
      break;
    default:
      res.status(404).json({ error: `mehtod ${method} is not allowed ` });
      break;
  }
}
export const config = {
    runtime: 'edge',
  }