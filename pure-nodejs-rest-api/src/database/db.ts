import sqlite3 from 'sqlite3';

sqlite3.verbose();

export const DB = new sqlite3.Database('memory', error => {
    if (error) {
        console.error('Error in DB', error.message);
    }

    console.log('Connected to Sqlite3 database');
});

DB.serialize(() => {
    DB.run(`
        CREATE TABLE IF NOT EXISTS items
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT NOT NULL
        )
    `);
});