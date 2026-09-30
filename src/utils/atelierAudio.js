// Web Audio API Engine featuring authentic VieNeu-TTS v3 Turbo Vietnamese studio voiceover
// 100% Vietnamese, 100% Natural, zero robotic browser speech synthesis.

class AtelierAudioSystem {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.musicGain = null;
    this.voiceGain = null;
    this.voiceBuffer = null;
    this.voiceSource = null;
    this.padOscillators = [];
    this.subOscillator = null;
    this.chordInterval = null;
    this.filterNode = null;
    this.currentChordIndex = 0;
    this.onCaptionCallback = null;
    this.captionTimeout = null;
    this.isPreloading = false;
  }

  // Pre-composed luxury chord progressions (Warm, contemplative, cinematic minor 9ths)
  get chords() {
    return [
      // D minor 9 (Deep, prestigious, mysterious)
      { root: 73.42, notes: [146.83, 174.61, 220.0, 261.63, 329.63] },
      // Bb Major 7 add9 (Expansive, majestic, haute-couture)
      { root: 58.27, notes: [116.54, 146.83, 174.61, 220.0, 293.66] },
      // F Major 9 (Serene, exquisite craftsmanship)
      { root: 87.31, notes: [174.61, 220.0, 261.63, 329.63, 392.0] },
      // A 7 sus4 to Dm (Anticipation, tension, precision)
      { root: 55.0, notes: [110.0, 164.81, 196.0, 261.63, 293.66] }
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  setCaptionListener(cb) {
    this.onCaptionCallback = cb;
  }

  // Preload and decode the authentic VieNeu-TTS v3 Turbo studio WAV buffer
  async loadVoiceBuffer() {
    if (this.voiceBuffer || this.isPreloading || !this.ctx) return;
    this.isPreloading = true;
    try {
      const res = await fetch('/audio/apex_vieneu_master.wav');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const arrayBuffer = await res.arrayBuffer();
      this.voiceBuffer = await this.ctx.decodeAudioData(arrayBuffer);
    } catch (err) {
      console.warn('VieNeu voice buffer preload failed:', err);
    } finally {
      this.isPreloading = false;
    }
  }

  async start() {
    this.init();
    if (!this.ctx) return;

    this.stop(true);
    this.isPlaying = true;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // 1. Master Output Gain
    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.35, now + 1.2);
    this.masterGain.connect(ctx.destination);

    // 2. Cinematic Ambient Music Bus
    this.musicGain = ctx.createGain();
    // Duck music gently to 0.35 while voiceover speaks
    this.musicGain.gain.setValueAtTime(0.35, now);
    this.musicGain.connect(this.masterGain);

    // 3. Voiceover Channel Bus
    this.voiceGain = ctx.createGain();
    this.voiceGain.gain.setValueAtTime(1.0, now);
    this.voiceGain.connect(this.masterGain);

    // 4. Warm Velvet Lowpass Filter for Music Pad
    this.filterNode = ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(420, now);
    this.filterNode.Q.setValueAtTime(1.8, now);
    this.filterNode.connect(this.musicGain);

    // Filter breathing LFO
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.07, now);
    lfoGain.gain.setValueAtTime(150, now);
    lfo.connect(lfoGain);
    lfoGain.connect(this.filterNode.frequency);
    lfo.start(now);
    this.lfo = lfo;

    // 5. Start Pad Soundscape
    this.currentChordIndex = 0;
    this.playChord(this.chords[this.currentChordIndex], true);

    this.chordInterval = setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;
      this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;
      this.playChord(this.chords[this.currentChordIndex], false);
    }, 6500);

    // 6. Play the authentic VieNeu-TTS v3 Turbo studio voiceover
    await this.playVieNeuVoiceover();
  }

  playChord(chord, isInitial = false) {
    if (!this.ctx || !this.filterNode) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const prevOscs = this.padOscillators;
    const prevSub = this.subOscillator;
    this.padOscillators = [];
    this.subOscillator = null;

    if (prevOscs.length > 0) {
      prevOscs.forEach(({ osc, gain }) => {
        try {
          gain.gain.cancelScheduledValues(now);
          gain.gain.setValueAtTime(Math.max(0.0001, gain.gain.value), now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
          setTimeout(() => {
            try {
              osc.stop();
              osc.disconnect();
              gain.disconnect();
            } catch {}
          }, 2000);
        } catch {}
      });
    }

    if (prevSub) {
      try {
        prevSub.gain.gain.cancelScheduledValues(now);
        prevSub.gain.gain.setValueAtTime(Math.max(0.0001, prevSub.gain.gain.value), now);
        prevSub.gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);
        setTimeout(() => {
          try {
            prevSub.osc.stop();
            prevSub.osc.disconnect();
            prevSub.gain.disconnect();
          } catch {}
        }, 1800);
      } catch {}
    }

    // Sub-bass Drone
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(chord.root, now);
    subGain.gain.setValueAtTime(0.0001, now);
    subGain.gain.exponentialRampToValueAtTime(0.16, now + 1.5);
    subOsc.connect(subGain);
    subGain.connect(this.musicGain);
    subOsc.start(now);
    this.subOscillator = { osc: subOsc, gain: subGain };

    // Harmonic Chord Notes
    chord.notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = idx % 2 === 0 ? 'triangle' : 'sine';
      const detuneCents = (idx - 2) * 2.5;
      osc.detune.setValueAtTime(detuneCents, now);
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.0001, now);
      const targetGain = 0.07 / Math.sqrt(idx + 1);
      gain.gain.exponentialRampToValueAtTime(targetGain, now + 1.8);

      osc.connect(gain);
      gain.connect(this.filterNode);
      osc.start(now);

      this.padOscillators.push({ osc, gain });
    });
  }

  async playVieNeuVoiceover() {
    if (!this.isPlaying || !this.ctx) return;

    if (!this.voiceBuffer) {
      await this.loadVoiceBuffer();
    }

    if (!this.voiceBuffer || !this.isPlaying) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Create AudioBufferSourceNode directly from the decoded VieNeu-TTS v3 Turbo 48kHz audio
    const source = ctx.createBufferSource();
    source.buffer = this.voiceBuffer;
    source.connect(this.voiceGain);
    this.voiceSource = source;

    const captionText = "Chào mừng quý khách đến với APEX Bespoke Atelier. Nơi kỹ thuật cơ khí đỉnh cao hòa quyện cùng nghệ thuật chế tác độc bản.";

    if (this.onCaptionCallback) {
      this.onCaptionCallback({
        vi: captionText
      });
    }

    source.onended = () => {
      if (!this.isPlaying) return;
      this.voiceSource = null;

      // Bring ambient soundtrack up smoothly once voiceover finishes
      if (this.musicGain && this.ctx) {
        const t = this.ctx.currentTime;
        this.musicGain.gain.cancelScheduledValues(t);
        this.musicGain.gain.linearRampToValueAtTime(0.65, t + 1.2);
      }

      // Smoothly hide caption after narration ends
      this.captionTimeout = setTimeout(() => {
        if (this.isPlaying && this.onCaptionCallback) {
          this.onCaptionCallback(null);
        }
      }, 1500);
    };

    source.start(now);
  }

  // Trigger gentle harmonic chime when user switches car model (no robotic speech)
  announceCar(car) {
    if (!this.isPlaying || !this.ctx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Subtle luxury acoustic resonance chime
    const chimeOsc = ctx.createOscillator();
    const chimeGain = ctx.createGain();
    chimeOsc.type = 'sine';
    chimeOsc.frequency.setValueAtTime(587.33, now); // D5
    chimeGain.gain.setValueAtTime(0.0001, now);
    chimeGain.gain.exponentialRampToValueAtTime(0.08, now + 0.05);
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

    chimeOsc.connect(chimeGain);
    chimeGain.connect(this.masterGain);
    chimeOsc.start(now);
    chimeOsc.stop(now + 0.85);

    // Show car introduction in caption banner (100% Vietnamese)
    const carDescriptions = {
      'porsche-gt3': 'Porsche 911 GT3 — Gói khí động học Weissach thuần khiết',
      'ferrari-f8': 'Ferrari F8 Tributo — Bản giao hưởng V8 Twin-Turbo đỉnh cao',
      'g63-amg': 'Mercedes-AMG G63 — Biểu tượng uy quyền và sang trọng độc bản'
    };

    if (this.onCaptionCallback) {
      this.onCaptionCallback({
        vi: carDescriptions[car.id] || car.modelName
      });

      if (this.captionTimeout) clearTimeout(this.captionTimeout);
      this.captionTimeout = setTimeout(() => {
        if (this.isPlaying && this.onCaptionCallback) {
          this.onCaptionCallback(null);
        }
      }, 3500);
    }
  }

  suspend() {
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend().catch(() => {});
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  stop(immediate = false) {
    this.isPlaying = false;

    if (this.chordInterval) {
      clearInterval(this.chordInterval);
      this.chordInterval = null;
    }

    if (this.captionTimeout) {
      clearTimeout(this.captionTimeout);
      this.captionTimeout = null;
    }

    if (this.voiceSource) {
      try {
        this.voiceSource.stop();
        this.voiceSource.disconnect();
      } catch {}
      this.voiceSource = null;
    }

    if (this.onCaptionCallback) {
      this.onCaptionCallback(null);
    }

    if (this.lfo) {
      try {
        this.lfo.stop();
        this.lfo.disconnect();
      } catch {}
      this.lfo = null;
    }

    const oscsToStop = this.padOscillators;
    const subToStop = this.subOscillator;
    this.padOscillators = [];
    this.subOscillator = null;

    const prevGain = this.masterGain;
    this.masterGain = null;

    if (immediate || !prevGain || !this.ctx) {
      oscsToStop.forEach(({ osc, gain }) => {
        try {
          osc.stop();
          osc.disconnect();
          gain.disconnect();
        } catch {}
      });
      if (subToStop) {
        try {
          subToStop.osc.stop();
          subToStop.osc.disconnect();
          subToStop.gain.disconnect();
        } catch {}
      }
      if (prevGain) {
        try {
          prevGain.disconnect();
        } catch {}
      }
      return;
    }

    try {
      const now = this.ctx.currentTime;
      prevGain.gain.cancelScheduledValues(now);
      prevGain.gain.setValueAtTime(Math.max(0.0001, prevGain.gain.value), now);
      prevGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
    } catch {}

    setTimeout(() => {
      oscsToStop.forEach(({ osc, gain }) => {
        try {
          osc.stop();
          osc.disconnect();
          gain.disconnect();
        } catch {}
      });
      if (subToStop) {
        try {
          subToStop.osc.stop();
          subToStop.osc.disconnect();
          subToStop.gain.disconnect();
        } catch {}
      }
      if (prevGain) {
        try {
          prevGain.disconnect();
        } catch {}
      }
    }, 400);
  }
}

export const atelierAudio = new AtelierAudioSystem();
