// ConfiguraciÃ³n global
const CONFIG = {
    NEW_YEAR_DATE: '2026-01-01T00:00:00',
    COLORS: {
        fireworks: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8800'],
        confetti: ['#ff6b9d', '#ff8c42', '#ffd700', '#667eea'],
        diamonds: ['#E0E0E0', '#C0C0C0', '#A8A8A8', '#D3D3D3', '#B8B8B8'],
        stars: ['#FFD700', '#FFA500', '#FFFF00']
    }
};

// Estado global
let state = {
    surpriseIndex: 0,
    musicPlaying: false,
    touchStartTime: 0,
    countdownRevealed: false,
    lastSparkleTime: 0,
    isFullscreen: false,
    audioEnabled: false,
    audio: null
};

// InicializaciÃ³n
// InicializaciÃ³n
document.addEventListener('DOMContentLoaded', () => {
    initStars();
    initCountdown();
    initBackgroundFireworks();
    initEventListeners();
    initControlButtons();
    setTimeout(initMessageRotationAnimated, 1000); // Iniciar rotaciÃ³n de mensajes con animaciÃ³n
});

// Crear estrellas de fondo
function initStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;

    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

// Inicializar cuenta regresiva
function initCountdown() {
    updateMainCountdown();
    setInterval(updateMainCountdown, 1000);

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Inicializar fuegos artificiales de fondo
function initBackgroundFireworks() {
    // En mÃ³viles, reducir frecuencia o desactivar para ahorrar baterÃ­a/GPU
    const isMobile = window.innerWidth < 768;
    if (isMobile) return; // Desactivar en mÃ³viles para mejor rendimiento

    setInterval(() => {
        if (!state.countdownRevealed) {
            createInitialFirework();
        }
    }, 4000); // 4s en desktop
}

// Inicializar event listeners
function initEventListeners() {
    // Cerrar modal al hacer clic fuera
    document.addEventListener('click', (e) => {
        const modal = document.getElementById('surpriseModal');
        if (e.target === modal) {
            closeModal();
        }
    });

    // Efecto de chispas con el cursor (solo desktop)
    if (window.innerWidth >= 768) {
        document.addEventListener('mousemove', handleMouseMove);
    }

    // Touch feedback para mÃ³viles
    document.addEventListener('touchstart', handleTouchStart);

    // Auto-lanzar fuegos artificiales al cargar
    window.addEventListener('load', handlePageLoad);

    // Prevenir zoom en doble tap en iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// Inicializar botones de control
function initControlButtons() {
    const container = document.querySelector('.container');
    if (!container) return;

    const controlsHtml = `
        <div class="control-buttons">
            <button class="control-btn" onclick="toggleFullscreen()" title="Pantalla completa" aria-label="Pantalla completa">
                <span id="fullscreen-icon">â›¶</span>
            </button>
            <button class="control-btn" onclick="shareCard()" title="Compartir" aria-label="Compartir">
                <span>ðŸ”—</span>
            </button>
            <button class="control-btn" onclick="toggleAudio()" title="MÃºsica" aria-label="MÃºsica">
                <span id="audio-icon">ðŸ”‡</span>
            </button>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', controlsHtml);
}

// Actualizar cuenta regresiva principal
function updateMainCountdown() {
    const now = new Date();
    const newYear = new Date(CONFIG.NEW_YEAR_DATE);
    const diff = newYear - now;

    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };

        if (elements.days) elements.days.textContent = String(days).padStart(2, '0');
        if (elements.hours) elements.hours.textContent = String(hours).padStart(2, '0');
        if (elements.minutes) elements.minutes.textContent = String(minutes).padStart(2, '0');
        if (elements.seconds) elements.seconds.textContent = String(seconds).padStart(2, '0');
    } else {
        if (!state.countdownRevealed) {
            revealSurprise();
        }
    }
}

// Actualizar countdown en la tarjeta
function updateCountdown() {
    const now = new Date();
    const newYear = new Date(CONFIG.NEW_YEAR_DATE);
    const diff = newYear - now;
    const countdownEl = document.getElementById('countdown');

    if (!countdownEl) return;

    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        countdownEl.innerHTML = `â° Faltan: ${days}d ${hours}h ${minutes}m ${seconds}s para el 2026`;
    } else {
        countdownEl.innerHTML = 'ðŸŽ‰ Â¡Ya es 2026!';
        if (!state.musicPlaying) {
            launchMegaCelebration();
            state.musicPlaying = true;
        }
    }
}

// Revelar sorpresa
function revealSurprise() {
    const screen = document.getElementById('countdownScreen');
    const content = document.getElementById('mainContent');

    if (!screen || !content) return;

    // VibraciÃ³n
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 100]);
    }

    // Fuegos artificiales de transiciÃ³n
    for (let i = 0; i < 30; i++) {
        setTimeout(() => createInitialFirework(), i * 50);
    }

    // Revelar contenido despuÃ©s de la animaciÃ³n
    setTimeout(() => {
        screen.classList.add('hidden');
        content.classList.add('visible');
        state.countdownRevealed = true;

        // Lanzar celebraciÃ³n
        setTimeout(() => {
            launchFireworks();
            createSparkles(20);
        }, 500);
    }, 1500);
}

// Crear fuegos artificiales iniciales
function createInitialFirework() {
    const isMobile = window.innerWidth < 768;
    // Si llegamos aquÃ­ en mÃ³vil (por click manual), usar menos partÃ­culas

    const colors = ['#ffffff', '#ffd700', '#ff69b4', '#00ffff', '#ff6347'];
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const particleCount = isMobile ? 8 : 20;

    for (let i = 0; i < particleCount; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework-initial';
        firework.style.left = x + 'px';
        firework.style.top = y + 'px';
        firework.style.background = colors[Math.floor(Math.random() * colors.length)];

        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = (isMobile ? 20 : 40) + Math.random() * (isMobile ? 20 : 40);
        const xVel = Math.cos(angle) * velocity;
        const yVel = Math.sin(angle) * velocity;

        firework.style.setProperty('--x', xVel + 'px');
        firework.style.setProperty('--y', yVel + 'px');

        document.body.appendChild(firework);
        setTimeout(() => firework.remove(), 2000);
    }
}

// Abrir modal de sorpresas
function openSurprise() {
    const modal = document.getElementById('surpriseModal');
    const content = document.getElementById('surpriseContent');

    if (!modal || !content) return;

    const surprise = surprises[state.surpriseIndex % surprises.length];
    state.surpriseIndex++;

    const isMobile = window.innerWidth < 768;

    // VibraciÃ³n en mÃ³viles
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
    }

    content.innerHTML = generateSurpriseHTML(surprise, isMobile);
    modal.style.display = 'flex';
    createSparkles(isMobile ? 10 : 20);

    // Efecto de confetti al abrir
    confetti({
        particleCount: isMobile ? 30 : 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: CONFIG.COLORS.confetti,
        zIndex: 9999
    });
}

// Generar HTML de sorpresa
function generateSurpriseHTML(surprise, isMobile) {
    const idx = state.surpriseIndex - 1;
    return `
        <div style="
            font-size: ${isMobile ? '3.5em' : '5em'}; 
            margin-bottom: ${isMobile ? '10px' : '15px'}; 
            animation: bounce 1s infinite, rotate 3s ease-in-out infinite;
            filter: drop-shadow(0 5px 15px rgba(255, 255, 255, 0.5));
        ">${surprise.title.split(' ')[0]}</div>
        
        <h2 style="
            font-family: 'Poppins', sans-serif;
            color: #ffffff; 
            margin-bottom: ${isMobile ? '15px' : '25px'}; 
            font-size: ${isMobile ? '1.4em' : '2em'}; 
            font-weight: 700;
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.8), 0 4px 15px rgba(0, 0, 0, 0.5);
            animation: textGlow 2s ease-in-out infinite;
            padding: 0 10px;
            line-height: 1.3;
        ">${surprise.title}</h2>
        
        <div style="
            background: rgba(255, 255, 255, 0.25); 
            backdrop-filter: blur(15px); 
            -webkit-backdrop-filter: blur(15px);
            border-radius: ${isMobile ? '20px' : '25px'}; 
            padding: ${isMobile ? '20px 18px' : '30px 25px'}; 
            margin: ${isMobile ? '15px 0' : '25px 0'}; 
            border: 2px solid rgba(255, 255, 255, 0.4);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1);
            animation: slideIn 0.5s ease-out;
            position: relative;
            overflow: hidden;
        ">
            <div style="
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
                transform: rotate(45deg);
                animation: shine 3s infinite;
            "></div>
            <p style="
                font-family: 'Poppins', sans-serif;
                font-size: ${isMobile ? '1.05em' : '1.3em'}; 
                line-height: ${isMobile ? '1.6' : '1.9'}; 
                color: #ffffff; 
                text-shadow: 0 3px 15px rgba(0, 0, 0, 0.6);
                font-weight: 500;
                position: relative;
                z-index: 1;
            ">${surprise.message}</p>
        </div>
        
        <button onclick="closeModal(); surprises[${idx % surprises.length}].action();" 
                style="
                margin-top: ${isMobile ? '15px' : '25px'}; 
                padding: ${isMobile ? '16px 35px' : '22px 55px'}; 
                border: 3px solid rgba(255, 255, 255, 0.5); 
                background: linear-gradient(135deg, #ff6b9d, #ff8c42, #ffd700); 
                background-size: 200% 200%;
                color: white; 
                border-radius: 50px; 
                cursor: pointer; 
                font-size: ${isMobile ? '1.1em' : '1.4em'};
                font-weight: 800; 
                box-shadow: 0 15px 40px rgba(255, 107, 157, 0.6), 0 0 30px rgba(255, 215, 0, 0.4);
                touch-action: manipulation; 
                transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                text-transform: uppercase; 
                letter-spacing: ${isMobile ? '1px' : '2px'}; 
                font-family: 'Poppins', sans-serif;
                animation: buttonGradient 3s ease infinite, pulse 2s ease-in-out infinite;
                position: relative;
                overflow: hidden;
                width: ${isMobile ? '100%' : 'auto'};
                max-width: ${isMobile ? '100%' : 'none'};
            "
                onmouseover="
                    this.style.transform='translateY(-8px) scale(1.08)'; 
                    this.style.boxShadow='0 20px 50px rgba(255, 107, 157, 0.8), 0 0 50px rgba(255, 215, 0, 0.6)';
                "
                onmouseout="
                    this.style.transform='translateY(0) scale(1)'; 
                    this.style.boxShadow='0 15px 40px rgba(255, 107, 157, 0.6), 0 0 30px rgba(255, 215, 0, 0.4)';
                "
                ontouchstart="
                    this.style.transform='scale(0.95)'; 
                "
                ontouchend="
                    this.style.transform='scale(1)';
                ">
            <span style="position: relative; z-index: 1;">${isMobile ? 'âœ¨ Â¡ACTIVAR! âœ¨' : 'âœ¨ Â¡ACTIVAR MAGIA! âœ¨'}</span>
        </button>
    `;
}

// Cerrar modal
function closeModal() {
    const modal = document.getElementById('surpriseModal');
    if (modal) modal.style.display = 'none';
}

// Crear chispitas mÃ¡gicas
function createSparkles(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * window.innerWidth + 'px';
            sparkle.style.top = Math.random() * window.innerHeight + 'px';
            sparkle.style.animation = 'twinkle 1s ease-out forwards';
            document.body.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 1000);
        }, i * 100);
    }
}

// Crear notas musicales flotantes
function createMusicNotes() {
    const notes = ['ðŸŽµ', 'ðŸŽ¶', 'ðŸŽ¼', 'ðŸŽ¤', 'ðŸŽ§'];
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const note = document.createElement('div');
            note.className = 'music-note';
            note.textContent = notes[Math.floor(Math.random() * notes.length)];
            note.style.left = Math.random() * window.innerWidth + 'px';
            note.style.bottom = '0px';
            document.body.appendChild(note);

            setTimeout(() => note.remove(), 3000);
        }, i * 150);
    }
}

// Lanzar fuegos artificiales
function launchFireworks() {
    const isMobile = window.innerWidth < 768;

    // VibraciÃ³n en mÃ³viles
    if (navigator.vibrate) {
        navigator.vibrate([50, 100, 50, 100, 50]);
    }

    const duration = isMobile ? 3000 : 5000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        // Reducir significativamente las partÃ­culas en mÃ³vil
        const particleCount = (isMobile ? 15 : 50) * (timeLeft / duration);

        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        }));
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        }));
    }, isMobile ? 400 : 250); // Menos frecuencia en mÃ³vil

    // Fuegos artificiales adicionales
    const extraBursts = isMobile ? 3 : 8;
    for (let i = 0; i < extraBursts; i++) {
        setTimeout(() => {
            confetti({
                particleCount: isMobile ? 40 : 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: CONFIG.COLORS.fireworks,
                zIndex: 9999
            });
        }, i * (isMobile ? 800 : 400));
    }
}

// Mega celebraciÃ³n
function launchMegaCelebration() {
    const end = Date.now() + (10 * 1000);

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: CONFIG.COLORS.fireworks,
            zIndex: 9999
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: CONFIG.COLORS.fireworks,
            zIndex: 9999
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());

    createMusicNotes();
    setTimeout(() => {
        confetti({
            particleCount: 200,
            spread: 180,
            origin: { y: 0.6 },
            zIndex: 9999
        });
        alert("ðŸŽŠ Â¡FELIZ AÃ‘O NUEVO! ðŸŽŠ");
    }, 1000);
}

// Event handlers
function handleMouseMove(e) {
    const now = Date.now();
    if (now - state.lastSparkleTime > 200) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = e.pageX + 'px';
        sparkle.style.top = e.pageY + 'px';
        sparkle.style.animation = 'twinkle 0.5s ease-out forwards';
        document.body.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 500);
        state.lastSparkleTime = now;
    }
}

function handleTouchStart(e) {
    if (e.target.tagName === 'BUTTON' || e.target.closest('.surprise-box')) {
        if (navigator.vibrate) {
            navigator.vibrate(10);
        }
    }
}

function handlePageLoad() {
    setTimeout(() => {
        if (state.countdownRevealed) {
            launchFireworks();
            createSparkles(5);
        }
    }, 1000);

    // Sorpresa automÃ¡tica despuÃ©s de 5 segundos
    setTimeout(() => {
        if (state.surpriseIndex === 0) {
            const surpriseBox = document.querySelector('.surprise-box');
            if (surpriseBox) {
                surpriseBox.style.animation = 'float 0.5s ease-in-out 6';
            }
        }
    }, 5000);
}

// Nuevas funciones de control
function toggleFullscreen() {
    const icon = document.getElementById('fullscreen-icon');
    if (!icon) return;

    if (!state.isFullscreen) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
        icon.textContent = 'â›¶';
        state.isFullscreen = true;
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        icon.textContent = 'â›¶';
        state.isFullscreen = false;
    }
}

function shareCard() {
    const shareData = {
        title: 'Â¡Feliz AÃ±o Nuevo 2026!',
        text: 'Te deseo un increÃ­ble AÃ±o Nuevo 2026 lleno de alegrÃ­a y Ã©xito ðŸŽ†',
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData)
            .then(() => {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: CONFIG.COLORS.confetti,
                    zIndex: 9999
                });
            })
            .catch((err) => console.log('Error compartiendo:', err));
    } else {
        // Fallback: copiar al portapapeles
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                alert('Â¡Enlace copiado al portapapeles! ðŸ”—');
                confetti({
                    particleCount: 50,
                    spread: 60,
                    origin: { y: 0.8 },
                    colors: CONFIG.COLORS.confetti,
                    zIndex: 9999
                });
            })
            .catch(err => console.log('Error al copiar:', err));
    }
}

function toggleAudio() {
    const icon = document.getElementById('audio-icon');
    if (!icon) return;

    if (!state.audioEnabled) {
        // Crear y reproducir audio
        if (!state.audio) {
            // URL de mÃºsica festiva (usaremos un tono base64 simple)
            state.audio = new Audio();
            state.audio.loop = true;
            state.audio.volume = 0.3;
            // AquÃ­ podrÃ­as agregar una URL a un archivo de mÃºsica
        }

        state.audio.play().catch(err => {
            console.log('Error al reproducir audio:', err);
        });

        icon.textContent = 'ðŸ”Š';
        state.audioEnabled = true;
    } else {
        if (state.audio) {
            state.audio.pause();
        }
        icon.textContent = 'ðŸ”‡';
        state.audioEnabled = false;
    }
}

// RotaciÃ³n de Mensajes
const friendMessages = [
    "Aunque no hablemos a diario ni nos veamos siempre, sabes que mi cariÃ±o por ti sigue intacto. Â¡Que este 2026 sea increÃ­ble para ti, amiga!",
    "La verdadera amistad no se mide por la frecuencia, sino por la lealtad. Aunque estemos lejos o ocupados, siempre estÃ¡s en mis mejores deseos.",
    "No importa cuÃ¡nto tiempo pase sin vernos, nuestra conexiÃ³n sigue igual de fuerte. Gracias por ser esa amiga eterna. Â¡Feliz 2026!",
    "Pasa el tiempo, cambian las cosas, pero tenerte como mejor amiga es una certeza que no cambia. Brindo por nuestra amistad incondicional.",
    "Sabes que cuentas conmigo siempre, sin importar los dÃ­as o meses que pasen sin hablar. Â¡Te deseo un aÃ±o espectacular lleno de Ã©xitos!"
];

const friendWishes = [
    "ðŸ¤ Una amistad a prueba de tiempo",
    "ðŸŒŸ Que cumplas todos tus sueÃ±os",
    "âœ¨ Saber que siempre estamos ahÃ­",
    "ðŸ’« Reencuentros inolvidables",
    "ðŸ’ª Salud, energÃ­a y bienestar",
    "ðŸ˜Š Sonrisas y felicidad genuina",
    "ðŸŽ¯ Ã‰xito en tus proyectos personales",
    "ðŸŒˆ Que la distancia nunca nos separe",
    "ðŸš€ Crecimiento en todo lo que hagas",
    "ðŸ’™ Un aÃ±o lleno de bendiciones"
];

function initMessageRotation() {
    const messageEl = document.getElementById('randomMessage');
    const wishesList = document.getElementById('wishesList');

    // Si no existen los elementos, no hacer nada (protecciÃ³n)
    if (!messageEl) return;

    // Inicializar lista de deseos si estÃ¡ vacÃ­a (para index.php o primera carga)
    if (wishesList && wishesList.children.length === 0) {
        friendWishes.forEach(wish => {
            const li = document.createElement('li');
            li.style.margin = '8px 0';
            li.style.fontSize = '0.95em';
            li.textContent = wish;
            wishesList.appendChild(li);
        });

        // TambiÃ©n poner el aÃ±o si falta
        const yearEl = document.getElementById('currentYear');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    }

    // Iniciar rotaciÃ³n cada 6 segundos
    let msgIndex = 0;

    // FunciÃ³n para cambiar mensaje con fade
    const changeMessage = () => {
        // Fade out
        messageEl.style.transition = 'opacity 0.5s ease-in-out';
        messageEl.style.opacity = '0';

        setTimeout(() => {
            // Cambiar texto
            msgIndex = (msgIndex + 1) % friendMessages.length;
            messageEl.textContent = friendMessages[msgIndex];

            // Fade in
            messageEl.style.opacity = '1';
        }, 500);
    };

    // Establecer primer mensaje si estÃ¡ vacÃ­o (HTML estÃ¡tico)
    if (!messageEl.textContent.trim()) {
        messageEl.textContent = friendMessages[0];
    } else {
        // Si ya tiene texto (PHP), buscar cuÃ¡l es para seguir la secuencia
        const currentText = messageEl.textContent.trim();
        const foundIndex = friendMessages.indexOf(currentText);
        if (foundIndex !== -1) msgIndex = foundIndex;
    }

    setInterval(changeMessage, 15000); // Cambiar cada 6 segundos
}

// Array de sorpresas
const surprises = [
    {
        title: "ðŸŽ† Â¡ExplosiÃ³n de Fuegos Artificiales!",
        message: "Que tu aÃ±o explote de alegrÃ­a y color como estos fuegos artificiales ðŸŽ‡",
        action: () => {
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    confetti({
                        particleCount: 150,
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
        title: "ðŸ’Ž Â¡Diamantes Brillantes!",
        message: "Que brilles como un diamante y cada dÃ­a sea valioso como una joya ðŸ’Žâœ¨",
        action: () => {
            const end = Date.now() + 3000;
            (function frame() {
                confetti({
                    particleCount: 8,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0, y: 0 },
                    colors: CONFIG.COLORS.diamonds,
                    shapes: ['circle'],
                    scalar: 1.2,
                    gravity: 0.8,
                    zIndex: 9999
                });
                confetti({
                    particleCount: 8,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1, y: 0 },
                    colors: CONFIG.COLORS.diamonds,
                    shapes: ['circle'],
                    scalar: 1.2,
                    gravity: 0.8,
                    zIndex: 9999
                });
                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }
    },
    {
        title: "â­ Â¡Estrellas Doradas!",
        message: "Brilla con luz propia este 2026, Â¡eres una estrella! ðŸŒŸðŸ’«",
        action: () => {
            confetti({
                particleCount: 100,
                spread: 160,
                origin: { y: 0.6 },
                colors: CONFIG.COLORS.stars,
                shapes: ['star'],
                scalar: 1.5,
                zIndex: 9999
            });
            setTimeout(() => {
                confetti({
                    particleCount: 100,
                    spread: 160,
                    origin: { y: 0.6 },
                    colors: CONFIG.COLORS.stars,
                    shapes: ['star'],
                    scalar: 1.5,
                    zIndex: 9999
                });
            }, 500);
        }
    },
    {
        title: "ðŸŽŠ Â¡Fiesta Total!",
        message: "Â¡Que nunca falten motivos para celebrar y sonreÃ­r! ðŸ¥³ðŸŽ‰",
        action: () => {
            confetti({
                particleCount: 200,
                angle: 90,
                spread: 360,
                origin: { x: 0.5, y: 0.5 },
                zIndex: 9999
            });
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.8 },
                        zIndex: 9999
                    });
                }, i * 300);
            }
        }
    },
    {
        title: "ðŸ’¥ Â¡ExplosiÃ³n Masiva!",
        message: "Que tus sueÃ±os exploten en realidad durante este aÃ±o nuevo ðŸ’«âœ¨",
        action: () => {
            const count = 200;
            const defaults = {
                origin: { y: 0.7 },
                zIndex: 9999
            };

            function fire(particleRatio, opts) {
                confetti(Object.assign({}, defaults, opts, {
                    particleCount: Math.floor(count * particleRatio)
                }));
            }

            fire(0.25, { spread: 26, startVelocity: 55 });
            fire(0.2, { spread: 60 });
            fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
            fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
            fire(0.1, { spread: 120, startVelocity: 45 });
        }
    },
    {
        title: "ðŸŽ‡ Â¡Cascada de Fuegos!",
        message: "Que las bendiciones caigan sobre ti como cascada todo el aÃ±o ðŸ™ðŸ’™",
        action: () => {
            const duration = 4000;
            const animationEnd = Date.now() + duration;

            const interval = setInterval(() => {
                const timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) return clearInterval(interval);

                confetti({
                    particleCount: 3,
                    angle: 90,
                    spread: 45,
                    origin: { x: Math.random(), y: 0 },
                    colors: CONFIG.COLORS.fireworks.slice(0, 5),
                    gravity: 1.5,
                    zIndex: 9999
                });
            }, 50);
        }
    },
    {
        title: "âœ¨ Â¡Espiral MÃ¡gica!",
        message: "La vida da vueltas, Â¡disfruta cada momento mÃ¡gico! ðŸŒ€ðŸ’–",
        action: () => {
            for (let i = 0; i < 30; i++) {
                setTimeout(() => {
                    const angle = (i * 12) % 360;
                    confetti({
                        particleCount: 30,
                        angle: angle,
                        spread: 30,
                        origin: { x: 0.5, y: 0.5 },
                        colors: ['#ff0088', '#00ffff', '#ffff00', '#ff00ff'],
                        zIndex: 9999
                    });
                }, i * 100);
            }
        }
    },
    {
        title: "ðŸŒŸ Â¡ExplosiÃ³n de Colores!",
        message: "Que tu vida se llene de colores, aventuras y momentos inolvidables ðŸŽ¨ðŸŒˆ",
        action: () => {
            const colors = [
                ['#ff0000', '#ff4444'],
                ['#00ff00', '#44ff44'],
                ['#0000ff', '#4444ff'],
                ['#ffff00', '#ffff44'],
                ['#ff00ff', '#ff44ff']
            ];

            colors.forEach((colorSet, index) => {
                setTimeout(() => {
                    confetti({
                        particleCount: 100,
                        spread: 120,
                        origin: { y: 0.6 },
                        colors: colorSet,
                        zIndex: 9999
                    });
                }, index * 400);
            });
        }
    }
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
    const intervalTime = 6000;
    let startTime = Date.now();
    let progressBar = document.getElementById('msgProgressBar');

    const changeMessage = () => {
        messageEl.style.transition = 'opacity 0.5s ease-in-out';
        messageEl.style.opacity = '0';
        setTimeout(() => {
            msgIndex = (msgIndex + 1) % friendMessages.length;
            messageEl.textContent = friendMessages[msgIndex];
            messageEl.style.opacity = '1';
            if (progressBar) progressBar.style.width = '0%';
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
