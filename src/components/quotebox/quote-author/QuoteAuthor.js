export default function QuoteAuthor({ quoteObj, colorBackGround, fade }) {


    return (
        <>
            <div className={`quote-text ${fade ? 'fade-out' : 'fade-in'}`} style={{ color: colorBackGround }}>
                <i className="fa fa-quote-left"> </i><span id="text">{quoteObj.quote}</span>
            </div>
            <div className={`quote-author ${fade ? 'fade-out' : 'fade-in'}`} style={{ color: colorBackGround }}>
                - <span id="author">{quoteObj.author}</span>
            </div>
        </>
    )
}