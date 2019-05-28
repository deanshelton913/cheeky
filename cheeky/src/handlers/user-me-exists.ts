import { User } from "../data-models/User";

export default async function userMeExists(req, res) {
  const exists = await User.exists(req.userID);
  const status = (exists ? 200 : 404);
  res.sendStatus(status);
}
