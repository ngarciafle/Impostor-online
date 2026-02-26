import mongoose, { Document, Schema} from 'mongoose';

export interface IGame extends Document {
  gameId: string;
  players: {
    socketId: string;
    name: string;
    leader: boolean;
    impostor: boolean;
    turn: boolean;
    votes: number;
    alive: boolean;
  }[];
  state: 'waiting' | 'card' |'round' | 'votes' | 'end';
  content: {
    word?: string;
    hint?: string;
  };
  chat: string[];
  votes: number;
  playersOut: number;
  numberOfImpostors?: number;
  numberOfCrewmates?: number;
}

const gameSchema = new Schema<IGame>({
  gameId: { type: String, required: true, unique: true },
  players: [{
    socketId: String,
    name: String,
    leader: Boolean,
    impostor: Boolean,
    turn: Boolean,
    votes: { type: Number, default: 0 },
    alive: { type: Boolean, default: true },
  }],
  state: { 
    type: String, 
    enum: ['waiting', 'card', 'round', 'votes', 'end'], 
    default: 'waiting' 
  },  
  content: { word: String, hint: String },
  chat: [String],
  votes: { type: Number, default: 0 },
  playersOut: { type: Number, default: 0 },
  numberOfImpostors: { type: Number, default: 0 },
  numberOfCrewmates: { type: Number, default: 0 },
});

export default mongoose.model<IGame>('Game', gameSchema);