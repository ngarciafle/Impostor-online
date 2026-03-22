# 🕵️‍♂️ Impostor Online

A real-time multiplayer word game playable entirely in the browser, inspired by *Among Us* and *Spyfall*. Players receive a secret word — except the impostors, who get a related hint — and must say an associated word on their turn without giving themselves away. After each round, everyone votes to eliminate the most suspicious player.

---

## 🎮 How to Play

1. A player **creates a room** and shares the code with friends.
2. Others **join the room** using that code.
3. The room leader **starts the game**. Each player receives a secret word; impostors receive a related hint instead.
4. In turns, each player says **one word** associated with theirs — without revealing it.
5. After all players have spoken, everyone **votes** to eliminate the most suspicious player.
6. **Crewmates win** by eliminating all impostors. **Impostors win** if they match or outnumber the crewmates.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [Astro 5](https://astro.build) | Main framework & SSR |
| [Svelte 5](https://svelte.dev) | Interactive components with runes |
| [Tailwind CSS 4](https://tailwindcss.com) | Styling |
| [Socket.IO Client](https://socket.io) | Real-time communication |
| [Lucide Svelte](https://lucide.dev) | Icons |

### Backend
| Technology | Purpose |
|---|---|
| [Express 5](https://expressjs.com) | HTTP server & REST API |
| [Socket.IO](https://socket.io) | WebSockets & real-time events |
| [MongoDB + Mongoose](https://mongoosejs.com) | Database & data modeling |
| [TypeScript](https://www.typescriptlang.org) | Type safety |
| [tsx](https://github.com/privatenumber/tsx) | TypeScript execution for dev |

---

## 📁 Project Structure

```
/
├── client/                  # Astro + Svelte frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── game/        # Card, Words, Voting, End screens
│   │   │   ├── menu/        # Initial, Create, Join, Wait screens
│   │   │   └── general/     # Chat, ImpostorCount
│   │   ├── layouts/         # Base HTML layout
│   │   ├── pages/           # Astro pages (index)
│   │   └── styles/          # Global CSS
│   └── astro.config.mjs
│
└── server/                  # Express + Socket.IO backend
    └── src/
        ├── controllers/     # Game logic (create, join, start, votes...)
        ├── models/          # Mongoose Game model
        ├── routes/          # REST API endpoints
        └── sockets/         # Socket.IO event handlers
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 20`
- pnpm `>= 7`
- A running MongoDB instance

### 1. Clone the repository

```bash
git clone https://github.com/your-username/impostor-online.git
cd impostor-online
```

### 2. Set up the backend

```bash
cd server
pnpm install
```

Create a `.env` file inside `server/`:

```env
MONGO_URI=mongodb://localhost:27017/impostor
PORT=3000
```

Start the dev server:

```bash
pnpm dev
```

### 3. Set up the frontend

```bash
cd client
pnpm install
pnpm dev
```

The app will be available at `http://localhost:4321`.

---

## 🔌 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/create-game` | Create a new game room |
| `POST` | `/api/join-game` | Join an existing room |
| `POST` | `/api/start-game` | Start the game (leader only) |

---

## ⚡ Socket Events

### Client → Server

| Event | Payload | Description |
|---|---|---|
| `join-game` | `{ name, gameId }` | Join a game room |
| `leave-game` | — | Leave the current room |
| `send-word` | `{ gameId, senderName, word }` | Submit a word on your turn |
| `send-vote` | `{ gameId, playerName }` | Vote to eliminate a player |
| `send-message` | `{ gameId, senderName, message }` | Send a chat message |
| `reset-game` | `{ gameId }` | Reset the game (leader only) |

### Server → Client

| Event | Description |
|---|---|
| `game-started` | Game has begun; includes role and word |
| `round-started` | Card phase is over, word phase begins |
| `round-ended` | Word phase is over, voting begins |
| `init-turn` | It's your turn to speak |
| `new-word` | A player has submitted a word |
| `get-players` | Player list for the voting screen |
| `add-vote` | A vote has been cast |
| `end-game` | The game has ended |
| `player-joined` | Updated player list after someone joins |
| `players-left` | Updated player list after someone leaves |
| `new-message` | New chat message received |
| `game-reset` | Game has been reset to the waiting state |

---

## 🎲 Game Logic

- The number of impostors scales with room size: **1 impostor per 4 players**, minimum 1.
- Turn order is randomized at the start of each round.
- During voting, players cannot vote for themselves.
- A **tie** results in no elimination and a new round begins.
- Impostors win when their count is **≥ crewmates remaining** or when only 2 players are left.
- Crewmates win when **all impostors are eliminated**.

---

## 🗺️ Roadmap

- [ ] Reconnection support if a socket drops
- [ ] Spectator mode
- [ ] Round timer visible to all players
- [ ] Custom word packs
- [ ] Mobile-optimized layout improvements
- [ ] Localization (English / Spanish)

---

## 📄 License

MIT
