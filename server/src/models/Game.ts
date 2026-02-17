import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  gameId: { type: String, required: true, unique: true },
  players: [{
    socketId: String,
    nombre: String,
    lider: Boolean
  }]
});

export default mongoose.model('Game', gameSchema);