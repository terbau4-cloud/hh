import React, { useState, useEffect } from 'react';
import { SiblingNote } from '../types';
import { Send, Heart, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

const INITIAL_NOTES: SiblingNote[] = [
  {
    id: 'note-1',
    sender: 'Mandip',
    message: 'Prachi, remember that you can always count on me no matter what. Always proud of you, little sister!',
    timestamp: 'Always & Forever',
    emoji: '🛡️',
  },
  {
    id: 'note-2',
    sender: 'Prachi',
    message: 'Best brother in the world! Thank you for always looking out for me and making me laugh when things are tough. ❤️',
    timestamp: 'Sister Love',
    emoji: '🌸',
  },
];

export const MessageBoard: React.FC = () => {
  const [notes, setNotes] = useState<SiblingNote[]>(INITIAL_NOTES);
  const [sender, setSender] = useState<'Prachi' | 'Mandip'>('Prachi');
  const [message, setMessage] = useState('');
  const [chosenEmoji, setChosenEmoji] = useState('❤️');

  useEffect(() => {
    const saved = localStorage.getItem('mandip_prachi_notes');
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch {
        // Fallback
      }
    }
  }, []);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newNote: SiblingNote = {
      id: `note-${Date.now()}`,
      sender,
      message: message.trim(),
      timestamp:
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
        ', ' +
        new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      emoji: chosenEmoji,
    };

    const updated = [newNote, ...notes];
    setNotes(updated);
    localStorage.setItem('mandip_prachi_notes', JSON.stringify(updated));
    setMessage('');

    soundManager.playCelebrationChord();
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.7 },
      colors: sender === 'Prachi' ? ['#f43f5e', '#fb7185'] : ['#3b82f6', '#60a5fa'],
    });
  };

  return (
    <section id="messages" className="py-16 md:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-wider font-semibold text-rose-600 block mb-1">
            Private Notes
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-editorial text-slate-900">
            Sister &amp; Brother Message Board
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Leave a spontaneous note, word of encouragement, or sisterly reply
          </p>
        </div>

        {/* Post Form */}
        <div className="white-card rounded-2xl p-6 border border-slate-200 mb-8 shadow-xs">
          <form onSubmit={handlePost} className="space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500">Posting as:</span>
                <div className="flex items-center bg-slate-100 p-0.5 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setSender('Prachi')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      sender === 'Prachi'
                        ? 'bg-white text-rose-600 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Prachi (Sister)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSender('Mandip')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      sender === 'Mandip'
                        ? 'bg-white text-blue-600 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Mandip (Brother)
                  </button>
                </div>
              </div>

              {/* Emoji choices */}
              <div className="flex items-center gap-1">
                {['❤️', '🌸', '🛡️', '✨', '🍕', '🎉'].map((em) => (
                  <button
                    key={em}
                    type="button"
                    onClick={() => setChosenEmoji(em)}
                    className={`w-7 h-7 rounded-lg text-xs flex items-center justify-center cursor-pointer transition-all ${
                      chosenEmoji === em
                        ? 'bg-rose-50 ring-1 ring-rose-400 scale-105'
                        : 'hover:bg-slate-100'
                    }`}
                  >
                    {em}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <textarea
                required
                rows={3}
                placeholder={
                  sender === 'Prachi'
                    ? 'Write a reply back to your brother Mandip...'
                    : 'Write a note for your sister Prachi...'
                }
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-rose-500 placeholder-slate-400"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-400">
                Notes stay saved in this browser
              </span>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3 h-3" />
                <span>Post Note</span>
              </button>
            </div>
          </form>
        </div>

        {/* Note stream */}
        <div className="space-y-3">
          {notes.map((n) => {
            const isPrachi = n.sender === 'Prachi';
            return (
              <div
                key={n.id}
                className="white-card rounded-2xl p-4 flex items-start gap-3.5"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-base ${
                    isPrachi ? 'bg-rose-50 border border-rose-100' : 'bg-blue-50 border border-blue-100'
                  }`}
                >
                  {n.emoji}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-xs font-bold ${
                        isPrachi ? 'text-rose-600' : 'text-blue-600'
                      }`}
                    >
                      {n.sender} ({isPrachi ? 'Sister' : 'Brother'})
                    </span>
                    <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {n.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
