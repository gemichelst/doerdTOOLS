// Application data from the provided JSON
const appData = {
  "categories": [
    {
      "id": "underwear",
      "name": "Unterwäsche & Intimwäsche",
      "icon": "👙",
      "items": [
        {"name": "Slips", "types": ["Rio-Slip", "String", "Hipster", "Tanga", "Panty"]},
        {"name": "BHs", "types": ["Push-up", "Balconette", "Sport-BH", "Minimizer", "Bustier"]},
        {"name": "Strumpfhosen", "types": ["Feinstrumpfhose", "Strümpfe", "Hold-ups", "Netzstrümpfe"]},
        {"name": "Socken", "types": ["Füßlinge", "Sneaker-Socken", "Kniestrümpfe", "Overknees"]},
        {"name": "Bodies", "types": ["Body", "Bodysuit", "Corsage", "Teddy"]}
      ]
    },
    {
      "id": "shoes",
      "name": "Schuhe & Footwear", 
      "icon": "👠",
      "items": [
        {"name": "High Heels", "types": ["5cm", "8cm", "10cm", "12cm+"]},
        {"name": "Stilettos", "types": ["Spitz", "Plateau", "Ankle-Strap"]},
        {"name": "Pumps", "types": ["Klassisch", "Spitz", "Rund", "Offen"]},
        {"name": "Stiefel", "types": ["Ankle-Boots", "Over-Knee", "Plateau-Stiefel"]},
        {"name": "Ballerinas", "types": ["Klassisch", "Spitz", "Patent", "Leder"]}
      ]
    },
    {
      "id": "fetish",
      "name": "Fetisch & BDSM",
      "icon": "🖤",
      "items": [
        {"name": "Latex-Kleidung", "types": ["Catsuit", "Kleid", "Leggings", "Top"]},
        {"name": "Leder-Outfits", "types": ["Jacke", "Hose", "Rock", "Corsage"]},
        {"name": "Masken", "types": ["Latex-Maske", "Leder-Maske", "PVC-Maske"]},
        {"name": "Accessoires", "types": ["Handschuhe", "Fesseln", "Halsbänder"]}
      ]
    },
    {
      "id": "vintage",
      "name": "Vintage & Designer",
      "icon": "💎", 
      "items": [
        {"name": "Vintage Kleider", "types": ["50er Jahre", "60er Jahre", "70er Jahre", "80er Jahre"]},
        {"name": "Designer Taschen", "types": ["Luxus-Marken", "Vintage Designer", "Limited Edition"]},
        {"name": "Schmuck", "types": ["Vintage Schmuck", "Designer Uhren", "Accessoires"]},
        {"name": "Collector Items", "types": ["Seltene Stücke", "Signierte Items", "Limitierte Auflagen"]}
      ]
    }
  ],
  "sellers": [
    {
      "id": 1,
      "name": "SilkGoddess",
      "avatar": "👤",
      "verified": true,
      "rating": 4.9,
      "reviews": 127,
      "specialties": ["Seide", "Luxus-Dessous"],
      "activeListings": 24,
      "memberSince": "2022",
      "online": true
    },
    {
      "id": 2, 
      "name": "HeelQueen",
      "avatar": "👤",
      "verified": true,
      "rating": 4.8,
      "reviews": 89,
      "specialties": ["High Heels", "Stilettos"],
      "activeListings": 18,
      "memberSince": "2021",
      "online": false
    },
    {
      "id": 3,
      "name": "LatexLady",
      "avatar": "👤", 
      "verified": true,
      "rating": 4.9,
      "reviews": 156,
      "specialties": ["Latex", "Fetisch"],
      "activeListings": 31,
      "memberSince": "2020",
      "online": true
    },
    {
      "id": 4,
      "name": "VintageVixen",
      "avatar": "👤",
      "verified": true,
      "rating": 4.7,
      "reviews": 203,
      "specialties": ["Vintage", "Designer"],
      "activeListings": 42,
      "memberSince": "2019", 
      "online": true
    },
    {
      "id": 5,
      "name": "SportsySexy",
      "avatar": "👤",
      "verified": false,
      "rating": 4.6,
      "reviews": 67,
      "specialties": ["Sportswear", "Yoga"],
      "activeListings": 15,
      "memberSince": "2023",
      "online": false
    },
    {
      "id": 6,
      "name": "LaceAngel",
      "avatar": "👤",
      "verified": true,
      "rating": 4.8,
      "reviews": 112,
      "specialties": ["Spitze", "Romantisch"],
      "activeListings": 28,
      "memberSince": "2021",
      "online": true
    }
  ],
  "wearTimes": [
    {"value": "new", "label": "Neu/Ungetragen", "icon": "✨"},
    {"value": "1day", "label": "1 Tag getragen", "icon": "🌟"},
    {"value": "2-3days", "label": "2-3 Tage getragen", "icon": "⭐"},
    {"value": "4-7days", "label": "4-7 Tage getragen", "icon": "💫"},
    {"value": "longer", "label": "Länger getragen", "icon": "🔥"}
  ],
  "sizes": {
    "underwear": ["XS", "S", "M", "L", "XL", "XXL"],
    "shoes": ["35", "36", "37", "38", "39", "40", "41", "42"],
    "clothing": ["32", "34", "36", "38", "40", "42", "44", "46"]
  },
  "colors": [
    {"name": "Schwarz", "hex": "#000000"},
    {"name": "Weiß", "hex": "#FFFFFF"}, 
    {"name": "Rot", "hex": "#FF0000"},
    {"name": "Blau", "hex": "#0000FF"},
    {"name": "Rosa", "hex": "#FFC0CB"},
    {"name": "Lila", "hex": "#800080"},
    {"name": "Gold", "hex": "#FFD700"},
    {"name": "Silber", "hex": "#C0C0C0"}
  ]
};

// Application state
let currentView = 'sellers';
let filteredSellers = [...appData.sellers];
let currentFilters = {
    specialty: '',
    rating: '',
    verified: false,
    online: false,
    search: ''
};

// DOM elements
const sellersView = document.getElementById('sellersView');
const categoriesView = document.getElementById('categoriesView');
const featuredView = document.getElementById('featuredView');
const sellersGrid = document.getElementById('sellersGrid');
const categoriesGrid = document.getElementById('categoriesGrid');
const categoryTabs = document.querySelectorAll('.category-tab');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Filter elements
const specialtyFilter = document.getElementById('specialtyFilter');
const ratingFilter = document.getElementById('ratingFilter');
const verifiedFilter = document.getElementById('verifiedFilter');
const onlineFilter = document.getElementById('onlineFilter');

// Modal elements
const sellerModal = document.getElementById('sellerModal');
const sellerModalOverlay = document.getElementById('sellerModalOverlay');
const closeSellerModal = document.getElementById('closeSellerModal');
const categoryModal = document.getElementById('categoryModal');
const categoryModalOverlay = document.getElementById('categoryModalOverlay');
const closeCategoryModal = document.getElementById('closeCategoryModal');

// Hero buttons
const browseSellersBtn = document.getElementById('browseSellersBtn');
const browseCategoriesBtn = document.getElementById('browseCategoriesBtn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    populateFilters();
    renderSellers();
    renderCategories();
});

function initializeApp() {
    console.log('Initializing PreLoved Market application...');
    
    // Set initial view
    showView('sellers');
    
    // Add fade-in animation
    document.body.classList.add('fade-in');
}

function setupEventListeners() {
    // Category tabs
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const view = tab.getAttribute('data-view');
            showView(view);
            updateActiveTab(tab);
        });
    });
    
    // Hero buttons
    browseSellersBtn?.addEventListener('click', () => {
        showView('sellers');
        updateActiveTab(document.querySelector('[data-view="sellers"]'));
    });
    
    browseCategoriesBtn?.addEventListener('click', () => {
        showView('categories');
        updateActiveTab(document.querySelector('[data-view="categories"]'));
    });
    
    // Search functionality
    searchInput?.addEventListener('input', handleSearch);
    searchBtn?.addEventListener('click', handleSearch);
    searchInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Filter events
    specialtyFilter?.addEventListener('change', handleFilters);
    ratingFilter?.addEventListener('change', handleFilters);
    verifiedFilter?.addEventListener('change', handleFilters);
    onlineFilter?.addEventListener('change', handleFilters);
    
    // Modal events
    closeSellerModal?.addEventListener('click', () => hideModal(sellerModal));
    sellerModalOverlay?.addEventListener('click', () => hideModal(sellerModal));
    closeCategoryModal?.addEventListener('click', () => hideModal(categoryModal));
    categoryModalOverlay?.addEventListener('click', () => hideModal(categoryModal));
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideModal(sellerModal);
            hideModal(categoryModal);
        }
    });
}

function showView(viewName) {
    console.log(`Switching to view: ${viewName}`);
    
    // Hide all views
    sellersView?.classList.remove('active');
    categoriesView?.classList.remove('active');
    featuredView?.classList.remove('active');
    
    // Show selected view
    currentView = viewName;
    const targetView = document.getElementById(`${viewName}View`);
    if (targetView) {
        targetView.classList.add('active');
    }
}

function updateActiveTab(activeTab) {
    categoryTabs.forEach(tab => tab.classList.remove('active'));
    activeTab?.classList.add('active');
}

function populateFilters() {
    // Populate specialty filter
    if (specialtyFilter) {
        const specialties = new Set();
        appData.sellers.forEach(seller => {
            seller.specialties.forEach(spec => specialties.add(spec));
        });
        
        specialties.forEach(specialty => {
            const option = document.createElement('option');
            option.value = specialty;
            option.textContent = specialty;
            specialtyFilter.appendChild(option);
        });
    }
    
    // Populate category modal filters
    populateWearTimeFilter();
    populateColorFilter();
}

function populateWearTimeFilter() {
    const wearTimeFilter = document.getElementById('wearTimeFilter');
    if (wearTimeFilter) {
        appData.wearTimes.forEach(wearTime => {
            const option = document.createElement('option');
            option.value = wearTime.value;
            option.textContent = `${wearTime.icon} ${wearTime.label}`;
            wearTimeFilter.appendChild(option);
        });
    }
}

function populateColorFilter() {
    const colorFilter = document.getElementById('colorFilter');
    if (colorFilter) {
        appData.colors.forEach(color => {
            const option = document.createElement('option');
            option.value = color.name;
            option.textContent = color.name;
            colorFilter.appendChild(option);
        });
    }
}

function renderSellers() {
    if (!sellersGrid) return;
    
    sellersGrid.innerHTML = '';
    
    if (filteredSellers.length === 0) {
        sellersGrid.innerHTML = `
            <div class="no-results">
                <h3>Keine Verkäufer gefunden</h3>
                <p>Versuchen Sie andere Filterkriterien oder löschen Sie die Filter.</p>
            </div>
        `;
        return;
    }
    
    filteredSellers.forEach(seller => {
        const sellerCard = createSellerCard(seller);
        sellersGrid.appendChild(sellerCard);
    });
}

function createSellerCard(seller) {
    const card = document.createElement('div');
    card.className = 'seller-card';
    card.setAttribute('data-seller-id', seller.id);
    
    const stars = '⭐'.repeat(Math.floor(seller.rating));
    const verificationBadge = seller.verified 
        ? '<span class="verification-badge">✓ Verifiziert</span>' 
        : '<span class="verification-badge unverified">⚠ Nicht verifiziert</span>';
    const onlineStatus = seller.online 
        ? '<span class="online-status online">● Online</span>' 
        : '<span class="online-status offline">● Offline</span>';
    
    card.innerHTML = `
        <div class="seller-header">
            <div class="seller-avatar">${seller.avatar}</div>
            <div class="seller-info">
                <h3>${seller.name}</h3>
                <div class="seller-badges">
                    ${verificationBadge}
                    ${onlineStatus}
                </div>
                <div class="seller-rating">
                    <span class="stars">${stars}</span>
                    <span class="rating-text">${seller.rating} (${seller.reviews} Bewertungen)</span>
                </div>
            </div>
        </div>
        
        <div class="seller-stats">
            <div class="seller-stat">
                <span class="seller-stat-number">${seller.activeListings}</span>
                <span class="seller-stat-label">Aktive Anzeigen</span>
            </div>
            <div class="seller-stat">
                <span class="seller-stat-number">${seller.memberSince}</span>
                <span class="seller-stat-label">Mitglied seit</span>
            </div>
            <div class="seller-stat">
                <span class="seller-stat-number">${Math.floor(seller.rating * 20)}%</span>
                <span class="seller-stat-label">Zufriedenheit</span>
            </div>
        </div>
        
        <div class="seller-specialties">
            <h4>Spezialisierungen:</h4>
            <div class="specialties-tags">
                ${seller.specialties.map(spec => `<span class="specialty-tag">${spec}</span>`).join('')}
            </div>
        </div>
        
        <div class="seller-actions">
            <button class="btn btn--primary btn--sm">Profil besuchen</button>
            <button class="btn btn--outline btn--sm">💬 Nachricht</button>
        </div>
    `;
    
    // Add click event to open seller profile
    card.addEventListener('click', (e) => {
        e.preventDefault();
        openSellerProfile(seller);
    });
    
    // Prevent event bubbling for action buttons
    const actionButtons = card.querySelectorAll('.seller-actions button');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (btn.textContent.includes('Profil besuchen')) {
                openSellerProfile(seller);
            } else {
                alert(`Funktion "${btn.textContent}" wird geöffnet...`);
            }
        });
    });
    
    return card;
}

function renderCategories() {
    if (!categoriesGrid) return;
    
    categoriesGrid.innerHTML = '';
    
    appData.categories.forEach(category => {
        const categoryCard = createCategoryCard(category);
        categoriesGrid.appendChild(categoryCard);
    });
}

function createCategoryCard(category) {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.setAttribute('data-category-id', category.id);
    
    const itemCount = category.items.reduce((total, item) => total + item.types.length, 0);
    
    card.innerHTML = `
        <span class="category-icon">${category.icon}</span>
        <h3>${category.name}</h3>
        <ul class="category-items">
            ${category.items.slice(0, 3).map(item => `<li>${item.name}</li>`).join('')}
            ${category.items.length > 3 ? '<li>...und mehr</li>' : ''}
        </ul>
        <p class="category-count">${itemCount}+ Unterkategorien verfügbar</p>
    `;
    
    card.addEventListener('click', (e) => {
        e.preventDefault();
        openCategoryModal(category);
    });
    
    return card;
}

function openSellerProfile(seller) {
    if (!sellerModal) return;
    
    console.log(`Opening seller profile for: ${seller.name}`);
    
    // Populate modal with seller data
    const modalSellerAvatar = document.getElementById('modalSellerAvatar');
    const modalSellerName = document.getElementById('modalSellerName');
    const modalVerificationBadge = document.getElementById('modalVerificationBadge');
    const modalOnlineStatus = document.getElementById('modalOnlineStatus');
    const modalSellerStars = document.getElementById('modalSellerStars');
    const modalSellerRating = document.getElementById('modalSellerRating');
    const modalReviewCount = document.getElementById('modalReviewCount');
    const modalActiveListings = document.getElementById('modalActiveListings');
    const modalMemberSince = document.getElementById('modalMemberSince');
    const modalSpecialties = document.getElementById('modalSpecialties');
    
    if (modalSellerAvatar) modalSellerAvatar.textContent = seller.avatar;
    if (modalSellerName) modalSellerName.textContent = seller.name;
    
    if (modalVerificationBadge) {
        modalVerificationBadge.textContent = seller.verified ? '✓ Verifiziert' : '⚠ Nicht verifiziert';
        modalVerificationBadge.className = seller.verified ? 'verification-badge' : 'verification-badge unverified';
    }
    
    if (modalOnlineStatus) {
        modalOnlineStatus.textContent = seller.online ? '● Online' : '● Offline';
        modalOnlineStatus.className = seller.online ? 'online-status online' : 'online-status offline';
    }
    
    if (modalSellerStars) modalSellerStars.textContent = '⭐'.repeat(Math.floor(seller.rating));
    if (modalSellerRating) modalSellerRating.textContent = seller.rating;
    if (modalReviewCount) modalReviewCount.textContent = seller.reviews;
    if (modalActiveListings) modalActiveListings.textContent = seller.activeListings;
    if (modalMemberSince) modalMemberSince.textContent = seller.memberSince;
    
    if (modalSpecialties) {
        modalSpecialties.innerHTML = seller.specialties.map(spec => 
            `<span class="specialty-tag">${spec}</span>`
        ).join('');
    }
    
    showModal(sellerModal);
}

function openCategoryModal(category) {
    if (!categoryModal) return;
    
    console.log(`Opening category modal for: ${category.name}`);
    
    // Populate modal with category data
    const modalCategoryTitle = document.getElementById('modalCategoryTitle');
    const modalSubcategories = document.getElementById('modalSubcategories');
    const sizeFilter = document.getElementById('sizeFilter');
    
    if (modalCategoryTitle) {
        modalCategoryTitle.textContent = `${category.icon} ${category.name}`;
    }
    
    // Populate size filter based on category
    if (sizeFilter) {
        sizeFilter.innerHTML = '<option value="">Alle Größen</option>';
        const sizes = getSizesForCategory(category.id);
        sizes.forEach(size => {
            const option = document.createElement('option');
            option.value = size;
            option.textContent = size;
            sizeFilter.appendChild(option);
        });
    }
    
    // Populate subcategories
    if (modalSubcategories) {
        modalSubcategories.innerHTML = '';
        category.items.forEach(item => {
            item.types.forEach(type => {
                const subcategoryItem = document.createElement('div');
                subcategoryItem.className = 'subcategory-item';
                subcategoryItem.innerHTML = `
                    <h5>${item.name}</h5>
                    <p class="subcategory-count">${type}</p>
                `;
                subcategoryItem.addEventListener('click', () => {
                    alert(`Kategorie "${item.name} - ${type}" wird geöffnet...`);
                });
                modalSubcategories.appendChild(subcategoryItem);
            });
        });
    }
    
    // Setup price range slider
    setupPriceSlider();
    
    showModal(categoryModal);
}

function getSizesForCategory(categoryId) {
    switch (categoryId) {
        case 'underwear':
            return appData.sizes.underwear;
        case 'shoes':
            return appData.sizes.shoes;
        default:
            return appData.sizes.clothing;
    }
}

function setupPriceSlider() {
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    
    if (priceRange && priceValue) {
        priceRange.addEventListener('input', (e) => {
            priceValue.textContent = e.target.value;
        });
    }
}

function showModal(modal) {
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function hideModal(modal) {
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function handleSearch() {
    const searchTerm = searchInput?.value.toLowerCase().trim() || '';
    currentFilters.search = searchTerm;
    
    console.log(`Searching for: "${searchTerm}"`);
    applyFilters();
}

function handleFilters() {
    currentFilters.specialty = specialtyFilter?.value || '';
    currentFilters.rating = ratingFilter?.value || '';
    currentFilters.verified = verifiedFilter?.checked || false;
    currentFilters.online = onlineFilter?.checked || false;
    
    console.log('Applying filters:', currentFilters);
    applyFilters();
}

function applyFilters() {
    filteredSellers = appData.sellers.filter(seller => {
        // Search filter
        if (currentFilters.search) {
            const searchMatch = seller.name.toLowerCase().includes(currentFilters.search) ||
                              seller.specialties.some(spec => 
                                  spec.toLowerCase().includes(currentFilters.search)
                              );
            if (!searchMatch) return false;
        }
        
        // Specialty filter
        if (currentFilters.specialty) {
            if (!seller.specialties.includes(currentFilters.specialty)) {
                return false;
            }
        }
        
        // Rating filter
        if (currentFilters.rating) {
            const minRating = parseFloat(currentFilters.rating);
            if (seller.rating < minRating) {
                return false;
            }
        }
        
        // Verified filter
        if (currentFilters.verified && !seller.verified) {
            return false;
        }
        
        // Online filter
        if (currentFilters.online && !seller.online) {
            return false;
        }
        
        return true;
    });
    
    renderSellers();
}

// Additional utility functions
function formatPrice(price) {
    return `€${price.toFixed(2)}`;
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '⭐'.repeat(fullStars);
    if (hasHalfStar) stars += '✨';
    return stars;
}

// Performance optimization: Debounce search input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to search
const debouncedSearch = debounce(handleSearch, 300);
if (searchInput) {
    searchInput.removeEventListener('input', handleSearch);
    searchInput.addEventListener('input', debouncedSearch);
}

// Analytics and tracking (placeholder)
function trackEvent(category, action, label) {
    console.log(`Analytics: ${category} - ${action} - ${label}`);
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
});

// Add some sample interactions for demonstration
document.addEventListener('click', (e) => {
    if (e.target.matches('button')) {
        const buttonText = e.target.textContent;
        if (buttonText.includes('Nachricht') || buttonText.includes('Favorit') || buttonText.includes('Profil folgen')) {
            trackEvent('seller', 'interaction', buttonText);
        }
    }
});

console.log('PreLoved Market application loaded successfully!');