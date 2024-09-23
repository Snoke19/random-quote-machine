import { useState, useEffect, useCallback } from "react";
import fetchRandomQuote from "../../services/QuoteService";
import colors from '../QuoteBox/colors';
import useClipboard from '../../utils/clipboard';
import { getRandomColor } from "../../utils/randomColor";

export default function useQuoteBox() {
    const [copyInfo, setCopyInfo] = useState({ show: false, info: '' });
    const [quoteBoxSettings, setQuoteBoxSettings] = useState({
        quote: '',
        author: '',
        colorBackGround: colors[0],
        fade: false
    });

    const [tagState, setTagState] = useState({
        quoteTags: [],
        inputValue: ''
    });

    const addTag = (e) => {
        const value = tagState.inputValue.trim();
        if (e.key === 'Enter' && value !== '' && !tagState.quoteTags.includes(value)) {
            setTagState((prevState) => ({
                quoteTags: [...prevState.quoteTags, value],
                inputValue: ''
            }));
        }
    };

    const handleInputChange = (e) => {
        setTagState((prevState) => ({
            ...prevState,
            inputValue: e.target.value
        }));
    };

    const removeTag = (indexToRemove) => {
        setTagState((prevState) => ({
            ...prevState,
            quoteTags: prevState.quoteTags.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleCopyNotification = (info) => {
        setCopyInfo((prevState) => ({ ...prevState, show: true, info }));
    }

    const handleCopy = useClipboard(quoteBoxSettings, handleCopyNotification);

    const loadQuote = useCallback(async () => {
        setQuoteBoxSettings(prevState => ({ ...prevState, fade: true }));
        setTimeout(async () => {
            const newColor = getRandomColor();
            try {
                const { quote, author } = await fetchRandomQuote();
                setQuoteBoxSettings((prevState) => ({ ...prevState, quote: quote, author: author, colorBackGround: newColor, fade: false }));
            } catch {
                setQuoteBoxSettings((prevState) => ({ ...prevState, quote: 'Error loading quote', author: '', fade: false }));
            }
        }, 500);
    }, [setQuoteBoxSettings]);

    useEffect(() => {
        if (copyInfo.show) {
            const timer = setTimeout(() => {
                setCopyInfo((prevState) => ({ ...prevState, show: false, info: '' }));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [copyInfo.show]);

    useEffect(() => {
        document.body.style.backgroundColor = quoteBoxSettings.colorBackGround;
        document.body.style.transition = 'background-color 1s ease';
        return () => { document.body.style.backgroundColor = ''; };
    }, [quoteBoxSettings.colorBackGround]);

    useEffect(() => {
        loadQuote();
    }, [loadQuote]);

    const tweetQuoteUrl = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=%22${encodeURIComponent(quoteBoxSettings.quote)}%22%20${encodeURIComponent(quoteBoxSettings.author)}`;
    const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://your-website.com')}&text=${encodeURIComponent(quoteBoxSettings.quote)} - ${encodeURIComponent(quoteBoxSettings.author)}`;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://www.instagram.com/p/C_SkL_iIZVs/?locale=ru&hl=am-et')}`;

    return {
        quoteBoxSettings,
        tagState,
        copyInfo,
        tweetQuoteUrl,
        linkedinShareUrl,
        facebookShareUrl,
        handleCopy,
        loadQuote,
        addTag,
        handleInputChange,
        removeTag,
    };
}
