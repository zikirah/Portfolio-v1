// Add styles to head
const style = document.createElement('style');
style.textContent = `
    #gradient-canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        --gradient-color-1: #4A00E0;
        --gradient-color-2: #8E2DE2;
        --gradient-color-3: #AA076B;
        --gradient-color-4: #5F0A87;
    }

    .cursor-glow {
        position: fixed;
        width: 800px;
        height: 800px;
        background: radial-gradient(circle, 
            rgba(147, 51, 234, 0.2) 0%, 
            rgba(192, 38, 211, 0.15) 30%, 
            transparent 70%
        );
        pointer-events: none;
        z-index: -1;
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s;
        mix-blend-mode: screen;
    }
`;
document.head.appendChild(style);

// Add canvas and cursor glow elements
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
const canvas = document.createElement('canvas');
canvas.id = 'gradient-canvas';

// Insert elements right after body tag opens
document.body.insertBefore(canvas, document.body.firstChild);
document.body.insertBefore(cursorGlow, document.body.firstChild);

// Animation class
class InteractiveGradient {
    constructor() {
        this.canvas = document.querySelector('#gradient-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.cursorGlow = document.querySelector('.cursor-glow');
        this.particles = [];
        this.mouseX = window.innerWidth / 2;
        this.mouseY = window.innerHeight / 2;
        this.targetX = this.mouseX;
        this.targetY = this.mouseY;
        this.time = 0;

        this.colors = [
            { r: 74, g: 0, b: 224 },    // #4A00E0
            { r: 142, g: 45, b: 226 },  // #8E2DE2
            { r: 170, g: 7, b: 107 },   // #AA076B
            { r: 95, g: 10, b: 135 },   // #5F0A87
            { r: 147, g: 51, b: 234 }   // #9333EA
        ];

        this.init();
    }

    // ... (rest of the InteractiveGradient class methods remain the same)
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new InteractiveGradient();
}); 