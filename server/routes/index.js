const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://administrator:123456@localhost:5432/demo';

//home page
router.get('/', (req, res, next) => {
    res.sendFile(path.join(
        __dirname, '..', '..', 'client', 'views', 'index.html'));
});

//create a note
router.post('/api/notes', (req, res, next) => {
    const results = [];
    // Grab data from http request
    const data = {
        subject: req.body.subject,
        content: req.body.content
    };
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }
        // SQL Query > Insert Data
        client.query('INSERT INTO notes(subject, content) values($1, $2)', [data.subject, data.content]);
        // SQL Query > Select Data
        const query = client.query('SELECT * FROM notes ORDER BY id ASC');
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        });
    });
});

//read all notes
router.get('/api/notes', (req, res, next) => {
    const results = [];
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }
        // SQL Query > Select Data
        const query = client.query('SELECT * FROM notes ORDER BY id ASC;');
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        });
    });
});

//update a note which id = :note_id
router.put('/api/notes/:note_id', (req, res, next) => {
    const results = [];
    // Grab data from the URL parameters
    const id = req.params.note_id;
    // Grab data from http request
    const data = {
        subject: req.body.subject,
        content: req.body.content
    };
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }
        // SQL Query > Update Data
        client.query('UPDATE notes SET subject=($1), content=($2) WHERE id=($3)', [data.subject, data.content, id]);
        // SQL Query > Select Data
        const query = client.query("SELECT * FROM notes ORDER BY id ASC");
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
});

//delete a note which id = :note_id
router.delete('/api/notes/:note_id', (req, res, next) => {
    const results = [];
    // Grab data from the URL parameters
    const id = req.params.note_id;
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }
        // SQL Query > Delete Data
        client.query('DELETE FROM notes WHERE id=($1)', [id]);
        // SQL Query > Select Data
        var query = client.query('SELECT * FROM notes ORDER BY id ASC');
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        });
    });
});

//show all notes
//router.get('/api/notes', getNotes);

//create a note
//router.post('/api/notes', createNote);

//delete a note(note_id=$note_id)
//router.delete('/api/notes/:note_id', deleteNote);

//update a note(note_id=$note_id)
//router.put('/api/notes/:note_id', updateNote);

/*function getNotes(req, res) {
	var queryString = "SELECT * FROM notes ORDER BY id ASC;";
	executeQuery(res, queryString);
}

function updateNote(req, res){
	var queryString = "UPDATE notes SET subject=$1, content=$2 WHERE id=$3;";
	 // Grab data from the URL parameters
    const id = req.params.note_id;
    // Grab data from http request
    const data = {
        subject: req.body.subject,
        content: req.body.content
    };
	var queryParameters = [data.subject, data.content, id];
	executeQuery(res, queryString, queryParameters);
	getNotes(req, res);
}

function createNote(req, res){
	var queryString = "INSERT INTO notes(subject, content) values($1, $2)";
    // Grab data from http request
    const data = {
        subject: req.body.subject,
        content: req.body.content
    };
	var queryParameters = [data.subject, data.content];
	executeQuery(res, queryString, queryParameters);
	getNotes(req, res);
}

function deleteNote(req, res){
	var queryString = "DELETE FROM notes WHERE id=$1;";
	 // Grab data from the URL parameters
    const id = req.params.note_id;
	var queryParameters = [id];
	executeQuery(res, queryString, queryParameters);
	getNotes(req, res);
}

function executeQuery(res, queryString, queryParameters){
	var queryHandler = pgQuery.bind(undefined, res, queryString, queryParameters); 
	pg.connect(connectionString, queryHandler);
}

function pgQuery(res, queryString, queryParameters, err, client, done){
		
		var results = [];
		var query = (typeof(queryParameters) !== 'undefined') ? 
				client.query(queryString, queryParameters) : client.query(queryString);
		
		query.on('row', function(row){
			results.push(row);	
		});

		query.on('end', function(){
			done();
			res.json(results);
		});

		if(err){
			console.log(err);
		}
}*/

module.exports = router;