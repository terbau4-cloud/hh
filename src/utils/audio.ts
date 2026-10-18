// Procedural Web Audio API sound generator for Brother & Sister 3D tribute
// Zero external mp3/wav dependencies - 100% synthesized pure harmonics

class SoundFX {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientTimer: number | null = null;
  private isAmbientPlaying: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.isAmbientPlaying) {
      this.stopAmbient();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public getAmbientPlaying(): boolean {
    return this.isAmbientPlaying;
  }

  // Play a soft crystal chime note (e.g. for 3D interactions, clicking gems or coupons)
  public playChime(freq = 587.33, duration = 0.8) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      // Soft vibrato
      osc.frequency.exponentialRampToValueAtTime(freq * 1.01, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Play a warm harmonic chord (Celebration / Redeem / Note posted)
  public playCelebrationChord() {
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq, 1.2);
      }, idx * 100);
    });
  }

  // Procedural warm ambient nostalgic lullaby / music box loop
  public toggleAmbient(): boolean {
    if (this.isAmbientPlaying) {
      this.stopAmbient();
      return false;
    } else {
      this.startAmbient();
      return true;
    }
  }

  public startAmbient() {
    if (this.isMuted) return;
    this.initCtx();
    this.isAmbientPlaying = true;

    // Gentle brother-sister pentatonic arpeggio notes in D major
    const melody = [
      587.33, 659.25, 739.99, 880.00, 987.77, 880.00, 739.99, 659.25,
      587.33, 739.99, 880.00, 1174.66, 987.77, 880.00, 659.25, 587.33
    ];
    let noteIdx = 0;

    const playNext = () => {
      if (!this.isAmbientPlaying || this.isMuted) return;
      const freq = melody[noteIdx % melody.length];
      this.playChime(freq, 1.4);
      noteIdx++;
      this.ambientTimer = window.setTimeout(playNext, 700);
    };

    playNext();
  }

  public stopAmbient() {
    this.isAmbientPlaying = false;
    if (this.ambientTimer) {
      clearTimeout(this.ambientTimer);
      this.ambientTimer = null;
    }
  }
}

export const soundManager = new SoundFX();
