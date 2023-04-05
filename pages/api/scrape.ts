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

import cheerio from 'cheerio';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Scrape the title
    const title = $('title').text();

    // Scrape the meta description
    const description = $('meta[name="description"]').attr('content');

    // Scrape the entire HTML content
    const html = $('html').html();

    res.status(200).json({ title, description, html });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
