import Game from '../models/Game';



export const joinGame = async (playerName: string, socketId: string, gameId: string) => {
  //const { word, hint} = Importar la palabra y pista desde el contenedor de palabras
  try {
    // No habria que crear un nuevo juego, sino unirse a uno existente *** 
    const newGame = new Game({
      gameId,
      players: [{ name: playerName, socketId }],
      state: 'waiting',
    })
    await newGame.save();
  } catch (err) {
    console.error('Error creating game:', err);
  }
}