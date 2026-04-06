# Case Study Raw Material — Building BPWCISLO.com with AI

> **Audience:** Potential clients — business owners who want to understand what's possible, not developers.
> **Story arc:** Concept → Experiments → Launch → Refine

---

## 1. The 8–10 Most Interesting Commits (Story Beats)

| # | Commit | Date | What Actually Happened | Why It Matters |
|---|--------|------|----------------------|----------------|
| 1 | `578a3ec` | Jan 6 | The very first commit — parallax hero, magnetic button, waterfall background | **Origin story.** The site didn't start with wireframes. It started with a vibe: "Give me that Apple Mac Mini energy." |
| 2 | `2766202` | Feb 27 | Replaced a standard contact form with the FlowForm multi-step funnel | **The bet.** Most portfolio sites slap on a form. You built a guided conversation that qualifies leads before they ever hit send. |
| 3 | `aadd02e` | Mar 3 | Added the entire gamification points system in one late-night session | **The crazy idea.** "What if the website kept score?" A late-night impulse that became the site's most distinctive feature. |
| 4 | `1a55e23` | Mar 20 | Rewrote all site copy to shift from "pain/friction" framing to forward momentum | **The voice pivot.** You realized the messaging was talking about problems when it should have been talking about possibility. The whole site changed tone in one commit. |
| 5 | `a689dc4` | Mar 16 | Added the hamburger menu for mobile | **The beginning of the mobile saga.** This single feature took 6+ commits and dozens of iterations — moving elements in and out of the dropdown, tweaking opacity, getting those color dots *just right*. |
| 6 | `42da53e` | Apr 5 | Fixed the hero button accent-color default state | **The "fiasco."** Making a button turn green sounds trivial. It took a CSS specificity deep-dive and removing a load animation to get right. You literally said "Congratulations" to the AI when it finally worked. |
| 7 | `ce216fb` | Apr 5 | Reordered themes and converted Ember to a full dark mode | **Design system maturity.** The site went from "has a theme picker" to "has an intentional light/dark/light/dark rhythm with secondary accent colors" — the mark of a real product, not a demo. |
| 8 | `298fd02` | Apr 3 | Added SEO, AI indexability (`llms.txt`), sitemap, and the `/uses` page | **Future-proofing.** Not just built for humans — built for the way search (and AI search) actually works now. |
| 9 | `91f2253` | Apr 3 | Performance pass — lazy loading, image compression, OG share image | **The wake-up call.** A friend texted: "it dragsssssss to load." You immediately pivoted from features to performance. |
| 10 | `4dfc163` | Apr 5 | 401 points for visiting the /uses page | **The easter egg.** Named after your agency, 4O1! Creative. Proof that the site has personality baked into its DNA, not just bolted on. |

---

## 2. The 3–4 Most Technically Impressive Features (Client-Friendly)

### A. The FlowForm — A Guided Conversation, Not a Contact Form

**What a client sees:** Instead of a generic "name, email, message" form, visitors answer 6 short questions (what they need, timeline, budget) and the site qualifies the lead automatically. Completing it is worth 1,000 points.

**What made it hard:** It's not a plugin — it's a custom-built, multi-step UI with progress bars, skip-to-email shortcuts, animated transitions, and Netlify form submission, all in vanilla JavaScript with zero dependencies.

### B. Four-Theme System with Dark Mode and Secondary Accents

**What a client sees:** Four color dots in the header. Click one and the entire site — every button, icon hover, progress bar, even the rocket flame — transforms instantly.

**What made it hard:** Each theme isn't just an accent color swap. Two themes are full dark-mode inversions (every shade flips). Each has a *secondary* accent color for hover states. And the theme persists across pages and visits via localStorage. It's a design system, not a color picker.

### C. Gamification Points System

**What a client sees:** A point counter in the nav that ticks up as you scroll, hover, click, switch themes, visit pages, and complete the contact form.

**What made it hard:** Every interaction on the page is instrumented — scroll depth, gallery navigation, card hovers, theme switches, FlowForm steps — each with its own point value and cooldown logic to prevent gaming. It's behavioral analytics turned into a game.

### D. Automated Visual History (Commit Snapshots)

**What a client sees:** Nothing — it's behind the scenes. Every time code is committed, a headless browser automatically captures a full-page screenshot of the site, timestamped with the commit hash.

**What made it hard:** It spins up a temporary web server, launches headless Chrome, waits for animations to settle, takes the screenshot, and files it away — all triggered by a git hook that runs silently in the background.

---

## 3. The Honest, Vulnerable Moments

### "That runner is weird looking"
The service icons went through ~10 rounds. Running man, scissors cutting a knot, heartbeat, rocket. Brian kept reacting and redirecting until it felt right. Not a spec handoff — a real-time creative jam session.

### "I don't love the gradient wipe"
Brian asked for a shine effect on the hero button, loved it, asked to slow it down, then realized it fundamentally didn't fit the aesthetic. Instead of just killing it, he improvised the speech-bubble morph concept on the spot — which became a signature interaction across the entire site.

### "Congratulations and thank you. Does our code look clean after the whole fiasco?"
The hero button color took multiple rounds to fix. A CSS specificity bug combined with a load animation playing backwards. Brian treating the debugging session like a shared struggle ("congratulations" to an AI) shows how real the collaboration felt.

### "Let's roll back to the commit before the UFOs. This is a little overboard."
Late-night session: built the gamification system, then pushed further with clickable spaceships flying across the screen. Went to bed excited. Woke up and killed it. The perfect anecdote about creative restraint and the freedom to experiment when rollback is easy.

### "It dragsssssss to load"
After weeks of feature-building, a friend's honest feedback stopped everything. Zero defensiveness. Immediate pivot from features to performance. Compressed 5.5MB of images down to ~280KB.

### "That's way too much work for what we can do right now"
Brian originally wanted interactive live demos embedded in portfolio slides. Saw the scope estimate, caught himself, and said "Can we start small?" Tried it, reverted it, shelved it. The entrepreneurial instinct to know when to pull back.

### The mobile menu marathon
The hamburger menu layout went through 12+ iterations across 6 commits: "move the name here... no, put it back... dots at the bottom... actually the top... make the middle bar the accent color... now one arm of the X too." Brian kept fine-tuning pixel by pixel through voice descriptions until it was exactly right.

---

## 4. Screenshots & Screen Recordings to Capture

| What to Capture | Why It's Compelling |
|----------------|-------------------|
| **Theme switching in real-time** — click through all 4 dots | Shows the entire site transforming instantly. This is the "wow" moment for video. |
| **FlowForm walkthrough** — complete all 6 steps | A mini product demo inside a portfolio site. Clients will immediately think "I want something like this." |
| **Points counter climbing** — scroll, hover on cards, switch themes, watch the number tick up | Gamification in action. Record the counter in the corner as you naturally browse. |
| **Hero button speech-bubble morph** — slow hover on "Let's Build" | A small detail that signals craft. Good for a close-up GIF or short clip. |
| **Side-by-side: Jungle (light) vs Miami (dark)** — same section, both themes | Proves it's not just a color swap — it's a full dark mode inversion. |
| **Mobile hamburger open/close** — accent-colored bars, the X transition | The detail of the middle bar being the accent color, then one arm of the X matching. |
| **Cursor IDE session** — the conversation panel next to the code | The meta shot. Show the actual back-and-forth that built the site. This is the hero image of the article. |
| **The snapshots folder** — `ls ~/snapshots/bpwcislo/` with timestamped filenames | Visual proof that every commit generates a screenshot. Feels futuristic. |
| **Git log scrolling** — all 55+ commits flying by in terminal | The sheer volume of iteration, compressed into a few seconds of video. |
| **A "before and after"** — first commit screenshot vs. current site | The transformation. If you have the very first snapshot or an early screenshot, pair it with today. |

---

## 5. Three Opening Hook Angles

### A. The "How Long" Hook

> My entire portfolio site — four color themes, a custom contact funnel, a built-in points system, dark mode, SEO, and launch — was built in 55 git commits across about 6 weeks. I wrote zero lines of code. Here's what actually happened.

### B. The "Creative Director" Hook

> I've been building digital products for 23 years. For the first time, I didn't build my own site — I directed it. I described what I wanted out loud, watched it appear on screen, reacted, redirected, and refined. It felt less like using a tool and more like working with the fastest junior developer I've ever managed.

### C. The "Late Night" Hook

> At 11 PM on a Tuesday, I told an AI to add a points system to my portfolio site. By midnight it was live — hovering on a card gave you 5 points, scrolling earned 15, and finishing the contact form was worth a thousand. Then I asked for clickable UFOs. I went to bed thrilled. I woke up and killed the UFOs. That's the real story of building with AI: the creative highs, the morning-after edits, and the 55 commits in between.

---

## Stats at a Glance

- **55+ commits** across ~6 weeks
- **~650 messages** in the conversation
- **4 color themes** (2 light, 2 dark) with secondary accent colors
- **6-step FlowForm** contact funnel
- **Full gamification system** with cooldowns and one-time bonuses
- **Zero external JS dependencies** — everything is vanilla
- **Single HTML file** for the entire site
- **5+ reverts** — experiments tried and intentionally killed
- **1 UFO feature** — built, shipped, and rolled back before sunrise
