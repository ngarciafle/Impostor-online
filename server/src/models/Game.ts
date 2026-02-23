import mongoose, { Document, Schema} from 'mongoose';

export interface IGame extends Document {
  gameId: string;
  players: {
    socketId: string;
    name: string;
    leader: boolean;
    impostor: boolean;
  }[];
  state: 'waiting' | 'card' |'round' | 'voting' | 'finished';
  content: {
    word?: string;
    hint?: string;
  };
}

const gameSchema = new Schema<IGame>({
  gameId: { type: String, required: true, unique: true },
  players: [{
    socketId: String,
    name: String,
    leader: Boolean,
    impostor: Boolean,
  }],
  state: { 
    type: String, 
    enum: ['waiting', 'card', 'round', 'voting', 'finished'], 
    default: 'waiting' 
  },  
  content: { word: String, hint: String },
});

export default mongoose.model<IGame>('Game', gameSchema);