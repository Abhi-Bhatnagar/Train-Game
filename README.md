# The Train Game — Sydney Carriage Solver

A web app that solves the Sydney Train Game: given the 4 digits of a carriage number, find every way to make **10** using `+`, `−`, `×`, `÷` and any bracketing.

Built with **Next.js 14** (App Router).

---

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deploying to Vercel (Recommended — Free)

Vercel is made by the creators of Next.js and deploys it perfectly in one click.

### Option A — Deploy via Vercel CLI (fastest)

```bash
# 1. Install the Vercel CLI globally
npm install -g vercel

# 2. From inside the project folder, run:
vercel

# 3. Follow the prompts:
#    - Log in or create a free Vercel account
#    - "Set up and deploy?" → Yes
#    - "Which scope?" → your personal account
#    - "Link to existing project?" → No
#    - "Project name?" → train-game (or anything you like)
#    - "In which directory is your code located?" → ./ (just press Enter)
#    - Vercel auto-detects Next.js — accept all defaults

# Your site will be live at: https://train-game-xxxx.vercel.app
```

### Option B — Deploy via GitHub + Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   gh repo create train-game --public --push
   # or manually create a repo at github.com and push
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub
   - Click **"Add New Project"**
   - Import your `train-game` repository
   - Leave all settings as default — Vercel detects Next.js automatically
   - Click **Deploy**

3. Your site is live in ~30 seconds. Every future `git push` auto-redeploys.

---

## Deploying to Netlify (Alternative — Free)

```bash
# 1. Build the project
npm run build

# 2. Install Netlify CLI
npm install -g netlify-cli

# 3. Deploy
netlify deploy --prod --dir=.next

# Follow prompts to log in and create/link a site
```

Or drag-and-drop the `.next` folder at [app.netlify.com/drop](https://app.netlify.com/drop).

> **Note:** For Netlify, add a `netlify.toml` to the project root:
> ```toml
> [build]
>   command = "npm run build"
>   publish = ".next"
>
> [[plugins]]
>   package = "@netlify/plugin-nextjs"
> ```
> And install the plugin: `npm install -D @netlify/plugin-nextjs`

---

## Project Structure

```
train-game/
├── app/
│   ├── layout.js           # Root layout, font loading
│   ├── globals.css         # Global reset + body styles
│   ├── page.js             # Main page (solver UI)
│   ├── page.module.css     # Page styles
│   └── components/
│       ├── DigitInput.js          # Single digit input box
│       ├── DigitInput.module.css
│       ├── SolutionList.js        # Results panel
│       └── SolutionList.module.css
├── lib/
│   └── solver.js           # Core solving algorithm
├── public/                 # Static assets (favicon etc.)
├── next.config.js
└── package.json
```

---

## How the Solver Works

The solver exhaustively checks all combinations of:
- **24 permutations** of the 4 digits
- **4³ = 64** operator combinations (`+`, `−`, `×`, `÷`)
- **5 distinct bracket structures** for 4 numbers

That's 24 × 64 × 5 = **7,680 expressions** checked per solve. Results are deduplicated and sorted by expression length (simplest first).

The 5 bracket structures are:
1. `((a ○ b) ○ c) ○ d`
2. `(a ○ (b ○ c)) ○ d`
3. `(a ○ b) ○ (c ○ d)`
4. `a ○ ((b ○ c) ○ d)`
5. `a ○ (b ○ (c ○ d))`

---

## Customisation

**Change the target number** — edit the `target` parameter in `app/page.js`:
```js
const result = solve(parsed, 10) // change 10 to any number
```

**Add more operators** — extend the `OPS` array in `lib/solver.js`:
```js
const OPS = ['+', '-', '*', '/']  // add '^' for powers, etc.
```
