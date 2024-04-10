import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch'; // Importing fetch for making HTTP requests

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Retrieve the API key from environment variables
      const apiKey = process.env.API_KEY;

      if (!apiKey) {
        throw new Error('API key is not defined');
      }
      
      // Parse request body as JSON
      const { followingInput } = req.body;

      // Make a POST request to the external API with the provided API key
      const response = await fetch(apiKey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama2',
          prompt: `What side effects could be problematic using these medicines ${followingInput} at the same time?`,
          stream: false
        })
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      // Extract the data from the response
      const data = await response.json();

      // Return the data as the API response
      return res.status(200).json({response: data["response"]});
    } catch (error) {
      // If there's an error, return an error response
      console.error('Error fetching data:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // If the request method is not POST, return a 405 Method Not Allowed error
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}

