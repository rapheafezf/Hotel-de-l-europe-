import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Connexion à la base de données SQLite
const db = new sqlite3.Database('./hotel.db');

// Fonction réutilisable de vérification des disponibilités
async function isRoomAvailable(roomId, checkIn, checkOut) {
    return new Promise((resolve, reject) => {
        // Une réservation (E) chevauche la nouvelle (N) si N.check_in < E.check_out ET N.check_out > E.check_in
        const query = `
            SELECT id FROM reservations 
            WHERE room_id = ? 
            AND check_in < ? 
            AND check_out > ?
        `;
        db.get(query, [roomId, checkOut, checkIn], (err, row) => {
            if (err) reject(err);
            // Si on a un résultat, la chambre est occupée (donc NON disponible)
            resolve(!row); 
        });
    });
}

app.post('/api/reservations', async (req, res) => {
    const { room_type, guest_name, guest_email, guest_phone, check_in, check_out, guests_count } = req.body;

    if (!room_type || !guest_name || !guest_email || !check_in || !check_out || !guests_count) {
        return res.status(400).json({ error: "Tous les champs obligatoires doivent être remplis." });
    }
    if (new Date(check_out) <= new Date(check_in)) {
        return res.status(400).json({ error: "Les dates de séjour sont incorrectes." });
    }

    try {
        db.all(`SELECT id FROM rooms WHERE room_type = ? AND capacity >= ?`, [room_type, guests_count], async (err, rooms) => {
            if (err) return res.status(500).json({ error: "Erreur serveur." });
            if (rooms.length === 0) {
                return res.status(404).json({ error: "Aucune chambre ne correspond à vos critères de capacité ou type." });
            }

            let availableRoomId = null;

            for (let room of rooms) {
                const isAvailable = await isRoomAvailable(room.id, check_in, check_out);
                if (isAvailable) {
                    availableRoomId = room.id;
                    break; 
                }
            }

            if (!availableRoomId) {
                return res.status(400).json({ error: "Aucune chambre disponible pour ce type et ces dates." });
            }

            const insertQuery = `
                INSERT INTO reservations (room_id, guest_name, guest_email, guest_phone, check_in, check_out)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            db.run(insertQuery, [availableRoomId, guest_name, guest_email, guest_phone, check_in, check_out], function(err) {
                if (err) return res.status(500).json({ error: "Erreur lors de l'enregistrement." });
                res.status(201).json({
                    message: "Réservation confirmée !",
                    reservation: {
                        id: this.lastID,
                        room_id: availableRoomId,
                        guest_name,
                        check_in,
                        check_out
                    }
                });
            });
        });
    } catch (error) {
        res.status(500).json({ error: "Erreur interne du serveur." });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur API démarré sur le port ${PORT}`);
});
