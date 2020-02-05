// requires
const express = require( 'express' );
const bodyParser = require( 'body-parser' );

// globals
const app = express();
const port = 5000;
let quotes = [
    { who: "Denzel", quote: "ease is a larger barrier to progress than hardship" },
    { who: "Michael Scott", quote: "You miss 100% of the shots you don't take" },
    { who: "Corey", quote: "woof woof" },
    { who: "Dev", quote: "fortune cookie BS" }
];

// uses
app.use( express.static( 'server/public' ) );
// if your server is receiveing undefined data from POSTs you are likely missing the following line
app.use( bodyParser.urlencoded( { extended: true } ) );

// spin up server
app.listen( port, ( req, res )=>{
    console.log( 'server up on:', port );
}) // end spin up server

app.get( '/quotes', ( req, res )=>{
    console.log( '/quotes GET hit' );
    res.send( quotes );
}) // end /quotes GET

app.post( '/quotes', ( req, res )=>{
    console.log( '/quotes POST hit:', req.body );
    quotes.push( req.body );
    res.sendStatus( 200 );
}) // end /quotes POST