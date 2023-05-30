import cheerio from 'cheerio';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  try {
    const { data } = await axios.get(url as string);
    const $ = cheerio.load(data);

    const allTitles = $('.contentBox #professional-info').nextAll("h3").get();

    const results = [];

    const regex = /(Rare|Common|Uncommon)\s\((\d+(?:\.\d+)?)%\s(to)\s(\d+(?:\.\d+)?)%\):\s(.+)/;

    let id = 1; // Add an id counter

    for (const h3 of allTitles) {
      for (const content of $(h3).nextUntil('h3').get()) {
        const matches = $(content).text().match(regex);
        if (!matches) continue;

        results.push({
          id: id.toString(), // Assign the id as a string
          category: $(h3).text(),
          occurrence: matches[4], // Update the occurrence to the fourth captured group
        });

        id++; // Increment the id counter
      }
    }

    res.status(200).json(results);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}




//  vrne naslove

// import cheerio from 'cheerio';
// import axios from 'axios';
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { url } = req.query;

//   try {
//     const { data } = await axios.get(url);
//     const $ = cheerio.load(data);

//     // Scrape all h2 titles
//     const html = $('h2').map((i, el) => $(el).text()).get();

//     res.status(200).json({ html });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }