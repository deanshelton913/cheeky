import { Validator } from "../Validator";
import { Channel } from "../data-models/Channel";

export default async function channelCreate(req, res) {
  console.log('Room Create.')
  const {gender, radius, lat, lon, units, owner} = Validator.validateChannelCreate(req.body);
  const channel = new Channel(gender, radius, units, lat, lon, owner);
  await channel.save();
  const dto = channel.asDTO();
  console.log('Room Create Success.', dto)
  res.status(201).send(dto);
}
