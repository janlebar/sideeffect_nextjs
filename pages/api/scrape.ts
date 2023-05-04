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


import cheerio from 'cheerio'; // Importing the cheerio library which is used to parse HTML and XML documents.

import axios from 'axios'; // Importing the axios library which is used to make HTTP requests.

import { NextApiRequest, NextApiResponse } from 'next'; // Importing the Next.js API Request and Response interfaces.

export default async function handler(req: NextApiRequest, res: NextApiResponse) { // Defining the API endpoint handler function.
  const { url } = req.query; // Destructuring the "url" query parameter from the request object.

  try { // Wrapping the code in a try-catch block to handle any errors that may occur.
    const { data } = await axios.get(url); // Making an HTTP GET request to the URL specified in the "url" query parameter.
    const $ = cheerio.load(data); // Parsing the HTML content using cheerio.

    // Scrape all h2 titles
    const h2Titles = $('h2').map((i, el) => $(el).text()).get(); // Extracting all the h2 tag titles.

    // Scrape everything under the h2 titles
    const h2Content = $('h2').map((i, el) => {
      const title = $(el).text(); // Getting the h2 tag title.
      const content = $(el).nextUntil('h2').map((j, e) => $(e).html()).get(); // Getting all the content under the h2 tag until the next h2 tag is encountered.
      return { title, content };
    }).get();

    // const html = h2Titles.join('') + h2Content.join('');

    res.status(200).json({ h2Titles, h2Content }); // Sending a JSON response containing the extracted h2 titles and their corresponding content.
  } catch (error) { // Catching any errors that may have occurred.
    res.status(500).json({ error: error.message }); // Sending a JSON response with an error message.
  }
}



