import { User } from "../data-models/User";

export default async function userShowMe(req, res) {
  const user = await User.getById(req.userID);
  const dto = user.asDTO();
  res.status(200).send(dto);
}
