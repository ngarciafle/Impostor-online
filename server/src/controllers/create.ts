import Game from '../models/Game';



export const createGame = async (name: string, socketId: string) => {
  const gameId = Math.floor(Math.random() * 10000);
  //const { word, hint} = Importar la palabra y pista desde el contenedor de palabras
  try {
    const newGame = new Game({
      gameId: gameId.toString(),
      players: [{ socketId, name: name, leader: true, impostor: false, turn: false }],
      state: 'waiting',
    })
    await newGame.save();
    return gameId.toString();
  } catch (err) {
    console.error('Error creating game:', err);
  }
}