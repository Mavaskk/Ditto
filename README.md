# Ditto — Group travel, no friend drama.

Ditto is a web app that eliminates the chaos of planning group trips. Each traveler fills in their preferences independently — budget, destination, vibe, pace, dates — and Ditto handles the rest, negotiating conflicts automatically so no one has to fight in a group chat.

---

## Features

- **Create a trip** — Set a name and max number of travelers, get a shareable invite link
- **Join via link** — Friends open the link, fill their preferences, and sign up in one flow
- **Preference quiz** — Budget slider, vibe multi-select, travel pace, departure & return dates
- **Participant guard** — Automatically blocks joins when the group is full
- **Persistent preferences** — Zustand + localStorage keeps data safe across the signup flow
- **Supabase backend** — Auth, database, and server actions out of the box

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Server Actions) |
| UI | React 19, Tailwind CSS v4 |
| Components | MUI (Slider), PrimeReact (Calendar), Framer Motion |
| Forms | React Hook Form |
| State | Zustand (with localStorage persistence) |
| Backend | Supabase (Auth + PostgreSQL) |
| Notifications | React Hot Toast |
| Fonts | Google Fonts — Lora, Lato |

---

## Project Structure

```
src/
├── app/
│   ├── page.jsx                      # Landing page
│   ├── layout.jsx                    # Root layout
│   ├── globals.css                   # Global styles
│   ├── auth/                         # Supabase client (server + browser)
│   ├── actions/actions.js            # All Server Actions (DB + Auth)
│   ├── signup/                       # Signup page
│   ├── login/                        # Login page
│   ├── createTravel/                 # Create trip flow
│   │   └── confirm/[slug]/           # Post-creation confirm + share link
│   ├── joinTravel/[slug]/            # Join flow
│   │   ├── quiz/                     # Preferences form
│   │   └── confirm/                  # Post-join confirm
│   ├── dashboard/                    # User dashboard (in progress)
│   └── components/                   # All reusable UI components
│       ├── AuthCard/
│       ├── Button/
│       ├── Card/
│       ├── Chip/
│       ├── ConfirmCard/
│       ├── CreateTravelCard/
│       ├── CreateTravelProfileCard/
│       ├── Input/
│       ├── NumberInput/
│       └── TabBar/
└── store/
    └── useUserStore.js               # Zustand store for travel preferences
```

---

## User Flows

### Organizer — Create a trip

```
Landing (/) → Signup → Create Trip → Confirm page + copy invite link
```

### Friend — Join a trip

```
Invite link (/joinTravel/[uuid])
  → Welcome page (checks if trip is full)
  → Preferences quiz (destination, budget, vibe, pace, dates)
  → Signup (saves preferences to DB)
  → Confirm page → Dashboard
```

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/your-username/ditto.git
cd ditto
npm install
```

### 2. Configure environment variables

Create a `.env.local` file at the root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 3. Set up the database

Run these SQL queries in the Supabase SQL Editor:

```sql
-- Travels
create table travels (
  uuid uuid primary key default gen_random_uuid(),
  name text not null,
  number_of_travelers int not null,
  status text default 'created',
  user_id uuid references auth.users(id)
);

-- User profiles
create table users_data (
  user_id uuid primary key references auth.users(id),
  username text not null
);

-- Preferences per participant
create table participants (
  id uuid primary key default gen_random_uuid(),
  travel_uuid uuid references travels(uuid),
  destination text,
  budget int,
  travel_pace text,
  vibe text[],
  departure_date date,
  return_date date
);
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Roadmap

- [ ] AI negotiation engine — automatically resolve conflicting preferences
- [ ] Dashboard — show active trips, group preferences summary
- [ ] Push notifications — alert when all participants have responded
- [ ] Route protection middleware — guard private pages
- [ ] Email confirmation on signup

---

## License

MIT
