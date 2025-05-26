<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Telegram-MultiDevice User Bot</title>
    <style>
        /* Basic Reset */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f7f6;
            scroll-behavior: smooth;
        }

        .container {
            width: 90%;
            max-width: 1100px;
            margin: 0 auto;
            padding: 20px 0;
        }

        /* Header & Navigation */
        header {
            background-color: #2c3e50;
            color: #ecf0f1;
            padding: 1rem 0;
            position: sticky;
            top: 0;
            z-index: 1000;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        header .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        header h1 {
            font-size: 1.8rem;
            margin: 0;
        }

        nav ul {
            list-style: none;
            display: flex;
        }

        nav ul li {
            margin-left: 20px;
        }

        nav ul li a {
            color: #ecf0f1;
            text-decoration: none;
            font-weight: bold;
            transition: color 0.3s ease;
        }

        nav ul li a:hover {
            color: #3498db;
        }

        /* Hero Section */
        .hero {
            background: #3498db;
            color: white;
            padding: 60px 20px;
            text-align: center;
        }

        .hero h2 {
            font-size: 2.8rem;
            margin-bottom: 20px;
        }

        .hero p {
            font-size: 1.2rem;
            margin-bottom: 30px;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
        }

        .hero .cta-buttons {
            margin-top: 20px;
        }

        .btn {
            display: inline-block;
            padding: 12px 25px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            transition: background-color 0.3s ease, transform 0.2s ease;
            margin: 5px;
            border: none;
            cursor: pointer;
        }

        .btn-primary {
            background-color: #2ecc71;
            color: white;
        }

        .btn-primary:hover {
            background-color: #27ae60;
            transform: translateY(-2px);
        }

        .btn-secondary {
            background-color: #ecf0f1;
            color: #2c3e50;
        }

        .btn-secondary:hover {
            background-color: #bdc3c7;
            transform: translateY(-2px);
        }

        /* Sections */
        section {
            padding: 60px 0;
        }

        section h3 {
            text-align: center;
            font-size: 2.2rem;
            margin-bottom: 40px;
            color: #2c3e50;
        }

        .section-bg-light {
            background-color: #ffffff;
        }

        .section-bg-dark {
            background-color: #eef1f0;
        }

        /* Features Section */
        #features .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            text-align: center;
        }

        .feature-item {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .feature-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.12);
        }

        .feature-item h4 {
            font-size: 1.5rem;
            color: #3498db;
            margin-bottom: 15px;
        }

        /* Setup & Deployment Section */
        .setup-steps, .deployment-options {
            max-width: 800px;
            margin: 0 auto;
        }

        .setup-steps h4, .deployment-options h4 {
            font-size: 1.5rem;
            color: #3498db;
            margin-top: 30px;
            margin-bottom: 15px;
        }

        .setup-steps ul {
            list-style: decimal;
            margin-left: 20px;
        }
        .setup-steps ul li, .setup-steps p {
            margin-bottom: 10px;
        }

        .code-block {
            background-color: #2c3e50;
            color: #ecf0f1;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            font-family: "Courier New", Courier, monospace;
            font-size: 0.9rem;
            margin: 15px 0;
        }

        .deployment-options .btn {
            margin-right: 10px;
            margin-bottom: 10px;
        }

        /* Usage Section */
        #usage p, #usage ul {
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 15px;
        }
        #usage ul {
            list-style: disc;
            padding-left: 20px;
        }

        /* Contact & Footer */
        #contact {
            text-align: center;
        }

        footer {
            background-color: #2c3e50;
            color: #ecf0f1;
            text-align: center;
            padding: 20px 0;
        }

        footer p {
            margin-bottom: 10px;
        }

        footer a {
            color: #3498db;
            text-decoration: none;
        }
        footer a:hover {
            text-decoration: underline;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            header .container {
                flex-direction: column;
            }
            header h1 {
                margin-bottom: 10px;
            }
            nav ul {
                flex-direction: column;
                align-items: center;
                width: 100%;
            }
            nav ul li {
                margin: 10px 0;
            }
            .hero h2 {
                font-size: 2.2rem;
            }
            .hero p {
                font-size: 1rem;
            }
            section h3 {
                font-size: 1.8rem;
            }
        }

        /* Hamburger Menu for Mobile */
        .menu-toggle {
            display: none; /* Hidden by default */
            background: none;
            border: none;
            color: #ecf0f1;
            font-size: 1.5rem;
            cursor: pointer;
        }

        @media (max-width: 768px) {
            nav ul {
                display: none; /* Hide nav links by default on mobile */
                flex-direction: column;
                width: 100%;
                background-color: #34495e; /* Slightly different background for dropdown */
                position: absolute;
                top: 70px; /* Adjust based on header height */
                left: 0;
                padding: 10px 0;
            }

            nav ul.active {
                display: flex; /* Show when active */
            }

            nav ul li {
                margin: 10px 0;
                text-align: center;
            }

            .menu-toggle {
                display: block; /* Show hamburger icon on mobile */
            }
        }

    </style>
</head>
<body>

    <header>
        <div class="container">
            <h1>Telegram Bot</h1>
            <button class="menu-toggle" id="menuToggle" aria-label="Toggle navigation">☰</button>
            <nav>
                <ul id="navLinks">
                    <li><a href="#hero">Home</a></li>
                    <li><a href="#features">Features</a></li>
                    <li><a href="#setup">Setup</a></li>
                    <li><a href="#deploy">Deploy</a></li>
                    <li><a href="#usage">Usage</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <section id="hero" class="hero">
            <div class="container">
                <h2>Meet Your Advanced Telegram Multi-Device Bot</h2>
                <p>Automate tasks, respond to commands, and integrate with external services. Gifted-Md offers a robust and interactive experience for your Telegram account.</p>
                <p><strong>Note:</strong> You can test out a <a href="#" class="btn btn-secondary" style="padding: 5px 10px; background-color: rgba(255,255,255,0.2); color:white;">DEMO VERSION</a> for 🆓!</p>
                <div class="cta-buttons">
                    <a href="https://github.com/login?return_to=https%3A%2F%2Fgithub.com%2Fmauricegift%2Ftelegram-bot%2Ffork" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Fork on GitHub</a>
                    <a href="#setup" class="btn btn-secondary">Get Started</a>
                </div>
            </div>
        </section>

        <section id="features" class="section-bg-light">
            <div class="container">
                <h3>Core Features</h3>
                <div class="features-grid">
                    <div class="feature-item">
                        <h4>Respond to Commands</h4>
                        <p>The bot listens and intelligently responds to a wide array of user-defined commands, making interactions seamless.</p>
                    </div>
                    <div class="feature-item">
                        <h4>External Integrations</h4>
                        <p>Connect the bot with various external services and APIs to extend its functionality and bring more power to your chat.</p>
                    </div>
                    <div class="feature-item">
                        <h4>Interactive UI</h4>
                        <p>Provides an intuitive and user-friendly interface, ensuring ease of use for all users, regardless of technical skill.</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="setup" class="section-bg-dark">
            <div class="container">
                <h3>Setup Guide</h3>
                <div class="setup-steps">
                    <h4>Prerequisites</h4>
                    <p>Before you begin, ensure you have the following:</p>
                    <ul>
                        <li>A Telegram account.</li>
                        <li>Your Telegram Bot Token.</li>
                        <li>Your Telegram Bot User ID (UID).</li>
                        <li>Need help? <a href="https://github.com/mauricegift/telegram-bot/blob/main/gift/bot-token-and-uid.md" target="_blank" rel="noopener noreferrer">Here's how to get your BOT TOKEN and BOT UID</a>.</li>
                    </ul>

                    <h4>Configuration Steps</h4>
                    <ol>
                        <li><strong>Fork the Repository:</strong> First, you need to <a href="https://github.com/login?return_to=https%3A%2F%2Fgithub.com%2Fmauricegift%2Ftelegram-bot%2Ffork" class="btn btn-primary" style="padding: 5px 10px;" target="_blank" rel="noopener noreferrer">Fork The Repo</a> to get your own editable version.</li>
                        <li>
                            <strong>Configure Bot Settings:</strong>
                            <p>Navigate to the `set.js` file in your forked repository. Add your bot token, bot user ID, and other settings as shown below:</p>
                            <div class="code-block">
                                <pre>
"ownerId": "YOUR_BOT_OWNER_USER_ID",
"botToken": "YOUR_BOT_TOKEN_HERE"
// ... other settings
                                </pre>
                            </div>
                            <p>Ensure you replace the placeholder values with your actual credentials.</p>
                        </li>
                    </ol>
                </div>
            </div>
        </section>

        <section id="deploy" class="section-bg-light">
            <div class="container">
                <h3>Deployment Options</h3>
                <div class="deployment-options" style="text-align: center;">
                    <p>Once configured, you can deploy your bot on various platforms. Here are a couple of popular choices:</p>
                    <a href="https://github.com/mauricegift/telegram-bot/blob/main/gift/heroku.md" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Deploy on Heroku</a>
                    <a href="https://dashboard.render.com/new" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Deploy on Render</a>
                    <p style="margin-top: 20px;">For other platforms, please follow their specific deployment instructions. The author primarily uses Heroku.</p>
                </div>
            </div>
        </section>

        <section id="usage" class="section-bg-dark">
            <div class="container">
                <h3>How to Use Your Bot</h3>
                <p>Interact with your bot by sending commands and messages directly in Telegram. The bot will respond based on its configured features and functionality.</p>
                <h4>Example Commands:</h4>
                <ul>
                    <li><code>/menu</code> or <code>/start</code> - Displays a list of available commands and their descriptions.</li>
                    <li>Many other commands are available! Explore them by interacting with your bot.</li>
                </ul>
                <h4>Menu Style:</h4>
                <p>The bot features an intuitive menu system. When you use commands like <code>/menu</code>, it will present options clearly, often using interactive buttons or well-formatted text lists for easy navigation through its capabilities.</p>
                <p style="margin-top: 20px; font-style: italic;">New commands and features are added regularly. Remember to sync your fork to stay updated with the latest improvements!</p>
            </div>
        </section>

        <section id="contact" class="section-bg-light">
            <div class="container">
                <h3>Issues or Questions?</h3>
                <p>If you encounter any problems or have questions, feel free to reach out.</p>
                <a href="https://t.me/mauricegift" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Contact Owner</a>
            </div>
        </section>
    </main>

    <footer>
        <div class="container">
            <p>&copy; 𝟮𝟬𝟮𝟰-2025 𝗚𝗜𝗙𝗧𝗘𝗗 𝗧𝗘𝗖𝗛. All rights reserved.</p>
            <p>Check out my <a href="https://github.com/mauricegift/gifted-md" target="_blank" rel="noopener noreferrer">WhatsApp Bot Project</a>.</p>
        </div>
    </footer>

    <script>
        // Smooth scrolling for navigation links
        document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    document.getElementById('navLinks').classList.remove('active');
                }
            });
        });

        // Hamburger menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

    </script>

</body>
</html>
