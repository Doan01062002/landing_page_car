// Web Audio API & Speech Synthesis Luxury Atelier Soundscape for APEX Studio
// Blends minimalist cinematic ambient music with a sophisticated studio voiceover monologue.

class AtelierAudioSystem {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.musicGain = null;
    this.padOscillators = [];
    this.subOscillator = null;
    this.chordInterval = null;
    this.filterNode = null;
    this.currentChordIndex = 0;
    this.isMuted = false;
    this.onCaptionCallback = null;
    this.speechUtterance = null;
    this.speechTimeout = null;
    this.speechQueue = [];
    this.currentSpeechIndex = 0;
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

  // Narratives for the professional voiceover
  get narrationLines() {
    return [
      {
        en: "Welcome to APEX Bespoke Atelier.",
        vi: "Chào mừng quý khách đến với APEX Bespoke Atelier.",
        duration: 3800
      },
      {
        en: "Where raw automotive engineering transcends into haute couture.",
        vi: "Nơi cơ khí chính xác hòa quyện cùng nghệ thuật chế tác đỉnh cao.",
        duration: 5200
      },
      {
        en: "Every contour sculpted by hand. Every heartbeat calibrated to perfection.",
        vi: "Từng đường nét tôi luyện thủ công. Từng xung nhịp động cơ đạt độ hoàn hảo.",
        duration: 5600
      },
      {
        en: "Crafted not for the crowd... but for the one.",
        vi: "Không tạo tác cho số đông... Chỉ dành riêng cho một chủ nhân độc bản.",
        duration: 4800
      }
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

  // Register listener for real-time speech subtitles/captions in UI
  setCaptionListener(cb) {
    this.onCaptionCallback = cb;
  }

  start() {
    this.init();
    if (!this.ctx) return;

    this.stop(true);
    this.isPlaying = true;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // 1. Master Output Gain
    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.35, now + 1.8);
    this.masterGain.connect(ctx.destination);

    // 2. Cinematic Music Bus
    this.musicGain = ctx.createGain();
    this.musicGain.gain.setValueAtTime(0.7, now);
    this.musicGain.connect(this.masterGain);

    // 3. Warm Velvet Lowpass Filter
    this.filterNode = ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(420, now);
    this.filterNode.Q.setValueAtTime(1.8, now);
    this.filterNode.connect(this.musicGain);

    // Filter breathing LFO (gives alive, breathing cinematic pad feel)
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.07, now); // Slow 14-second breathing cycle
    lfoGain.gain.setValueAtTime(180, now);
    lfo.connect(lfoGain);
    lfoGain.connect(this.filterNode.frequency);
    lfo.start(now);
    this.lfo = lfo;

    // 4. Start Pad Soundscape
    this.currentChordIndex = 0;
    this.playChord(this.chords[this.currentChordIndex], true);

    // Cycle chords every 6.5 seconds smoothly
    this.chordInterval = setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;
      this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;
      this.playChord(this.chords[this.currentChordIndex], false);
    }, 6500);

    // 5. Trigger Professional Studio Voiceover
    this.startVoiceover();
  }

  playChord(chord, isInitial = false) {
    if (!this.ctx || !this.filterNode) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Fade out previous pad oscillators cleanly
    const prevOscs = this.padOscillators;
    const prevSub = this.subOscillator;
    this.padOscillators = [];
    this.subOscillator = null;

    if (prevOscs.length > 0) {
      prevOscs.forEach(({ osc, gain }) => {
        try {
          gain.gain.cancelScheduledValues(now);
          gain.gain.setValueAtTime(Math.max(0.0001, gain.gain.value), now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);
          setTimeout(() => {
            try {
              osc.stop();
              osc.disconnect();
              gain.disconnect();
            } catch {}
          }, 2400);
        } catch {}
      });
    }

    if (prevSub) {
      try {
        prevSub.gain.gain.cancelScheduledValues(now);
        prevSub.gain.gain.setValueAtTime(Math.max(0.0001, prevSub.gain.gain.value), now);
        prevSub.gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);
        setTimeout(() => {
          try {
            prevSub.osc.stop();
            prevSub.osc.disconnect();
            prevSub.gain.disconnect();
          } catch {}
        }, 2200);
      } catch {}
    }

    // Spawn Sub-bass Drone
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(chord.root, now);
    subGain.gain.setValueAtTime(0.0001, now);
    subGain.gain.exponentialRampToValueAtTime(0.18, now + 1.5);
    subOsc.connect(subGain);
    subGain.connect(this.musicGain);
    subOsc.start(now);
    this.subOscillator = { osc: subOsc, gain: subGain };

    // Spawn Pad Harmonic Layers (Smooth triangle & detuned sine for shimmer)
    chord.notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Alternate waveform for warm acoustic depth
      osc.type = idx % 2 === 0 ? 'triangle' : 'sine';
      // Subtle micro-detuning (+/- 3 cents) gives analog acoustic warmth
      const detuneCents = (idx - 2) * 2.5;
      osc.detune.setValueAtTime(detuneCents, now);
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.0001, now);
      const targetGain = 0.08 / Math.sqrt(idx + 1);
      gain.gain.exponentialRampToValueAtTime(targetGain, now + 1.8);

      osc.connect(gain);
      gain.connect(this.filterNode);
      osc.start(now);

      this.padOscillators.push({ osc, gain });
    });
  }

  // Voiceover monologue controller
  startVoiceover() {
    this.currentSpeechIndex = 0;
    this.playNextNarrationLine();
  }

  playNextNarrationLine() {
    if (!this.isPlaying) return;

    if (this.currentSpeechIndex >= this.narrationLines.length) {
      // Narration completed; keep music playing softly and notify caption cleared
      if (this.onCaptionCallback) {
        this.onCaptionCallback(null);
      }
      return;
    }

    const line = this.narrationLines[this.currentSpeechIndex];

    // Check Speech Synthesis availability
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      // Ducks music slightly while speech is playing for professional studio mix
      if (this.musicGain && this.ctx) {
        const now = this.ctx.currentTime;
        this.musicGain.gain.cancelScheduledValues(now);
        this.musicGain.gain.linearRampToValueAtTime(0.35, now + 0.4);
      }

      const utterance = new SpeechSynthesisUtterance(line.en);
      this.speechUtterance = utterance;

      // Select best studio-grade narrator voice available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (v) =>
          (v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Studio') || v.name.includes('Ryan') || v.name.includes('Daniel') || v.name.includes('Guy'))) ||
          v.lang.includes('en-GB') ||
          v.lang.includes('en-US')
      ) || voices.find((v) => v.lang.startsWith('en')) || voices[0];

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.pitch = 0.88; // Deep, calm, authoritative luxury tone
      utterance.rate = 0.86;  // Measured, cinematic pacing
      utterance.volume = 0.95;

      // Notify UI of active spoken caption
      if (this.onCaptionCallback) {
        this.onCaptionCallback(line);
      }

      const advance = () => {
        // Bring music back up gently
        if (this.musicGain && this.ctx && this.isPlaying) {
          const now = this.ctx.currentTime;
          this.musicGain.gain.cancelScheduledValues(now);
          this.musicGain.gain.linearRampToValueAtTime(0.7, now + 0.8);
        }

        this.currentSpeechIndex += 1;
        // Pause 1.8s between lines for cinematic contemplation
        this.speechTimeout = setTimeout(() => {
          this.playNextNarrationLine();
        }, 1800);
      };

      utterance.onend = advance;
      utterance.onerror = advance;

      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback if browser lacks speech synthesis: display captions timed with audio
      if (this.onCaptionCallback) {
        this.onCaptionCallback(line);
      }
      this.speechTimeout = setTimeout(() => {
        this.currentSpeechIndex += 1;
        this.playNextNarrationLine();
      }, line.duration);
    }
  }

  // Trigger brief vehicle-specific bespoke announcement when changing cars
  announceCar(car) {
    if (!this.isPlaying || !('speechSynthesis' in window)) return;
    
    // Brief bespoke line for car
    const carAnnouncements = {
      'porsche-gt3': 'Porsche 911 GT3. Weissach Aerodynamic Package.',
      'ferrari-f8': 'Ferrari F8 Tributo. Twin-Turbo Italian Symphony.',
      'g63-amg': 'Mercedes-AMG G63. Bespoke Armored Elegance.'
    };

    const text = carAnnouncements[car.id] || car.modelName;

    // Speak announcement softly over music
    window.speechSynthesis.cancel();
    if (this.speechTimeout) clearTimeout(this.speechTimeout);

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find((v) => v.lang.startsWith('en')) || voices[0];
    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.pitch = 0.88;
    utterance.rate = 0.9;
    utterance.volume = 0.85;

    if (this.onCaptionCallback) {
      this.onCaptionCallback({ en: text, vi: car.modelName });
      setTimeout(() => {
        if (this.isPlaying && this.onCaptionCallback) {
          this.onCaptionCallback(null);
        }
      }, 3500);
    }

    window.speechSynthesis.speak(utterance);
  }

  suspend() {
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend().catch(() => {});
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
  }

  stop(immediate = false) {
    this.isPlaying = false;

    if (this.chordInterval) {
      clearInterval(this.chordInterval);
      this.chordInterval = null;
    }

    if (this.speechTimeout) {
      clearTimeout(this.speechTimeout);
      this.speechTimeout = null;
    }

    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
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

    // Smooth luxury fade-out
    try {
      const now = this.ctx.currentTime;
      prevGain.gain.cancelScheduledValues(now);
      prevGain.gain.setValueAtTime(Math.max(0.0001, prevGain.gain.value), now);
      prevGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
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
    }, 550);
  }
}

export const atelierAudio = new AtelierAudioSystem();
