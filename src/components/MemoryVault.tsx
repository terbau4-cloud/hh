import React, { useState, useEffect } from 'react';
import { MemoryItem } from '../types';
import { Plus, Calendar, Tag, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

const INITIAL_MEMORIES: MemoryItem[] = [
  {
    id: 'mem-1',
    title: 'TV Remote Rivalry',
    date: 'Childhood Years',
    category: 'childhood',
    tag: 'Classic Banter',
    description: 'Fighting over the TV remote, hiding batteries, and instantly teaming up the second our parents walked into the living room.',
    imageTheme: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
  },
  {
    id: 'mem-2',
    title: 'Late Night Advice Talks',
    date: 'Growing Up',
    category: 'milestone',
    tag: 'Deep Trust',
    description: 'Staying up talking about exams, friends, and plans. Realizing that having a brother means always having someone on your team.',
    imageTheme: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
  },
  {
    id: 'mem-3',
    title: 'Raksha Bandhan Celebrations',
    date: 'Every Year',
    category: 'tradition',
    tag: 'Sacred Bond',
    description: 'Tying the rakhi thread, sharing sweets, laughing together, and Mandip promising to protect Prachi across every phase of life.',
    imageTheme: 'linear-gradient(135deg, #fee2e2 0%, #fecdd3 100%)',
  },
  {
    id: 'mem-4',
    title: 'Cheering Her Milestones',
    date: 'Proud Moments',
    category: 'milestone',
    tag: 'Proud Brother',
    description: 'Seeing Prachi succeed and reach new goals. Nobody stands taller with brotherly pride than Mandip cheering for his sister.',
    imageTheme: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
  },
  {
    id: 'mem-5',
    title: 'Midnight Treat Runs',
    date: 'Any Random Day',
    category: 'fun',
    tag: 'Foodie Squad',
    description: 'Getting unexpected ice cream, dessert, or favorite street snacks together and talking about everything and nothing.',
    imageTheme: 'linear-gradient(135deg, #fae8ff 0%, #f5d0fe 100%)',
  },
  {
    id: 'mem-6',
    title: 'Future Adventures',
    date: 'Tomorrow & Ahead',
    category: 'milestone',
    tag: 'Next Chapters',
    description: 'All the journeys, travels, and successes waiting ahead for Prachi, with Mandip always cheering her on from the sidelines.',
    imageTheme: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
  },
];

export const MemoryVault: React.FC = () => {
  const [memories, setMemories] = useState<MemoryItem[]>(INITIAL_MEMORIES);
  const [filter, setFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCat, setNewCat] = useState<'childhood' | 'milestone' | 'fun' | 'tradition'>('milestone');

  useEffect(() => {
    const saved = localStorage.getItem('mandip_prachi_memories');
    if (saved) {
      try {
        setMemories(JSON.parse(saved));
      } catch {
        // Fallback
      }
    }
  }, []);

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const newItem: MemoryItem = {
      id: `mem-${Date.now()}`,
      title: newTitle.trim(),
      date: newDate.trim() || 'Timeless Memory',
      category: newCat,
      tag: newTag.trim() || 'Precious Moment',
      description: newDesc.trim(),
      imageTheme: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
    };

    const updated = [newItem, ...memories];
    setMemories(updated);
    localStorage.setItem('mandip_prachi_memories', JSON.stringify(updated));

    setNewTitle('');
    setNewDate('');
    setNewTag('');
    setNewDesc('');
    setIsModalOpen(false);

    soundManager.playCelebrationChord();
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  const filteredMemories =
    filter === 'all' ? memories : memories.filter((m) => m.category === filter);

  return (
    <section id="memories" className="py-16 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-rose-600 block mb-1">
              Cherished Moments
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-editorial text-slate-900">
              The Memory Vault
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Unforgettable memories and laughter shared by Mandip &amp; Prachi
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Memory</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 text-xs">
          {[
            { id: 'all', label: 'All Memories' },
            { id: 'childhood', label: 'Childhood' },
            { id: 'milestone', label: 'Milestones' },
            { id: 'tradition', label: 'Traditions' },
            { id: 'fun', label: 'Fun & Snacks' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setFilter(cat.id);
                soundManager.playChime(520, 0.2);
              }}
              className={`px-3.5 py-1.5 rounded-xl cursor-pointer whitespace-nowrap transition-colors ${
                filter === cat.id
                  ? 'bg-rose-50 text-rose-700 font-semibold border border-rose-200'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Memory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMemories.map((mem) => (
            <div
              key={mem.id}
              className="white-card white-card-hover rounded-2xl overflow-hidden flex flex-col justify-between"
            >
              <div className="h-20 p-4 flex items-center justify-between" style={{ background: mem.imageTheme }}>
                <span className="px-2.5 py-1 rounded-md bg-white/80 backdrop-blur-xs text-slate-800 text-[10px] font-semibold uppercase tracking-wider">
                  {mem.tag}
                </span>
                <div className="w-7 h-7 rounded-full bg-white/80 flex items-center justify-center text-rose-500">
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{mem.date}</span>
                  </div>
                  <h3 className="font-editorial text-base font-bold text-slate-900 mb-2">
                    {mem.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {mem.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="capitalize">{mem.category}</span>
                  <span className="font-medium text-slate-700">Mandip &amp; Prachi</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
            <div className="bg-white w-full max-w-md rounded-2xl p-6 border border-slate-200 shadow-xl">
              <h3 className="text-lg font-bold font-editorial text-slate-900 mb-1">
                Add a Sibling Memory
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Record a memory between Mandip &amp; Prachi to preserve on this site.
              </p>

              <form onSubmit={handleAddMemory} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cooking Experiment in the Kitchen"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Time / Year
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2022"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Category
                    </label>
                    <select
                      value={newCat}
                      onChange={(e) => setNewCat(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-rose-500"
                    >
                      <option value="childhood">Childhood</option>
                      <option value="milestone">Milestone</option>
                      <option value="tradition">Tradition</option>
                      <option value="fun">Fun &amp; Snacks</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Description
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="What made this moment special or funny?"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-3.5 py-1.5 text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold cursor-pointer shadow-xs"
                  >
                    Save Memory
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
