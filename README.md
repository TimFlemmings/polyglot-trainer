# Polyglot Trainer

A phone-first trainer for **Ukrainian, Russian, German, Spanish, French and Italian**, built for travel and everyday talk.

- Old-school skill tree: branching skills, bonus branches, crowns 0–5, checkpoints and test-outs
- 197 words and phrases per language with recorded audio, transliteration and Ukrainian stress marks
- Lessons with hearts and combos, spaced-repetition review, hands-free listening
- Arcade: Word rain, Boss battle, Slovo, Typing race, Memory flip, Hangman, Word search, Speed match, Ear test, Letter rush
- Street talk (18+): slang, rated swearing and jokes for every language
- Word stages: each word moves up at most once a day, so practice is spaced
- Cyrillic alphabet trainer, grammar puzzles, XP, levels, streaks and badges
- **Works offline** once installed. Progress is stored on the device.

## Install on Android
1. Open the GitHub Pages link in Chrome.
2. Tap **Install app** (or ⋮ → **Add to Home screen**).
3. Open it once while online so the audio for all languages downloads.

## Install on iPhone
Open the link in Safari → Share → **Add to Home Screen**.

## Move progress
In the app: **Me → Move your progress**. Copy a code from one version, paste it into the other.

## Files
- `index.html`: the whole app (single file)
- `audio-*.json`: recorded clips per language (open-source Piper voices)
- `sw.js`: offline cache. Bump `VERSION` when you change any file so phones pick up the update.
- `manifest.webmanifest`, `icon-*.png`: install metadata
