$( document ).ready( onReady );

function onReady(){
    $( '#addQuoteButton' ).on( 'click', addQuote );
    // get quotes from server when page loads
    getQuotes();
} // end onReady

function addQuote(){
    // get user input & place in an object
    const objectToSend = {
        who: $('#whoIn').val(),
        quote: $('#quoteIn').val()
    };
    // use AJAX to send object to server via a POST
    $.ajax({
        type: 'POST',
        url: '/quotes',
        data: objectToSend
    }).then( function( response ){
        console.log( 'back from POST with:', response );
        // update DOM
        getQuotes();
    }).catch( function( err ){
        // catch any errors
        console.log( err );
        alert( 'no worky' );
    }) // end AJAX
} // addQuote

function displayQuotes( quotesArray ){
    let el = $( '#quotesOut' );
    el.empty();
    for( let i=0; i<quotesArray.length; i++){
        el.append( `<li>"${ quotesArray[i].quote }": ${ quotesArray[i].who }</li>`)
    }
} // end displayQuotes

// make a GET call to /quotes on server
function getQuotes(){
    console.log( 'in getQuotes' );
    // ask JQuery to make an AJAX GET call to /quotes
    $.ajax({
        type: 'GET',
        url: '/quotes'
    }).then( function( response ){
        console.log( 'back from GET with:', response );
        // loop through array
        // append each to DOM
        displayQuotes( response );
    }).catch( function( err ){
        console.log( err );
        alert( 'error getting quotes. see console for details' );
    }) // end AJAX 
} // end getQuotes