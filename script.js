// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
    // Page 1
    mainQuestion: "I HAVE SOMETHING ✨",
    subQuestion: "Mau dibaca? ✨",
    yesButton: "Ya, mau ⭐",
    noButton: "Enggak 😄",
    noEscapeTexts: ["Hehe nggak bisa gitu 😄", "Coba lagi dong 🤭", "Yaudah deh, gw anggap iya ya! 💕"],
    
    // Page 2
    confirmTitle: "Makasih ya!!!",
    confirmText: "gw cuma mau kasih semangat buat diraa",
    badgeText: "💕 DIANDRA SEKAR AYU ⭐",
    
    // Page 3
    flowerTitle: "💐 Hadiah kecil buat diraa 💐",
    takeBouquetButton: "Terima 💫",
    bouquetMessage: "Semangat terus ya! 💪",
    
    // Page 4
    collageTitle: "💕 Diandra Sekar Ayu 💕",
    collageSubtitle: "Terus semangat kejar mimpi & kejurnas! 💪✨",
    
    // Page 5
    finalMessage: "Semangat terus ya ngejar kejurnasnya diraa! 💕\n\nJangan cape buat usaha dan latihan, semua proses yang lo jalanin sekarang pasti ada hasil baiknya nanti. gw selalu support dari jauh. 💪\n\nlo hebat, lo kuat, lo pasti bisa! ✨",
    copySuccess: "✓ Pesan berhasil disalin! 💕"
};

// ============================================
// STATE MANAGEMENT
// ============================================
const state = {
    currentPage: 1,
    hasClickedYes: false,
    noClickCount: 0,
    bouquetTaken: false
};

// ============================================
// DOM ELEMENTS
// ============================================
const elements = {
    pages: document.querySelectorAll('.page'),
    yesBtn: document.getElementById('yesBtn'),
    noBtn: document.getElementById('noBtn'),
    noEscapeText: document.getElementById('noEscapeText'),
    nextToPage3: document.getElementById('nextToPage3'),
    backToPage1: document.getElementById('backToPage1'),
    bouquet: document.getElementById('bouquet'),
    takeBouquet: document.getElementById('takeBouquet'),
    nextToPage4: document.getElementById('nextToPage4'),
    bouquetMessage: document.getElementById('bouquetMessage'),
    petalsContainer: document.getElementById('petalsContainer'),
    nextToPage5: document.getElementById('nextToPage5'),
    restartBtn: document.getElementById('restartBtn'),
    copyBtn: document.getElementById('copyBtn'),
    copyNotif: document.getElementById('copyNotif'),
    confettiContainer: document.getElementById('confettiContainer'),
    sparkleContainer: document.getElementById('sparkleContainer'),
    envelopeWrapper: document.getElementById('envelopeWrapper'),
    envelope: document.getElementById('envelope'),
    finalContent: document.getElementById('finalContent')
};

// ============================================
// AUTO-PLAY MUSIC (Tanpa Overlay - Work di HP)
// ============================================
const bgMusic = document.getElementById('bgMusic');
let musicStarted = false;

function startMusic() {
    if (musicStarted) return;
    if (!bgMusic) return;
    
    musicStarted = true;
    bgMusic.volume = 0.5; // Volume 50%
    bgMusic.muted = false;
    
    bgMusic.play().then(() => {
        console.log("Music started!");
    }).catch(e => {
        console.log("Play error:", e);
        musicStarted = false;
    });
}

// Coba play muted dulu (biar bisa autoplay policy terpenuhi)
if (bgMusic) {
    bgMusic.muted = true;
    bgMusic.play().catch(e => console.log("Initial muted play failed:", e));
}

// Musik akan mulai saat user pertama kali klik/tap DI MANA SAJA
function handleFirstInteraction() {
    startMusic();
    document.removeEventListener('click', handleFirstInteraction);
    document.removeEventListener('touchstart', handleFirstInteraction);
    document.removeEventListener('keydown', handleFirstInteraction);
}

document.addEventListener('click', handleFirstInteraction);
document.addEventListener('touchstart', handleFirstInteraction);
document.addEventListener('keydown', handleFirstInteraction);

// ============================================
// HELPER FUNCTIONS
// ============================================
function showElement(el) {
    if (el) el.classList.remove('hidden');
}

function hideElement(el) {
    if (el) el.classList.add('hidden');
}

function navigateTo(pageNumber) {
    const currentPageEl = document.getElementById(`page${state.currentPage}`);
    const nextPageEl = document.getElementById(`page${pageNumber}`);
    
    if (!currentPageEl || !nextPageEl) return;

    currentPageEl.classList.add('fade-out');
    currentPageEl.classList.remove('active');

    setTimeout(() => {
        currentPageEl.classList.remove('fade-out');
        nextPageEl.classList.add('active');
        state.currentPage = pageNumber;
        
        if (pageNumber === 3) startFallingPetals();
        if (pageNumber === 5) resetEnvelope();
    }, 400);
}

// ============================================
// PAGE 1 - EVENT HANDLERS
// ============================================
function handleYesClick() {
    startMusic();
    state.hasClickedYes = true;
    navigateTo(2);
}

function handleNoClick() {
    startMusic();
    state.noClickCount++;
    
    elements.noBtn.classList.add('shake');
    setTimeout(() => elements.noBtn.classList.remove('shake'), 500);

    if (state.noClickCount <= 2) {
        elements.noEscapeText.textContent = CONFIG.noEscapeTexts[state.noClickCount - 1];
        showElement(elements.noEscapeText);
    } else {
        elements.noEscapeText.textContent = CONFIG.noEscapeTexts[2];
        showElement(elements.noEscapeText);
        setTimeout(() => {
            state.hasClickedYes = true;
            navigateTo(2);
        }, 1500);
    }
}

// ============================================
// PAGE 3 - FLOWER & PETALS
// ============================================
let petalInterval = null;

function startFallingPetals() {
    if (elements.petalsContainer) {
        elements.petalsContainer.innerHTML = '';
        for (let i = 0; i < 20; i++) {
            setTimeout(() => createPetal(), i * 150);
        }
        
        if (petalInterval) clearInterval(petalInterval);
        petalInterval = setInterval(() => {
            if (state.currentPage === 3) createPetal();
        }, 500);
    }
}

function createPetal() {
    if (!elements.petalsContainer) return;
    
    const petal = document.createElement('div');
    petal.className = 'petal';
    
    const colors = ['#f9a8d4', '#f472b6', '#ec4899', '#fbcfe8', '#fb7185'];
    petal.style.background = `linear-gradient(135deg, ${colors[Math.floor(Math.random() * colors.length)]}, ${colors[Math.floor(Math.random() * colors.length)]})`;
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = (Math.random() * 4 + 4) + 's';
    petal.style.width = (Math.random() * 20 + 10) + 'px';
    petal.style.height = petal.style.width;
    petal.style.opacity = Math.random() * 0.5 + 0.3;
    
    elements.petalsContainer.appendChild(petal);
    setTimeout(() => petal.remove(), 8000);
}

function handleTakeBouquet() {
    if (state.bouquetTaken) return;
    
    state.bouquetTaken = true;
    
    if (elements.bouquet) {
        elements.bouquet.classList.add('bounce');
        setTimeout(() => {
            elements.bouquet.classList.remove('bounce');
        }, 600);
    }
    
    if (elements.bouquetMessage) showElement(elements.bouquetMessage);
    if (elements.takeBouquet) hideElement(elements.takeBouquet);
    if (elements.nextToPage4) showElement(elements.nextToPage4);
}

// ============================================
// PAGE 5 - ENVELOPE & FINAL MESSAGE
// ============================================
function resetEnvelope() {
    if (elements.envelopeWrapper) {
        elements.envelopeWrapper.classList.remove('hidden', 'fade-out');
    }
    if (elements.envelope) {
        elements.envelope.classList.remove('opened', 'letter-exit');
    }
    if (elements.finalContent) {
        elements.finalContent.classList.add('hidden');
        elements.finalContent.classList.remove('reveal');
    }
    
    const hint = document.getElementById('envelopeHint');
    if (hint) hint.classList.remove('fade');
}

function handleEnvelopeClick() {
    if (!elements.envelope || elements.envelope.classList.contains('opened')) return;

    const hint = document.getElementById('envelopeHint');

    elements.envelope.classList.add('opened');
    if (hint) hint.classList.add('fade');

    setTimeout(() => {
        elements.envelope.classList.add('letter-exit');
    }, 600);

    setTimeout(() => {
        if (elements.envelopeWrapper) {
            elements.envelopeWrapper.classList.add('fade-out');
        }
    }, 1200);

    setTimeout(() => {
        if (elements.envelopeWrapper) {
            elements.envelopeWrapper.classList.add('hidden');
        }
        if (elements.finalContent) {
            elements.finalContent.classList.remove('hidden');
            elements.finalContent.classList.add('reveal');
        }
        triggerConfetti();
    }, 1700);
}

function triggerConfetti() {
    if (!elements.confettiContainer) return;
    
    elements.confettiContainer.innerHTML = '';
    const icons = ['💕', '⭐', '✨', '💪', '🎯', '🌸', '💗', '🌟'];
    
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const confetti = document.createElement('span');
            confetti.className = 'confetti-icon';
            confetti.textContent = icons[Math.floor(Math.random() * icons.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.fontSize = (Math.random() * 1.8 + 1) + 'rem';
            confetti.style.animationDelay = Math.random() * 0.3 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
            elements.confettiContainer.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4500);
        }, i * 40);
    }
}

function handleCopyMessage() {
    const messageEl = document.getElementById('finalMessage');
    let message = CONFIG.finalMessage;
    if (messageEl) {
        message = messageEl.textContent;
    }
    
    navigator.clipboard.writeText(message).then(() => {
        if (elements.copyNotif) {
            elements.copyNotif.classList.remove('hidden');
            setTimeout(() => elements.copyNotif.classList.add('hidden'), 2500);
        }
    }).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = message;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        if (elements.copyNotif) {
            elements.copyNotif.classList.remove('hidden');
            setTimeout(() => elements.copyNotif.classList.add('hidden'), 2500);
        }
    });
}

function handleRestart() {
    state.hasClickedYes = false;
    state.noClickCount = 0;
    state.bouquetTaken = false;
    
    if (elements.noBtn) {
        elements.noBtn.classList.remove('escaping');
        elements.noBtn.style.left = '';
        elements.noBtn.style.top = '';
    }
    if (elements.noEscapeText) hideElement(elements.noEscapeText);
    if (elements.bouquetMessage) hideElement(elements.bouquetMessage);
    if (elements.takeBouquet) showElement(elements.takeBouquet);
    if (elements.nextToPage4) hideElement(elements.nextToPage4);
    if (elements.confettiContainer) elements.confettiContainer.innerHTML = '';
    
    navigateTo(1);
}

// ============================================
// PARTICLE SYSTEM (Background Stars & Hearts)
// ============================================
class MagicParticle {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedY = Math.random() * 0.4 + 0.15;
        this.type = Math.random() > 0.5 ? '⭐' : '💕';
        this.opacity = Math.random() * 0.4 + 0.15;
    }
    
    update() {
        this.y -= this.speedY;
        if (this.y < -20) {
            this.y = this.canvas.height + 20;
            this.x = Math.random() * this.canvas.width;
        }
    }
    
    draw(ctx) {
        ctx.globalAlpha = this.opacity;
        ctx.font = `${this.size * 6}px "Segoe UI Emoji"`;
        ctx.fillStyle = this.type === '⭐' ? '#fbbf24' : '#f472b6';
        ctx.fillText(this.type, this.x, this.y);
    }
}

class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 40;
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        if (this.canvas) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
    }
    
    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new MagicParticle(this.canvas));
        }
    }
    
    animate() {
        if (!this.ctx || !this.canvas) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(p => {
            p.update();
            p.draw(this.ctx);
        });
        requestAnimationFrame(() => this.animate());
    }
}

// ============================================
// SPARKLES
// ============================================
function createSparkles() {
    if (!elements.sparkleContainer) return;
    
    for (let i = 0; i < 40; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 4 + 's';
        sparkle.style.animationDuration = (Math.random() * 2.5 + 1.5) + 's';
        elements.sparkleContainer.appendChild(sparkle);
    }
}

// ============================================
// MOUSE TRAIL
// ============================================
function initMouseTrail() {
    const icons = ['💕', '⭐', '✨', '💪', '🎯', '💗'];
    let lastTime = 0;
    const throttleMs = 60;

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTime < throttleMs) return;
        lastTime = now;

        const icon = document.createElement('span');
        icon.className = 'cursor-icon';
        icon.textContent = icons[Math.floor(Math.random() * icons.length)];
        icon.style.left = e.pageX + 'px';
        icon.style.top = e.pageY + 'px';
        icon.style.fontSize = (Math.random() * 14 + 10) + 'px';
        document.body.appendChild(icon);

        setTimeout(() => icon.remove(), 800);
    });
}

// ============================================
// INITIALIZATION
// ============================================
function initEventListeners() {
    if (elements.yesBtn) elements.yesBtn.addEventListener('click', handleYesClick);
    if (elements.noBtn) elements.noBtn.addEventListener('click', handleNoClick);
    if (elements.nextToPage3) elements.nextToPage3.addEventListener('click', () => navigateTo(3));
    if (elements.backToPage1) elements.backToPage1.addEventListener('click', () => navigateTo(1));
    if (elements.takeBouquet) elements.takeBouquet.addEventListener('click', handleTakeBouquet);
    if (elements.nextToPage4) elements.nextToPage4.addEventListener('click', () => navigateTo(4));
    if (elements.nextToPage5) elements.nextToPage5.addEventListener('click', () => navigateTo(5));
    if (elements.restartBtn) elements.restartBtn.addEventListener('click', handleRestart);
    if (elements.copyBtn) elements.copyBtn.addEventListener('click', handleCopyMessage);
    if (elements.envelopeWrapper) elements.envelopeWrapper.addEventListener('click', handleEnvelopeClick);
}

function setTextContent() {
    const elements_map = {
        'mainQuestion': CONFIG.mainQuestion,
        'subQuestion': CONFIG.subQuestion,
        'confirmTitle': CONFIG.confirmTitle,
        'confirmText': CONFIG.confirmText,
        'flowerTitle': CONFIG.flowerTitle,
        'collageTitle': CONFIG.collageTitle,
        'collageSubtitle': CONFIG.collageSubtitle,
        'finalMessage': CONFIG.finalMessage
    };
    
    for (const [id, text] of Object.entries(elements_map)) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }
    
    if (elements.yesBtn) elements.yesBtn.querySelector('.btn-text').textContent = CONFIG.yesButton;
    if (elements.noBtn) elements.noBtn.querySelector('.btn-text').textContent = CONFIG.noButton;
    if (elements.takeBouquet) elements.takeBouquet.querySelector('.btn-text').textContent = CONFIG.takeBouquetButton;
    if (elements.bouquetMessage) elements.bouquetMessage.textContent = CONFIG.bouquetMessage;
    if (elements.copyNotif) elements.copyNotif.textContent = CONFIG.copySuccess;
    
    const badgeText = document.querySelector('.badge-text');
    if (badgeText) badgeText.textContent = CONFIG.badgeText;
}

document.addEventListener('DOMContentLoaded', () => {
    setTextContent();
    initEventListeners();
    createSparkles();
    new ParticleSystem();
    initMouseTrail();
});