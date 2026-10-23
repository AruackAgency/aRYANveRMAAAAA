// High-quality Web Audio API sound synthesizers for romantic birthday experience

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgmGain: GainNode | null = null;
  private isBgmPlaying: boolean = false;
  private bgmInterval: ReturnType<typeof setInterval> | null = null;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.bgmGain) {
      this.bgmGain.gain.setValueAtTime(muted ? 0 : 0.25, this.getContext().currentTime);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Soft sparkle / magical chime
  public playSparkle() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const freqs = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.05);

        gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.05 + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.05);
        osc.stop(ctx.currentTime + idx * 0.05 + 0.4);
      });
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Romantic harp chord
  public playRomanticChord() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const notes = [261.63, 329.63, 392.00, 493.88, 523.25, 659.25]; // C major 7 arpeggio
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.06);

        gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.06 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + i * 0.06);
        osc.stop(ctx.currentTime + i * 0.06 + 1.2);
      });
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  // Candle blow whoosh sound
  public playBlowSound() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      // White noise buffer for wind/breath
      const bufferSize = ctx.sampleRate * 0.8;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(120, ctx.currentTime + 0.8);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noise.stop(ctx.currentTime + 0.8);
    } catch (e) {
      console.warn('Blow sound error:', e);
    }
  }

  // Birthday celebration fanfare / cheers
  public playBirthdayFanfare() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      // "Happy Birthday" tune snippet notes: G4, G4, A4, G4, C5, B4
      const notes = [
        { f: 392, d: 0.3, t: 0 },
        { f: 392, d: 0.2, t: 0.35 },
        { f: 440, d: 0.5, t: 0.6 },
        { f: 392, d: 0.5, t: 1.15 },
        { f: 523.25, d: 0.5, t: 1.7 },
        { f: 493.88, d: 0.9, t: 2.25 },
      ];

      notes.forEach(({ f, d, t }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, ctx.currentTime + t);

        gain.gain.setValueAtTime(0.18, ctx.currentTime + t);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + t);
        osc.stop(ctx.currentTime + t + d);
      });
    } catch (e) {
      console.warn('Fanfare error:', e);
    }
  }

  // Wax seal snap / crack
  public playWaxSealSnap() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
      
      // Paper unfold shimmer
      setTimeout(() => this.playSparkle(), 120);
    } catch (e) {
      console.warn('Wax seal error:', e);
    }
  }

  // Shooting star celestial sweep
  public playShootingStar() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.6);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.7);
    } catch (e) {
      console.warn('Shooting star error:', e);
    }
  }

  // Heart pop sound
  public playHeartPop() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {
      console.warn('Heart pop error:', e);
    }
  }

  // Smooth ambient romantic background melody loop (Lofi Romantic Music Box)
  public startBackgroundMelody() {
    if (this.isBgmPlaying) return;
    try {
      const ctx = this.getContext();
      this.isBgmPlaying = true;
      
      // Melody sequence: gentle romantic lullaby pattern
      const chords = [
        [261.63, 329.63, 392.00, 523.25], // C
        [220.00, 261.63, 329.63, 440.00], // Am
        [174.61, 220.00, 261.63, 349.23], // F
        [196.00, 246.94, 293.66, 392.00], // G
      ];

      let chordIndex = 0;
      let noteIndex = 0;

      const playNextMelodyNote = () => {
        if (!this.isBgmPlaying) return;
        if (this.isMuted) return;

        const currentChord = chords[chordIndex];
        const freq = currentChord[noteIndex];

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Soft music box envelope
        gain.gain.setValueAtTime(0.045, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.85);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.85);

        noteIndex++;
        if (noteIndex >= currentChord.length) {
          noteIndex = 0;
          chordIndex = (chordIndex + 1) % chords.length;
        }
      };

      this.bgmInterval = setInterval(playNextMelodyNote, 420);
    } catch (e) {
      console.warn('Melody start error:', e);
    }
  }

  public stopBackgroundMelody() {
    this.isBgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  public isMelodyPlaying(): boolean {
    return this.isBgmPlaying;
  }
}

export const soundManager = new SoundManager();
