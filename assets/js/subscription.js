// Enhanced subscription functionality for NeuralGlow.ai
document.addEventListener('DOMContentLoaded', function() {
    // Email validation
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Generic form handler for all subscription forms
    const handleSubscriptionForm = (form) => {
        if (!form) return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Show loading state
                const originalContent = form.innerHTML;
                form.innerHTML = `
                    <div class="subscription-loading">
                        <i class="fas fa-circle-notch fa-spin" style="font-size: 2rem; color: var(--primary, #689F38); margin-bottom: 10px;"></i>
                        <p>Processing your subscription...</p>
                    </div>
                `;
                
                // EmailJS implementation
                emailjs.send(
                    "NeuralGlow", // EmailJS Service ID
                    "NeuralGlow_AI", // EmailJS Template ID
                    {
                        subscriber_email: email,
                        to_name: "NeuralGlow",
                        from_name: "NeuralGlow.ai",
                        from_email: "notifications@neuralglow.ai",
                        reply_to: email,
                        subscription_date: new Date().toLocaleString(),
                        source: "NeuralGlow.ai Website"
                    }
                ).then(function(response) {
                    console.log("SUCCESS", response);
                    form.innerHTML = `
                        <div class="subscription-success">
                            <i class="fas fa-check-circle" style="font-size: 2rem; color: var(--success, #4CAF50); margin-bottom: 10px;"></i>
                            <p>Thank you for subscribing! We'll send insights directly to your inbox.</p>
                        </div>
                    `;
                    
                    // Store in localStorage as backup
                    const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
                    subscribers.push({
                        email: email,
                        date: new Date().toISOString()
                    });
                    localStorage.setItem('subscribers', JSON.stringify(subscribers));
                }, function(error) {
                    console.error("FAILED", error);
                    // Show error message but don't expose technical details to user
                    form.innerHTML = `
                        <div class="subscription-error">
                            <i class="fas fa-exclamation-circle" style="font-size: 2rem; color: #e74c3c; margin-bottom: 10px;"></i>
                            <p>Something went wrong. Please try again later or contact us directly.</p>
                            <button class="try-again-btn" style="background: var(--primary, #689F38); color: white; border: none; padding: 8px 16px; border-radius: 4px; margin-top: 10px; cursor: pointer;">Try Again</button>
                        </div>
                    `;
                    
                    // Add event listener to the Try Again button
                    const tryAgainBtn = form.querySelector('.try-again-btn');
                    if (tryAgainBtn) {
                        tryAgainBtn.addEventListener('click', () => {
                            form.innerHTML = originalContent;
                        });
                    }
                });
            }
        });
    };
    
    // Initialize all subscription forms on the page
    document.querySelectorAll('.subscription-form, #subscription-form, #newsletter-form, #footer-subscription-form').forEach(form => {
        handleSubscriptionForm(form);
    });
    
    // Additional functionality for popup modals if present
    const subscriptionModal = document.getElementById('subscription-modal');
    const closeButtons = document.querySelectorAll('.close-button');
    
    // Handle close buttons for modals
    if (closeButtons.length > 0) {
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.modal') || subscriptionModal;
                if (modal) modal.style.display = 'none';
            });
        });
    }
    
    // Close modal when clicking outside the content
    if (subscriptionModal) {
        window.addEventListener('click', function(event) {
            if (event.target === subscriptionModal) {
                subscriptionModal.style.display = 'none';
            }
        });
    }
    
    // Add scroll trigger for subscription modal if configured
    if (subscriptionModal) {
        let hasShownModal = false;
        const scrollThreshold = 70; // Show at 70% scroll
        
        window.addEventListener('scroll', function() {
            if (hasShownModal) return;
            
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const totalHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const scrollPercentage = (scrollTop / (totalHeight - windowHeight)) * 100;
            
            if (scrollPercentage > scrollThreshold) {
                setTimeout(() => {
                    subscriptionModal.style.display = 'block';
                    hasShownModal = true;
                }, 1000);
            }
        });
    }
    
    // Initialize floating subscribe button if present
    const floatingButton = document.getElementById('floating-subscribe');
    if (floatingButton) {
        // Show button after scrolling 300px
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                floatingButton.classList.add('visible');
            } else {
                floatingButton.classList.remove('visible');
            }
        });
        
        // Open subscription modal when clicked
        floatingButton.addEventListener('click', function() {
            if (subscriptionModal) {
                subscriptionModal.style.display = 'block';
            }
        });
    }
    
    // Handle any subscribe links that should open a modal
    document.querySelectorAll('.subscribe-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if (subscriptionModal) {
                subscriptionModal.style.display = 'block';
            }
        });
    });
});
