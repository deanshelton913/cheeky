// import { Validator } from "../Validator";
import { User } from "../data-models/User";
// import fs from 'fs';
// import { promisify } from 'util'
import fetch from 'node-fetch';
// import { FailureByDesign } from "../FailureByDesign";
// const writeFile = promisify(fs.readFile).bind(fs);

export default async function userCreate(req, res) {
  // const { images } = Validator.validateUserCreate(req.body);

  // write images to disk
  // const operations = images.map(async (url, index) => {
  //   const response = await fetch(url);
  //   const buffer = await response.arrayBuffer();
  //   const path = `./${req.userID}-${index}`;
  //   await writeFile(path, buffer);
  //   return path;
  // });

  const fbResponse = await fetch(`https://graph.facebook.com/me?fields=id,name,birthday&access_token=${req.accessToken}`, {
    timeout: 30000
  })
  const {name, birthday} = await fbResponse.json()
  // const imagePaths = await Promise.all(operations)
  const dob = (new Date(birthday).getTime()/1000)
  const user = new User(name, dob, [''], '')
  user.save()
  res.status(201).send(user.asDTO())
}
