// import cheerio from 'cheerio'
// import axios from 'axios'
// import { NextApiRequest, NextApiResponse } from 'next'

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { url } = req.query
//   const { data } = await axios.get(url)
//   const $ = cheerio.load(data)
//   const title = $('title').text()
//   const description = $('meta[name="description"]').attr('content')
//   res.status(200).json({ title, description })
// }
import fetch from 'isomorphic-unfetch';
import cheerio from 'cheerio';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const title = $('title').text();
  res.status(200).send(title);
}
