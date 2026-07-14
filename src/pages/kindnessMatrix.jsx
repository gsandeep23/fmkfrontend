import { useEffect, useRef, useState } from 'react';
import {
  postIdeasText, postIdeasImage, postChatImage, postTts, postTranscribe,
  postChat, postMoreInfo, postActionOptions, postShareMessage, postMeetupInvite,
} from '../services/endpoints';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Sidebar from '../components/Sidebar.jsx';
import './kindnessMatrix.css';

function fileToB64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const d = e.target.result;
      resolve({ b64: d.split(',')[1], dataUrl: d });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

let idCounter = 0;
function genId() {
  idCounter += 1;
  return `msg_${Date.now()}_${idCounter}`;
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M19 10a7 7 0 0 1-14 0" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}
const WAVE_BAR_COUNT = 36;
const WAVE_SILENCE_THRESHOLD = 0.05;

function WaveBars({ levels }) {
  return (
    <div className="km-wave" title="Listening...">
      {levels.map((lvl, i) => (
        lvl < WAVE_SILENCE_THRESHOLD
          ? <span key={i} className="km-wave-dot" />
          : <span key={i} className="km-wave-bar" style={{ height: `${10 + Math.min(1, lvl) * 24}px` }} />
      ))}
    </div>
  );
}
function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}
function SpeakerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="4 9 8 9 12 5 12 19 8 15 4 15 4 9" />
      <path d="M17.5 8.5a5 5 0 0 1 0 7" />
      <path d="M20 6a8.5 8.5 0 0 1 0 12" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 21s-6.7-4.35-9.3-8.2C1 10.2 1.7 6.6 4.7 5.1c2.3-1.15 4.6-.3 5.9 1.4l1.4 1.8 1.4-1.8c1.3-1.7 3.6-2.55 5.9-1.4 3 1.5 3.7 5.1 2 7.7C18.7 16.65 12 21 12 21z" />
    </svg>
  );
}
function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="6 11 12 5 18 11" />
    </svg>
  );
}

const IDEA_CARD_ICONS = ['💡', '🌟', '🎈', '🌈'];

function renderChatText(text) {
  if (!text) return null;
  const lines = text.split(/\n+/).map((l) => l.trim()).filter(Boolean);
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

  return blocks.map((block, i) => {
    if (block.type === 'p') return <p key={i} className="km-chat-text-p">{block.text}</p>;
    const ListTag = block.type;
    return (
      <ListTag key={i} className="km-chat-list">
        {block.items.map((item, j) => <li key={j}>{item}</li>)}
      </ListTag>
    );
  });
}

function IdeaRow({ idea, idx = 0, showToast }) {
  const [moreOpen, setMoreOpen] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [moreLoaded, setMoreLoaded] = useState(false);
  const [moreText, setMoreText] = useState('');

  const [kaOpen, setKaOpen] = useState(false);
  const [zip, setZip] = useState('');
  const [kaType, setKaType] = useState(null);
  const [kaLoading, setKaLoading] = useState(false);
  const [kaText, setKaText] = useState('');
  const [actionQuery, setActionQuery] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  async function handleMoreInfo() {
    if (moreOpen) { setMoreOpen(false); return; }
    setMoreOpen(true);
    if (moreLoaded) return;
    setMoreLoading(true);
    try {
      const res = await postMoreInfo(idea);
      setMoreText(res.info || res.more_info || res.reply || '');
      setMoreLoaded(true);
    } catch {
      setMoreText('Could not load — please try again.');
    } finally {
      setMoreLoading(false);
    }
  }

  function renderMoreInfo() {
    if (moreLoading || !moreLoaded) return <em>Thinking kindly...</em>;
    const items = moreText
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => line.replace(/^\d+[.)]\s*/, ''));
    if (items.length > 1) {
      return (
        <ol className="km-more-info-list">
          {items.map((item, i) => <li key={i}>{item}</li>)}
        </ol>
      );
    }
    return moreText;
  }

  function handleCopy() {
    if (!moreText.trim()) { showToast('Nothing to copy yet. Open More Info first.'); return; }
    navigator.clipboard.writeText(moreText)
      .then(() => showToast('Copied to clipboard!'))
      .catch(() => showToast('Could not copy.'));
  }

  function handleDownload() {
    if (!moreText.trim()) { showToast('Nothing to download yet. Open More Info first.'); return; }
    const blob = new Blob([moreText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = 'kindness-idea.txt';
    document.body.appendChild(link); link.click();
    document.body.removeChild(link); URL.revokeObjectURL(url);
    showToast('Downloaded idea text.');
  }

  function toggleKa() {
    setKaOpen((prevOpen) => {
      const next = !prevOpen;
      if (next) { setKaType(null); setKaText(''); }
      return next;
    });
  }

  async function handleKaClick(type) {
    setKaType(type);
    if (type === 'online' || type === 'offline') return;

    setKaLoading(true);
    try {
      if (type === 'share') {
        let info = moreLoaded ? moreText : '';
        if (!info) {
          const moreRes = await postMoreInfo(idea);
          info = moreRes.info || moreRes.more_info || moreRes.reply || '';
          setMoreText(info);
          setMoreLoaded(true);
        }
        const res = await postShareMessage(idea, info);
        setKaText(res.share_message || res.message || res.reply || '');
      } else if (type === 'meetup') {
        const res = await postMeetupInvite(idea);
        setKaText(res.invite || res.message || res.reply || '');
      }
    } catch {
      setKaText('');
    } finally {
      setKaLoading(false);
    }
  }

  useEffect(() => {
    if (kaType !== 'online' && kaType !== 'offline') return;

    const t = setTimeout(() => {
      if (kaType === 'offline' && !zip.trim()) { setActionQuery(''); return; }
      setActionLoading(true);
      postActionOptions(idea, kaType === 'offline' ? zip : '')
        .then((res) => setActionQuery(res.suggestion || res.query || ''))
        .catch(() => setActionQuery(''))
        .finally(() => setActionLoading(false));
    }, 400);

    return () => clearTimeout(t);
  }, [kaType, zip, idea]);

  function renderKaResult() {
    if (kaType === 'online') {
      if (actionLoading) return <em>Finding the best options...</em>;
      const q = encodeURIComponent(actionQuery || idea.split(':')[0] || idea);
      return (
        <>
          <div className="km-share-label">Shop online:</div>
          <div className="km-share-link-row">
            <a className="km-share-link" style={{ background: '#FF9900', color: '#111' }} href={`https://www.amazon.com/s?k=${q}`} target="_blank" rel="noopener noreferrer">📦 Amazon</a>
            <a className="km-share-link" style={{ background: '#F45800' }} href={`https://www.etsy.com/search?q=${q}`} target="_blank" rel="noopener noreferrer">🏷️ Etsy</a>
            <a className="km-share-link" style={{ background: '#0071CE' }} href={`https://www.walmart.com/search?q=${q}`} target="_blank" rel="noopener noreferrer">🏬 Walmart</a>
            <a className="km-share-link" style={{ background: '#4285F4' }} href={`https://www.google.com/search?tbm=shop&q=${q}`} target="_blank" rel="noopener noreferrer">🔍 Google</a>
          </div>
        </>
      );
    }

    if (kaType === 'offline') {
      if (!zip.trim()) return <span>📍 Please enter your ZIP code above first.</span>;
      if (actionLoading) return <em>Finding stores near {zip}...</em>;
      const qOffline = encodeURIComponent(actionQuery || `${idea.split(':')[0] || idea} store near ${zip}`);
      return (
        <a className="km-share-link" style={{ background: '#34A853', fontSize: '12px', padding: '7px 14px' }}
          href={`https://www.google.com/maps/search/?api=1&query=${qOffline}`} target="_blank" rel="noopener noreferrer">
          🗺️ Find stores near {zip} on Google Maps
        </a>
      );
    }

    if (kaType === 'share') {
      if (kaLoading) return <em>Loading kindness details to share...</em>;
      if (!kaText) return <em>Could not load — please try again.</em>;
      const msg = `Hi! I want to share a kindness idea with you 🙂\n\n${kaText}`;
      const enc = encodeURIComponent(msg);
      const subject = encodeURIComponent('A Kindness Idea for You 💛');
      return (
        <>
          <div className="km-msg-card" style={{ background: '#e3f2fd', borderLeft: '3px solid #1877F2' }}>{msg}</div>
          <div className="km-share-label">Share via:</div>
          <div className="km-share-link-row">
            <a className="km-share-link" style={{ background: '#25D366' }} href={`https://wa.me/?text=${enc}`} target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
            <a className="km-share-link" style={{ background: '#1877F2' }} href={`https://www.facebook.com/sharer/sharer.php?u=https://westportsmiles.org&quote=${enc}`} target="_blank" rel="noopener noreferrer">📘 Facebook</a>
            <a className="km-share-link" style={{ background: '#229ED9' }} href={`https://t.me/share/url?url=https://westportsmiles.org&text=${enc}`} target="_blank" rel="noopener noreferrer">✈️ Telegram</a>
            <a className="km-share-link" style={{ background: '#000' }} href={`https://twitter.com/intent/tweet?text=${enc}`} target="_blank" rel="noopener noreferrer">🐦 Twitter</a>
            <a className="km-share-link" style={{ background: '#EA4335' }} href={`https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${enc}`} target="_blank" rel="noopener noreferrer">📧 Gmail</a>
          </div>
        </>
      );
    }

    if (kaType === 'meetup') {
      if (kaLoading) return <em>Writing your invite...</em>;
      if (!kaText) return <em>Could not generate invite — please try again.</em>;
      const enc2 = encodeURIComponent(kaText);
      return (
        <>
          <div className="km-msg-card" style={{ background: '#e8f5e9', borderLeft: '3px solid #34A853' }}>{kaText}</div>
          <div className="km-share-label">Schedule via:</div>
          <div className="km-share-link-row">
            <a className="km-share-link" style={{ background: '#34A853' }} href="https://meet.google.com/new" target="_blank" rel="noopener noreferrer">🎥 Google Meet</a>
            <a className="km-share-link" style={{ background: '#2D8CFF' }} href="https://zoom.us/meeting/schedule" target="_blank" rel="noopener noreferrer">💻 Zoom</a>
            <a className="km-share-link" style={{ background: '#6264A7' }} href="https://teams.microsoft.com/l/meeting/new" target="_blank" rel="noopener noreferrer">👥 Teams</a>
            <a className="km-share-link" style={{ background: '#34C759' }} href="facetime://" target="_blank" rel="noopener noreferrer">📱 FaceTime</a>
            <a className="km-share-link" style={{ background: '#25D366' }} href={`https://wa.me/?text=${enc2}`} target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
          </div>
        </>
      );
    }

    return null;
  }

  const icon = IDEA_CARD_ICONS[idx % IDEA_CARD_ICONS.length];

  return (
    <div className="km-idea-card">
      <div className="km-idea-card-header">
        <span className="km-idea-icon">{icon}</span>
        <div className="km-idea-text">{idea}</div>
      </div>
      <div>
        <div className="km-idea-actions">
          <button className="km-action-btn km-action-btn-primary" onClick={handleMoreInfo}>💡 More Info</button>
          <button className="km-action-btn" onClick={toggleKa}>🎯 Kindness Action</button>
        </div>

        {moreOpen && (
          <div className="km-more-info-panel">
            <div className="km-more-info-content">
              {renderMoreInfo()}
            </div>
            {moreLoaded && !moreLoading && (
              <div className="km-more-info-toolbar">
                <button onClick={handleCopy}>📋 Copy</button>
                <button onClick={handleDownload}>⬇️ Download</button>
              </div>
            )}
          </div>
        )}

        {kaOpen && (
          <div className="km-kindness-action-panel">
            <div className="km-ka-title">✨ Choose your Kindness Action</div>
            <div className="km-zip-row">
              <input className="km-zip-input" placeholder="📍 ZIP code e.g. 06880" maxLength={10}
                value={zip} onChange={(e) => setZip(e.target.value)} />
            </div>
            <div className="km-ka-buttons">
              <button className="km-ka-btn" style={{ background: '#4C6FE0' }} onClick={() => handleKaClick('online')}>🛒 Buy Online</button>
              <button className="km-ka-btn" style={{ background: '#2E9E8F' }} onClick={() => handleKaClick('offline')}>🏪 Buy Offline</button>
              <button className="km-ka-btn" style={{ background: '#6C63D6' }} onClick={() => handleKaClick('share')}>🤝 Share</button>
              <button className="km-ka-btn" style={{ background: '#3D7EA6' }} onClick={() => handleKaClick('meetup')}>📅 Schedule</button>
            </div>
            {kaType && <div className="km-ka-result">{renderKaResult()}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

function MessageRow({ msg, showToast, onSpeak, onGoHome, showBack }) {
  const [speaking, setSpeaking] = useState(false);

  if (msg.role === 'user') {
    return (
      <div className="km-msg-row km-msg-row-user">
        <div className="km-bubble-user">
          {msg.imgDataUrl && (
            <img className={`km-img-in-bubble ${msg.blurred ? 'km-blurred' : ''}`} src={msg.imgDataUrl} alt="" />
          )}
          {msg.text}
        </div>
      </div>
    );
  }

  async function handleSpeak() {
    if (speaking) return;
    setSpeaking(true);
    try {
      await onSpeak(msg.text);
    } finally {
      setSpeaking(false);
    }
  }

  return (
    <div className="km-msg-row km-msg-row-bot">
      <div className="km-bot-avatar">✨</div>
      <div className="km-bubble-bot-wrap">
        <div className="km-bubble-bot">
          {msg.kind === 'ideas' ? (
            <>
              <div className="km-obj-label">Kindness ideas</div>
              {msg.ideas.map((idea, idx) => (
                <IdeaRow key={idx} idea={idea} idx={idx} showToast={showToast} />
              ))}
            </>
          ) : (
            <>
              {renderChatText(msg.text)}
              <div className="km-bubble-toolbar">
                <button className="km-speak-btn" title="Speak" disabled={speaking} onClick={handleSpeak}>
                  <SpeakerIcon />
                </button>
              </div>
            </>
          )}
        </div>
        {showBack && (
          <button className="km-back-btn" onClick={onGoHome}>← Back to Home</button>
        )}
      </div>
    </div>
  );
}

export default function KindnessMatrix() {
  const [view, setView] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [pendingImg, setPendingImg] = useState(null);
  const [typing, setTyping] = useState(false);
  const [recording, setRecording] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [homeInput, setHomeInput] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [waveLevels, setWaveLevels] = useState(() => Array(WAVE_BAR_COUNT).fill(0));

  const lastObjNameRef = useRef('');
  const lastIdeasRef = useRef([]);
  const chatHistoryRef = useRef([]);
  const pendingImgRef = useRef(null);

  const messagesRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const camStreamRef = useRef(null);
  const fileInputRef = useRef(null);
  const chatInputElRef = useRef(null);
  const mediaRecRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioCtxRef = useRef(null);
  const waveIntervalRef = useRef(null);

  useEffect(() => { pendingImgRef.current = pendingImg; }, [pendingImg]);

  useEffect(() => {
    if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages, typing]);

  useEffect(() => () => {
    camStreamRef.current?.getTracks().forEach((t) => t.stop());
  }, []);

  useEffect(() => () => {
    if (waveIntervalRef.current) clearInterval(waveIntervalRef.current);
    audioCtxRef.current?.close().catch(() => {});
  }, []);

  useEffect(() => {
    window.history.replaceState({ view: 'home' }, '');
    function handlePopState(e) {
      if (e.state?.view === 'chat') {
        setView('chat');
      } else {
        goHome(true);
      }
    }
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  function showToast(msg, ms = 3200) {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), ms);
  }

  async function handleSpeak(text) {
    try {
      const { audio_b64 } = await postTts(text);
      await new Audio(`data:audio/mp3;base64,${audio_b64}`).play();
    } catch {
      showToast('Could not play audio.');
    }
  }

  function goHome(fromPopState) {
    setView('home');
    setMessages([]);
    setPendingImg(null);
    lastObjNameRef.current = '';
    lastIdeasRef.current = [];
    chatHistoryRef.current = [];
    setHomeInput('');
    setChatInput('');
    if (!fromPopState) window.history.pushState({ view: 'home' }, '');
  }

  function clearPending() { setPendingImg(null); }

  function addBotMessage(partial) {
    setMessages((prev) => [...prev, { id: genId(), role: 'bot', ...partial }]);
  }

  async function send(rawText, imgB64, imgDataUrl) {
    const text = (rawText || '').trim();
    if (!text && !imgB64) return;
    if (view !== 'chat') {
      setView('chat');
      window.history.pushState({ view: 'chat' }, '');
    }

    const userMsgId = genId();
    setMessages((prev) => [...prev, { id: userMsgId, role: 'user', text, imgDataUrl: imgDataUrl || null, blurred: false }]);

    clearPending();
    setChatInput('');
    setHomeInput('');
    setTyping(true);

    try {
      let data;

      if (imgB64) {
        if (!text) {
          data = await postIdeasImage(imgB64);

          if (data.flagged) {
            setMessages((prev) => prev.map((m) => (m.id === userMsgId ? { ...m, blurred: true } : m)));
            setTyping(false);
            addBotMessage({ kind: 'text', text: '🚨 This image contains content that cannot be processed. Please try a different photo of an everyday object.' });
            return;
          }

          lastObjNameRef.current = data.object;
          lastIdeasRef.current = data.ideas;
          chatHistoryRef.current = [
            { role: 'user', content: `I uploaded an image of: ${data.object}` },
            { role: 'assistant', content: `Here are kindness ideas for ${data.object}: ${data.ideas.join('; ')}` },
          ];
          setTyping(false);
          addBotMessage({ kind: 'ideas', objName: data.object, ideas: data.ideas });
        } else {
          data = await postChatImage(imgB64, text, chatHistoryRef.current);
          chatHistoryRef.current = [...chatHistoryRef.current, { role: 'user', content: text }, { role: 'assistant', content: data.reply }];
          setTyping(false);
          addBotMessage({ kind: 'text', text: data.reply });
          lastObjNameRef.current = '';
          lastIdeasRef.current = [];
        }
      } else if (lastIdeasRef.current.length > 0) {
        chatHistoryRef.current = [...chatHistoryRef.current, { role: 'user', content: text }];
        data = await postChat(chatHistoryRef.current, text, lastObjNameRef.current, lastIdeasRef.current);
        chatHistoryRef.current = [...chatHistoryRef.current, { role: 'assistant', content: data.reply }];
        setTyping(false);
        addBotMessage({ kind: 'text', text: data.reply });
      } else {
        chatHistoryRef.current = [...chatHistoryRef.current, { role: 'user', content: text }];
        data = await postIdeasText(text);

        if (data.ideas && data.ideas.length > 0) {
          lastObjNameRef.current = data.object;
          lastIdeasRef.current = data.ideas;
          chatHistoryRef.current = [...chatHistoryRef.current, { role: 'assistant', content: `Ideas for ${data.object}: ${data.ideas.join('; ')}` }];
          setTyping(false);
          addBotMessage({ kind: 'ideas', objName: data.object, ideas: data.ideas });
        } else {
          data = await postChat(chatHistoryRef.current, text, '', []);
          chatHistoryRef.current = [...chatHistoryRef.current, { role: 'assistant', content: data.reply }];
          setTyping(false);
          addBotMessage({ kind: 'text', text: data.reply });
        }
      }
    } catch (e) {
      setTyping(false);
      addBotMessage({ kind: 'text', text: '⚠️ Something went wrong — please try again.' });
      showToast(e.message);
    }
  }

  function handleInputKeyDown(e, value) {
    if (e.key === 'Enter' && (value.trim() || pendingImg)) {
      send(value, pendingImg?.b64, pendingImg?.dataUrl);
    }
  }

  function handleSendClick(value) {
    if (value.trim() || pendingImg) send(value, pendingImg?.b64, pendingImg?.dataUrl);
  }

  function handleKindnessSearch() {
    if (homeInput.trim() || pendingImg) send(homeInput, pendingImg?.b64, pendingImg?.dataUrl);
  }

  function handleFeelingKindness() {
    const query = homeInput.trim() || 'Surprise me with a random act of kindness idea';
    send(query, pendingImg?.b64, pendingImg?.dataUrl);
  }

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const { b64, dataUrl } = await fileToB64(file);
    if (view !== 'chat') {
      setView('chat');
      window.history.pushState({ view: 'chat' }, '');
    }
    setPendingImg({ b64, dataUrl });
    e.target.value = '';
    chatInputElRef.current?.focus();
  }

  async function openCamera() {
    setCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false });
      camStreamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch {
      showToast('Camera access denied or unavailable.');
      closeCamera();
    }
  }

  function closeCamera() {
    setCameraOpen(false);
    camStreamRef.current?.getTracks().forEach((t) => t.stop());
    camStreamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  }

  function snapPhoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !video.videoWidth) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    const b64 = dataUrl.split(',')[1];
    closeCamera();
    if (view !== 'chat') {
      setView('chat');
      window.history.pushState({ view: 'chat' }, '');
    }
    setPendingImg({ b64, dataUrl });
    chatInputElRef.current?.focus();
  }

  function startWaveAnalysis(stream) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const audioCtx = new AudioCtx();
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    audioCtxRef.current = audioCtx;

    const data = new Uint8Array(analyser.fftSize);
    waveIntervalRef.current = setInterval(() => {
      analyser.getByteTimeDomainData(data);
      let sumSquares = 0;
      for (let i = 0; i < data.length; i++) {
        const v = (data[i] - 128) / 128;
        sumSquares += v * v;
      }
      const rms = Math.sqrt(sumSquares / data.length);
      setWaveLevels((prev) => [...prev.slice(1), Math.min(1, rms * 5)]);
    }, 80);
  }

  function stopWaveAnalysis() {
    if (waveIntervalRef.current) { clearInterval(waveIntervalRef.current); waveIntervalRef.current = null; }
    audioCtxRef.current?.close().catch(() => {});
    audioCtxRef.current = null;
    setWaveLevels(Array(WAVE_BAR_COUNT).fill(0));
  }

  async function toggleRecording() {
    if (recording) {
      mediaRecRef.current?.stop();
      stopWaveAnalysis();
      setRecording(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      startWaveAnalysis(stream);
      const mediaRec = new MediaRecorder(stream);
      mediaRec.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      mediaRec.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onload = async (ev) => {
          const audioB64 = ev.target.result.split(',')[1];
          setTyping(true);
          try {
            const res = await postTranscribe(audioB64);
            setTyping(false);
            if (res.transcript) {
              if (view !== 'chat') {
                setView('chat');
                window.history.pushState({ view: 'chat' }, '');
              }
              const pending = pendingImgRef.current;
              await send(res.transcript, pending?.b64, pending?.dataUrl);
            } else {
              showToast('Could not understand audio. Please try again.');
            }
          } catch {
            setTyping(false);
            showToast('Transcription failed.');
          }
        };
        reader.readAsDataURL(blob);
      };
      mediaRec.start();
      mediaRecRef.current = mediaRec;
      setRecording(true);
    } catch {
      showToast('Microphone access denied.');
    }
  }

  return (
    <div className={`km-page ${sidebarOpen ? 'km-page-sidebar-open' : ''}`}>
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((o) => !o)} />

      {cameraOpen && (
        <div className="km-cam-modal">
          <button className="km-cam-close" onClick={closeCamera}>×</button>
          <video ref={videoRef} className="km-cam-video" autoPlay playsInline muted />
          <button className="km-cam-snap" onClick={snapPhoto} title="Capture" />
          <canvas ref={canvasRef} className="km-cam-canvas" />
        </div>
      )}

      {view === 'home' && (
        <div className="km-home">
          <Header variant="home" />

          <p className="km-mission-text">
            Join us — Lisette, Leonie, and Professor Juju — as we use AI to fight the loneliness
            epidemic by turning everyday objects into sparks for human connection.

          </p>

          <div className="km-bar-wrap">
            <input className="km-bar" type="text" placeholder="Ask anything or describe an object..."
              autoComplete="off" value={homeInput}
              onChange={(e) => setHomeInput(e.target.value)}
              onKeyDown={(e) => handleInputKeyDown(e, homeInput)} />
            {recording && (
              <div className="km-wave-overlay"><WaveBars levels={waveLevels} /></div>
            )}
            <div className="km-bar-actions-left">
              <button className="km-icon-btn" title="Upload image" onClick={() => fileInputRef.current?.click()}><PlusIcon /></button>
            </div>
            <div className="km-bar-actions">
              <button className={`km-icon-btn ${recording ? 'km-recording' : ''}`} title="Speak" onClick={toggleRecording}><MicIcon /></button>
              <button className="km-icon-btn" title="Camera" onClick={openCamera}><CameraIcon /></button>
              {(homeInput.trim() || pendingImg) && (
                <button className="km-send-btn" title="Send Prompt" onClick={() => handleSendClick(homeInput)}><SendIcon /></button>
              )}
            </div>
          </div>

          <div className="km-home-buttons">
            <button className="km-google-btn" onClick={handleKindnessSearch}><SearchIcon /> Kindness Search</button>
            <button className="km-google-btn km-google-btn-primary" onClick={handleFeelingKindness}><HeartIcon /> Kindness Sparks</button>
          </div>
        </div>
      )}

      {view === 'home' && (
        <div className="km-footer-fixed">
          <Footer />
        </div>
      )}

      {view === 'chat' && (
        <div className="km-chat">
          <Header variant="chat" onLogoClick={goHome} />

          <div className="km-messages" ref={messagesRef}>
            {(() => {
              const lastBotMsgId = [...messages].reverse().find((m) => m.role === 'bot')?.id;
              return messages.map((msg) => (
                <MessageRow key={msg.id} msg={msg} showToast={showToast} onSpeak={handleSpeak}
                  onGoHome={goHome} showBack={msg.id === lastBotMsgId} />
              ));
            })()}
            {typing && (
              <div className="km-msg-row km-msg-row-bot">
                <div className="km-typing-row"><span></span><span></span><span></span></div>
              </div>
            )}
          </div>

          <div className="km-chat-bottom">
            <div className="km-bottom-bar">
              <div className="km-bottom-inner">
                {pendingImg && (
                  <div className="km-pending-img">
                    <img src={pendingImg.dataUrl} alt="" />
                    <div style={{ flex: 1 }}>
                      <div className="km-pending-title">Image ready</div>
                      <div className="km-pending-sub">Press Enter for kindness ideas, or type a question</div>
                    </div>
                    <span className="km-pending-rm" onClick={clearPending}>×</span>
                  </div>
                )}
                <div className="km-bar-wrap" style={{ marginBottom: 0 }}>
                  <input ref={chatInputElRef} className="km-bar" type="text" placeholder="Ask anything..." autoComplete="off"
                    value={chatInput} onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => handleInputKeyDown(e, chatInput)} />
                  {recording && (
                    <div className="km-wave-overlay"><WaveBars levels={waveLevels} /></div>
                  )}
                  <div className="km-bar-actions-left">
                    <button className="km-icon-btn" title="Upload image" onClick={() => fileInputRef.current?.click()}><PlusIcon /></button>
                  </div>
                  <div className="km-bar-actions">
                    <button className={`km-icon-btn ${recording ? 'km-recording' : ''}`} title="Speak" onClick={toggleRecording}><MicIcon /></button>
                    <button className="km-icon-btn" title="Camera" onClick={openCamera}><CameraIcon /></button>
                    {(chatInput.trim() || pendingImg) && (
                      <button className="km-send-btn" title="Send Prompt" onClick={() => handleSendClick(chatInput)}><SendIcon /></button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="km-chat-footer-bar">
              <Footer />
            </div>
          </div>
        </div>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
      {toastVisible && <div className="km-toast">{toastMsg}</div>}
    </div>
  );
}
