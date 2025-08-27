document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });

    // Toggle Switch for Ready to Buy
    const readyToBuyToggle = document.getElementById('readyToBuy');
    const toggleStatus = document.getElementById('toggle-status');

    if (readyToBuyToggle && toggleStatus) {
        readyToBuyToggle.addEventListener('change', function() {
            toggleStatus.textContent = this.checked ? 'Yes' : 'No';
        });
    }

    // Order Form Submission
    const orderForm = document.getElementById('order-form');
    const orderConfirmation = document.getElementById('order-confirmation');
    const orderIdDisplay = document.getElementById('order-id-display');

    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check if cart has items
            if (window.cart && window.cart.items.length === 0) {
                alert('Your cart is empty. Please add items to your cart before checking out.');
                return;
            }
            
            // Generate a random order ID
            const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
            
            // Collect form data
            const formData = {
                fullName: document.getElementById('fullName').value,
                phoneNumber: document.getElementById('phoneNumber').value,
                altNumber: document.getElementById('altNumber').value,
                address: document.getElementById('address').value,
                landmark: document.getElementById('landmark').value,
                deliveryDay: document.getElementById('deliveryDay').value,
                readyToBuy: document.getElementById('readyToBuy').checked,
                items: window.cart ? window.cart.items : [],
                total: window.cart ? window.cart.total : 0
            };
            
            // Display order ID
            if (orderIdDisplay) {
                orderIdDisplay.textContent = orderId;
            }
            
            // Show confirmation
            if (orderConfirmation) {
                orderConfirmation.style.display = 'block';
            }
            
            // Clear cart after successful order
            if (window.cart) {
                window.cart.clearCart();
            }
            
            // Reset form
            orderForm.reset();
            
            // Log order data (in a real app, this would be sent to a server)
            console.log('Order Submitted:', { orderId, ...formData });
        });
    }

    // Vendor Form Submission
    const vendorForm = document.getElementById('vendor-form');
    const vendorConfirmation = document.getElementById('vendor-confirmation');
    const vendorIdDisplay = document.getElementById('vendor-id-display');

    if (vendorForm) {
        vendorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Generate a random vendor application ID
            const vendorId = 'VEN-' + Math.floor(100000 + Math.random() * 900000);
            
            if (vendorIdDisplay) {
                vendorIdDisplay.textContent = vendorId;
            }
            
            // Collect form data for WhatsApp
            const businessName = document.getElementById('businessName').value;
            const contactName = document.getElementById('contactName').value;
            const contactEmail = document.getElementById('contactEmail').value;
            const contactPhone = document.getElementById('contactPhone').value;
            const productCategory = document.getElementById('productCategory').value;
            const productDescription = document.getElementById('productDescription').value;
            
            // Create WhatsApp message
            const whatsappMessage = `*New Vendor Registration*%0A%0A*ID:* ${vendorId}%0A*Business:* ${businessName}%0A*Contact:* ${contactName}%0A*Email:* ${contactEmail}%0A*Phone:* ${contactPhone}%0A*Category:* ${productCategory}%0A*Products:* ${productDescription}`;
            
            // Open WhatsApp with pre-filled message
            window.open(`https://wa.me/+2347031031130?text=${whatsappMessage}`, '_blank');
            
            if (vendorConfirmation) {
                vendorConfirmation.style.display = 'block';
            }
            
            // Reset form
            vendorForm.reset();
        });
    }

    // Close Modal
    const closeModalButtons = document.querySelectorAll('.close-modal, .close-confirmation');
    
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Login System with Tabs and Captcha
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const loginTabBtns = document.querySelectorAll('.login-tab-btn');
    const loginTabContents = document.querySelectorAll('.login-tab-content');
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const backToLoginLink = document.getElementById('back-to-login-link');
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    // Captcha elements
    const captchaCode = document.getElementById('captcha-code');
    const captchaInput = document.getElementById('captcha-input');
    const refreshCaptcha = document.getElementById('refresh-captcha');
    const registerCaptchaCode = document.getElementById('register-captcha-code');
    const registerCaptchaInput = document.getElementById('register-captcha-input');
    const registerRefreshCaptcha = document.getElementById('register-refresh-captcha');
    const forgotCaptchaCode = document.getElementById('forgot-captcha-code');
    const forgotCaptchaInput = document.getElementById('forgot-captcha-input');
    const forgotRefreshCaptcha = document.getElementById('forgot-refresh-captcha');
    
    // Generate random captcha code
    function generateCaptcha() {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return captcha;
    }
    
    // Initialize captchas
    if (captchaCode) captchaCode.textContent = generateCaptcha();
    if (registerCaptchaCode) registerCaptchaCode.textContent = generateCaptcha();
    if (forgotCaptchaCode) forgotCaptchaCode.textContent = generateCaptcha();
    
    // Refresh captchas
    if (refreshCaptcha) {
        refreshCaptcha.addEventListener('click', function(e) {
            e.preventDefault();
            captchaCode.textContent = generateCaptcha();
        });
    }
    
    if (registerRefreshCaptcha) {
        registerRefreshCaptcha.addEventListener('click', function(e) {
            e.preventDefault();
            registerCaptchaCode.textContent = generateCaptcha();
        });
    }
    
    if (forgotRefreshCaptcha) {
        forgotRefreshCaptcha.addEventListener('click', function(e) {
            e.preventDefault();
            forgotCaptchaCode.textContent = generateCaptcha();
        });
    }
    
    // Tab switching
    if (loginTabBtns) {
        loginTabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabName = this.dataset.tab;
                
                // Remove active class from all buttons and contents
                loginTabBtns.forEach(btn => btn.classList.remove('active'));
                loginTabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to current button and content
                this.classList.add('active');
                document.getElementById(tabName + '-tab').classList.add('active');
            });
        });
    }
    
    // Forgot password link
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginTabContents.forEach(content => content.classList.remove('active'));
            document.getElementById('forgot-password-tab').classList.add('active');
        });
    }
    
    // Back to login link
    if (backToLoginLink) {
        backToLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginTabContents.forEach(content => content.classList.remove('active'));
            document.getElementById('login-tab').classList.add('active');
        });
    }
    
    // Password toggle
    if (passwordToggles) {
        passwordToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const passwordField = this.previousElementSibling;
                const type = passwordField.getAttribute('type');
                
                if (type === 'password') {
                    passwordField.setAttribute('type', 'text');
                    this.innerHTML = '<i class="fas fa-eye-slash"></i>';
                } else {
                    passwordField.setAttribute('type', 'password');
                    this.innerHTML = '<i class="fas fa-eye"></i>';
                }
            });
        });
    }
    
    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailOrPhone = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Verify captcha
            if (captchaInput.value === captchaCode.textContent) {
                // Check if input is email or phone
                const isEmail = emailOrPhone.includes('@');
                const loginMethod = isEmail ? 'email' : 'phone number';
                
                alert(`Login successful with ${loginMethod}: ${emailOrPhone}! This is a demo, no actual login is processed.`);
                document.getElementById('login').style.display = 'none';
                loginForm.reset();
                captchaCode.textContent = generateCaptcha();
            } else {
                alert('Incorrect captcha code. Please try again.');
                captchaCode.textContent = generateCaptcha();
                captchaInput.value = '';
            }
        });
    }
    
    // Register form submission
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const phone = document.getElementById('register-phone').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            
            // Verify captcha
            if (registerCaptchaInput.value !== registerCaptchaCode.textContent) {
                alert('Incorrect captcha code. Please try again.');
                registerCaptchaCode.textContent = generateCaptcha();
                registerCaptchaInput.value = '';
                return;
            }
            
            // Verify passwords match
            if (password !== confirmPassword) {
                alert('Passwords do not match. Please try again.');
                return;
            }
            
            // Simulate verification code sent to email/phone
            alert(`Registration successful! A verification code has been sent to ${email} and ${phone}. This is a demo, no actual registration is processed.`);
            
            // Switch to login tab
            loginTabBtns.forEach(btn => btn.classList.remove('active'));
            loginTabContents.forEach(content => content.classList.remove('active'));
            document.querySelector('[data-tab="login"]').classList.add('active');
            document.getElementById('login-tab').classList.add('active');
            
            registerForm.reset();
            registerCaptchaCode.textContent = generateCaptcha();
        });
    }
    
    // Forgot password form submission
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('forgot-email').value;
            
            // Verify captcha
            if (forgotCaptchaInput.value === forgotCaptchaCode.textContent) {
                alert(`Password reset link has been sent to ${email}. This is a demo, no actual email is sent.`);
                
                // Switch back to login tab
                loginTabContents.forEach(content => content.classList.remove('active'));
                document.getElementById('login-tab').classList.add('active');
                
                forgotPasswordForm.reset();
                forgotCaptchaCode.textContent = generateCaptcha();
            } else {
                alert('Incorrect captcha code. Please try again.');
                forgotCaptchaCode.textContent = generateCaptcha();
                forgotCaptchaInput.value = '';
            }
        });
    }

    // Load Sample Products
    loadSampleProducts();
    
    // Flash Sale Countdown
    function updateCountdown() {
        const hoursElement = document.getElementById('countdown-hours');
        const minutesElement = document.getElementById('countdown-minutes');
        const secondsElement = document.getElementById('countdown-seconds');
        
        if (hoursElement && minutesElement && secondsElement) {
            // Get current time
            const now = new Date();
            
            // Set end time to midnight
            const endTime = new Date();
            endTime.setHours(23, 59, 59, 999);
            
            // Calculate remaining time
            const diff = endTime - now;
            
            // Calculate hours, minutes, seconds
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            // Update countdown display
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
        }
    }
    
    // Update countdown every second
    if (document.getElementById('flash-sale-countdown')) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // Bestsellers Carousel
    const bestsellersCarousel = document.getElementById('bestsellers-carousel');
    
    if (bestsellersCarousel) {
        // Sample bestseller products
        const bestsellers = [
            {
                name: 'Apple AirPods Pro (2nd Gen)',
                category: 'Electronics',
                price: '₦89,999',
                image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=200&fit=crop&crop=center'
            },
            {
                name: 'Samsung Galaxy Watch 6',
                category: 'Wearables',
                price: '₦125,500',
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop&crop=center'
            },
            {
                name: 'JBL Charge 5 Bluetooth Speaker',
                category: 'Audio',
                price: '₦45,999',
                image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=200&fit=crop&crop=center'
            },
            {
                name: 'iPhone 15 Pro Max Case',
                category: 'Accessories',
                price: '₦8,500',
                image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=200&fit=crop&crop=center'
            },
            {
                name: 'Anker PowerCore 20000mAh',
                category: 'Electronics',
                price: '₦18,999',
                image: 'https://images.unsplash.com/photo-1609592806787-3d9c5b1e8b5e?w=300&h=200&fit=crop&crop=center'
            },
            {
                name: 'Adjustable Laptop Stand',
                category: 'Office',
                price: '₦12,500',
                image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop&crop=center'
            },
            {
                name: 'Nike Air Force 1 Sneakers',
                category: 'Fashion',
                price: '₦35,000',
                image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop&crop=center'
            },
            {
                name: 'Skincare Routine Set',
                category: 'Beauty',
                price: '₦22,999',
                image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=200&fit=crop&crop=center'
            }
        ];
        
        // Populate bestsellers carousel
        bestsellers.forEach((product, index) => {
            const productElement = document.createElement('div');
            productElement.className = 'bestseller-item';
            productElement.style.animationDelay = `${index * 0.1}s`;
            
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="bestseller-info">
                    <h3>${product.name}</h3>
                    <p>${product.category}</p>
                    <span class="bestseller-price">${product.price}</span>
                    <button class="btn btn-sm btn-primary add-to-cart">Add to Cart</button>
                </div>
            `;
            
            bestsellersCarousel.appendChild(productElement);
        });
        
        // Auto-scroll bestsellers carousel
        let scrollPosition = 0;
        const scrollAmount = 1;
        const scrollDelay = 30;
        
        function autoScroll() {
            scrollPosition += scrollAmount;
            
            // Reset scroll position when reaching the end
            if (scrollPosition >= bestsellersCarousel.scrollWidth - bestsellersCarousel.clientWidth) {
                scrollPosition = 0;
            }
            
            bestsellersCarousel.scrollLeft = scrollPosition;
            setTimeout(autoScroll, scrollDelay);
        }
        
        // Start auto-scrolling after a delay
        setTimeout(autoScroll, 2000);
    }
    
    // Add AOS animation library initialization if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }

    // Product Search Functionality
    const productSearch = document.getElementById('product-search');
    
    if (productSearch) {
        productSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                const productName = card.querySelector('h3').textContent.toLowerCase();
                const productDescription = card.querySelector('.product-description').textContent.toLowerCase();
                
                if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});

// Sample Products Data
function loadSampleProducts() {
    const productsContainer = document.getElementById('products-container');
    
    if (!productsContainer) return;
    
    const products = [
        {
            name: 'Sony WH-1000XM5 Headphones',
            description: 'Industry-leading noise canceling wireless headphones with 30-hour battery life',
            price: '₦125,999',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop&crop=center'
        },
        {
            name: 'Fitbit Versa 4 Fitness Tracker',
            description: 'Advanced fitness tracker with GPS, heart rate monitoring, and 6+ day battery',
            price: '₦85,500',
            image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=200&fit=crop&crop=center'
        },
        {
            name: 'Anker PowerCore III Elite',
            description: '25,600mAh portable charger with 87W USB-C PD for laptops and phones',
            price: '₦28,999',
            image: 'https://images.unsplash.com/photo-1609592806787-3d9c5b1e8b5e?w=300&h=200&fit=crop&crop=center'
        },
        {
            name: 'Ring Video Doorbell Pro 2',
            description: '1536p HD+ video doorbell with 3D motion detection and two-way talk',
            price: '₦95,500',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop&crop=center'
        },
        {
            name: 'Peak Design Everyday Backpack',
            description: 'Premium camera and laptop backpack with weatherproof exterior',
            price: '₦75,500',
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop&crop=center'
        },
        {
            name: 'Fenty Beauty Makeup Collection',
            description: 'Complete professional makeup kit with 40 foundation shades',
            price: '₦45,999',
            image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop&crop=center'
        },
        {
            name: 'Hydro Flask Water Bottle 32oz',
            description: 'Insulated stainless steel bottle keeps drinks cold 24hrs, hot 12hrs',
            price: '₦15,500',
            image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=200&fit=crop&crop=center'
        },
        {
            name: 'The Ordinary Skincare Routine',
            description: 'Complete 7-step skincare regimen with vitamin C, retinol, and hyaluronic acid',
            price: '₦35,999',
            image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=200&fit=crop&crop=center'
        },
        {
            name: 'MacBook Air M2 Laptop Stand',
            description: 'Ergonomic aluminum laptop stand with adjustable height and cooling design',
            price: '₦18,500',
            image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop&crop=center'
        },
        {
            name: 'Adidas Ultraboost 22 Running Shoes',
            description: 'Premium running shoes with responsive Boost midsole and Primeknit upper',
            price: '₦65,000',
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop&crop=center'
        },
        {
            name: 'Instant Pot Duo 7-in-1',
            description: 'Multi-use pressure cooker: slow cooker, rice cooker, steamer, sauté, yogurt maker',
            price: '₦42,999',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop&crop=center'
        },
        {
            name: 'Dyson V15 Detect Cordless Vacuum',
            description: 'Powerful cordless vacuum with laser dust detection and LCD screen',
            price: '₦285,000',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop&crop=center'
        }
    ];
    
    // Clear existing products
    productsContainer.innerHTML = '';
    
    // Add product cards to the container
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <span class="product-price">${product.price}</span>
                <button class="btn btn-primary add-to-cart">Add to Cart</button>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
        
        // Add event listener to Add to Cart button
        const addToCartBtn = productCard.querySelector('.add-to-cart');
        addToCartBtn.addEventListener('click', function() {
            // Add product to cart
            if (window.cart) {
                const product = {
                    id: Math.random().toString(36).substr(2, 9),
                    name: productCard.querySelector('h3').textContent,
                    price: productCard.querySelector('.product-price').textContent,
                    image: productCard.querySelector('img').src,
                    quantity: 1
                };
                window.cart.addItem(product);
            }
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Sticky header on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});