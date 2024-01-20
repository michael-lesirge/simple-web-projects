
export default class FpsController {
    constructor(callback, FPS) {

        this.setFrameRate(FPS)

        this.tref;   
        this.callback = callback;
        this.isPlaying = false;
    }

    getFrameRate() {
        return this.fps;
    }
    
    setFrameRate(newFPS) {
        this.fps = newFPS;
        this.delay = 1000 / this.fps;
        this.frame = -1;
        this.trueFrame = -1;
        this.time = null;
    };

   
    start() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.tref = requestAnimationFrame(this.loop);
        }
    };

    pause() {
        if (this.isPlaying) {
            cancelAnimationFrame(this.tref);
            this.isPlaying = false;
            this.time = null;
            this.frame = -1;
            this.trueFrame = -1;
        }
    };

    toggleOn() {
        if (this.isPlaying) this.pause()
        else this.start()
    }

    loop = (timestamp) => {
        if (this.time === null) this.time = timestamp;

        const seg = Math.floor((timestamp - this.time) / this.delay);

        if (seg > this.frame) {
            this.trueFrame++;
            this.frame = seg;
            this.callback({
                time: timestamp,
                frame: this.frame,
                i: this.trueFrame,
            });
        }

        if (this.isPlaying) {
            this.tref = requestAnimationFrame(this.loop);
        }
    }
}
