import { scrape } from './scrape';

let scrapeCounter = 0;

export const counter = async () => {
  try {
    await scrape(); // Call the scrape function from scrape.ts
    scrapeCounter++;
    console.log(`Scrape count: ${scrapeCounter}`);
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