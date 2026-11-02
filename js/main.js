/* ============================================================
   MAIN.JS - Portfolio Game Developer
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    initMobileMenu();
    initTyping();
    initScrollReveal();
    initSkillBars();
    initNickCopy();
    initContactForm();
    initProjectModals();
    initDownloadCV();
});

/* -- THEME TOGGLE -- */
function initTheme() {
    const btn = document.getElementById('theme-toggle');
    const icon = btn?.querySelector('i');
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    updateIcon(saved);

    btn?.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-theme');
        const next = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateIcon(next);
        toast(next === 'light' ? 'Light Mode aktif' : 'Dark Mode aktif');
    });

    function updateIcon(theme) {
        if (!icon) return;
        icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
}

/* -- NAVBAR SCROLL -- */
function initNavbar() {
    const nav = document.getElementById('navbar');
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        nav?.classList.toggle('scrolled', window.scrollY > 40);

        let current = '';
        sections.forEach(s => {
            if (window.scrollY + 150 >= s.offsetTop) current = s.id;
        });
        links.forEach(l => {
            l.classList.toggle('active', l.getAttribute('href') === '#' + current);
        });
    });
}

/* -- MOBILE MENU -- */
function initMobileMenu() {
    const ham = document.getElementById('hamburger');
    const menu = document.getElementById('nav-links');
    const ov = document.getElementById('overlay');

    function close() {
        ham?.classList.remove('active');
        menu?.classList.remove('active');
        ov?.classList.remove('active');
        document.body.style.overflow = '';
    }

    ham?.addEventListener('click', () => {
        const open = !menu.classList.contains('active');
        ham.classList.toggle('active', open);
        menu.classList.toggle('active', open);
        ov.classList.toggle('active', open);
        document.body.style.overflow = open ? 'hidden' : '';
    });

    ov?.addEventListener('click', close);
    document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', close));
}

/* -- TYPING EFFECT -- */
function initTyping() {
    const el = document.getElementById('typing-text');
    if (!el) return;

    const words = ['DIGITAL CREATOR', 'CREATIVE CODER', 'GAMEPLAY ARCHITECT', 'INDIE DEV'];
    let wi = 0, ci = 0, deleting = false;

    function type() {
        const word = words[wi];
        el.textContent = deleting ? word.substring(0, ci - 1) : word.substring(0, ci + 1);
        deleting ? ci-- : ci++;

        let speed = deleting ? 40 : 80;

        if (!deleting && ci === word.length) { speed = 2000; deleting = true; }
        else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; speed = 300; }

        setTimeout(type, speed);
    }
    type();
}

/* -- SCROLL REVEAL -- */
function initScrollReveal() {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* -- SKILL BARS -- */
function initSkillBars() {
    const section = document.getElementById('skills');
    const fills = document.querySelectorAll('.sk-fill');
    if (!section || !fills.length) return;

    new IntersectionObserver((entries, o) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                fills.forEach(f => { f.style.width = f.dataset.p; });
                o.unobserve(e.target);
            }
        });
    }, { threshold: 0.2 }).observe(section);
}

/* -- NICKNAME COPY -- */
function initNickCopy() {
    document.querySelectorAll('.nick-card').forEach(card => {
        card.addEventListener('click', () => {
            const nick = card.dataset.nick;
            if (nick) {
                navigator.clipboard?.writeText(nick).then(() => toast(nick + ' disalin!')).catch(() => toast('Gagal menyalin'));
            }
        });
    });
}

/* -- CONTACT FORM -- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('contact-name');
        const email = document.getElementById('contact-email');
        const msg = document.getElementById('contact-message');
        const ne = document.getElementById('name-error');
        const ee = document.getElementById('email-error');
        const me = document.getElementById('message-error');
        let ok = true;

        ne.textContent = ''; ee.textContent = ''; me.textContent = '';

        if (!name.value.trim()) { ne.textContent = 'Nama wajib diisi'; ok = false; }
        if (!email.value.trim()) { ee.textContent = 'Email wajib diisi'; ok = false; }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { ee.textContent = 'Format email salah'; ok = false; }
        if (!msg.value.trim()) { me.textContent = 'Pesan wajib diisi'; ok = false; }

        if (!ok) return;

        const btn = document.getElementById('form-submit-btn');
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...';

        setTimeout(() => {
            btn.disabled = false;
            btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
            form.reset();
            toast('Pesan berhasil dikirim!');
        }, 1200);
    });
}

/* -- PROJECT MODALS -- */
const projects = {
    aetheria: {
        title: 'Aetheria: Echoes of Eternity',
        genre: 'Action RPG / Dark Fantasy',
        status: '🚧 In Development (Pre-Alpha)',
        pct: '75%',
        overview: 'Game aksi third-person berlatar dunia reruntuhan langit kuno. Pemain berperan sebagai "Echo Knight" yang memanipulasi fragmen waktu dan merangkai rune sihir secara dinamis.',
        features: ['Sistem Kombo Real-Time dengan dodge cancel', 'Modular Spell Crafting: 4 elemen, 20+ sihir', 'AI Musuh dengan Behavior Trees', 'Dungeon prosedural + boss battles'],
        controls: [['W,A,S,D', 'Pergerakan'], ['Klik Kiri', 'Serangan Ringan'], ['Klik Kanan', 'Spell Cast'], ['Space', 'Lompat'], ['Shift', 'Dash/Dodge']],
        engine: 'Unity 2022 LTS, C#, URP, FMOD Studio'
    },
    'neon-velocity': {
        title: 'Neon Velocity: Cyber Drift',
        genre: 'Sci-Fi Racer / Arcade Drift',
        status: '🚧 In Development (Alpha)',
        pct: '60%',
        overview: 'Balap anti-gravitasi masa depan dengan estetika synthwave neon 80-an. Manuver kecepatan ekstrem di megapolis futuristik.',
        features: ['Fisika Hovercraft Dinamis', 'Nitro & Drift Boost bertingkat', 'Kustomisasi: mesin, spoiler, livery', 'Mode Time Attack + leaderboard online'],
        controls: [['W / ↑', 'Akselerasi'], ['S / ↓', 'Rem'], ['A,D / ←,→', 'Kemudi'], ['Space', 'Drift Lock'], ['Shift', 'Nitro Boost']],
        engine: 'Godot 4.2, GDScript, Custom Shaders, Wwise'
    }
};

function initProjectModals() {
    const modal = document.getElementById('project-modal');
    const content = document.getElementById('modal-content-container');
    if (!modal || !content) return;

    function open(id) {
        const d = projects[id];
        if (!d) return;
        content.innerHTML = `
            <h3>${d.title}</h3>
            <p style="color:var(--text3);font-family:var(--mono);font-size:.8rem;margin-bottom:8px">${d.genre}</p>
            <div style="display:inline-flex;align-items:center;gap:6px;padding:4px 12px;background:rgba(245,158,11,.1);border:1px solid #f59e0b;border-radius:20px;font-family:var(--mono);font-size:.72rem;color:#f59e0b;margin-bottom:16px">${d.status} • ${d.pct}</div>
            <h4><i class="fa-solid fa-gamepad"></i> Overview</h4><p>${d.overview}</p>
            <h4><i class="fa-solid fa-star"></i> Fitur Utama</h4>
            ${d.features.map(f => `<div class="modal-feat"><i class="fa-solid fa-check"></i><span>${f}</span></div>`).join('')}
            <h4><i class="fa-solid fa-keyboard"></i> Controls</h4>
            <table class="modal-table"><thead><tr><th>Key</th><th>Action</th></tr></thead><tbody>${d.controls.map(c => `<tr><td><code>${c[0]}</code></td><td>${c[1]}</td></tr>`).join('')}</tbody></table>
            <h4><i class="fa-solid fa-microchip"></i> Engine</h4><p><strong>${d.engine}</strong></p>
        `;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.proj-trigger').forEach(b => b.addEventListener('click', () => open(b.dataset.project)));
    document.getElementById('modal-close-btn')?.addEventListener('click', close);
    document.getElementById('modal-backdrop')?.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* -- DOWNLOAD CV -- */
function initDownloadCV() {
    document.getElementById('download-cv-btn')?.addEventListener('click', e => {
        e.preventDefault();
        toast('Downloading CV...');
        const txt = `GAME DEVELOPER RESUME\n====================\nName: Jati Wisnu\nRole: Game Developer & Digital Creator\nSkills: Unity, Godot, C#, GDScript, Blender\nProjects: Aetheria (RPG), Neon Velocity (Racer)\nContact: your.email@example.com`;
        const blob = new Blob([txt], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'GameDev_Resume.txt';
        a.click();
        URL.revokeObjectURL(a.href);
    });
}

/* -- TOAST -- */
let toastTimer;
function toast(msg) {
    const t = document.getElementById('toast');
    const m = document.getElementById('toast-message');
    if (!t || !m) return;
    clearTimeout(toastTimer);
    m.textContent = msg;
    t.classList.add('show');
    toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}
