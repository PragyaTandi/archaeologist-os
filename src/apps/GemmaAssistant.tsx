import { useEffect, useRef, useState } from 'react';
import { findMockResponse } from '@/data/reconstructions';
import type { ChatMessage } from '@/data/types';
import { Send, Trash2, BookOpen, FlaskConical, HelpCircle, Eye } from 'lucide-react';

const STORAGE_KEY = 'arch-os-gemma-history';

const CITATION_META = {
  evidence: { icon: BookOpen, label: 'Verified Evidence', color: '#4f8a47' },
  inference: { icon: FlaskConical, label: 'Engineering Inference', color: '#b08a5a' },
  hypothesis: { icon: HelpCircle, label: 'Hypothesis', color: '#d97742' },
  unknown: { icon: Eye, label: 'Unknown', color: '#8a4a3a' },
} as const;

export function GemmaAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'thinking'>('idle');
  const scrollRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  // Load history
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ChatMessage[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          loaded.current = true;
          return;
        }
      }
    } catch {
      // ignore
    }
    setMessages([
      {
        id: 'sys-0',
        role: 'system',
        text:
          'GEMMA 4 RESEARCH TERMINAL v1.95\nFrontend mock mode — no live model connected.\n\nAsk about the Antikythera Mechanism, Roman concrete, the Baghdad Battery, or Greek Fire. Responses are labelled by evidence class.',
        ts: Date.now(),
      },
    ]);
    loaded.current = true;
  }, []);

  // Persist
  useEffect(() => {
    if (!loaded.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, status]);

  const send = () => {
    const text = input.trim();
    if (!text || status === 'thinking') return;
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: 'user', text, ts: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setStatus('thinking');
    // Simulated model latency
    window.setTimeout(() => {
      const { text: reply, citations } = findMockResponse(text);
      const gemmaMsg: ChatMessage = {
        id: `g-${Date.now()}`,
        role: 'gemma',
        text: reply,
        citations,
        ts: Date.now(),
      };
      setMessages((m) => [...m, gemmaMsg]);
      setStatus('idle');
    }, 700 + Math.random() * 600);
  };

  const clear = () => {
    setMessages([
      {
        id: 'sys-reset',
        role: 'system',
        text: 'Conversation cleared. Gemma mock mode standby.',
        ts: Date.now(),
      },
    ]);
  };

  return (
    <div className="flex h-full flex-col terminal-bg">
      {/* Header */}
      <div className="flex items-center gap-2 px-2 py-1 border-b border-phosphor-dim/40 font-mono text-[12px]">
        <span className="terminal-text font-bold">GEMMA_4 :: RESEARCH TERMINAL</span>
        <span className="flex-1" />
        <span className="terminal-text text-[10px] flex items-center gap-1">
          <span
            className="inline-block w-2 h-2 rounded-full blink"
            style={{ background: status === 'thinking' ? '#d97742' : '#75c66a' }}
          />
          {status === 'thinking' ? 'PROCESSING…' : 'STANDBY'}
        </span>
        <button onClick={clear} className="terminal-text flex items-center gap-1 text-[11px] hover:opacity-80" title="Clear conversation">
          <Trash2 size={12} /> Clear
        </button>
      </div>

      {/* Conversation */}
      <div ref={scrollRef} className="flex-1 overflow-auto p-2 terminal-text font-pixel" style={{ fontSize: 16 }}>
        {messages.map((m) => (
          <MessageRow key={m.id} m={m} />
        ))}
        {status === 'thinking' && (
          <div className="terminal-text opacity-70 mb-2">
            {'> '}<span className="blink">█</span> analysing query…
          </div>
        )}
      </div>

      {/* Citations legend */}
      <div className="px-2 py-1 border-t border-phosphor-dim/40 flex items-center gap-2 flex-wrap font-mono text-[9px]">
        <span className="terminal-text opacity-70">EVIDENCE CLASS:</span>
        {Object.entries(CITATION_META).map(([key, meta]) => {
          const Icon = meta.icon;
          return (
            <span key={key} className="flex items-center gap-1" style={{ color: meta.color }}>
              <Icon size={10} /> {meta.label}
            </span>
          );
        })}
      </div>

      {/* Input */}
      <div className="flex items-center gap-1 p-2 border-t border-phosphor-dim/40">
        <span className="terminal-text font-pixel" style={{ fontSize: 18 }}>{'>'}</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') send();
          }}
          placeholder="enter research query…"
          className="flex-1 bg-transparent terminal-text font-pixel outline-none border-b border-phosphor-dim/50 pb-0.5 selectable"
          style={{ fontSize: 16 }}
        />
        <button
          onClick={send}
          disabled={status === 'thinking' || !input.trim()}
          className="btn-raised flex items-center gap-1 px-2 py-1 text-[11px] text-deep-green disabled:opacity-40"
        >
          <Send size={12} /> Send
        </button>
      </div>
    </div>
  );
}

function MessageRow({ m }: { m: ChatMessage }) {
  if (m.role === 'system') {
    return (
      <div className="mb-3 opacity-70 terminal-text selectable">
        <pre className="whitespace-pre-wrap font-pixel" style={{ fontSize: 15 }}>{m.text}</pre>
      </div>
    );
  }
  if (m.role === 'user') {
    return (
      <div className="mb-2 selectable">
        <div className="text-phosphor-dim text-[12px]">{'>'} RESEARCHER</div>
        <div className="terminal-text font-pixel" style={{ fontSize: 17 }}>{m.text}</div>
      </div>
    );
  }
  return (
    <div className="mb-3 selectable">
      <div className="text-phosphor-dim text-[12px] mb-0.5">{'>'} GEMMA 4</div>
      <pre className="whitespace-pre-wrap terminal-text font-pixel" style={{ fontSize: 16, lineHeight: 1.3 }}>{m.text}</pre>
      {m.citations && m.citations.length > 0 && (
        <div className="mt-2 pl-3 border-l-2 border-phosphor-dim/40 space-y-1">
          <div className="text-[11px] text-phosphor-dim uppercase">References</div>
          {m.citations.map((c, i) => {
            const meta = CITATION_META[c.type];
            const Icon = meta.icon;
            return (
              <div key={i} className="flex items-start gap-1.5 text-[13px] font-pixel">
                <Icon size={12} style={{ color: meta.color, marginTop: 2, flexShrink: 0 }} />
                <span style={{ color: meta.color }} className="font-pixel">[{c.type.toUpperCase()}]</span>
                <span className="terminal-text opacity-90 font-pixel">{c.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
