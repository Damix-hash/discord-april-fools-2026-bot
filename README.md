# Discord April Fools 2026 Bot 🐉

Auto-farmer for Discord's 2026 April Fools MMO event — the one where you fight 
an immortal dragon called "Grass Toucher" for absolutely no reason.

## What it does

- **Adventure** — spams continuously for loot and XP
- **Craft** — detects the random arrow sequence, types it automatically (all 3 rounds)
- **Battle** — clicks the moving target via DOM (works even when it goes off-screen)
- **Continue** — auto-dismisses result screens

## How to use

1. Open Discord in your **browser** and navigate to the April Fools event
2. Open DevTools (`F12`) and go to the **Console** tab
3. Paste the contents of `bot.js` and hit Enter
4. Type `stopBot()` to stop, `debugBot()` to check status

## Commands

| Command | Description |
|---------|-------------|
| `stopBot()` | Stops all automation |
| `debugBot()` | Prints current button states to console |

## Notes

- This is a **browser console script** — no installation needed
- Only works during the 2026 Discord April Fools event
- Does not store, transmit, or access any personal data
- Use at your own risk

## License

MIT — do whatever you want with it
