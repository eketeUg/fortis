# 🏋️ Fortis Fit — Telegram Workout Mini App & NestJS Backend

A full-body weekly workout guide engineered as a high-performance **Telegram Mini App (TMA)** powered by a **NestJS** backend.

---

## 🌟 Key Highlights

- **Telegram Mini App (TMA)**:
  - Native integration with the Telegram Web App SDK (`window.Telegram.WebApp`).
  - Adapts to Telegram Dark & Light themes and Telegram platform styling.
  - Interactive **Haptic Feedback** (`tg.HapticFeedback.impactOccurred`) on checkboxes, timers, and day switches.
  - Full-screen responsive mobile-first UI with smooth transitions and glassmorphism.
- **Visual Exercise Illustrations**:
  - Crisp, theme-adaptive vector SVG illustrations for **every single exercise** in the routine.
  - Starting vs finish positioning, movement arcs, and highlighted active muscle groups.
  - Interactive Exercise Detail Modal with step-by-step instructions, cues, and mistakes to avoid.
- **Interactive Workout & Rest Timers**:
  - In-app rest timers (30s, 60s, 75s presets) for superset breaks and timed holds (planks, breathing).
  - Floating bottom dock for instant one-tap rest countdowns.
- **Weekly Workout Split**:
  - **🌅 Morning Priming**: Skipping cardio intervals (Hard intervals, Steady pace, Sprint intervals, Light recovery), Targeted Abs Circuits, Pelvic floor activation & Kegels, Hip mobility flow.
  - **🌙 Evening Strength**:
    - **Monday & Thursday (Day A)**: Squat & Push (Goblet Squat, Floor Press, Bent-over Row, Lateral Raise, Romanian Deadlift, Hammer Curls).
    - **Tuesday & Friday (Day B)**: Hinge & Pull (Romanian Deadlift, Close-grip Press, Gorilla Rows, Arnold Press, Bulgarian Split Squat, Upright Row).
    - **Wednesday & Saturday (Day C)**: Unilateral & Athletic (Renegade Rows, Mike Tyson Push-ups, Single-leg RDL, Glute Bridge, Rear Delt Fly + 5 min EMOM Finisher).
    - **Sunday**: Active Recovery & Regeneration.
- **NestJS Backend Architecture**:
  - `WorkoutModule`: REST API for schedules, daily plans, and comprehensive exercise encyclopedia.
  - `ProgressModule`: Tracks completed exercises, streaks, and weekly statistics per Telegram User ID with persistent JSON storage.
  - `BotModule`: Native Telegram Bot service handling `/start`, `/today`, `/stats`, `/help`, and configuring the persistent Telegram chat menu button (`setChatMenuButton`).

---

## 🚀 Getting Started

### 1. Install Dependencies & Build

```bash
npm install
npm run build
```

### 2. Configure Environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Set your configuration:

```env
PORT=3000
TELEGRAM_BOT_TOKEN=your_bot_token_from_botfather
TELEGRAM_WEBAPP_URL=https://your-public-domain.com
```

> **Note**: Even if you don't have a `TELEGRAM_BOT_TOKEN` yet, the app runs out of the box in standalone browser / preview mode!

### 3. Start the Server

```bash
# Development mode with hot-reload
npm run start:dev

# Or production build
npm run start:prod
```

Open your browser at:
👉 **`http://localhost:3000`**

---

## 🤖 Connecting to Telegram

### Step 1: Create a Bot with @BotFather
1. Open Telegram and search for [`@BotFather`](https://t.me/BotFather).
2. Send `/newbot`, name your bot, and copy the **HTTP API Bot Token**.
3. Paste the token into `.env` as `TELEGRAM_BOT_TOKEN`.

### Step 2: Expose your Local Server (for testing)
Telegram requires an `https://` URL for Mini Apps. During local development, you can use:
```bash
npx localtunnel --port 3000
# or
ngrok http 3000
```
Copy the generated HTTPS URL (e.g. `https://fortis-fit.loca.lt`) and set it as `TELEGRAM_WEBAPP_URL` in `.env`.

### Step 3: Configure the Menu Button in @BotFather
1. In `@BotFather`, send `/mybots` and select your bot.
2. Select **Bot Settings** ➔ **Menu Button** ➔ **Configure menu button**.
3. Send the HTTPS URL of your app and label it `🏋️ Workout Guide`.
4. Send `/start` to your bot in Telegram — the workout mini app will open directly inside Telegram!

---

## 📂 Project Structure

```
fortis-fit/
├── public/                       # Telegram Mini App Frontend
│   ├── index.html                # Master mobile-first Web App entry
│   ├── css/
│   │   └── style.css             # Native Telegram theme styles & dark mode
│   └── js/
│       ├── illustrations.js      # Vector SVG illustrations for all exercises
│       ├── exercises-data.js     # Client exercise dictionary & workout splits
│       └── app.js                # App logic, Telegram SDK, timers & offline sync
├── src/
│   ├── bot/                      # Telegram Bot Integration
│   │   ├── bot.service.ts        # /start, /today, /stats & chat menu button
│   │   ├── bot.controller.ts     # Webhook endpoint (/api/bot/webhook)
│   │   └── bot.module.ts
│   ├── progress/                 # User Progress & Streaks
│   │   ├── progress.service.ts   # Persistent tracking & HMAC auth validation
│   │   ├── progress.controller.ts# /api/progress endpoints
│   │   └── progress.module.ts
│   ├── workout/                  # Workout Data & Routines
│   │   ├── workout.data.ts       # Detailed exercises, cues, mistakes & days
│   │   ├── workout.service.ts    # Schedules and day queries
│   │   ├── workout.controller.ts # /api/workout endpoints
│   │   └── workout.module.ts
│   ├── app.module.ts             # Root AppModule
│   └── main.ts                   # NestJS bootstrap & static file serving
├── .env.example                  # Environment configuration template
└── package.json
```

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/workout/schedule` | Retrieve full weekly schedule & daily routines |
| `GET` | `/api/workout/today` | Retrieve today's morning & evening routine |
| `GET` | `/api/workout/day/:day` | Retrieve routine for a specific day (`Mon`–`Sun`) |
| `GET` | `/api/workout/exercises` | List all exercises with cues, muscles, and form tips |
| `GET` | `/api/workout/exercise/:id` | Get details for an individual exercise |
| `GET` | `/api/progress/:telegramId` | Retrieve completion state and streaks for user |
| `POST` | `/api/progress/sync` | Sync user checkmarks and activity to server |
| `POST` | `/api/progress/reset-week` | Reset weekly progress for user |
