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
//   // res.status(200).send(data);
// }


//   // TA DELA

// import cheerio from 'cheerio';
// import axios from 'axios';
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { url } = req.query;

//   try {
//     const { data } = await axios.get(url);
//     const $ = cheerio.load(data);

//     // Scrape the title
//     const title = $('title').text();

//     // Scrape the meta description
//     const description = $('meta[name="description"]').attr('content');

//     // Scrape the entire HTML content
//     // const html = $('html').html();
//     const html = $('html').toString();

//     res.status(200).json({ title, description, html });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }


//   // try {
//   //   const { data } = await axios.get(url);
//   //   const $ = cheerio.load(data);

//   //   // Scrape the professional info section
//   //   const professionalInfo = $('#professional-info').html();

//   //   res.status(200).json({ professionalInfo });
//   // } catch (error) {
//   //   res.status(500).json({ error: error.message });
//   // }

// }


import cheerio from 'cheerio';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Scrape all h2 titles
    const html = $('h2').map((i, el) => $(el).text()).get();

    res.status(200).json({ html });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
