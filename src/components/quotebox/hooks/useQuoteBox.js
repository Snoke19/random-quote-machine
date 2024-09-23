import { useState, useEffect, useCallback } from "react";
import fetchRandomQuote from "../../../services/QuoteService";
import colors from '../colors';
import { getRandomColor } from "../../../utils/randomColor";

export default function useQuoteBox() {

    const [quote, setQuote] = useState({ quote: '', author: '' });
    const [quoteBoxSettings, setQuoteBoxSettings] = useState({ colorBackGround: colors[0], fade: false });

    const loadQuote = useCallback(async () => {
        setQuoteBoxSettings(prevState => ({ ...prevState, fade: true }));
        setTimeout(async () => {
            const newColor = getRandomColor();
            try {
                const { quote, author } = await fetchRandomQuote();

                setQuote((prevState) => ({ ...prevState, quote: quote, author: author }));
                setQuoteBoxSettings((prevState) => ({ ...prevState, colorBackGround: newColor, fade: false }))
            } catch {
                setQuote((prevState) => ({ ...prevState, quote: 'Error loading quote', author: '' }));
                setQuoteBoxSettings((prevState) => ({ ...prevState, fade: false }));
            }
        }, 500);
    }, [setQuoteBoxSettings]);

    useEffect(() => {
        document.body.style.backgroundColor = quoteBoxSettings.colorBackGround;
        document.body.style.transition = 'background-color 1s ease';
        return () => { document.body.style.backgroundColor = ''; };
    }, [quoteBoxSettings.colorBackGround]);

    useEffect(() => {
        loadQuote();
    }, [loadQuote]);

    const tweetQuoteUrl = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=%22${encodeURIComponent(quote.quote)}%22%20${encodeURIComponent(quote.author)}`;
    const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://your-website.com')}&text=${encodeURIComponent(quote.quote)} - ${encodeURIComponent(quote.author)}`;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('')}`;

    return {
        quote,
        quoteBoxSettings,
        socialLinks: {
            tweetQuoteUrl,
            linkedinShareUrl,
            facebookShareUrl,
        },
        loadQuote,
    };
}
