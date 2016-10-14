const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://administrator:123456@localhost:5432/demo';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'CREATE TABLE notes(id SERIAL PRIMARY KEY, subject VARCHAR(64), content VARCHAR(255) not null, create_time timestamp, update_time timestamp)');
query.on('end', () => { client.end(); });