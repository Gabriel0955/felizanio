<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="theme-color" content="#667eea">
    <meta name="description"
        content="Carta digital animada de Año Nuevo 2026 - Un mensaje especial lleno de deseos, fuegos artificiales y celebración">
    <meta name="keywords" content="Año Nuevo 2026, felicitaciones, carta digital, fuegos artificiales, celebración">
    <meta name="author" content="Tu nombre">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="¡Feliz Año Nuevo 2026! 🎆">
    <meta property="og:description" content="Un mensaje especial de Año Nuevo lleno de deseos y celebración">
    <meta property="og:image" content="https://tu-dominio.com/preview.jpg">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="¡Feliz Año Nuevo 2026! 🎆">
    <meta name="twitter:description" content="Un mensaje especial de Año Nuevo lleno de deseos y celebración">

    <title>¡Feliz Año Nuevo 2026! 🎆</title>

    <!-- Preconnect para optimizar carga -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdnjs.cloudflare.com">
    <link rel="preconnect" href="https://cdn.jsdelivr.net">

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;900&family=Pacifico&display=swap"
        rel="stylesheet">

    <!-- Libraries -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">

    <!-- Custom Styles -->
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <!-- Pantalla de cuenta regresiva inicial -->
    <div class="countdown-screen" id="countdownScreen">
        <div class="countdown-title">🎆 Año Nuevo 2026 🎆</div>
        <div class="countdown-display">
            <div class="countdown-time" id="mainCountdown" role="timer" aria-live="polite">
                <div class="time-unit">
                    <div class="time-number" id="days" aria-label="Días">00</div>
                    <div class="time-label">Días</div>
                </div>
                <div class="time-unit">
                    <div class="time-number" id="hours" aria-label="Horas">00</div>
                    <div class="time-label">Horas</div>
                </div>
                <div class="time-unit">
                    <div class="time-number" id="minutes" aria-label="Minutos">00</div>
                    <div class="time-label">Minutos</div>
                </div>
                <div class="time-unit">
                    <div class="time-number" id="seconds" aria-label="Segundos">00</div>
                    <div class="time-label">Segundos</div>
                </div>
            </div>
        </div>
        <button class="skip-button" onclick="revealSurprise()" aria-label="No puedo esperar, revelar contenido ahora">
            ✨ ¡No Puedo Esperar! ✨
        </button>
        <div class="hint-text">O espera a que llegue la medianoche... 🌙</div>
    </div>

    <!-- Contenido principal (oculto inicialmente) -->
    <div class="main-content" id="mainContent">
        <div class="stars" id="stars" aria-hidden="true"></div>

        <!-- Botón de sorpresas flotante -->
        <div class="surprise-box" onclick="openSurprise()" title="¡Haz clic para una sorpresa!"
            aria-label="Botón de sorpresas" role="button" tabindex="0">
            🎁
        </div>

        <!-- Modal de sorpresas -->
        <div class="modal" id="surpriseModal" role="dialog" aria-modal="true" aria-labelledby="surprise-title">
            <div class="modal-content">
                <span class="close-modal" onclick="closeModal()" role="button" aria-label="Cerrar"
                    tabindex="0">&times;</span>
                <div id="surpriseContent"></div>
            </div>
        </div>

        <div class="container">
            <main class="card" role="main">
                <h1>¡Feliz Año Nuevo!</h1>
                <div class="year" aria-label="Año 2026">2026</div>

                <div class="countdown" id="countdown" role="timer" aria-live="polite"></div>

                <div class="message">
                    <?php
                    $messages = [
                        "Amiga, eres una de las personas más importantes en mi vida. Que este 2026 nos traiga más risas, aventuras y momentos inolvidables. ¡Te deseo lo mejor!",
                        "Gracias por ser mi confidente y por estar siempre ahí. Que este año te llene de toda la felicidad que mereces. ¡Estoy orgulloso de ti!",
                        "Que el 2026 sea el año en que todos tus sueños se hagan realidad. Siempre estaré aquí para apoyarte en todo. ¡Eres increíble!",
                        "Por más aventuras, locuras y momentos que solo nosotros entendemos. Brindo por nuestra amistad. ¡Este será un gran año!",
                        "Eres una persona muy especial para mí. Que este nuevo año te traiga todo lo que deseas y mereces. ¡Gracias por tu amistad!"
                    ];

                    $randomMessage = $messages[array_rand($messages)];
                    echo "<p>$randomMessage</p>";

                    $wishes = [
                        "💪 Salud, energía y bienestar",
                        "🌟 Que cumplas todos tus sueños",
                        "✨ Paz mental y equilibrio",
                        "🎯 Éxito en todo lo que emprendas",
                        "😊 Sonrisas y felicidad genuina",
                        "🚀 Crecimiento personal y profesional",
                        "🌈 Días llenos de sorpresas positivas",
                        "🎉 Aventuras juntos que recordemos siempre",
                        "💫 Que brilles y alcances tus metas",
                        "🤝 Una amistad que siga siendo eterna"
                    ];

                    echo "<p style='margin-top: 20px;'><strong>Mis deseos para ti:</strong></p>";
                    echo "<ul style='list-style: none; padding: 0; text-align: left; display: inline-block;'>";
                    foreach ($wishes as $wish) {
                        echo "<li style='margin: 8px 0; font-size: 0.95em;'>$wish</li>";
                    }
                    echo "</ul>";
                    ?>
                </div>

                <div class="button-container">
                    <button onclick="launchFireworks()" aria-label="Lanzar fuegos artificiales">
                        <span style="font-size: 1.5em; margin-right: 8px; position: relative; z-index: 1;">🎆</span>
                        <span style="position: relative; z-index: 1;">Fuegos Artificiales</span>
                        <span style="font-size: 1.5em; margin-left: 8px; position: relative; z-index: 1;">🎆</span>
                    </button>
                </div>

                <div class="signature">
                    Con todo mi cariño 💙,<br>
                    Tu mejor amigo 🤝<br>
                    <?php echo date('Y'); ?>
                </div>
            </main>
        </div>
    </div>
    <!-- Fin del contenido principal -->

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
    <script src="script.js"></script>
</body>

</html>