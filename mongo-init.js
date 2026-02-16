db = db.getSiblingDB('chat_app');

db.createCollection('rooms');

db.rooms.insertMany([
  { name: 'Sala General', description: 'Chat para todos', active: true },
  { name: 'Svelte Masters', description: 'Solo para devs pro', active: true }
]);

console.log("Base de datos 'chat_app' inicializada con éxito.");