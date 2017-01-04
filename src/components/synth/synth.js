import Tone from 'tone';
// import nx from 'nexusui';
import template from './synth.html';
import styles from './synth.scss';

export default {
    template,
    controller
};

controller.$inject = ['$window'];

function controller() {
    this.styles = styles;

    this.notes = [
        {
            note: 'C3',
            keyCode: 65
        },
        {
            note: 'C#3',
            keyCode: 87
        },
        {
            note: 'D3',
            keyCode: 83
        },
        {
            note: 'D#3',
            keyCode: 69
        },
        {
            note: 'E3',
            keyCode: 68
        },
        {
            note: 'F3',
            keyCode: 70
        },
        {
            note: 'F#3',
            keyCode: 84
        },
        {
            note: 'G3',
            keyCode: 71
        },
        {
            note: 'G#3',
            keyCode: 89
        },
        {
            note: 'A3',
            keyCode: 72
        },
        {
            note: 'A#3',
            keyCode: 85
        },
        {
            note: 'B3',
            keyCode: 74
        },
        {
            note: 'C4',
            keyCode: 75
        },
        {
            note: 'C#4',
            keyCode: 79
        },
        {
            note: 'D4',
            keyCode: 76
        },
        {
            note: 'D#4',
            keyCode: 80
        },
        {
            note: 'E4',
            keyCode: 186
        },
        {
            note: 'F4',
            keyCode: 222
        }
    ];

    this.synth = new Tone.PolySynth(6, Tone.Synth, {
        'oscillator': {
            'partials': [0, 2, 3, 4],
        }
    }).toMaster();

    this.updateMatrix = function(col, row) {
        if(this.sequenceMatrix[col][row] === 1) this.sequenceMatrix[col][row] = 0;
        else this.sequenceMatrix[col][row] = 1;
        console.log(this.sequenceMatrix);
    };

    this.toggleSelect = function() {
        console.log('hit');
    };

    this.sequenceMatrix = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];

    const notes = ['F#3', 'E3', 'C#3', 'A3'];
    let lastNote = null;

    var loop = new Tone.Sequence((time, col) => {
        if(lastNote) {
            this.synth.triggerRelease(lastNote);
        }
        let column = this.sequenceMatrix[col];
        for(var i = 0; i < column.length; i++) {
            if(column[i] === 1) {
                var vel = Math.random() * 0.5 + 0.5;
                this.synth.triggerAttack(notes[i], time, vel);
                lastNote = notes[i];
            }
        }
    }, [0, 1, 2, 3], '4n');

    Tone.Transport.start();


    this.startLoop = function() {
        loop.start();
    };

    this.stopLoop = function() {
        loop.stop();
        this.synth.releaseAll();
    };

    this.noteOn = function(note) {
        console.log(this.synth);
        this.synth.triggerAttack(note);
    };

    this.noteOff = function(note) {
        this.synth.triggerRelease(note);
    };

    this.setFilter = function(freq, type) {
        const filter = new Tone.Filter(freq, type);
        this.synth['filter'] = filter;
    };

    this.keyDown = function($event) {
        $event.preventDefault();
        const note = this.notes.find(n => n.keyCode === $event.keyCode);
        this.noteOn(note.note);
    };

    this.keyUp = function($event) {
        $event.preventDefault();
        const note = this.notes.find(n => n.keyCode === $event.keyCode);
        this.noteOff(note.note);
    };

}