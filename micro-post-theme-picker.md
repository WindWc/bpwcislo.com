# Micro Post — The Theme Picker

## The Quick Pitch

Four tiny dots in the header. Tap one and the entire site transforms — colors, hovers, icons, even the rocket flame. Two light themes, two dark. It remembers your choice when you come back. And yes, switching themes earns you points.

## What It Actually Does

- **Jungle** (light) — earthy green accent, warm amber secondary
- **Miami** (dark) — hot pink accent, teal secondary, full dark mode inversion
- **Ocean** (light) — sky blue accent, indigo secondary
- **Ember** (dark) — amber accent, red secondary, full dark mode inversion

Every theme has two colors: a primary accent and a secondary accent. The primary handles buttons, links, and active states. The secondary shows up on hovers — the name card, service icons, expandable sections, even the progress bar in the contact form. It's a design system, not a color swap.

## The Details That Took Forever

- **Inactive dots fade to 40% opacity** and are slightly smaller (10px vs 13px on desktop). The active dot is full size, full opacity, no border. Hover brings any dot back to 100%. Tiny detail, but it makes the active theme obvious without a heavy indicator.
- **Spacing was agonized over.** Desktop got 24px gaps. Mobile got 21px. We went back and forth at least 4 times to get the dots far enough apart to be easy tap targets without looking disconnected from each other.
- **On mobile, the dots sit between the points counter and the hamburger**, perfectly centered using flexbox. We tried absolute positioning first — it broke when the points counter grew from "0 pts" to "250 pts." Flexbox handles it naturally.
- **Dark mode isn't just an accent change.** Miami and Ember invert every shade — `--slate-50` through `--slate-900` all flip. Backgrounds go dark, text goes light, and the glass effects in the nav and mobile dropdown adapt. It's ~20 CSS variables per theme.
- **Theme persists across pages** via `localStorage`. Pick Ember on the homepage, visit the /uses page, it's still Ember. Come back tomorrow, still Ember.
- **Switching themes is gamified.** First switch: 50 points. Every switch after that: 25 points (with a 3-second cooldown so you can't just spam-click for points).

## The Hamburger Detail

The middle bar of the hamburger icon matches the current accent color. When you open the menu and it transforms into an X, one arm of the X keeps that accent color. It's a 2-line CSS change that ties the nav chrome to the active theme in a way most people won't consciously notice but will feel.

## How It's Built

Zero libraries. Pure CSS custom properties + a few lines of vanilla JS. The theme switch is instant because it's just swapping a `data-theme` attribute on the `<html>` element — the browser re-evaluates every `var()` reference in the stylesheet in one repaint. No page reload, no flash.

## The One-Liner for the Post

> Four dots. Four moods. Two of them flip the entire site to dark mode. And your theme follows you everywhere — even earns you points.
