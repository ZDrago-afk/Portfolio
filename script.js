// === CYBER SECURITY PORTFOLIO - SCRIPT ===

// DOM Elements
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.content-section');
const skillLevels = document.querySelectorAll('.skill-level');
const tools = document.querySelectorAll('.tool');
const controls = document.querySelectorAll('.control');

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔐 Portfolio System Initializing...');
    
    // Set first section active
    setActiveSection('identity');
    
    // Initialize skill bars (will animate when visible)
    resetSkillBars();
    
    // Initialize tool hover effects
    initToolHover();
    
    // Terminal controls
    initTerminalControls();
    
    // Navigation click handlers
    initNavigation();
    
    // Auto-animate skill bars when capabilities section is visible
    initSkillBarObserver();
    
    // Auto-type terminal text when contact section is visible
    initContactTerminalObserver();
    
    // Console greeting
    consoleGreeting();
    
    // Keyboard shortcuts
    initKeyboardShortcuts();
});

// ========== CORE FUNCTIONS ==========

// Set active section
function setActiveSection(sectionId) {
    // Update nav buttons
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('href') === `#${sectionId}`) {
            btn.classList.add('active');
        }
    });
    
    // Update sections
    sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === sectionId) {
            section.classList.add('active');
        }
    });
}

// Reset skill bars to 0
function resetSkillBars() {
    skillLevels.forEach(level => {
        level.style.width = '0%';
    });
}

// Animate skill bars
function animateSkillBars() {
    console.log('Animating skill bars...');
    skillLevels.forEach(level => {
        const parent = level.closest('.skill-item');
        if (parent) {
            const width = parent.getAttribute('data-level') + '%';
            level.style.width = width;
        }
    });
}

// ========== FEATURE INITIALIZATIONS ==========

// Navigation
function initNavigation() {
    navButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            setActiveSection(targetId);
            
            // Smooth scroll to section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Tool hover effects
function initToolHover() {
    tools.forEach(tool => {
        tool.addEventListener('mouseenter', function() {
            const toolName = this.getAttribute('data-tool');
            this.style.transform = 'translateY(-8px) scale(1.05)';
            this.style.boxShadow = '0 15px 30px rgba(255, 0, 60, 0.4)';
            
            // Create tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'tool-tip';
            tooltip.textContent = toolName;
            tooltip.style.cssText = `
                position: absolute;
                bottom: -35px;
                left: 50%;
                transform: translateX(-50%);
                background: var(--cyber-red);
                color: var(--cyber-black);
                padding: 5px 10px;
                border-radius: 5px;
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.8rem;
                white-space: nowrap;
                z-index: 100;
                border: 1px solid var(--cyber-red);
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.appendChild(tooltip);
        });
        
        tool.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            
            // Remove tooltip
            const tooltip = this.querySelector('.tool-tip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Terminal controls
function initTerminalControls() {
    controls.forEach(control => {
        control.addEventListener('click', function() {
            const terminalFrame = document.querySelector('.terminal-frame');
            const mainContainer = document.querySelector('.main-container');
            
            if (this.classList.contains('close')) {
                // Close effect
                document.body.style.opacity = '0.7';
                document.body.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    document.body.innerHTML = `
                        <div style="
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            height: 100vh;
                            background: #000;
                            color: #ff003c;
                            font-family: 'Orbitron', monospace;
                            text-align: center;
                            padding: 20px;
                        ">
                            <h1 style="font-size: 2.5rem; margin-bottom: 20px; text-shadow: 0 0 10px #ff003c;">
                                SYSTEM TERMINATED
                            </h1>
                            <p style="font-size: 1.2rem; margin-bottom: 30px;">
                                Connection terminated by user
                            </p>
                            <button onclick="location.reload()" style="
                                padding: 12px 30px;
                                background: #ff003c;
                                color: #000;
                                border: none;
                                border-radius: 5px;
                                font-family: 'Orbitron', monospace;
                                font-weight: bold;
                                cursor: pointer;
                                font-size: 1rem;
                                transition: all 0.3s ease;
                            ">
                                REBOOT SYSTEM
                            </button>
                        </div>
                    `;
                }, 500);
                
            } else if (this.classList.contains('minimize')) {
                // Minimize effect
                if (mainContainer) {
                    mainContainer.style.transform = 'scale(0.95)';
                    mainContainer.style.opacity = '0.8';
                    setTimeout(() => {
                        mainContainer.style.transform = 'scale(1)';
                        mainContainer.style.opacity = '1';
                    }, 300);
                }
                
            } else if (this.classList.contains('maximize')) {
                // Maximize effect
                if (terminalFrame) {
                    terminalFrame.classList.toggle('maximized');
                    if (terminalFrame.classList.contains('maximized')) {
                        terminalFrame.style.margin = '0';
                        terminalFrame.style.width = '100%';
                        terminalFrame.style.height = '100vh';
                    } else {
                        terminalFrame.style.margin = '20px';
                        terminalFrame.style.width = '';
                        terminalFrame.style.height = '';
                    }
                }
            }
        });
    });
}

// Skill bar observer
function initSkillBarObserver() {
    const capabilitiesSection = document.getElementById('capabilities');
    if (!capabilitiesSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateSkillBars, 300);
            } else {
                resetSkillBars();
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(capabilitiesSection);
}

// Contact terminal observer
function initContactTerminalObserver() {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;
    
    let hasTyped = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasTyped) {
                hasTyped = true;
                setTimeout(typeTerminalText, 1000);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(contactSection);
}

// Terminal typing effect
function typeTerminalText() {
    const termBody = document.querySelector('.term-body');
    if (!termBody) return;
    
    const lines = [
        { prompt: 'root@zaheer:~$', command: 'establish_secure_connection --target=recruiter' },
        { output: '[✓] Connection established via AES-256-GCM', class: 'success' },
        { prompt: 'root@zaheer:~$', command: 'display_contact_channels' },
        { output: 'ENCRYPTED_EMAIL: zaheerjavedkhankct@gmail.com' },
        { output: 'SATELLITE_LINK: +91 81071 55688' },
        { output: 'LINKEDIN_PROFILE: /in/zaheer-khan' },
        { output: 'GITHUB_VAULT: @ZDrago-afk' },
        { prompt: 'root@zaheer:~$', command: 'system_status --security' },
        { output: '[✓] All systems secure. Ready for contact.', class: 'success' }
    ];
    
    let lineIndex = 0;
    let charIndex = 0;
    let currentLine = null;
    
    function typeNextChar() {
        if (lineIndex >= lines.length) return;
        
        const line = lines[lineIndex];
        
        if (!currentLine) {
            currentLine = document.createElement('div');
            currentLine.className = 'term-line';
            termBody.appendChild(currentLine);
        }
        
        if (line.prompt && charIndex === 0) {
            const promptSpan = document.createElement('span');
            promptSpan.className = 'prompt';
            promptSpan.textContent = line.prompt + ' ';
            currentLine.appendChild(promptSpan);
        }
        
        if (line.command && charIndex < line.command.length) {
            if (charIndex === 0) {
                const commandSpan = document.createElement('span');
                commandSpan.className = 'command';
                currentLine.appendChild(commandSpan);
            }
            
            const commandSpan = currentLine.querySelector('.command');
            commandSpan.textContent = line.command.substring(0, charIndex + 1);
            charIndex++;
            
            setTimeout(typeNextChar, 50);
        } else if (line.output && charIndex < line.output.length) {
            if (charIndex === 0) {
                const outputSpan = document.createElement('span');
                outputSpan.className = 'output ' + (line.class || '');
                currentLine.appendChild(outputSpan);
            }
            
            const outputSpan = currentLine.querySelector('.output');
            outputSpan.textContent = line.output.substring(0, charIndex + 1);
            charIndex++;
            
            setTimeout(typeNextChar, 30);
        } else {
            lineIndex++;
            charIndex = 0;
            currentLine = null;
            
            if (lineIndex < lines.length) {
                setTimeout(typeNextChar, 800);
            } else {
                // Add blinking cursor
                const cursorLine = document.createElement('div');
                cursorLine.className = 'term-line';
                cursorLine.innerHTML = `
                    <span class="prompt">root@zaheer:~$</span>
                    <span class="cursor">█</span>
                `;
                termBody.appendChild(cursorLine);
            }
        }
    }
    
    // Clear and start typing
    termBody.innerHTML = '';
    setTimeout(typeNextChar, 500);
}

// Console greeting
function consoleGreeting() {
    console.log('%c🔐 SECURE ACCESS GRANTED 🔐', 'color: #ff003c; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #ff003c;');
    console.log('%cSystem: Portfolio Interface\nStatus: Operational\nUser: Administrator\nTime: ' + new Date().toLocaleTimeString(), 'color: #00ff00; font-family: monospace;');
    console.log('%cNavigation: Ctrl + 1-6 keys\nReset Animations: ESC key', 'color: #ff9900; font-family: monospace;');
}

// Keyboard shortcuts
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl + 1-6 for navigation
        if (e.ctrlKey && e.key >= '1' && e.key <= '6') {
            const sectionIds = ['identity', 'capabilities', 'operations', 'credentials', 'trophies', 'contact'];
            const index = parseInt(e.key) - 1;
            if (sectionIds[index]) {
                setActiveSection(sectionIds[index]);
                e.preventDefault();
                
                // Scroll to section
                const section = document.getElementById(sectionIds[index]);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
        
        // ESC to reset animations
        if (e.key === 'Escape') {
            resetSkillBars();
            const capabilitiesSection = document.getElementById('capabilities');
            if (capabilitiesSection && isElementInViewport(capabilitiesSection)) {
                setTimeout(animateSkillBars, 100);
            }
        }
    });
}

// Helper: Check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ========== UTILITY FUNCTIONS ==========

// Handle image loading errors
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn('Image failed to load:', this.src);
            this.style.display = 'none';
            
            // Show fallback if available
            const fallback = this.nextElementSibling;
            if (fallback && fallback.classList.contains('badge-fallback')) {
                fallback.style.display = 'flex';
            }
        });
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Add loading class to body for initial animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    console.log('✅ Portfolio fully loaded and ready');
});