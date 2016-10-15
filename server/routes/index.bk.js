const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://administrator:123456@localhost:5432/demo';
var tools = require('../common/tools');

//home page
router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'views', 'index.html'));
});

//read all notes
router.get('/api/notes', (req, res, next) => {
    const result = tools.select_notes(pg, connectionString);
	return res.json(result);
    if (typeof result == Array) {
        return res.json(result);
    } else {
        return res.status(500).json({
            success: false,
            data: result
        });
    }
});

//create a note
router.post('/api/notes', (req, res, next) => {
    // Grab data from http request
    const data = {
        subject: req.body.subject,
        content: req.body.content
    };
    var result = tools.insert_note(pg, connectionString, data);
    if (null != result) {
        var results = tools.select_notes(pg, connectionString);
        return res.json(results);
    }
    return res.status(500).json({
        success: false,
        data: result
    });
});



//update a note which id = :note_id
router.put('/api/notes/:note_id', (req, res, next) => {
    // Grab data from http request
    const data = {
        id: req.params.note_id, // Grab id from the URL parameters
        subject: req.body.subject, // Grab subject from http request
        content: req.body.content // Grab content from http request
    };

    // Grab data from http request
    const data = {
        subject: req.body.subject,
        content: req.body.content
    };
    var result = tools.update_note(pg, connectionString, data);
    if (null != result) {
        var results = tools.select_notes(pg, connectionString);
        return res.json(results);
    }
    return res.status(500).json({
        success: false,
        data: result
    });
});

//delete a note which id = :note_id
router.delete('/api/notes/:note_id', (req, res, next) => {
    // Grab data from the URL parameters
    const id = req.params.note_id;
    var result = tools.delete_node(pg, connectionString, id);
    if (null != result) {
        var results = tools.select_notes(pg, connectionString);
        return res.json(results);
    }
    return res.status(500).json({
        success: false,
        data: result
    });
});

module.exports = router;