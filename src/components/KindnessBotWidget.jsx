import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import kindnessBotIcon from '../pages/assets/kbot.png';

// Ported from Kindness Sparks' KindnessBot widget. Renders in its own shadow
// root (via `:host { all: initial; }`) so its styles can never collide with
// this app's CSS (km-*, etc.), and is mounted once at the app root so it
// floats above every route.
const API_BASE = import.meta.env.VITE_API_URL || '';
const API = `${API_BASE}/api/v1/kindnessbot`;
const ICON = kindnessBotIcon;

const SUGGESTIONS = [
  'What can I do with Kindness Matrix?',
  'How do I find a kindness idea near me?',
  'I want to share a kindness idea with a friend.',
  'What is Kindness Matrix?',
];

// Maps a response's file_path (a route in this app) to a friendly label for
// the "go to this page" button, e.g. "/resources" -> "Resources".
const PAGE_LABELS = {
  '/': 'Home',
  '/newsroom': 'Newsroom',
  '/resources': 'Resources',
  '/contact': 'Contact',
  '/legal-disclaimer': 'Legal Disclaimer',
};

export default function KindnessBotWidget() {
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);

  useEffect(() => {
    navigateRef.current = navigate;
  }, [navigate]);

  useEffect(() => {
    const host = document.createElement('div');
    host.style.cssText = 'position:fixed;inset:auto 0 0 auto;z-index:2147483000;';
    document.body.appendChild(host);
    const root = host.attachShadow({ mode: 'open' });

    root.innerHTML = `
      <style>
        :host { all: initial; }
        * { box-sizing: border-box; font-family: 'Google Sans', Roboto, system-ui, sans-serif; }
        .panel {
          position: fixed; right: 46px; bottom: 42px; width: 320px; max-width: calc(100vw - 56px);
          height: 440px; max-height: calc(100vh - 60px); display: none; flex-direction: column;
          background: #fff; border: 1px solid #dadce0; border-radius: 14px; overflow: hidden;
          box-shadow: 0 12px 32px rgba(60,64,67,.28);
        }
        .panel.open { display: flex; }
        .launcher {
          position: fixed; right: 46px; bottom: 42px; display: flex; align-items: center; gap: 7px;
          padding: 7px 13px 7px 8px; border: 1px solid #dadce0; border-radius: 999px;
          background: #fff; color: #202124; cursor: pointer; font: 500 13px/1 inherit;
          box-shadow: 0 2px 10px rgba(60,64,67,.24);
        }
        .launcher:hover { box-shadow: 0 4px 14px rgba(60,64,67,.32); }
        .launcher.hidden { display: none; }
        .head {
          display: flex; align-items: center; gap: 8px; padding: 10px 12px;
          border-bottom: 1px solid #ecedef; font: 500 14px/1 inherit; color: #202124;
        }
        .dot {
          width: 24px; height: 24px; border-radius: 50%; flex: 0 0 24px;
          object-fit: cover; display: block;
        }
        .intro { font-size: 12.5px; color: #5f6368; line-height: 1.5; }
        .disclaimer {
          padding: 0 12px 10px; text-align: center; font-size: 10.5px; color: #80868b;
        }
        .close {
          margin-left: auto; border: 0; background: none; cursor: pointer;
          font-size: 20px; line-height: 1; color: #5f6368; padding: 2px 4px;
        }
        .log { flex: 1; overflow-y: auto; padding: 12px; display: flex; flex-direction: column; gap: 9px; }
        .msg { max-width: 88%; padding: 8px 11px; border-radius: 13px; font-size: 13px; line-height: 1.5; word-wrap: break-word; }
        .bot { align-self: flex-start; background: #f1f3f4; color: #202124; border-bottom-left-radius: 4px; }
        .me  { align-self: flex-end;   background: #1a73e8; color: #fff;    border-bottom-right-radius: 4px; white-space: pre-wrap; }
        .err { align-self: flex-start; background: #fce8e6; color: #c5221f; white-space: pre-wrap; }
        .bot p { margin: 0 0 8px; }
        .bot ol, .bot ul { margin: 0 0 8px; padding-left: 20px; }
        .bot li { margin-bottom: 4px; }
        .bot p:last-child, .bot ol:last-child, .bot ul:last-child { margin-bottom: 0; }
        .chips { display: flex; flex-direction: column; align-items: flex-start; gap: 8px; }
        .chip {
          border: 1px solid #dadce0; background: #fff; color: #1a73e8; cursor: pointer;
          border-radius: 16px; padding: 8px 12px; font-size: 12.5px; line-height: 1.4;
          text-align: left; width: 100%;
        }
        .chip:hover { background: #f8f9fa; border-color: #d2e3fc; }
        .nav-btn {
          align-self: flex-start; border: 0; background: #1a73e8; color: #fff; cursor: pointer;
          border-radius: 16px; padding: 8px 14px; font-size: 12.5px; font-weight: 500;
          line-height: 1.4;
        }
        .nav-btn:hover { background: #1765cc; }
        .foot { display: flex; gap: 7px; padding: 10px 10px 6px; }
        .foot input {
          flex: 1; height: 36px; padding: 0 14px; font-size: 12.5px;
          border: 2px solid #1a73e8; border-radius: 999px; outline: none; color: #202124;
        }
        .foot input::placeholder { color: #80868b; }
        .foot button {
          width: 36px; height: 36px; border: 0; border-radius: 50%; cursor: pointer;
          background: #1a73e8; color: #fff; font-size: 14px; flex: 0 0 36px;
        }
        .foot button:disabled { background: #dadce0; cursor: default; }
        .typing span {
          display: inline-block; width: 6px; height: 6px; margin-right: 3px; border-radius: 50%;
          background: #9aa0a6; animation: b 1.2s infinite;
        }
        .typing span:nth-child(2) { animation-delay: .2s }
        .typing span:nth-child(3) { animation-delay: .4s }
        @keyframes b { 0%,60%,100% { opacity:.3 } 30% { opacity:1 } }
      </style>
      <button class="launcher" type="button" title="Ask KindnessBot">
        <img class="dot" src="${ICON}" alt="">KindnessBot
      </button>
      <div class="panel" part="panel">
        <div class="head"><img class="dot" src="${ICON}" alt="">KindnessBot<button class="close" title="Close">×</button></div>
        <div class="log"></div>
        <form class="foot">
          <input type="text" placeholder="Ask about Kindness Matrix..." autocomplete="off" maxlength="4000">
          <button type="submit" title="Send">➤</button>
        </form>
        <div class="disclaimer">This information is provided by the Kindness product.</div>
      </div>`;

    const panel = root.querySelector('.panel');
    const launcher = root.querySelector('.launcher');
    const log = root.querySelector('.log');
    const form = root.querySelector('.foot');
    const input = root.querySelector('.foot input');
    const send = root.querySelector('.foot button');
    let conversationId = null;
    let busy = false;

    // Only **bold** survives; everything else is escaped, since the answer
    // text comes back from a model.
    function escapeAndBold(text) {
      const escaped = text.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
      return escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    }

    // Groups consecutive numbered ("1. ...") or bulleted ("- ..."/"* ...")
    // lines into real <ol>/<ul> lists instead of leaving them as plain
    // pre-wrapped text, so multi-step answers read as a list, not a
    // wrapped paragraph.
    function formatBotHtml(text) {
      const lines = String(text || '').split(/\n+/).map((l) => l.trim()).filter(Boolean);
      const blocks = [];
      let currentItems = null;
      let currentType = null;

      lines.forEach((line) => {
        const bulletMatch = line.match(/^[-*•]\s+(.*)/);
        const numberMatch = line.match(/^\d+[.)]\s+(.*)/);
        const match = bulletMatch || numberMatch;

        if (match) {
          const type = numberMatch ? 'ol' : 'ul';
          if (!currentItems || currentType !== type) {
            currentItems = [];
            currentType = type;
            blocks.push({ type, items: currentItems });
          }
          currentItems.push(match[1]);
        } else {
          currentItems = null;
          currentType = null;
          blocks.push({ type: 'p', text: line });
        }
      });

      return blocks.map((block) => {
        if (block.type === 'p') return `<p>${escapeAndBold(block.text)}</p>`;
        const items = block.items.map((item) => `<li>${escapeAndBold(item)}</li>`).join('');
        return `<${block.type}>${items}</${block.type}>`;
      }).join('');
    }

    function bubble(cls, text) {
      const el = document.createElement('div');
      el.className = 'msg ' + cls;
      el.innerHTML = cls === 'bot' ? formatBotHtml(text) : escapeAndBold(text);
      log.appendChild(el);
      log.scrollTop = log.scrollHeight;
      return el;
    }

    function addNavButton(filePath) {
      const label = PAGE_LABELS[filePath] || 'this page';
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'nav-btn';
      btn.textContent = `Go to ${label} →`;
      btn.onclick = () => navigateRef.current(filePath);
      log.appendChild(btn);
      log.scrollTop = log.scrollHeight;
    }

    function greet() {
      const intro = document.createElement('div');
      intro.className = 'intro';
      intro.textContent = 'Ask me about Kindness Matrix. Try:';
      log.appendChild(intro);

      const chips = document.createElement('div');
      chips.className = 'chips';
      SUGGESTIONS.forEach((q) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'chip';
        b.textContent = q;
        b.onclick = () => { intro.remove(); chips.remove(); ask(q); };
        chips.appendChild(b);
      });
      log.appendChild(chips);
    }

    async function ask(message) {
      if (busy || !message.trim()) return;
      busy = true;
      send.disabled = true;
      bubble('me', message);

      const typing = bubble('bot', '');
      typing.classList.add('typing');
      typing.innerHTML = '<span></span><span></span><span></span>';

      try {
        const res = await fetch(API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, text: message, conversation_id: conversationId || '' }),
        });
        const data = await res.json().catch(() => ({}));
        typing.remove();
        if (!res.ok) throw new Error(data.detail || 'Request failed (' + res.status + ')');
        conversationId = data.conversation_id || conversationId;
        bubble('bot', data.answer || '');
        if (typeof data.file_path === 'string' && data.file_path.trim()) {
          addNavButton(data.file_path.trim());
        }
      } catch (err) {
        typing.remove();
        bubble('err', 'Could not reach KindnessBot. ' + err.message);
      } finally {
        busy = false;
        send.disabled = false;
        log.scrollTop = log.scrollHeight;
        input.focus();
      }
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value;
      input.value = '';
      ask(text);
    });

    function toggle() {
      const open = !panel.classList.contains('open');
      panel.classList.toggle('open', open);
      // The launcher sits where the panel does, so it steps aside while open.
      launcher.classList.toggle('hidden', open);
      if (open) {
        if (!log.childElementCount) greet();
        input.focus();
      }
    }

    root.querySelector('.close').onclick = toggle;
    launcher.onclick = toggle;

    function onDocClick(e) {
      if (e.target.closest('[data-kindnessbot-open]')) { e.preventDefault(); toggle(); }
    }
    document.addEventListener('click', onDocClick);

    return () => {
      document.removeEventListener('click', onDocClick);
      host.remove();
    };
  }, []);

  return null;
}
