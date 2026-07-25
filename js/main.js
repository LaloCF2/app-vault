const appsData = [
    {
        id: "1-1",
        title: "iLoader",
        category: "program",
        shortDesc: "Este programa te ayuda a instalar SideStore & LiveContainer en tu iPhone o iPad, o simplemente importar un IPA desde tu almacenamiento.",
        longDesc: "Esta es una herramienta que instala una app IPA en tu iPhone requeriendo de un Apple ID, al instalar el IPA en tu iPhone ya sea via Wi-Fi o cable, debera de refrescar la app antes de 7 dias para que la app no deje de funcionar.",
        icon: "https://github.com/nab138/iloader/raw/main/iloader.svg",
        screenshots: [
            "assets/img/cap-iloader/cap1.png",
            "assets/img/cap-iloader/cap2.png"
        ],
        link: "https://github.com/nab138/iloader"
    },
    {
        id: "1-2",
        title: "PlumeImpactor",
        category: "program",
        shortDesc: "Este programa te ayuda a instalar IPAs a tu iPhone o Ipad desde el almacenamiento de tu computadora",
        longDesc: "Esta herramienta requiere de un Apple ID para funcionar, al igual que iLoader, debera de refrescar la app antes de 7 dias para que la app no deje de funcionar; esta se puede instalar ya sea via Wi-Fi o cable.",
        icon: "https://tse4.mm.bing.net/th/id/OIP.rJHOUJbOcCZ8t58SRFxPGgAAAA?r=0&pid=Api&P=0&h=180",
        screenshots: [
            "assets/img/cap-plumeimpactor/cap1.png",
            "assets/img/cap-plumeimpactor/cap2.png"
        ],
        link: "https://github.com/Samadaeus/plumeimpactor"
    },
    {
        id: "2-1",
        title: "iTunes (Windows)",
        category: "tools",
        shortDesc: "Herramienta especial para que la computadora Windows pueda detectar el iPhone o iPad en los programas",
        longDesc: "Es necesario tener iTunes en tu computadora para que los programas puedan detectar tu iPhone o iPad y te deje instalar IPAs. Descarga la versión correcta para tu Windows.",
        icon: "https://tse1.mm.bing.net/th/id/OIP.uW2L5X1ArEL80uUcLYQ3wAHaHa?r=0&pid=Api&P=0&h=180",
        screenshots: [
            "assets/img/cap-itunes/cap1.png"
        ],
        link: "https://www.apple.com/cl/itunes/"
    },
    {
        id: "3-1",
        title: "Esing",
        category: "installer",
        shortDesc: "Una app que sirve para la firma de aplicaciones e instalar IPAs",
        longDesc: "Esta aplicacion funciona de manera similar a los otro programas, con la diferencia que de ocupas un certificado p12 & mobileprovision para la instalacion de IPAs",
        icon: "https://onejailbreak.com/site/assets/files/1108/esign-ipa-app-icon.64x0.webp",
        screenshots: [
        ],
        link: "https://techybuff.com/all-new-esign/"
    },
    {
        id: "3-2",
        title: "Ksing",
        category: "installer",
        shortDesc: "Una app que sirve para la firma de aplicaciones e instalar IPAs",
        longDesc: "Esta aplicacion funciona de manera similar a los otro programas, con la diferencia que de ocupas un certificado p12 & mobileprovision para la instalacion de IPAs",
        icon: "https://onejailbreak.com/site/assets/files/2905/479772492-35307033-77bf-49d8-b9f1-0c1b04a6046d.64x0.webp",
        screenshots: [
        ],
        link: "https://techybuff.com/all-new-ksign/"
    },
    {
        id: "4-1",
        title: "Vs Impostor Legacy Port",
        category: "games",
        shortDesc: "Juego de Friday Night Funkin' Vs Impostor Legacy Porteado para mobiles.",
        longDesc: "Este juego es un port del mod de Friday Night Funkin' Vs Impostor Legacy para móviles manteniendo el diseño identico al original recudiendo el peso drasticamente a mas de un 50%\n<b> Creditos a MarioMaster39</b>",
        icon: "https://tse3.mm.bing.net/th/id/OIP.9KEjMF-xcOxIafe6TV44UgHaHa?r=0&pid=Api&P=0&h=180",
        screenshots: [
        ],
        link: "https://gamejolt.com/games/vsimpostormobile/1079889"
    }
];

const appGrid = document.getElementById('appGrid');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('appModal');
const closeModal = document.getElementById('closeModal');

function renderApps(apps) {
    appGrid.innerHTML = '';

    if (apps.length === 0) {
        appGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No se encontro nada.</p>';
        return;
    }

    apps.forEach(app => {
        const card = document.createElement('div');
        card.className = 'app-card';
        card.innerHTML = `
            <div class="card-header">
                <img src="${app.icon}" alt="${app.title}" class="app-icon">
                <div class="app-info">
                    <h3>${app.title}</h3>
                    <span class="badge">${getCategoryName(app.category)}</span>
                </div>
            </div>
            <div class="card-body">
                <p>${app.shortDesc}</p>
            </div>
            <div class="card-footer">
                <button class="btn btn-primary" onclick="openModal('${app.id}')">Más info</button>
            </div>
        `;
        appGrid.appendChild(card);
    });
}

function getCategoryName(cat) {
    const categories = {
        'program': 'Programas',
        'tools': 'Herramientas',
        'installer': 'Instaladores',
        'games': 'Juegos'
    };
    return categories[cat] || cat;
}

window.openModal = function (id) {
    const app = appsData.find(a => a.id === id);
    if (!app) return;

    document.getElementById('modalIcon').src = app.icon;
    document.getElementById('modalTitle').textContent = app.title;
    document.getElementById('modalCategory').textContent = getCategoryName(app.category);
    document.getElementById('modalDescription').innerHTML = app.longDesc;

    const screenshotsContainer = document.getElementById('modalScreenshots');
    screenshotsContainer.innerHTML = '';
    if (app.screenshots && app.screenshots.length > 0) {
        currentLightboxImages = app.screenshots;
        app.screenshots.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Captura ${index + 1}`;
            img.addEventListener('click', () => openLightbox(index));
            screenshotsContainer.appendChild(img);
        });
    }

    document.getElementById('modalDownloadBtn').href = app.link;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

let currentFilter = 'all';
let currentSearch = '';

function filterApps() {
    const filtered = appsData.filter(app => {
        const matchesFilter = currentFilter === 'all' || app.category === currentFilter;
        const matchesSearch = app.title.toLowerCase().includes(currentSearch) ||
            app.shortDesc.toLowerCase().includes(currentSearch);
        return matchesFilter && matchesSearch;
    });
    renderApps(filtered);
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        filterApps();
    });
});

searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value.toLowerCase();
    filterApps();
});

function initCanvas() {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = `rgba(255, 255, 255, ${Math.random() * 0.6})`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > width) this.x = 0;
            else if (this.x < 0) this.x = width;

            if (this.y > height) this.y = 0;
            else if (this.y < 0) this.y = height;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function createParticles() {
        particles = [];
        const numParticles = Math.floor((width * height) / 15000);
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        const time = Date.now() * 0.0001;

        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    createParticles();
    animate();
}

let currentLightboxImages = [];
let currentLightboxIndex = 0;

const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImage');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');
const lbClose = document.getElementById('lbClose');

function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
}

function updateLightbox() {
    lbImg.src = currentLightboxImages[currentLightboxIndex];
    if (currentLightboxImages.length > 1) {
        lbPrev.style.display = 'flex';
        lbNext.style.display = 'flex';
    } else {
        lbPrev.style.display = 'none';
        lbNext.style.display = 'none';
    }
}

lbPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxImages.length) % currentLightboxImages.length;
    updateLightbox();
});

lbNext.addEventListener('click', (e) => {
    e.stopPropagation();
    currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxImages.length;
    updateLightbox();
});

lbClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
});

document.addEventListener('DOMContentLoaded', () => {
    renderApps(appsData);
    initCanvas();

    const themeBtns = document.querySelectorAll('.theme-btn');
    const savedTheme = localStorage.getItem('appvault-theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeActiveBtn(savedTheme);

    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-set-theme');
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('appvault-theme', theme);
            updateThemeActiveBtn(theme);

            // Animate icon
            btn.classList.add(`animate-${theme}`);
            setTimeout(() => {
                btn.classList.remove(`animate-${theme}`);
            }, 600);
        });
    });

    function updateThemeActiveBtn(theme) {
        themeBtns.forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`.theme-btn[data-set-theme="${theme}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }
});
