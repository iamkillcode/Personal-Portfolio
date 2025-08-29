
// Theme management
const THEMES = {
    light: 'css/default.css',
    blue: 'css/blue.css',
    green: 'css/green.css',
    purple: 'css/purple.css'
};

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Add event listeners to theme dots
    const themeDots = document.getElementsByClassName('theme-dot');
    Array.from(themeDots).forEach(dot => {
        dot.addEventListener('click', () => {
            const mode = dot.dataset.mode;
            setTheme(mode);
        });
    });

    // Initialize form validation
    initializeFormValidation();
});

function setTheme(mode) {
    if (!THEMES[mode]) {
        console.error(`Theme "${mode}" not found`);
        return;
    }

    const themeStyle = document.getElementById('theme-style');
    themeStyle.href = THEMES[mode];
    localStorage.setItem('theme', mode);

    // Update active theme dot
    document.querySelectorAll('.theme-dot').forEach(dot => {
        dot.style.border = dot.dataset.mode === mode ? '3px solid var(--themeDotBorder)' : '2px solid var(--themeDotBorder)';
    });
}

function initializeFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.email.includes('@')) {
            alert('Please enter a valid email address');
            return;
        }

        if (data.message.length < 10) {
            alert('Message must be at least 10 characters long');
            return;
        }

        // Here you would typically send the data to your server
        try {
            // Simulate sending data
            console.log('Sending message:', data);
            alert('Message sent successfully!');
            form.reset();
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
        }
    });
}