// Web Audio API Supercar Acoustic Engine for APEX Studio
// Generates authentic high-performance engine acoustic notes (Flat-6 & Twin-Turbo V8)

class EngineAudioSystem {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.oscillators = [];
    this.gainNode = null;
    this.revInterval = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  start(type = 'flat6') {
    this.init();
    if (!this.ctx) return;
    if (this.isPlaying) return;
    this.isPlaying = true;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Master volume gain
    this.gainNode = ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.001, now);
    this.gainNode.gain.exponentialRampToValueAtTime(0.12, now + 0.5);
    this.gainNode.connect(ctx.destination);

    // Fundamental Engine Frequencies
    const baseFreq = type === 'v8' ? 65 : 78;

    // 1. Primary Crankshaft Sawtooth Oscillator
    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(baseFreq, now);

    // 2. Harmonic Cylinder Pulse Oscillator
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(baseFreq * 2, now);

    // 3. Sub-bass Exhaust Rumble Oscillator
    const oscSub = ctx.createOscillator();
    oscSub.type = 'sine';
    oscSub.frequency.setValueAtTime(baseFreq / 2, now);

    // Filter stage: Exhaust resonance
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);
    filter.Q.setValueAtTime(4, now);

    // Subtle distortion / saturation for raw racecar growl
    const shaper = ctx.createWaveShaper();
    shaper.curve = this.makeDistortionCurve(15);
    shaper.oversample = '4x';

    osc1.connect(shaper);
    osc2.connect(shaper);
    oscSub.connect(filter);
    shaper.connect(filter);
    filter.connect(this.gainNode);

    osc1.start(now);
    osc2.start(now);
    oscSub.start(now);

    this.oscillators = [osc1, osc2, oscSub];

    // Periodic dynamic revving pattern (idle -> rev surge -> burble)
    this.revInterval = setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;
      const t = this.ctx.currentTime;
      const revTarget = baseFreq * (1.3 + Math.random() * 0.8);
      osc1.frequency.cancelScheduledValues(t);
      osc2.frequency.cancelScheduledValues(t);
      filter.frequency.cancelScheduledValues(t);

      // Rev up
      osc1.frequency.exponentialRampToValueAtTime(revTarget, t + 0.4);
      osc2.frequency.exponentialRampToValueAtTime(revTarget * 2, t + 0.4);
      filter.frequency.exponentialRampToValueAtTime(800 + Math.random() * 400, t + 0.4);

      // Settle down to idle with subtle burble
      osc1.frequency.exponentialRampToValueAtTime(baseFreq, t + 1.2);
      osc2.frequency.exponentialRampToValueAtTime(baseFreq * 2, t + 1.2);
      filter.frequency.exponentialRampToValueAtTime(450, t + 1.2);
    }, 2800);
  }

  stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;

    if (this.revInterval) {
      clearInterval(this.revInterval);
      this.revInterval = null;
    }

    if (this.gainNode && this.ctx) {
      const now = this.ctx.currentTime;
      this.gainNode.gain.cancelScheduledValues(now);
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
      setTimeout(() => {
        this.oscillators.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // ignore if already stopped
          }
        });
        this.oscillators = [];
      }, 350);
    }
  }

  makeDistortionCurve(amount = 20) {
    const k = amount;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }
}

export const engineAudio = new EngineAudioSystem();
