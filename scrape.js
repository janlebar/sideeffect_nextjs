async function main() {
    const { default: axios } = await import("axios");
    const { default: cheerio } = await import("cheerio");

    const { data } = await axios.get("https://www.drugs.com/sfx/aspirin-side-effects.html");

    const $ = cheerio.load(data);

    const allTitles = $('.contentBox #professional-info').nextAll("h3").get();

    console.log(allTitles);
}

main();