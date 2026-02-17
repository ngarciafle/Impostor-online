import Game from '../models/Game';



export const createGame = async (playerName: string, socketId: string) => {
  const gameId = Math.random() * 10000;
  //const { word, hint} = Importar la palabra y pista desde el contenedor de palabras
  try {
    const newGame = new Game({
      gameId: gameId.toString(),
      players: [{ socketId, nombre: playerName, lider: true, impostor: false }],
      state: 'waiting',
    })
    await newGame.save();
  } catch (err) {
    console.error('Error creating game:', err);
  }
}