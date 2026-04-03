// made with claude

(function () {
  const CLICK_SPEED     = 50;
  const CRAFT_KEY_DELAY = 80;
  const POLL_INTERVAL   = 150;

  let adventureBot = null;
  let pollBot      = null;
  let isCrafting   = false;

  // ─── Helpers ────────────────────────────────────────────────────────────────

  function findBtn(label) {
    return Array.from(document.querySelectorAll('[role="button"]'))
      .find(el => el.textContent.trim().includes(label));
  }

  function isDisabled(btn) {
    if (!btn) return true;
    let el = btn;
    for (let i = 0; i < 5; i++) {
      if (!el) break;
      if (el.className && typeof el.className === 'string' && el.className.includes('disabled')) return true;
      el = el.parentElement;
    }
    return false;
  }

  function isBattleActive() {
    return document.querySelector('.container_b6b008') !== null;
  }

  function sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  // ─── Adventure ───────────────────────────────────────────────────────────────

  function startAdventure() {
    if (adventureBot) clearInterval(adventureBot);
    adventureBot = setInterval(() => {
      const btn = findBtn('Adventure');
      if (btn && !isDisabled(btn)) btn.click();
    }, CLICK_SPEED);
  }

  // ─── Craft ───────────────────────────────────────────────────────────────────

  async function doCraft() {
    if (isCrafting) return;
    const btn = findBtn('Craft');
    if (!btn || isDisabled(btn)) return;

    btn.click();
    await sleep(400);

    isCrafting = true;

    for (let round = 0; round < 3; round++) {
      const seqContainer = document.querySelector('.sequences__34527');
      if (!seqContainer) break;

      const arrows = Array.from(seqContainer.querySelectorAll('img[alt^="Arrow"]'))
        .map(img => img.alt);
      if (arrows.length === 0) break;

      console.log(`%c[CRAFT] Round ${round + 1}/3: ` + arrows.join(' → '), 'color:#00aaff; font-weight:bold');

      for (const key of arrows) {
        document.dispatchEvent(new KeyboardEvent('keydown', {
          key, code: key,
          keyCode: { ArrowUp:38, ArrowDown:40, ArrowLeft:37, ArrowRight:39 }[key],
          bubbles: true, cancelable: true
        }));
        await sleep(CRAFT_KEY_DELAY);
      }

      await sleep(600);
    }

    isCrafting = false;
  }

  // ─── Battle ───────────────────────────────────────────────────────────────────

  function doBattle() {
    const btn = findBtn('Battle');

    if (!isBattleActive()) {
      if (btn && !isDisabled(btn)) btn.click();
      return;
    }

    const target = document.querySelector('.targetContainer_b6b008 .clickable__5c90e');
    if (target) {
      target.click();
      console.log('%c[BATTLE] Target hit!', 'color:#ff4444');
    }
  }

  // ─── Continue ─────────────────────────────────────────────────────────────────

  function clickContinue() {
    const btn = findBtn('Continue');
    if (btn) {
      btn.click();
      console.log('%c[CONTINUE] Clicked!', 'color:#aa00ff; font-weight:bold');
    }
  }

  // ─── Dragon ──────────────────────────────────────────────────────────────────

  function clickDragon() {
    (document.querySelector('img[alt="Grass Toucher"]') ||
     document.querySelector('[class*="dragon"]'))?.click();
  }

  // ─── Poll ─────────────────────────────────────────────────────────────────────

  function startPoll() {
    if (pollBot) clearInterval(pollBot);
    pollBot = setInterval(() => {
      clickDragon();
      clickContinue();
      doCraft();
      doBattle();
    }, POLL_INTERVAL);
  }

  // ─── Init ─────────────────────────────────────────────────────────────────────

  function init() {
    startAdventure();
    startPoll();
    console.log('%c[BOT STARTED] Adventure + Craft + Battle + Continue!', 'color:#00ff00; font-weight:bold; font-size:14px');
    console.log('%cstopBot()  → stop | debugBot() → status', 'color:#ff9900');
  }

  window.stopBot = function () {
    clearInterval(adventureBot);
    clearInterval(pollBot);
    isCrafting = false;
    console.log('%c[BOT STOPPED]', 'color:#ff0000; font-weight:bold');
  };

  window.debugBot = function () {
    const adv   = findBtn('Adventure');
    const craft = findBtn('Craft');
    const bat   = findBtn('Battle');
    const cont  = findBtn('Continue');
    const target = document.querySelector('.targetContainer_b6b008 .clickable__5c90e');
    console.table({
      Adventure: { found: !!adv, disabled: isDisabled(adv) },
      Craft:     { found: !!craft, disabled: isDisabled(craft) },
      Battle:    { found: !!bat, disabled: isDisabled(bat), active: isBattleActive(), targetVisible: !!target },
      Continue:  { found: !!cont },
    });
  };

  init();
})();
