// Configuración
const CONFIG = {
    CONFETTI_DURATION: 3000,
    CONFETTI_DEFAULTS: { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 },
    COLORS: {
        fireworks: ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee'],
        stars: ['#FFF', '#FFD700', '#FFA500']
    }
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initStars();
    initCountdown();
    initBackgroundFireworks();
    initEventListeners();
    initControlButtons();
    setTimeout(initMessageRotationAnimated, 1000); // Iniciar rotación de mensajes con animación
});

// Crear estrellas de fondo
function initStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
        createStar(starsContainer);
    }
}

function createStar(container) {
    const star = document.createElement('div');
    star.className = 'star';

    // Posición aleatoria
    const x = Math.random() * 100;
    const y = Math.random() * 100;

    // Tamaño variable
    const size = Math.random() * 3;

    // Retraso de animación aleatorio
    const delay = Math.random() * 3;

    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.animationDelay = `${delay}s`;

    container.appendChild(star);
}

// Cuenta regresiva
function initCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const now = new Date();
    // Año nuevo 2026
    const newYear = new Date('January 1, 2026 00:00:00').getTime();
    const gap = newYear - now;

    if (gap <= 0) {
        document.getElementById('countdownScreen').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        return;
    }

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const d = Math.floor(gap / day);
    const h = Math.floor((gap % day) / hour);
    const m = Math.floor((gap % hour) / minute);
    const s = Math.floor((gap % minute) / second);

    // Actualizar pantalla inicial
    document.getElementById('days').innerText = d < 10 ? '0' + d : d;
    document.getElementById('hours').innerText = h < 10 ? '0' + h : h;
    document.getElementById('minutes').innerText = m < 10 ? '0' + m : m;
    document.getElementById('seconds').innerText = s < 10 ? '0' + s : s;

    // Actualizar contador en tarjeta principal
    const countdownEl = document.getElementById('countdown');
    if (countdownEl) {
        countdownEl.innerHTML = `${d}d ${h}h ${m}m ${s}s`;
    }
}

// Botones de control
function initControlButtons() {
    // Música
    const musicBtn = document.getElementById('musicToggle');
    if (musicBtn) {
        let isMusicPlaying = false;
        // Aquí iría la lógica de audio si se implementa
    }
}

// Fuegos artificiales automáticos de fondo
function initBackgroundFireworks() {
    // Optimización: Desactivar en móviles si pantalla es pequeña para ahorrar batería/GPU
    if (window.innerWidth < 768) return;

    setInterval(() => {
        if (document.hidden) return; // Pausar si tab no visible

        const x = Math.random();
        const y = Math.random() * 0.5; // Solo en mitad superior

        confetti({
            particleCount: 50,
            startVelocity: 30,
            spread: 360,
            origin: { x, y },
            colors: CONFIG.COLORS.fireworks,
            disableForReducedMotion: true,
            zIndex: 0
        });
    }, 4000);
}

// Event Listeners
function initEventListeners() {
    // Reveal surprise button
    window.revealSurprise = function () {
        const screen = document.getElementById('countdownScreen');
        screen.style.opacity = '0';
        setTimeout(() => {
            screen.style.display = 'none';
            const main = document.getElementById('mainContent');
            main.style.display = 'block';
            main.style.opacity = '0';
            setTimeout(() => main.style.opacity = '1', 50);

            // Lanzar fuegos artificiales iniciales
            createInitialFirework();
        }, 500);
    };

    // Global modal close
    window.closeModal = function () {
        document.getElementById('surpriseModal').classList.remove('active');
    };

    // Close modal on outside click
    window.onclick = function (event) {
        const modal = document.getElementById('surpriseModal');
        if (event.target == modal) {
            closeModal();
        }
    };
}

function createInitialFirework() {
    // Optimización móvil: menos partículas
    const particleCount = window.innerWidth < 480 ? 8 : 20;
    const velocity = window.innerWidth < 480 ? 20 : 30;

    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        const left = end - Date.now();

        if (left <= 0) {
            return;
        }

        confetti({
            particleCount: particleCount, // Menos partículas
            startVelocity: velocity, // Menor velocidad en móvil
            spread: 360,
            origin: {
                x: Math.random(),
                // since they fall down, start a bit higher than random
                y: Math.random() - 0.2
            },
            zIndex: 9999
        });

        requestAnimationFrame(frame);
    }());
}

// Lanzar fuegos artificiales principales
window.launchFireworks = function () {
    // Optimización móvil
    const isMobile = window.innerWidth < 480;
    const duration = isMobile ? 3000 : 5000; // Menos duración en móvil
    const particleCount = isMobile ? 15 : 50; // Menos partículas
    const intervalTime = isMobile ? 400 : 250; // Menos frecuencia

    // Sonido si está habilitado
    // playFireworkSound();

    const end = Date.now() + duration;

    const interval = setInterval(function () {
        if (Date.now() > end) {
            return clearInterval(interval);
        }

        confetti({
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            origin: {
                x: Math.random(),
                // since they fall down, start a bit higher than random
                y: Math.random() - 0.2
            },
            colors: CONFIG.COLORS.fireworks,
            particleCount: particleCount,
            zIndex: 9999
        });
    }, intervalTime);

    // Sorpresa extra: chispas
    setTimeout(() => {
        createSparkles();
    }, 1000);

    // Extra bursts simplificados para móvil
    const burstCount = isMobile ? 3 : 8;
    for (let i = 0; i < burstCount; i++) {
        setTimeout(() => {
            confetti({
                particleCount: isMobile ? 30 : 100,
                spread: 100,
                origin: { y: 0.6 },
                colors: CONFIG.COLORS.fireworks,
                zIndex: 9999
            });
        }, i * (isMobile ? 800 : 600)); // Más espaciados en móvil
    }
};

function createSparkles() {
    const colors = ['#FFD700', '#FFA500', '#FFFFFF'];
    // Optimización: menos sparkles
    const count = window.innerWidth < 480 ? 10 : 30;

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'star'; // Reusar clase star
            sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            sparkle.style.width = '4px';
            sparkle.style.height = '4px';
            sparkle.style.position = 'fixed';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.zIndex = '9998';
            document.body.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 1000);
        }, i * 100);
    }
}

// Sistema de Sorpresas
window.openSurprise = function () {
    const modal = document.getElementById('surpriseModal');
    const content = document.getElementById('surpriseContent');

    // Elegir sorpresa aleatoria
    const surprise = surprises[Math.floor(Math.random() * surprises.length)];

    // Separar icono del título
    const firstSpaceIndex = surprise.title.indexOf(' ');
    const icon = firstSpaceIndex !== -1 ? surprise.title.substring(0, firstSpaceIndex) : '🎁';
    const textTitle = firstSpaceIndex !== -1 ? surprise.title.substring(firstSpaceIndex + 1) : surprise.title;

    let html = `
        <div class="surprise-content-wrapper">
            <div class="surprise-icon-large">${icon}</div>
            <h2 class="surprise-title">${textTitle}</h2>
            <p class="surprise-text">${surprise.message}</p>
    `;

    if (surprise.image) {
        html += `<img src="${surprise.image}" alt="Sorpresa" style="max-width: 100%; border-radius: 10px; margin-top: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.3);">`;
    }

    html += `</div>`;

    content.innerHTML = html;
    modal.classList.add('active');

    // Ejecutar acción si existe
    if (surprise.action) surprise.action();
};

// Rotación de Mensajes
const friendMessages = [
    "Aunque no hablemos a diario ni nos veamos siempre, sabes que mi cariño por ti sigue intacto. ¡Que este 2026 sea increíble para ti, amiga!",
    "La verdadera amistad no se mide por la frecuencia, sino por la lealtad. Aunque estemos lejos o ocupados, siempre estás en mis mejores deseos.",
    "No importa cuánto tiempo pase sin vernos, nuestra conexión sigue igual de fuerte. Gracias por ser esa amiga eterna. ¡Feliz 2026!",
    "Pasa el tiempo, cambian las cosas, pero tenerte como mejor amiga es una certeza que no cambia. Brindo por nuestra amistad incondicional.",
    "Sabes que cuentas conmigo siempre, sin importar los días o meses que pasen sin hablar. ¡Te deseo un año espectacular lleno de éxitos!"
];

const friendWishes = [
    "🤝 Una amistad a prueba de tiempo",
    "🌟 Que cumplas todos tus sueños",
    "✨ Saber que siempre estamos ahí",
    "💫 Reencuentros inolvidables",
    "💪 Salud, energía y bienestar",
    "😊 Sonrisas y felicidad genuina",
    "🎯 Éxito en tus proyectos personales",
    "🌈 Que la distancia nunca nos separe",
    "🚀 Crecimiento en todo lo que hagas",
    "💙 Un año lleno de bendiciones"
];

// Nueva función de rotación con barra de progreso
function initMessageRotationAnimated() {
    const messageEl = document.getElementById('randomMessage');
    const wishesList = document.getElementById('wishesList');

    if (!messageEl) return;

    // Inicializar lista de deseos si está vacía
    if (wishesList && wishesList.children.length === 0) {
        friendWishes.forEach(wish => {
            const li = document.createElement('li');
            li.style.margin = '8px 0';
            li.style.fontSize = '0.95em';
            li.textContent = wish;
            wishesList.appendChild(li);
        });
        const yearEl = document.getElementById('currentYear');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    }

    let msgIndex = 0;
    const intervalTime = 15000; // 15 Segundos
    let startTime = Date.now();
    let progressBar = document.getElementById('msgProgressBar');

    const changeMessage = () => {
        messageEl.style.transition = 'opacity 0.5s ease-in-out';
        messageEl.style.opacity = '0';
        setTimeout(() => {
            msgIndex = (msgIndex + 1) % friendMessages.length;
            messageEl.textContent = friendMessages[msgIndex];
            messageEl.style.opacity = '1';
            // Resetear barra
            if (progressBar) {
                progressBar.style.width = '0%';
                progressBar.style.transition = 'none'; // Quitar transición para reset inmediato
                setTimeout(() => progressBar.style.transition = 'width 0.1s linear', 50);
            }
        }, 500);
    };

    const updateProgress = () => {
        if (!progressBar) progressBar = document.getElementById('msgProgressBar');
        if (progressBar) {
            const now = Date.now();
            const elapsed = now - startTime;
            if (elapsed >= intervalTime) {
                changeMessage();
                startTime = now;
            } else {
                const percentage = Math.min((elapsed / intervalTime) * 100, 100);
                progressBar.style.width = percentage + '%';
            }
        }
        requestAnimationFrame(updateProgress);
    };

    if (!messageEl.textContent.trim()) {
        messageEl.textContent = friendMessages[0];
    } else {
        const currentText = messageEl.textContent.trim();
        const foundIndex = friendMessages.indexOf(currentText);
        if (foundIndex !== -1) msgIndex = foundIndex;
    }

    requestAnimationFrame(updateProgress);
}

// Array de sorpresas ampliado
const surprises = [
    {
        title: "🎆 ¡Explosión de Alegría!",
        message: "Que tu año explote de colores y momentos vibrantes como estos fuegos artificiales 🎇",
        action: () => {
            for (let i = 0; i < 15; i++) {
                setTimeout(() => {
                    confetti({
                        particleCount: 80,
                        spread: 360,
                        origin: { x: Math.random(), y: Math.random() * 0.6 },
                        colors: CONFIG.COLORS.fireworks,
                        zIndex: 9999
                    });
                }, i * 200);
            }
        }
    },
    {
        title: "✨ Magia Pura",
        message: "¡Un poco de polvo de estrellas para que tus sueños más locos se hagan realidad este 2026! ✨"
    },
    {
        title: "🥂 Brindis Especial",
        message: "Por nuestra amistad, que es como el buen vino: mejora con los años. ¡Salud! 🥂"
    },
    {
        title: "🚀 Despegue Inmediato",
        message: "Abróchate el cinturón, porque este año vamos a conquistar nuevas metas juntos. 🚀"
    },
    {
        title: "🌟 Eres Luz",
        message: "Gracias por iluminar mis días incluso a la distancia. ¡Sigue brillando, amiga! 🌟"
    },
    {
        title: "💎 Tesoro Único",
        message: "Los amigos de verdad son difíciles de encontrar, como diamantes. Tú eres mi joya más preciada. 💎"
    },
    {
        title: "🍀 Suerte Infinita",
        message: "Te envío toda la suerte del mundo para cada proyecto que emprendas. ¡Tú puedes con todo! 🍀"
    },
    {
        title: "🎶 Melodía Perfecta",
        message: "Que tu vida tenga siempre el ritmo perfecto y la armonía que te mereces. 🎶"
    }
];

// Variable para controlar repeticiones
let availableSurprises = [...Array(surprises.length).keys()];

// Función para abrir sorpresa sin repetir
window.openSurprise = function () {
    const modal = document.getElementById('surpriseModal');
    const content = document.getElementById('surpriseContent');

    // Si se acabaron, reiniciar lista
    if (availableSurprises.length === 0) {
        availableSurprises = [...Array(surprises.length).keys()];
    }

    // Elegir un índice aleatorio de los disponibles
    const randomIndex = Math.floor(Math.random() * availableSurprises.length);
    const surpriseIndex = availableSurprises[randomIndex];

    // Eliminarlo de disponibles para no repetir
    availableSurprises.splice(randomIndex, 1);

    const surprise = surprises[surpriseIndex];

    // Separar icono del título
    const firstSpaceIndex = surprise.title.indexOf(' ');
    const icon = firstSpaceIndex !== -1 ? surprise.title.substring(0, firstSpaceIndex) : '🎁';
    const textTitle = firstSpaceIndex !== -1 ? surprise.title.substring(firstSpaceIndex + 1) : surprise.title;

    let html = `
        <div class="surprise-content-wrapper">
            <div class="surprise-icon-large">${icon}</div>
            <h2 class="surprise-title">${textTitle}</h2>
            <p class="surprise-text">${surprise.message}</p>
    `;

    if (surprise.image) {
        html += `<img src="${surprise.image}" alt="Sorpresa" style="max-width: 100%; border-radius: 10px; margin-top: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.3);">`;
    }

    // Agregar botón de cerrar personalizado
    html += `
        <button class="surprise-close-btn" onclick="closeSurpriseWithEffect()">Activar ✨</button>
    </div>`;

    content.innerHTML = html;
    modal.classList.add('active');

    // Ejecutar acción si existe (después de pequeña pausa visual)
    if (surprise.action) setTimeout(surprise.action, 300);
};

// Función para cerrar con efectos variados
window.closeSurpriseWithEffect = function () {
    const modal = document.getElementById('surpriseModal');
    modal.classList.remove('active');

    // Elegir un efecto aleatorio
    const effects = [
        triggerHearts,
        triggerStars,
        triggerFlowers,
        triggerMiniFireworks
    ];

    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    randomEffect();
};

function triggerHearts() {
    const duration = 2000;
    const end = Date.now() + duration;

    (function frame() {
        const left = end - Date.now();
        if (left <= 0) return;

        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff69b4', '#ff1493', '#ffffff'],
            shapes: ['circle'], // Simular corazones con círculos rosas
            scalar: 2
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff69b4', '#ff1493', '#ffffff'],
            shapes: ['circle'],
            scalar: 2
        });

        requestAnimationFrame(frame);
    }());
}

function triggerStars() {
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const particleCount = 50;

    // Stars from center
    confetti({
        ...defaults,
        particleCount,
        origin: { y: 0.5, x: 0.5 },
        shapes: ['star'],
        colors: ['#FFD700', '#FFA500', '#FFFFFF', '#FFFF00']
    });
}

function triggerFlowers() {
    const end = Date.now() + 2000;

    (function frame() {
        if (Date.now() > end) return;

        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'],
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'],
        });

        requestAnimationFrame(frame);
    }());
}

function triggerMiniFireworks() {
    const duration = 1500;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 20, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 20 * (timeLeft / duration);

        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}
