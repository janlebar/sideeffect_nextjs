import cheerio from 'cheerio'; // Uvozimo knjižnico cheerio, ki se uporablja za analizo HTML in XML dokumentov.
import axios from 'axios'; // Uvozimo knjižnico axios, ki se uporablja za pošiljanje HTTP zahtevkov.
import { NextApiRequest, NextApiResponse } from 'next'; // Uvozimo vmesnika Next.js za API zahteve in odgovore.

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Preverimo, ali je metoda zahteve POST
  if (req.method === 'POST') {
    const { urls } = req.body; // Iz telesa zahteve pridobimo seznam URL-jev

    // Preverimo, ali je 'urls' polje in če ima vsaj en element
    if (!Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({ error: 'Invalid or empty URL list' }); // Če je seznam prazen ali neveljaven, vrnemo napako 400
    }

    try {
      const results = []; // Ustvarimo prazen seznam za shranjevanje rezultatov

      // Zanka, ki iterira čez vse URL-je v seznamu 'urls'
      for (const urlInput of urls) {
        const url = `https://www.drugs.com/sfx/${urlInput}-side-effects.html`; // Sestavimo URL za vsako vneseno ime zdravila
        const { data } = await axios.get(url); // Pošljemo GET zahtevo na zgrajeni URL in pridobimo HTML vsebino
        const $ = cheerio.load(data); // Naložimo HTML vsebino z uporabo cheerio

        const allTitles = $('#professional-info').nextAll("h3").get(); // Dobimo vse h3 naslove po elementu '#professional-info'
        const regex = /(Rare|Common|Uncommon)\s\((\d+(?:\.\d+)?)%\s(to)\s(\d+(?:\.\d+)?)%\):\s(.+)/; // Regularni izraz za iskanje določenih podatkov

        let CattegoryId = 1; // Števec za identifikacijo kategorij

        // Zanka, ki iterira čez vse h3 naslove
        for (const h3 of allTitles) {
          // Zanka, ki iterira čez vse naslednje elemente do naslednjega h3 naslova
          for (const content of $(h3).nextUntil('h3').get()) {
            const matches = $(content).text().match(regex); // Poiščemo ujemanja z regexom
            if (!matches) continue; // Če ni ujemanj, preskočimo ta element

            // Če najdemo ujemanja, jih dodamo v seznam rezultatov
            results.push({
              url: urlInput, // Dodamo ime zdravila (iz URL-ja)
              CattegoryId: CattegoryId.toString(), // Dodamo identifikator kategorije
              category: $(h3).text(), // Dodamo besedilo iz h3 kot kategorijo
              occurrence: matches[4], // Dodamo pojavnost iz ujemanj
            });

            CattegoryId++; // Povečamo števec kategorij
          }
        }
      }

      res.status(200).json(results); // Vrnem rezultate kot JSON
    } catch (error: any) {
      res.status(500).json({ error: error.message }); // Če pride do napake, vrnemo napako 500
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' }); // Če ni metoda POST, vrnemo napako 405
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