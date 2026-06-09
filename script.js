const lenis = new Lenis();

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

window.addEventListener("load", () => {
    
    setTimeout(() => {
        document.body.classList.add("loaded");
    }, 1200); 
});

const initTheme = () => {
    const themeToggle = document.getElementById("themeToggle");
    const storedTheme = localStorage.getItem("stackly_theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const currentTheme = storedTheme || systemTheme;

    
    document.documentElement.setAttribute("data-theme", currentTheme);
    updateToggleIcon(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const nextTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", nextTheme);
            localStorage.setItem("stackly_theme", nextTheme);
            updateToggleIcon(nextTheme);
        });
    }
};

const updateToggleIcon = (theme) => {
    const themeToggle = document.getElementById("themeToggle");
    if (!themeToggle) return;
    const icon = themeToggle.querySelector("i");
    if (theme === "dark") {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
};


document.addEventListener("DOMContentLoaded", () => {
    initTheme();


    
    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        
        const revealSections = document.querySelectorAll('.premium-banner, .infinite-scroll-section, .loved-section, .rising-section, .gsap-reveal-section, .service-section, .service-cta');
        revealSections.forEach(section => {
            gsap.to(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 90%",
                    toggleActions: "play none none none"
                },
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out"
            });
        });

        
        gsap.set(".footer", { opacity: 0, y: 30 });
        gsap.to(".footer", {
            scrollTrigger: {
                trigger: ".footer",
                start: "top 95%",
                toggleActions: "play none none none"
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
        });

        
        const categories = document.querySelectorAll('.category');
        if (categories.length > 0) {
            gsap.set(categories, { opacity: 0, y: 20 });
            gsap.to(categories, {
                scrollTrigger: {
                    trigger: ".categories",
                    start: "top 90%",
                    toggleActions: "play none none none"
                },
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out"
            });
        }

        
        
        if (!document.querySelector('.shop-grid')) {
            const productCards = document.querySelectorAll('.product-card');
            if (productCards.length > 0) {
                gsap.set(productCards, { opacity: 0, y: 20, scale: 0.95 });
                gsap.to(productCards, {
                    scrollTrigger: {
                        trigger: ".product-row",
                        start: "top 90%",
                        toggleActions: "play none none none"
                    },
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    stagger: 0.05,
                    duration: 0.6,
                    ease: "power2.out"
                });
            }
        }

        
        const brandCards = document.querySelectorAll('.brand-card');
        if (brandCards.length > 0) {
            gsap.set(brandCards, { opacity: 0, y: 30 });
            gsap.to(brandCards, {
                scrollTrigger: {
                    trigger: ".brands-wrapper",
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out"
            });
        }

        
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 500);
    }

    
    const chatToggle = document.getElementById("chatToggle");
    const chatWindow = document.getElementById("chatWindow");
    const closeChat = document.getElementById("closeChat");
    const chatInput = document.getElementById("chatInput");
    const sendBtn = document.getElementById("sendBtn");
    const chatBody = document.getElementById("chatBody");

    if (chatToggle && chatWindow && closeChat) {
        let hasGreeted = false;

        const addMessage = (text, type) => {
            const msg = document.createElement("div");
            msg.classList.add("chat-message", type);
            msg.textContent = text;
            chatBody.appendChild(msg);
            chatBody.scrollTop = chatBody.scrollHeight;
        };

        const toggleChat = () => {
            chatWindow.classList.toggle("open");
            if (chatWindow.classList.contains("open") && !hasGreeted) {
                setTimeout(() => {
                    addMessage("Hi! 👋 Welcome to Stackly. How can I help you today?", "bot");
                    hasGreeted = true;
                }, 500);
            }
        };

        chatToggle.addEventListener("click", toggleChat);
        closeChat.addEventListener("click", toggleChat);

        const handleSend = () => {
            const text = chatInput.value.trim();
            if (text) {
                addMessage(text, "user");
                chatInput.value = "";
                setTimeout(() => {
                    addMessage("Thanks for your message! Our team will get back to you shortly. 😊", "bot");
                }, 1000);
            }
        };

        if (sendBtn) sendBtn.addEventListener("click", handleSend);
        if (chatInput) {
            chatInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") handleSend();
            });
        }
    }

    
    const productModal = document.getElementById("productModal");
    const closeModal = document.getElementById("closeModal");
    const modalImg = document.getElementById("modalImg");
    const modalTitle = document.getElementById("modalTitle");
    const modalRating = document.getElementById("modalRating");
    const modalPrice = document.getElementById("modalPrice");

    const showProductModal = (card) => {
        if (!productModal) return;
        const title = card.querySelector(".product-title").innerText;
        const img = card.querySelector("img").src;
        const rating = card.querySelector(".rating").innerText;
        const price = card.querySelector(".price").innerText;

        modalImg.src = img;
        modalTitle.innerText = title;
        modalRating.innerText = rating;
        modalPrice.innerText = price;

        productModal.classList.add("active");
    };

    if (closeModal) {
        closeModal.addEventListener("click", () => {
            productModal.classList.remove("active");
        });
    }

    
    const modalBuyBtn = productModal ? productModal.querySelector(".buy-now-btn") : null;
    if (modalBuyBtn) {
        modalBuyBtn.addEventListener("click", () => {
            window.location.href = "404.html";
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === productModal) {
            productModal.classList.remove("active");
        }
    });

    
    const searchInput = document.getElementById("searchInput");
    const productCards = document.querySelectorAll(".product-card");
    const noResults = document.getElementById("noResults");
    const suggestionsBox = document.getElementById("suggestionsBox");

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();
            let hasMatches = false;

            if (suggestionsBox) {
                suggestionsBox.innerHTML = "";
                if (query.length > 0) {
                    suggestionsBox.style.display = "block";
                } else {
                    suggestionsBox.style.display = "none";
                }
            }

            productCards.forEach(card => {
                const titleElement = card.querySelector(".product-title");
                if (!titleElement) return;
                const title = titleElement.innerText.toLowerCase();
                if (title.includes(query)) {
                    card.style.display = "block";
                    hasMatches = true;

                    if (suggestionsBox && query.length > 0) {
                        const suggestion = document.createElement("div");
                        suggestion.className = "suggestion-item";
                        suggestion.innerText = titleElement.innerText;
                        suggestion.addEventListener("click", () => {
                            searchInput.value = titleElement.innerText;
                            suggestionsBox.style.display = "none";
                            showProductModal(card);
                            searchInput.dispatchEvent(new Event("input"));
                        });
                        suggestionsBox.appendChild(suggestion);
                    }
                } else {
                    card.style.display = "none";
                }
            });

            if (noResults) {
                noResults.style.display = hasMatches ? "none" : "block";
            }
        });

        document.addEventListener("click", (e) => {
            if (suggestionsBox && !searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
                suggestionsBox.style.display = "none";
            }
        });

        const searchIcon = document.querySelector(".search-icon");
        if (searchIcon) {
            searchIcon.addEventListener("click", () => {
                const query = searchInput.value.toLowerCase().trim();
                if (query) {
                    const firstMatch = Array.from(productCards).find(card => {
                        const titleElement = card.querySelector(".product-title");
                        if (!titleElement) return false;
                        const title = titleElement.innerText.toLowerCase();
                        return title.includes(query);
                    });
                    if (firstMatch) showProductModal(firstMatch);
                } else {
                    searchInput.focus();
                }
            });
        }
    }

    
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navLinks = document.querySelector(".nav-links");

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            navLinks.classList.toggle("active");
            mobileMenuBtn.classList.toggle("open");
        });

        document.addEventListener("click", (e) => {
            if (navLinks.classList.contains("active") && !navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove("active");
                mobileMenuBtn.classList.remove("open");
            }
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", (e) => {
                if (link.classList.contains("dropdown-toggle") && window.innerWidth <= 768) {
                    e.preventDefault();
                    const menu = link.nextElementSibling;
                    if (menu) menu.classList.toggle("active");
                    link.querySelector('i').classList.toggle('fa-chevron-up');
                    link.querySelector('i').classList.toggle('fa-chevron-down');
                } else {
                    navLinks.classList.remove("active");
                    mobileMenuBtn.classList.remove("open");
                }
            });
        });
    }

    
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    let sliderIndex = 0;

    function showSlide(i) {
        if (slides.length === 0) return;
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active-dot"));
        if (slides[i]) slides[i].classList.add("active");
        if (dots[i]) dots[i].classList.add("active-dot");
    }

    function nextSlide() {
        if (slides.length === 0) return;
        sliderIndex = (sliderIndex + 1) % slides.length;
        showSlide(sliderIndex);
    }

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            sliderIndex = i;
            showSlide(sliderIndex);
        });
    });

    if (slides.length > 0) {
        setInterval(nextSlide, 4000);
    }

    
    const track = document.getElementById("risingTrack");
    const risingDots = document.querySelectorAll("#risingDots span");
    let risingIndex = 0;

    function updateSlider() {
        if (!track) return;
        let movePercent = 20;
        if (window.innerWidth <= 480) {
            movePercent = 100;
        } else if (window.innerWidth <= 768) {
            movePercent = 50;
        }
        
        track.style.transform = `translateX(-${risingIndex * movePercent}%)`;
        risingDots.forEach(dot => dot.classList.remove("active"));
        if (risingDots[risingIndex]) {
            risingDots[risingIndex].classList.add("active");
        }
    }

    risingDots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            risingIndex = i;
            updateSlider();
        });
    });

    window.addEventListener('resize', updateSlider);
    updateSlider();

    
    const shopGrid = document.querySelector(".shop-grid");
    if (shopGrid) {
        const filterBtns = document.querySelectorAll(".filter-btn");
        const categoryChecks = document.querySelectorAll(".filter-group input[type='checkbox']");
        const shopCards = shopGrid.querySelectorAll(".product-card");

        const filterProducts = () => {
            const activeCategories = Array.from(categoryChecks)
                .filter(input => input.checked && input.closest(".filter-group").querySelector("h3").innerText === "Categories")
                .map(input => input.parentElement.innerText.trim().toLowerCase());

            shopCards.forEach(card => {
                const categoryElement = card.querySelector(".category-name");
                if (!categoryElement) return;
                const category = categoryElement.innerText.toLowerCase();
                const isAll = activeCategories.includes("all products") || activeCategories.length === 0;
                
                if (isAll || activeCategories.includes(category)) {
                    card.style.display = "block";
                    gsap.fromTo(card, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, clearProps: "all" });
                } else {
                    card.style.display = "none";
                }
            });

            const visibleCount = Array.from(shopCards).filter(card => card.style.display !== "none").length;
            const resultsCountSpan = document.getElementById("resultsCount");
            if (resultsCountSpan) resultsCountSpan.innerText = visibleCount;
        };

        categoryChecks.forEach(check => {
            check.addEventListener("change", filterProducts);
        });

        if (filterBtns.length > 0) {
            filterBtns.forEach(btn => btn.addEventListener("click", filterProducts));
        }

        
        const shopSidebar = document.querySelector(".shop-sidebar");
        if (shopSidebar) {
            gsap.from(shopSidebar, {
                x: -50,
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".shop-layout",
                    start: "top 95%"
                }
            });
        }

        const shopCardsFinal = document.querySelectorAll(".shop-grid .product-card");
        if (shopCardsFinal.length > 0) {
            
            gsap.from(shopCardsFinal, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.05,
                ease: "power2.out"
            });
        }

        
        if (typeof filterProducts === "function") {
            filterProducts();
        }
    }

    
    setTimeout(() => {
        if (typeof ScrollTrigger !== "undefined") {
            ScrollTrigger.refresh();
        }
    }, 1000);

    
    updateCartCount();
    setupPagination();

    
    const startFlashSaleCountdown = () => {
        const hEl = document.getElementById("hours");
        const mEl = document.getElementById("minutes");
        const sEl = document.getElementById("seconds");

        if (!hEl || !mEl || !sEl) return;

        let hours = 2, minutes = 45, seconds = 15;

        setInterval(() => {
            if (seconds > 0) {
                seconds--;
            } else {
                if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else {
                    if (hours > 0) {
                        hours--;
                        minutes = 59;
                        seconds = 59;
                    }
                }
            }

            hEl.innerText = String(hours).padStart(2, "0");
            mEl.innerText = String(minutes).padStart(2, "0");
            sEl.innerText = String(seconds).padStart(2, "0");
        }, 1000);
    };

    startFlashSaleCountdown();
});


let cart = JSON.parse(localStorage.getItem('stackly_cart')) || [];

function updateQty(btn, delta) {
    const input = btn.parentElement.querySelector('input');
    let value = parseInt(input.value) + delta;
    if (value < 1) value = 1;
    input.value = value;
}

function addToCartFromCard(btn) {
    const card = btn.closest('.product-card');
    const id = card.getAttribute('data-id');
    const name = card.getAttribute('data-name');
    const price = parseInt(card.getAttribute('data-price'));
    const category = card.getAttribute('data-category');
    const img = card.getAttribute('data-img');
    const quantity = parseInt(card.querySelector('.quantity-control input').value);

    addToCart({ id, name, price, category, img, quantity });
    
    
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Added!';
    btn.style.backgroundColor = '#4CAF50';
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.backgroundColor = '';
    }, 2000);
}

function addToCart(product) {
    const existingIndex = cart.findIndex(item => item.id === product.id);
    if (existingIndex > -1) {
        cart[existingIndex].quantity += product.quantity;
    } else {
        cart.push(product);
    }
    saveCart();
    updateCartCount();
}

function saveCart() {
    localStorage.setItem('stackly_cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCounts = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCounts.forEach(el => {
        el.innerText = totalItems;
        el.style.display = totalItems > 0 ? 'inline-block' : 'none';
    });
}


function setupPagination() {
    const pagination = document.querySelector('.pagination');
    if (!pagination) return;

    const pageBtns = pagination.querySelectorAll('button:not(:last-child)');
    const nextBtn = pagination.querySelector('button:last-child');
    let currentPage = 1;

    const showPage = (pageNumber) => {
        currentPage = pageNumber;
        const products = document.querySelectorAll('.product-card');
        
        
        products.forEach(p => p.style.display = 'none');

        
        const pageProducts = document.querySelectorAll(`.product-card[data-page="${pageNumber}"]`);
        pageProducts.forEach(p => {
            p.style.display = 'block';
            gsap.fromTo(p, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 });
        });

        
        pageBtns.forEach((btn, idx) => {
            if (parseInt(btn.innerText) === pageNumber) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        
        window.scrollTo({
            top: document.querySelector('.shop-layout').offsetTop - 150,
            behavior: 'smooth'
        });
        
        
        const resultsCountSpan = document.getElementById("resultsCount");
        if (resultsCountSpan) resultsCountSpan.innerText = pageProducts.length;
    };

    pageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const pageNum = parseInt(btn.innerText);
            if (!isNaN(pageNum)) showPage(pageNum);
        });
    });

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentPage < pageBtns.length) {
                showPage(currentPage + 1);
            } else {
                showPage(1); 
            }
        });
    }

    
    showPage(1);
}
