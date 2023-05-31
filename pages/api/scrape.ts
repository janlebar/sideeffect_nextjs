import cheerio from 'cheerio'; // Importing the cheerio library which is used to parse HTML and XML documents.

import axios from 'axios'; // Importing the axios library which is used to make HTTP requests.

import { NextApiRequest, NextApiResponse } from 'next'; // Importing the Next.js API Request and Response interfaces.

export default async function handler(req: NextApiRequest, res: NextApiResponse) { // Defining the API endpoint handler function.
  const { url } = req.query; // Destructuring the "url" query parameter from the request object.

  try { // Wrapping the code in a try-catch block to handle any errors that may occur.
    const { data } = await axios.get(url as string); // Making an HTTP GET request to the URL specified in the "url" query parameter.
    const $ = cheerio.load(data); // Parsing the HTML content using cheerio.

    // vsi h3 naslovi za #professional-info elementom
    const allTitles = $('.contentBox #professional-info').nextAll("h3").get();

    // lista vseh simptomov
    const results = [];

    // regex ki matcha elemente med posameznimi kategorijami simptomov in dobi occurance, from, to in list simptomov
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