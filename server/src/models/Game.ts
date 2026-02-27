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
    hasVoted: boolean;
  }[];
  state: 'waiting' | 'card' |'round' | 'votes' | 'end';
  content: {
    word?: string;
    hint?: string;
  };
  chat: string[];
  words: string[];
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
    hasVoted: { type: Boolean, default: false },
  }],
  state: { 
    type: String, 
    enum: ['waiting', 'card', 'round', 'votes', 'end'], 
    default: 'waiting' 
  },  
  content: { word: String, hint: String },
  chat: [String],
  words: [String],
  votes: { type: Number, default: 0 },
  playersOut: { type: Number, default: 0 },
  numberOfImpostors: { type: Number, default: 0 },
  numberOfCrewmates: { type: Number, default: 0 },
});

gameSchema.post('save', async function(doc) {
  if (doc.players.length === 0) {
    await doc.deleteOne();
    console.log(`Game ${doc.gameId} deleted due to no players remaining.`);
  }
})

export default mongoose.model<IGame>('Game', gameSchema);