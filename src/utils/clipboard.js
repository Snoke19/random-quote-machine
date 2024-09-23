export default function useClipboard(quoteBoxSettings, onCopy) {
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(`${quoteBoxSettings.quote} - ${quoteBoxSettings.author}`);
            onCopy("Quote copied!");
        } catch (error) {
            onCopy(`Copy failed: ${error.message}`);
        }
    };

    return handleCopy;
}
