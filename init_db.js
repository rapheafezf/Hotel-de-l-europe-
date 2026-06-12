import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./hotel.db', (err) => {
    if (err) {
        console.error('Erreur lors de la connexion à la DB', err);
        process.exit(1);
    }
    console.log('Connecté à la base de données SQLite.');
});

db.serialize(() => {
    // Création des tables
    db.run(`
        CREATE TABLE IF NOT EXISTS rooms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            room_number VARCHAR(10) NOT NULL UNIQUE,
            room_type VARCHAR(50) NOT NULL,
            capacity INTEGER NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS reservations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            room_id INTEGER NOT NULL,
            guest_name VARCHAR(100) NOT NULL,
            guest_email VARCHAR(100) NOT NULL,
            guest_phone VARCHAR(20),
            check_in DATE NOT NULL,
            check_out DATE NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(room_id) REFERENCES rooms(id)
        )
    `);

    // Suppression des anciennes chambres pour éviter les doublons lors du script d'init
    db.run('DELETE FROM rooms');

    // Insertion des chambres par défaut
    const insertRoom = db.prepare('INSERT INTO rooms (room_number, room_type, capacity) VALUES (?, ?, ?)');
    
    // 10 chambres Standard (capacité 2)
    for (let i = 1; i <= 10; i++) insertRoom.run(`1${i.toString().padStart(2, '0')}`, 'standard', 2);
    // 10 chambres Confort (capacité 2)
    for (let i = 11; i <= 20; i++) insertRoom.run(`1${i.toString().padStart(2, '0')}`, 'confort', 2);
    // 9 chambres Famille (capacité 4)
    for (let i = 1; i <= 9; i++) insertRoom.run(`2${i.toString().padStart(2, '0')}`, 'familiale', 4);

    insertRoom.finalize();

    console.log("Base de données initialisée avec 29 chambres.");
});

db.close();
