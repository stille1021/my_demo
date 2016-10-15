module.exports = {
    select_notes: function(pg, connectionString) {
		const results = [];
        pg.connect(connectionString, (err, client, done) => {
            // Handle connection errors
            if (err) {
                done();
                console.log(err);
                return err;
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
                return results;
            });
        });
    },
	
	insert_note: function(pg, connectionString, data) {
        pg.connect(connectionString, (err, client, done) => {
            // Handle connection errors
            if (err) {
                done();
                console.log(err);
                return err;
            }
            // SQL Query > Insert Data
            var query = client.query('INSERT INTO notes(subject, content) values($1, $2)', [data.subject, data.content]);
          
            // Close connection and return true after inserted.
            query.on('end', () => {
                done();
                return null;
            });
        });
    },
	update_note: function(pg, connectionString, data) {
        pg.connect(connectionString, (err, client, done) => {
            // Handle connection errors
            if (err) {
                done();
                console.log(err);
                return err;
            }
            // SQL Query > Update Data
        var query = client.query('UPDATE notes SET subject=($1), content=($2) WHERE id=($3)', [data.subject, data.content, data.id]);

          
            // Close connection and return true after updated.
            query.on('end', () => {
                done();
                return null;
            });
        });
    },
	delete_note: function(pg, connectionString, id) {
        pg.connect(connectionString, (err, client, done) => {
            // Handle connection errors
            if (err) {
                done();
                console.log(err);
                return err;
            }
            // SQL Query > Delete Data
        var query = client.query('DELETE FROM notes WHERE id=($1)', [id]);
          
            // Close connection and return true after deleted.
            query.on('end', () => {
                done();
                return null;
            });
        });
    },

};