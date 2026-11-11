// Web Audio API synthesizer for SENA anthem melody and UI feedback sounds

class AudioService {
  private ctx: AudioContext | null = null;
  private isPlayingHimno: boolean = false;
  private melodyTimeout: any = null;
  private onStanzaCallback?: (index: number) => void;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a simple musical tone with envelope
  private playTone(freq: number, duration: number, type: OscillatorType = 'triangle', timeOffset = 0, gainLevel = 0.2) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime + timeOffset);

    // Envelope
    gain.gain.setValueAtTime(0, this.ctx.currentTime + timeOffset);
    gain.gain.linearRampToValueAtTime(gainLevel, this.ctx.currentTime + timeOffset + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + timeOffset + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(this.ctx.currentTime + timeOffset);
    osc.stop(this.ctx.currentTime + timeOffset + duration);
  }

  // Sound effects for quizzes and actions
  playSuccess() {
    this.initCtx();
    if (!this.ctx) return;
    const now = 0;
    this.playTone(523.25, 0.15, 'sine', now, 0.2); // C5
    this.playTone(659.25, 0.15, 'sine', now + 0.1, 0.2); // E5
    this.playTone(783.99, 0.35, 'sine', now + 0.2, 0.25); // G5
    this.playTone(1046.50, 0.45, 'triangle', now + 0.35, 0.3); // C6
  }

  playError() {
    this.initCtx();
    if (!this.ctx) return;
    this.playTone(330, 0.15, 'sawtooth', 0, 0.15);
    this.playTone(277.18, 0.3, 'sawtooth', 0.15, 0.18);
  }

  playClick() {
    this.initCtx();
    if (!this.ctx) return;
    this.playTone(800, 0.05, 'sine', 0, 0.05);
  }

  // SENA Anthem Melodic Motifs (Coro & Estrofas)
  // Coro: "Estudiantes del SENA, ¡adelante! Por Colombia luchad con amor..."
  playHimno(onStanzaChange?: (index: number) => void) {
    this.initCtx();
    if (!this.ctx) return;
    this.stopHimno();
    this.isPlayingHimno = true;
    this.onStanzaCallback = onStanzaChange;

    // Frequencies: C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88, C5: 523.25
    // Melody notes sequence [freq, durationInSeconds]
    const melody: [number, number][] = [
      // Coro: Estudiantes del SENA ¡adelante!
      [261.63, 0.35], // Es-
      [329.63, 0.35], // tu-
      [392.00, 0.45], // dian-
      [523.25, 0.6],  // tes
      [392.00, 0.35], // del
      [329.63, 0.35], // SE-
      [261.63, 0.7],  // NA
      [392.00, 0.4],  // ¡a-
      [440.00, 0.4],  // de-
      [523.25, 0.8],  // lan-
      [392.00, 0.9],  // te!

      // Por Colombia luchad con amor
      [349.23, 0.35], // Por
      [392.00, 0.35], // Co-
      [440.00, 0.45], // lom-
      [349.23, 0.5],  // bia
      [329.63, 0.35], // lu-
      [293.66, 0.35], // chad
      [261.63, 0.4],  // con
      [293.66, 0.8],  // a-
      [261.63, 1.0],  // mor!

      // Con el ánimo noble y radiante
      [261.63, 0.35],
      [329.63, 0.35],
      [392.00, 0.45],
      [523.25, 0.6],
      [493.88, 0.35],
      [440.00, 0.35],
      [392.00, 0.7],

      // Transformemos el mundo en mejor
      [349.23, 0.35],
      [392.00, 0.35],
      [440.00, 0.45],
      [392.00, 0.4],
      [329.63, 0.4],
      [293.66, 0.6],
      [261.63, 1.2]
    ];

    let accumulatedTime = 0;
    melody.forEach(([freq, duration]) => {
      this.playTone(freq, duration, 'triangle', accumulatedTime, 0.22);
      // Add subtle harmony bass
      this.playTone(freq / 2, duration * 0.9, 'sine', accumulatedTime, 0.12);
      accumulatedTime += duration;
    });

    if (this.onStanzaCallback) {
      this.onStanzaCallback(0);
      this.melodyTimeout = setTimeout(() => {
        if (this.isPlayingHimno && this.onStanzaCallback) {
          this.onStanzaCallback(1);
        }
      }, 7000);
    }
  }

  stopHimno() {
    this.isPlayingHimno = false;
    if (this.melodyTimeout) {
      clearTimeout(this.melodyTimeout);
      this.melodyTimeout = null;
    }
    if (this.ctx) {
      // Suspend ctx to immediately cut any scheduled tones
      this.ctx.close();
      this.ctx = null;
    }
  }

  isHimnoActive() {
    return this.isPlayingHimno;
  }
}

export const audioSynth = new AudioService();
