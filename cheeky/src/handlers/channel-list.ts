import { Validator } from "../Validator";
import { Channel } from "../data-models/Channel";
import express = require("express");

export default async function channelCreate(req: express.Request, res) {
  console.log('Room List.', req.query)
  const {lat, lon, radius, units, gender } = Validator.validateChannelListQuery(req.query);
  const channels = await Channel.findByRadius(lat, lon, radius, units);
  const filteredChannels = channels.filter((c: Channel) => c.gender === gender);
  const dto = filteredChannels.map((c: Channel) => c.asDTO())
  console.log('Found channels by radius', dto)
  res.status(200).send(dto);
}
