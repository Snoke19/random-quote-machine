const QUOTE_API_URL = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

export default async function fetchRandomQuote() {
    try {
        const response = await fetch(QUOTE_API_URL);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const { quotes } = data;
        return getRandomQuote(quotes);
    } catch (error) {
        console.error('Failed to fetch quotes:', error);
        throw error;
    }
}

function getRandomQuote(quotes) {
    return quotes[Math.floor(Math.random() * quotes.length)];
}