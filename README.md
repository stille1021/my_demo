This application manages a list of notes. A note
consists of a subject and a body. A subject is a single line text and a body is a
multi-line text.
This application supports four basic operations. First, you can create a new note.
Second, you can delete a note. Third, you can view a note. And, you can edit a note.
Even though you can edit a note, you cannot edit its subject. When you edit a note,
the note will be versioned with sequential version numbers. A version will be 1 when
you first create a note, then it'll be incremented every time you edit it.
You need to implement a basic user authentication and session management; signing
up, logging in and logging out. A user can only view and edit their own notes.
This application may have three views. One to list notes, another to view a note and
one more to edit a note. But you don't need to stick to it. You can managed all
operations in a single view, for instance, if you want.


* Server: Node.js + Express
* Client: AngularJS + Bootstrap
* Database: PostgreSQL
