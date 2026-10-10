/**
 * Apple-style tactile audio feedback synthesizer
 * Uses Web Audio API to produce subtle, premium mechanical clicks
 * identical to iOS picker wheels and macOS tactile buttons.
 */

class HapticAudioEngine {
    private ctx: AudioContext | null = null;
    private enabled: boolean = true;

    constructor() {
        // AudioContext is initialized lazily on first user gesture
    }

    private getContext(): AudioContext | null {
        if (!this.enabled || typeof window === 'undefined') return null;
        if (!this.ctx) {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContextClass) {
                this.ctx = new AudioContextClass();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
        }
        return this.ctx;
    }

    public setEnabled(val: boolean) {
        this.enabled = val;
    }

    public isEnabled(): boolean {
        return this.enabled;
    }

    /**
     * Soft click (selection change, button tap)
     */
    public triggerClick(pitch = 180, duration = 0.015) {
        if (!this.enabled) return;
        try {
            const ctx = this.getContext();
            if (!ctx) return;

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(1400, ctx.currentTime);

            osc.type = 'sine';
            osc.frequency.setValueAtTime(pitch, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + duration);

            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch {
            // Ignore audio context errors gracefully
        }
    }

    /**
     * Subtle 3D Card Flip whoosh/click
     */
    public triggerFlip() {
        if (!this.enabled) return;
        try {
            const ctx = this.getContext();
            if (!ctx) return;

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(140, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.04);

            gain.gain.setValueAtTime(0.06, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.06);
        } catch {
            // Ignore
        }
    }

    /**
     * Crisp success chime on card download
     */
    public triggerSuccess() {
        if (!this.enabled) return;
        try {
            const ctx = this.getContext();
            if (!ctx) return;

            const now = ctx.currentTime;
            [523.25, 659.25, 783.99].forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + idx * 0.06);

                gain.gain.setValueAtTime(0.05, now + idx * 0.06);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.18);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(now + idx * 0.06);
                osc.stop(now + idx * 0.06 + 0.18);
            });
        } catch {
            // Ignore
        }
    }
}

export const hapticEngine = new HapticAudioEngine();
