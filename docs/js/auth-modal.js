// docs/js/auth-modal.js - CON BOTÓN PARA VER CONTRASEÑA

// Check authentication on page load
if (!sessionStorage.getItem('mkdocs_authenticated')) {
    createLoginModal();
}

function createLoginModal() {
    // Create modal
    const modal = document.createElement('div');
    modal.id = 'loginModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999999;
        backdrop-filter: blur(5px);
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 40px;
            border-radius: 15px;
            text-align: center;
            width: 320px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        ">
            <div style="font-size: 40px; margin-bottom: 15px;">🔒</div>
            <h3 style="margin: 0 0 20px 0; color: #333;">Restricted Access</h3>
            <p style="color: #666; margin-bottom: 25px; font-size: 14px;">
                This documentation is private and requires authentication
            </p>
            
            <div style="position: relative; width: 100%;">
                <input type="password" 
                       id="modalPassword" 
                       placeholder="Enter password" 
                       style="
                           width: 100%;
                           padding: 12px 45px 12px 15px;
                           margin: 0 0 20px 0;
                           border: 2px solid #ddd;
                           border-radius: 8px;
                           font-size: 16px;
                           box-sizing: border-box;
                           transition: border 0.3s;
                           font-family: 'Courier New', monospace;
                       "
                       autocomplete="off"
                       autofocus>
                
                <button id="togglePassword" 
                        type="button"
                        style="
                            position: absolute;
                            right: 10px;
                            top: 10px;
                            background: transparent;
                            border: none;
                            cursor: pointer;
                            padding: 5px;
                            color: #666;
                            font-size: 18px;
                            transition: color 0.2s;
                        "
                        onmouseover="this.style.color='#333'"
                        onmouseout="this.style.color='#666'">
                    👁️
                </button>
            </div>
            
            <button onclick="verifyPassword()" 
                    style="
                        background: linear-gradient(135deg, #8cf7e3 0%, #00c39e 100%);
                        color: white;
                        border: none;
                        padding: 14px 20px;
                        border-radius: 8px;
                        cursor: pointer;
                        width: 100%;
                        font-size: 16px;
                        font-weight: bold;
                        transition: transform 0.2s, opacity 0.2s;
                    "
                    onmouseover="this.style.opacity='0.9'"
                    onmouseout="this.style.opacity='1'">
                🔓 Access Documentation
            </button>
            
            <p id="modalError" style="
                color: #e74c3c; 
                margin-top: 15px; 
                display: none;
                font-size: 14px;
                background: #ffeaea;
                padding: 8px;
                border-radius: 4px;
            ">
                ❌ Incorrect password. Please try again.
            </p>

        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Auto-focus the input
    setTimeout(() => {
        document.getElementById('modalPassword').focus();
    }, 100);
    
    // Add toggle password functionality
    setupPasswordToggle();
}

// Setup password visibility toggle
function setupPasswordToggle() {
    const toggleBtn = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('modalPassword');
    
    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Change icon
            toggleBtn.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
            
            // Optional: Add tooltip
            toggleBtn.title = type === 'password' ? 'Show password' : 'Hide password';
        });
    }
}

// Global function to verify password
window.verifyPassword = function() {
    const passwordInput = document.getElementById('modalPassword');
    const errorElement = document.getElementById('modalError');
    const CORRECT_PASSWORD = "Endades*"; // CHANGE THIS!
    
    if (passwordInput.value === CORRECT_PASSWORD) {
        // Save to sessionStorage (only lasts for this session)
        sessionStorage.setItem('mkdocs_authenticated', 'true');
        
        // Remove modal
        const modal = document.getElementById('loginModal');
        if (modal) {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        }
        
        // Optional: Show welcome notification
        showWelcomeNotification();
    } else {
        // Show error
        errorElement.style.display = 'block';
        passwordInput.value = '';
        passwordInput.focus();
        
        // Shake effect on input
        passwordInput.style.borderColor = '#e74c3c';
        passwordInput.style.animation = 'shake 0.5s';
        setTimeout(() => {
            passwordInput.style.animation = '';
        }, 500);
    }
};

// Enter key support
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && document.getElementById('modalPassword')) {
            verifyPassword();
        }
    });
});

// Rest of the code remains the same...
// [Include all the remaining functions from the previous version]
// showWelcomeNotification(), CSS animations, inactivity timer, etc.