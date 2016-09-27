const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient; // This is for mongo client
//const MongoClient = require('mongoose'); //this is for mongoose client
const app = express();

/* Body parser will read the data from form element, 
** The urlencoded method within body-parser tells body-parser to
** extract data from the <form> element and add them to the body property in the request object.
*/
app.use(bodyParser.urlencoded({extended: true}));
/*
** our server doesn’t read JSON data yet. We can teach it to read JSON data 
** by using the bodyparser.json() middleware
**/
app.use(bodyParser.json());

/* express.static is a middleware which will make the public folder public to use */
app.use(express.static('public'));

app.set('view engine', 'ejs');
var db;

/*
** Connection to mongo dB, on success of that we will start the node server.
**
** use url: mongodb://admin:password@ds033956.mlab.com:33956/debo-test-db for mlab connection 
*/
MongoClient.connect( 'mongodb://localhost/debo-test-db', ( err, database) => {
	if( err ) {
		return console.error( "Couldn't connect to database. Error: ", err );
	}
	else {
		db = database;
		app.listen( 3000, () => {
			console.log('Node application started at port 3000');
		});
	}
});

/* Default route returns the index template */
app.get('/', (req, res) => {
	db.collection('users').find().toArray(( err, result ) => {
		if( err ) {
			return console.error( err );
		}
		res.render( 'index.ejs', {users : result});
	}
)
});

app.post('/users', (req, res) => {
    db.collection('users').save(req.body, (err, result) => {
	  	console.log('saved to database.', req.body );
	    if (err) {
	    	return console.error(err);	
	    } 
	    res.redirect('/');
  });
});

app.delete('/users', (req, res) => {
	db.collection('users').findOneAndDelete({name: req.body.name},{},( err, result) => {
		if( err ) {
			return res.send( 500, err );
		}
		res.send('Deleted');
	});
});