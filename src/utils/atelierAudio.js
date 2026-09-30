// Web Audio API & VieNeu-TTS v3 Turbo Studio Voiceover for APEX Atelier
// Blends authentic VieNeu-TTS Vietnamese narration with minimalist luxury ambient soundtrack.

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
    this.onCaptionCallback = null;
    this.vieneuAudio = null;
    this.speechTimeout = null;
    this.subsequentStep = 0;
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

  // Vietnamese follow-up narratives
  get followUpLines() {
    return [
      {
        text: "Từng đường nét tôi luyện thủ công. Từng xung nhịp động cơ đạt đến độ hoàn mỹ.",
        duration: 5200
      },
      {
        text: "Không tạo tác cho số đông... Chỉ dành riêng cho một chủ nhân độc bản.",
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

  setCaptionListener(cb) {
    this.onCaptionCallback = cb;
  }

  start() {
    this.init();
    if (!this.ctx) return;

    this.stop(true);
    this.isPlaying = true;
    this.subsequentStep = 0;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // 1. Master Output Gain
    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.32, now + 1.5);
    this.masterGain.connect(ctx.destination);

    // 2. Cinematic Music Bus
    this.musicGain = ctx.createGain();
    // Duck slightly during intro narration
    this.musicGain.gain.setValueAtTime(0.38, now);
    this.musicGain.connect(this.masterGain);

    // 3. Warm Velvet Lowpass Filter
    this.filterNode = ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(400, now);
    this.filterNode.Q.setValueAtTime(1.8, now);
    this.filterNode.connect(this.musicGain);

    // Slow ambient breathing LFO
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.07, now);
    lfoGain.gain.setValueAtTime(160, now);
    lfo.connect(lfoGain);
    lfoGain.connect(this.filterNode.frequency);
    lfo.start(now);
    this.lfo = lfo;

    // 4. Start Pad Soundscape
    this.currentChordIndex = 0;
    this.playChord(this.chords[this.currentChordIndex], true);

    this.chordInterval = setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;
      this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;
      this.playChord(this.chords[this.currentChordIndex], false);
    }, 6500);

    // 5. Play authentic VieNeu-TTS v3 Turbo studio voiceover
    this.playVieNeuVoiceover();
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
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);
          setTimeout(() => {
            try {
              osc.stop();
              osc.disconnect();
              gain.disconnect();
            } catch {}
          }, 2200);
        } catch {}
      });
    }

    if (prevSub) {
      try {
        prevSub.gain.gain.cancelScheduledValues(now);
        prevSub.gain.gain.setValueAtTime(Math.max(0.0001, prevSub.gain.gain.value), now);
        prevSub.gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
        setTimeout(() => {
          try {
            prevSub.osc.stop();
            prevSub.osc.disconnect();
            prevSub.gain.disconnect();
          } catch {}
        }, 2000);
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

    // Harmonic Layers
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

  // Play the authentic VieNeu-TTS v3 Turbo 48kHz studio audio
  playVieNeuVoiceover() {
    try {
      if (this.vieneuAudio) {
        this.vieneuAudio.pause();
        this.vieneuAudio = null;
      }

      const audio = new Audio('/audio/apex_vieneu_master.wav');
      audio.volume = 0.95;
      this.vieneuAudio = audio;

      const masterCaption = "Chào mừng quý khách đến với APEX Bespoke Atelier. Nơi kỹ thuật cơ khí đỉnh cao hòa quyện cùng nghệ thuật chế tác độc bản.";

      if (this.onCaptionCallback) {
        this.onCaptionCallback({
          vi: masterCaption,
          en: "Welcome to APEX Bespoke Atelier. Where haute engineering meets fine art."
        });
      }

      audio.onended = () => {
        if (!this.isPlaying) return;
        
        // Restore music volume smoothly
        if (this.musicGain && this.ctx) {
          const now = this.ctx.currentTime;
          this.musicGain.gain.cancelScheduledValues(now);
          this.musicGain.gain.linearRampToValueAtTime(0.65, now + 1.0);
        }

        // Clear initial caption after a gentle delay
        if (this.onCaptionCallback) {
          this.onCaptionCallback(null);
        }

        // Schedule follow-up narration
        this.speechTimeout = setTimeout(() => {
          this.playFollowUpNarration();
        }, 2200);
      };

      audio.onerror = () => {
        // Fallback to speech synthesis if audio file cannot be loaded
        this.speakWithTTS(masterCaption, () => {
          this.speechTimeout = setTimeout(() => {
            this.playFollowUpNarration();
          }, 2000);
        });
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser restricts unmuted playback, fallback gracefully
          this.speakWithTTS(masterCaption, () => {
            this.speechTimeout = setTimeout(() => {
              this.playFollowUpNarration();
            }, 2000);
          });
        });
      }
    } catch {
      // In case of error, continue music smoothly
      if (this.musicGain && this.ctx) {
        const now = this.ctx.currentTime;
        this.musicGain.gain.linearRampToValueAtTime(0.65, now + 1.0);
      }
    }
  }

  playFollowUpNarration() {
    if (!this.isPlaying) return;

    if (this.subsequentStep >= this.followUpLines.length) {
      if (this.onCaptionCallback) {
        this.onCaptionCallback(null);
      }
      return;
    }

    const line = this.followUpLines[this.subsequentStep];
    this.speakWithTTS(line.text, () => {
      this.subsequentStep += 1;
      this.speechTimeout = setTimeout(() => {
        this.playFollowUpNarration();
      }, 2400);
    });
  }

  speakWithTTS(text, onDone) {
    if (!this.isPlaying) return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      // Duck music
      if (this.musicGain && this.ctx) {
        const now = this.ctx.currentTime;
        this.musicGain.gain.cancelScheduledValues(now);
        this.musicGain.gain.linearRampToValueAtTime(0.35, now + 0.4);
      }

      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      
      // Look for natural Vietnamese voices (Microsoft HoaiMy, NamMinh, Google Tiếng Việt)
      const viVoice = voices.find(
        (v) =>
          v.lang.includes('vi') ||
          v.name.includes('HoaiMy') ||
          v.name.includes('NamMinh') ||
          v.name.includes('Vietnamese')
      );

      if (viVoice) {
        utterance.voice = viVoice;
      }
      utterance.lang = 'vi-VN';
      utterance.pitch = 0.9;
      utterance.rate = 0.88;
      utterance.volume = 0.95;

      if (this.onCaptionCallback) {
        this.onCaptionCallback({ vi: text });
      }

      const advance = () => {
        if (this.musicGain && this.ctx && this.isPlaying) {
          const now = this.ctx.currentTime;
          this.musicGain.gain.cancelScheduledValues(now);
          this.musicGain.gain.linearRampToValueAtTime(0.65, now + 0.8);
        }
        if (onDone) onDone();
      };

      utterance.onend = advance;
      utterance.onerror = advance;

      window.speechSynthesis.speak(utterance);
    } else {
      if (this.onCaptionCallback) {
        this.onCaptionCallback({ vi: text });
      }
      this.speechTimeout = setTimeout(() => {
        if (onDone) onDone();
      }, 4500);
    }
  }

  announceCar(car) {
    if (!this.isPlaying) return;

    const carTexts = {
      'porsche-gt3': 'Porsche 911 GT3. Gói khí động học Weissach thuần khiết trên đường đua.',
      'ferrari-f8': 'Ferrari F8 Tributo. Bản giao hưởng V8 Twin-Turbo đỉnh cao nước Ý.',
      'g63-amg': 'Mercedes-AMG G63. Biểu tượng uy quyền và sang trọng độc bản.'
    };

    const text = carTexts[car.id] || car.modelName;

    if (this.speechTimeout) clearTimeout(this.speechTimeout);
    if (this.vieneuAudio) {
      try {
        this.vieneuAudio.pause();
      } catch {}
    }

    this.speakWithTTS(text, () => {
      setTimeout(() => {
        if (this.isPlaying && this.onCaptionCallback) {
          this.onCaptionCallback(null);
        }
      }, 3000);
    });
  }

  suspend() {
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend().catch(() => {});
    }
    if (this.vieneuAudio && !this.vieneuAudio.paused) {
      this.vieneuAudio.pause();
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    if (this.vieneuAudio && this.vieneuAudio.paused && this.isPlaying) {
      this.vieneuAudio.play().catch(() => {});
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

    if (this.vieneuAudio) {
      try {
        this.vieneuAudio.pause();
        this.vieneuAudio.currentTime = 0;
      } catch {}
      this.vieneuAudio = null;
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

    try {
      const now = this.ctx.currentTime;
      prevGain.gain.cancelScheduledValues(now);
      prevGain.gain.setValueAtTime(Math.max(0.0001, prevGain.gain.value), now);
      prevGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
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
    }, 450);
  }
}

export const atelierAudio = new AtelierAudioSystem();
