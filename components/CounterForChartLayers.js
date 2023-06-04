import { scrape } from '../pages/api/scrape';

let scrapeCounter = 0;

export const counter = async () => {
  try {
    await scrape();
    scrapeCounter++;
    console.log(`Scrape count: ${scrapeCounter}`);

    // Add this line to check the counter value within the function
    console.log('Counter value within counter function:', scrapeCounter);
  } catch (error) {
    console.error('Error occurred during scraping:', error);
  }
};

export const getScrapeCounter = () => {
  return scrapeCounter;
};

export const resetScrapeCounter = () => {
  scrapeCounter = 0;
};


