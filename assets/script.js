// =========================================
// GEOMETRIA DO SER - JAVASCRIPT PRINCIPAL
// =========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVEGAÇÃO STICKY =====
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Menu sticky ao scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Toggle menu mobile
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // ===== SCROLL SUAVE =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== ANIMAÇÕES AO SCROLL (AOS) =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos com atributo data-aos
    document.querySelectorAll('[data-aos]').forEach(element => {
        element.classList.add('aos-init');
        observer.observe(element);
    });
    
    // ===== ACTIVE LINK NA NAVEGAÇÃO =====
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ===== ANIMAÇÃO DOS NÚMEROS =====
    function animateNumbers() {
        const badges = document.querySelectorAll('.badge-number');
        
        badges.forEach(badge => {
            const target = parseInt(badge.textContent);
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    badge.textContent = `+${target}`;
                    clearInterval(timer);
                } else {
                    badge.textContent = `+${Math.floor(current)}`;
                }
            }, 30);
        });
    }
    
    // Observar seção "sobre" para animar números
    const sobreSection = document.querySelector('.sobre');
    if (sobreSection) {
        const sobreObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    sobreObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        sobreObserver.observe(sobreSection);
    }
    
    // ===== ANIMAÇÃO DE FORMAS GEOMÉTRICAS =====
    const geoShapes = document.querySelectorAll('.geo-shape');
    
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        geoShapes.forEach((shape, index) => {
            const speed = (index + 1) * 10;
            const x = mouseX * speed;
            const y = mouseY * speed;
            
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // ===== PARALLAX SUAVE NOS CARDS =====
    const cards = document.querySelectorAll('.produto-card, .badge-item, .contato-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) translateY(0)';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
    });
    
    // ===== FADE IN AO CARREGAR =====
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // ===== BOTÃO VOLTAR AO TOPO =====
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Voltar ao topo');
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== PREVENÇÃO DE FOUC (Flash of Unstyled Content) =====
    document.documentElement.style.visibility = 'visible';
    
    // ===== LOG DE INICIALIZAÇÃO =====
    console.log('%c✨ Geometria do SER - Site carregado com sucesso! ✨', 
                'color: #C8A97E; font-size: 16px; font-weight: bold;');
    console.log('%cDesenvolvido com precisão e atenção aos detalhes.', 
                'color: #8B6F47; font-size: 12px;');
});

// ===== ESTILOS ADICIONAIS PARA ANIMAÇÕES =====
const style = document.createElement('style');
style.textContent = `
    /* Animações AOS */
    .aos-init {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .aos-animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Fade in inicial */
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    /* Botão voltar ao topo */
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #C8A97E;
        color: #1C1C1C;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 5px 20px rgba(200, 169, 126, 0.3);
    }
    
    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .back-to-top:hover {
        background-color: #8B6F47;
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(200, 169, 126, 0.4);
    }
    
    /* Active link */
    .nav-link.active {
        color: #C8A97E;
    }
    
    /* Transições suaves para parallax */
    .produto-card,
    .badge-item,
    .contato-card {
        transition: all 0.3s ease;
    }
    
    /* Animação de delay para elementos com data-aos */
    [data-aos-delay="100"] {
        transition-delay: 0.1s;
    }
    
    [data-aos-delay="200"] {
        transition-delay: 0.2s;
    }
    
    [data-aos-delay="300"] {
        transition-delay: 0.3s;
    }
    
    [data-aos-delay="400"] {
        transition-delay: 0.4s;
    }
    
    /* Responsividade do botão voltar ao topo */
    @media (max-width: 768px) {
        .back-to-top {
            width: 45px;
            height: 45px;
            bottom: 20px;
            right: 20px;
            font-size: 1rem;
        }
    }
`;
document.head.appendChild(style);
