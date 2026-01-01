// Application State
let appState = {
    currentScreen: 'welcome',
    currentStep: 1,
    totalSteps: 4,
    company: {},
    selectedPlatforms: [],
    platformUrls: {},
    scrapingProgress: 0,
    isScrapingBackground: false,
    reviews: [],
    kpiData: {},
    filters: {
        timeRange: '30days',
        sort: 'date',
        platforms: []
    }
};

// Sample data from provided JSON
const sampleData = {
    reviewPlatforms: [
        {id: "trustpilot", name: "Trustpilot", icon: "⭐", color: "#00B67A"},
        {id: "kununu", name: "Kununu", icon: "💼", color: "#0077B5"},
        {id: "google", name: "Google Reviews", icon: "🔍", color: "#4285F4"},
        {id: "googlemaps", name: "Google Maps", icon: "📍", color: "#4285F4"},
        {id: "tripadvisor", name: "TripAdvisor", icon: "✈️", color: "#00AF87"},
        {id: "trustedshops", name: "Trusted Shops", icon: "🛡️", color: "#FFCC00"},
        {id: "yelp", name: "Yelp", icon: "🍴", color: "#D32323"},
        {id: "facebook", name: "Facebook", icon: "📘", color: "#1877F2"}
    ],
    sampleReviews: [
        {
            id: 1,
            platform: "trustpilot",
            reviewer: "Sarah M.",
            rating: 5,
            date: "2025-01-08",
            text: "Excellent service! The team was professional and delivered exactly what we needed on time.",
            verified: true,
            helpful: 12,
            response: "Thank you Sarah! We're thrilled to hear about your positive experience."
        },
        {
            id: 2,
            platform: "google",
            reviewer: "Michael K.",
            rating: 4,
            date: "2025-01-05",
            text: "Good quality work, though communication could be improved. Overall satisfied with the results.",
            verified: true,
            helpful: 8,
            response: null
        },
        {
            id: 3,
            platform: "kununu",
            reviewer: "Anonymous",
            rating: 5,
            date: "2025-01-03",
            text: "Great company culture and work-life balance. Management is supportive and the projects are interesting.",
            verified: true,
            helpful: 15,
            response: "We appreciate your feedback! Our team culture is something we're very proud of."
        },
        {
            id: 4,
            platform: "trustpilot",
            reviewer: "Jennifer L.",
            rating: 3,
            date: "2024-12-30",
            text: "The service was okay, but took longer than expected. The final result was decent.",
            verified: true,
            helpful: 5,
            response: "Thanks for your feedback Jennifer. We're working on improving our delivery times."
        },
        {
            id: 5,
            platform: "google",
            reviewer: "David R.",
            rating: 5,
            date: "2024-12-28",
            text: "Outstanding technical expertise and customer service. Highly recommend!",
            verified: true,
            helpful: 20,
            response: "Thank you David! We're glad we could exceed your expectations."
        },
        {
            id: 6,
            platform: "tripadvisor",
            reviewer: "Lisa P.",
            rating: 4,
            date: "2024-12-25",
            text: "Professional team with good attention to detail. Would work with them again.",
            verified: false,
            helpful: 7,
            response: null
        },
        {
            id: 7,
            platform: "kununu",
            reviewer: "Former Employee",
            rating: 4,
            date: "2024-12-20",
            text: "Good learning opportunities and fair compensation. Some processes could be streamlined.",
            verified: true,
            helpful: 9,
            response: "Thank you for your constructive feedback. We're always looking to improve our processes."
        },
        {
            id: 8,
            platform: "trustpilot",
            reviewer: "Mark T.",
            rating: 5,
            date: "2024-12-15",
            text: "Incredible attention to detail and innovative solutions. Best decision we made!",
            verified: true,
            helpful: 18,
            response: "We're thrilled to have exceeded your expectations, Mark!"
        }
    ],
    kpiData: {
        averageRating: 4.4,
        totalReviews: 127,
        responseRate: 68,
        sentimentScore: 82,
        platformStats: {
            trustpilot: {reviews: 45, rating: 4.6},
            google: {reviews: 38, rating: 4.3},
            kununu: {reviews: 22, rating: 4.2},
            tripadvisor: {reviews: 15, rating: 4.1},
            trustedshops: {reviews: 7, rating: 4.7}
        }
    }
};

// Screen Management
function showScreen(screenName) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    
    const targetScreen = document.getElementById(screenName + 'Screen');
    if (targetScreen) {
        targetScreen.classList.add('active');
        appState.currentScreen = screenName;
    }
}

// Setup Flow
function startSetup() {
    showScreen('setup');
    appState.currentStep = 1;
    updateSetupProgress();
    renderPlatformOptions();
}

function nextStep() {
    if (validateCurrentStep()) {
        if (appState.currentStep < appState.totalSteps) {
            appState.currentStep++;
            showSetupStep();
            updateSetupProgress();
            
            if (appState.currentStep === 3) {
                renderUrlInputs();
            } else if (appState.currentStep === 4) {
                renderSetupSummary();
            }
        }
    }
}

function prevStep() {
    if (appState.currentStep > 1) {
        appState.currentStep--;
        showSetupStep();
        updateSetupProgress();
    }
}

function showSetupStep() {
    const steps = document.querySelectorAll('.setup-step');
    steps.forEach((step, index) => {
        step.classList.toggle('active', index + 1 === appState.currentStep);
    });
}

function updateSetupProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    const progress = (appState.currentStep / appState.totalSteps) * 100;
    if (progressFill) progressFill.style.width = progress + '%';
    
    const stepNames = [
        'Unternehmensdaten',
        'Plattformen auswählen', 
        'URLs eingeben',
        'Bestätigung'
    ];
    
    if (progressText) {
        progressText.textContent = `Schritt ${appState.currentStep} von ${appState.totalSteps}: ${stepNames[appState.currentStep - 1]}`;
    }
}

function validateCurrentStep() {
    switch (appState.currentStep) {
        case 1:
            const name = document.getElementById('companyName').value.trim();
            const industry = document.getElementById('companyIndustry').value;
            const website = document.getElementById('companyWebsite').value.trim();
            
            if (!name || !industry) {
                alert('Bitte füllen Sie alle Pflichtfelder aus.');
                return false;
            }
            
            appState.company = {
                name,
                industry,
                website,
                description: document.getElementById('companyDescription').value.trim()
            };
            return true;
            
        case 2:
            if (appState.selectedPlatforms.length === 0) {
                alert('Bitte wählen Sie mindestens eine Plattform aus.');
                return false;
            }
            return true;
            
        case 3:
            const hasEmptyUrls = appState.selectedPlatforms.some(platformId => {
                const input = document.querySelector(`input[data-platform="${platformId}"]`);
                return !input || !input.value.trim();
            });
            
            if (hasEmptyUrls) {
                alert('Bitte geben Sie URLs für alle ausgewählten Plattformen ein.');
                return false;
            }
            
            // Save URLs
            appState.selectedPlatforms.forEach(platformId => {
                const input = document.querySelector(`input[data-platform="${platformId}"]`);
                if (input) appState.platformUrls[platformId] = input.value.trim();
            });
            return true;
            
        default:
            return true;
    }
}

function renderPlatformOptions() {
    const grid = document.getElementById('platformGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    sampleData.reviewPlatforms.forEach(platform => {
        const option = document.createElement('div');
        option.className = 'platform-option';
        option.onclick = () => togglePlatform(platform.id, option);
        
        option.innerHTML = `
            <div class="platform-checkbox">
                <span class="checkmark">✓</span>
            </div>
            <div class="platform-icon">${platform.icon}</div>
            <div class="platform-info">
                <div class="platform-name">${platform.name}</div>
            </div>
        `;
        
        grid.appendChild(option);
    });
}

function togglePlatform(platformId, element) {
    const isSelected = appState.selectedPlatforms.includes(platformId);
    
    if (isSelected) {
        appState.selectedPlatforms = appState.selectedPlatforms.filter(id => id !== platformId);
        element.classList.remove('selected');
    } else {
        appState.selectedPlatforms.push(platformId);
        element.classList.add('selected');
    }
}

function renderUrlInputs() {
    const container = document.getElementById('urlInputs');
    if (!container) return;
    
    container.innerHTML = '';
    
    appState.selectedPlatforms.forEach(platformId => {
        const platform = sampleData.reviewPlatforms.find(p => p.id === platformId);
        if (!platform) return;
        
        const inputGroup = document.createElement('div');
        inputGroup.className = 'url-input-group';
        
        inputGroup.innerHTML = `
            <div class="platform-icon">${platform.icon}</div>
            <div style="flex: 1;">
                <label class="form-label">${platform.name} URL</label>
                <input type="url" class="form-control" data-platform="${platformId}" 
                       placeholder="https://example.com/your-profile">
            </div>
        `;
        
        container.appendChild(inputGroup);
    });
}

function renderSetupSummary() {
    const container = document.getElementById('setupSummary');
    if (!container) return;
    
    const selectedPlatformNames = appState.selectedPlatforms.map(id => {
        const platform = sampleData.reviewPlatforms.find(p => p.id === id);
        return platform ? platform.name : id;
    }).join(', ');
    
    container.innerHTML = `
        <div class="summary-section">
            <div class="summary-title">Unternehmen</div>
            <div class="summary-content">
                <strong>${appState.company.name}</strong><br>
                ${appState.company.industry}<br>
                ${appState.company.website || 'Keine Website angegeben'}
                ${appState.company.description ? `<br><br>${appState.company.description}` : ''}
            </div>
        </div>
        <div class="summary-section">
            <div class="summary-title">Ausgewählte Plattformen (${appState.selectedPlatforms.length})</div>
            <div class="summary-content">${selectedPlatformNames}</div>
        </div>
        <div class="summary-section">
            <div class="summary-title">URLs</div>
            <div class="summary-content">
                URLs werden für ${appState.selectedPlatforms.length} Plattform(en) konfiguriert
            </div>
        </div>
    `;
}

// Scraping Process
function startScraping() {
    showScreen('scraping');
    appState.scrapingProgress = 0;
    renderPlatformsProgress();
    simulateScraping();
}

function simulateScraping() {
    const statuses = [
        'Verbindung zu Plattformen wird hergestellt...',
        'Reviews werden extrahiert...',
        'Daten werden verarbeitet...',
        'Metadaten werden gespeichert...',
        'Sentiment-Analyse wird durchgeführt...',
        'Dashboard wird vorbereitet...',
        'Abschluss der Datensammlung...'
    ];
    
    let currentStatus = 0;
    const totalDuration = 8000; // 8 seconds
    const updateInterval = totalDuration / 100; // Update every 80ms
    
    const interval = setInterval(() => {
        appState.scrapingProgress += 1;
        
        // Update status text periodically
        if (appState.scrapingProgress % 15 === 0 && currentStatus < statuses.length - 1) {
            currentStatus++;
        }
        
        updateScrapingProgress(statuses[currentStatus]);
        updatePlatformsProgress();
        
        if (appState.scrapingProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                finishScraping();
            }, 500);
        }
    }, updateInterval);
}

function updateScrapingProgress(status) {
    const progressPercent = document.getElementById('progressPercent');
    const statusText = document.getElementById('statusText');
    const progressCircle = document.getElementById('progressCircle');
    const miniProgressFill = document.getElementById('miniProgressFill');
    const miniStatusText = document.getElementById('miniStatusText');
    
    if (progressPercent) progressPercent.textContent = Math.round(appState.scrapingProgress) + '%';
    if (statusText) statusText.textContent = status;
    if (miniStatusText) miniStatusText.textContent = status;
    
    // Update circular progress
    if (progressCircle) {
        const circumference = 2 * Math.PI * 50; // radius = 50
        const dashoffset = circumference - (appState.scrapingProgress / 100) * circumference;
        progressCircle.style.strokeDashoffset = dashoffset;
    }
    
    // Update mini progress
    if (miniProgressFill) {
        miniProgressFill.style.width = appState.scrapingProgress + '%';
    }
}

function renderPlatformsProgress() {
    const container = document.getElementById('platformsProgress');
    if (!container) return;
    
    container.innerHTML = '';
    
    appState.selectedPlatforms.forEach(platformId => {
        const platform = sampleData.reviewPlatforms.find(p => p.id === platformId);
        if (!platform) return;
        
        const platformDiv = document.createElement('div');
        platformDiv.className = 'platform-progress';
        platformDiv.innerHTML = `
            <div class="platform-progress-header">
                <span>${platform.icon}</span>
                <span>${platform.name}</span>
            </div>
            <div class="platform-progress-status" id="status-${platformId}">Warten...</div>
            <div class="platform-progress-bar">
                <div class="platform-progress-fill" id="progress-${platformId}"></div>
            </div>
        `;
        
        container.appendChild(platformDiv);
    });
}

function updatePlatformsProgress() {
    appState.selectedPlatforms.forEach((platformId, index) => {
        const statusEl = document.getElementById(`status-${platformId}`);
        const progressEl = document.getElementById(`progress-${platformId}`);
        
        if (!statusEl || !progressEl) return;
        
        // Calculate individual platform progress with slight randomization
        const baseProgress = appState.scrapingProgress;
        const randomOffset = (Math.random() - 0.5) * 20;
        const platformProgress = Math.max(0, Math.min(100, baseProgress + randomOffset));
        
        progressEl.style.width = platformProgress + '%';
        
        if (platformProgress >= 100) {
            statusEl.textContent = 'Abgeschlossen';
        } else if (platformProgress > 50) {
            statusEl.textContent = 'Verarbeitung...';
        } else if (platformProgress > 20) {
            statusEl.textContent = 'Sammle Daten...';
        } else if (platformProgress > 0) {
            statusEl.textContent = 'Verbunden';
        }
    });
}

function toggleView(view) {
    const foregroundToggle = document.getElementById('foregroundToggle');
    const backgroundToggle = document.getElementById('backgroundToggle');
    const scrapingContent = document.getElementById('scrapingContent');
    const scrapingMinimized = document.getElementById('scrapingMinimized');
    
    if (view === 'background') {
        appState.isScrapingBackground = true;
        if (foregroundToggle) foregroundToggle.classList.remove('active');
        if (backgroundToggle) backgroundToggle.classList.add('active');
        if (scrapingContent) scrapingContent.classList.add('hidden');
        if (scrapingMinimized) scrapingMinimized.classList.remove('hidden');
    } else {
        appState.isScrapingBackground = false;
        if (foregroundToggle) foregroundToggle.classList.add('active');
        if (backgroundToggle) backgroundToggle.classList.remove('active');
        if (scrapingContent) scrapingContent.classList.remove('hidden');
        if (scrapingMinimized) scrapingMinimized.classList.add('hidden');
    }
}

function finishScraping() {
    // Initialize with sample data
    appState.reviews = sampleData.sampleReviews;
    appState.kpiData = sampleData.kpiData;
    appState.filters.platforms = appState.selectedPlatforms;
    
    showScreen('dashboard');
    initializeDashboard();
}

// Dashboard
function initializeDashboard() {
    updateCompanyInfo();
    updateKPICards();
    setupFilters();
    renderCharts();
    renderReviews();
}

function updateCompanyInfo() {
    const companyInfoEl = document.getElementById('dashboardCompanyInfo');
    if (companyInfoEl && appState.company) {
        companyInfoEl.innerHTML = `
            <span class="company-name">${appState.company.name}</span>
            <span class="company-industry">${appState.company.industry}</span>
        `;
    }
}

function updateKPICards() {
    const avgRating = document.getElementById('avgRating');
    const totalReviews = document.getElementById('totalReviews');
    const responseRate = document.getElementById('responseRate');
    const sentimentScore = document.getElementById('sentimentScore');
    
    if (avgRating) avgRating.textContent = appState.kpiData.averageRating;
    if (totalReviews) totalReviews.textContent = appState.kpiData.totalReviews;
    if (responseRate) responseRate.textContent = appState.kpiData.responseRate + '%';
    if (sentimentScore) sentimentScore.textContent = appState.kpiData.sentimentScore + '%';
}

function setupFilters() {
    setupPlatformFilters();
    setupFilterEventListeners();
}

function setupPlatformFilters() {
    const container = document.getElementById('platformFilters');
    if (!container) return;
    
    container.innerHTML = '';
    
    appState.selectedPlatforms.forEach(platformId => {
        const platform = sampleData.reviewPlatforms.find(p => p.id === platformId);
        if (!platform) return;
        
        const button = document.createElement('button');
        button.className = 'platform-filter-btn active';
        button.onclick = () => togglePlatformFilter(platformId, button);
        button.innerHTML = `
            <span>${platform.icon}</span>
            <span>${platform.name}</span>
        `;
        
        container.appendChild(button);
    });
}

function togglePlatformFilter(platformId, button) {
    const isActive = button.classList.contains('active');
    
    if (isActive) {
        button.classList.remove('active');
        appState.filters.platforms = appState.filters.platforms.filter(id => id !== platformId);
    } else {
        button.classList.add('active');
        appState.filters.platforms.push(platformId);
    }
    
    renderReviews();
    renderCharts();
}

function setupFilterEventListeners() {
    const timeFilter = document.getElementById('timeFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    if (timeFilter) {
        timeFilter.addEventListener('change', handleFilterChange);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', handleFilterChange);
    }
}

function handleFilterChange() {
    const timeFilter = document.getElementById('timeFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    if (timeFilter) appState.filters.timeRange = timeFilter.value;
    if (sortFilter) appState.filters.sort = sortFilter.value;
    
    renderReviews();
}

function renderCharts() {
    renderPlatformChart();
    renderTimeChart();
}

function renderPlatformChart() {
    const container = document.getElementById('platformChart');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Filter data by selected platforms
    const platformData = Object.entries(appState.kpiData.platformStats)
        .filter(([platformId]) => appState.filters.platforms.includes(platformId))
        .map(([platformId, data]) => {
            const platform = sampleData.reviewPlatforms.find(p => p.id === platformId);
            return {
                name: platform ? platform.name : platformId,
                icon: platform ? platform.icon : '',
                reviews: data.reviews,
                rating: data.rating
            };
        });
    
    if (platformData.length === 0) return;
    
    const maxReviews = Math.max(...platformData.map(d => d.reviews));
    
    platformData.forEach(data => {
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        const height = (data.reviews / maxReviews) * 160; // 160px max height
        bar.style.height = height + 'px';
        
        bar.innerHTML = `
            <div class="chart-bar-value">${data.reviews}</div>
            <div class="chart-bar-label">${data.icon} ${data.name}</div>
        `;
        
        container.appendChild(bar);
    });
}

function renderTimeChart() {
    const container = document.getElementById('timeChart');
    if (!container) return;
    
    // Simple placeholder chart showing review distribution over time
    container.innerHTML = '';
    
    const months = ['Dez', 'Jan', 'Feb', 'Mär', 'Apr', 'Mai'];
    const reviewCounts = [15, 23, 19, 28, 22, 20]; // Sample data
    
    const maxCount = Math.max(...reviewCounts);
    
    months.forEach((month, index) => {
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        const height = (reviewCounts[index] / maxCount) * 160;
        bar.style.height = height + 'px';
        
        bar.innerHTML = `
            <div class="chart-bar-value">${reviewCounts[index]}</div>
            <div class="chart-bar-label">${month}</div>
        `;
        
        container.appendChild(bar);
    });
}

function renderReviews() {
    const container = document.getElementById('reviewsList');
    if (!container) return;
    
    let filteredReviews = appState.reviews.filter(review => {
        // Platform filter
        if (!appState.filters.platforms.includes(review.platform)) {
            return false;
        }
        
        // Time filter
        const reviewDate = new Date(review.date);
        const now = new Date();
        
        switch (appState.filters.timeRange) {
            case '7days':
                return now - reviewDate <= 7 * 24 * 60 * 60 * 1000;
            case '30days':
                return now - reviewDate <= 30 * 24 * 60 * 60 * 1000;
            case '3months':
                return now - reviewDate <= 90 * 24 * 60 * 60 * 1000;
            case '6months':
                return now - reviewDate <= 180 * 24 * 60 * 60 * 1000;
            case '1year':
                return now - reviewDate <= 365 * 24 * 60 * 60 * 1000;
            default:
                return true;
        }
    });
    
    // Sort reviews
    filteredReviews.sort((a, b) => {
        switch (appState.filters.sort) {
            case 'date':
                return new Date(b.date) - new Date(a.date);
            case 'rating':
                return b.rating - a.rating;
            case 'platform':
                return a.platform.localeCompare(b.platform);
            case 'helpful':
                return b.helpful - a.helpful;
            default:
                return 0;
        }
    });
    
    container.innerHTML = '';
    
    filteredReviews.forEach(review => {
        const platform = sampleData.reviewPlatforms.find(p => p.id === review.platform);
        const reviewEl = document.createElement('div');
        reviewEl.className = 'review-card fade-in';
        
        const stars = Array.from({length: 5}, (_, i) => 
            `<span class="star ${i < review.rating ? '' : 'empty'}">★</span>`
        ).join('');
        
        const reviewerInitials = review.reviewer.split(' ').map(n => n[0]).join('').toUpperCase();
        
        reviewEl.innerHTML = `
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">${reviewerInitials}</div>
                    <div class="reviewer-details">
                        <h4>${review.reviewer}</h4>
                        <div class="reviewer-meta">${formatDate(review.date)}</div>
                    </div>
                </div>
                <div class="review-rating">
                    <div class="stars">${stars}</div>
                    <div class="platform-badge">
                        <span>${platform ? platform.icon : ''}</span>
                        <span>${platform ? platform.name : review.platform}</span>
                    </div>
                </div>
            </div>
            <div class="review-text">${review.text}</div>
            <div class="review-footer">
                <div class="review-meta">
                    <div class="helpful-count">
                        <span>👍</span>
                        <span>${review.helpful} hilfreich</span>
                    </div>
                    ${review.verified ? '<div class="verified-badge"><span>✓</span><span>Verifiziert</span></div>' : ''}
                </div>
            </div>
            ${review.response ? `
                <div class="review-response">
                    <div class="response-header">Antwort vom Unternehmen:</div>
                    <div class="response-text">${review.response}</div>
                </div>
            ` : ''}
        `;
        
        container.appendChild(reviewEl);
    });
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('de-DE', options);
}

function refreshData() {
    const refreshButton = document.querySelector('.header-actions .btn');
    if (refreshButton) {
        refreshButton.classList.add('loading');
        refreshButton.textContent = 'Aktualisiere...';
    }
    
    // Simulate data refresh
    setTimeout(() => {
        updateKPICards();
        renderCharts();
        renderReviews();
        
        if (refreshButton) {
            refreshButton.classList.remove('loading');
            refreshButton.innerHTML = '<span class="refresh-icon">🔄</span>Aktualisieren';
        }
    }, 1500);
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    showScreen('welcome');
});

// Make functions globally available
window.startSetup = startSetup;
window.nextStep = nextStep;
window.prevStep = prevStep;
window.startScraping = startScraping;
window.toggleView = toggleView;
window.refreshData = refreshData;