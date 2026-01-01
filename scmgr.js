// SoundCloud Manager Application
class SoundCloudManager {
    constructor() {
        this.currentAccountId = null;
        this.data = {
            accounts: [
                {
                    id: 1,
                    username: "ElectroBeats_Berlin",
                    displayName: "ElectroBeats Berlin",
                    profileImage: "https://via.placeholder.com/80x80/ff5500/ffffff?text=EB",
                    followers: 15420,
                    following: 892,
                    tracks: 48,
                    playlists: 12,
                    totalPlays: 285600
                },
                {
                    id: 2, 
                    username: "DeepHouse_Vibes",
                    displayName: "Deep House Vibes",
                    profileImage: "https://via.placeholder.com/80x80/ff5500/ffffff?text=DH",
                    followers: 8935,
                    following: 445,
                    tracks: 32,
                    playlists: 8,
                    totalPlays: 164200
                },
                {
                    id: 3,
                    username: "TechnoUnderground",
                    displayName: "Techno Underground",
                    profileImage: "https://via.placeholder.com/80x80/ff5500/ffffff?text=TU",
                    followers: 23187,
                    following: 1205,
                    tracks: 67,
                    playlists: 15,
                    totalPlays: 458900
                }
            ],
            playlists: [
                {
                    id: 1,
                    title: "Berlin Nights",
                    description: "Underground techno tracks from Berlin's club scene",
                    coverImage: "https://via.placeholder.com/200x200/ff5500/ffffff?text=BN",
                    trackCount: 24,
                    createdDate: "2024-12-15",
                    plays: 15600,
                    likes: 892,
                    isPrivate: false,
                    tracks: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47]
                },
                {
                    id: 2,
                    title: "Chill Electronic",
                    description: "Relaxed electronic beats for study and work",
                    coverImage: "https://via.placeholder.com/200x200/00c4ff/ffffff?text=CE",
                    trackCount: 18,
                    createdDate: "2024-11-28",
                    plays: 8420,
                    likes: 456,
                    isPrivate: false,
                    tracks: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36]
                },
                {
                    id: 3,
                    title: "Festival Bangers",
                    description: "High energy tracks for festival season",
                    coverImage: "https://via.placeholder.com/200x200/ff0080/ffffff?text=FB",
                    trackCount: 12,
                    createdDate: "2024-10-03",
                    plays: 22100,
                    likes: 1205,
                    isPrivate: false,
                    tracks: [1, 5, 9, 13, 17, 21, 25, 29, 33, 37, 41, 45]
                }
            ],
            tracks: [
                {
                    id: 1,
                    title: "Midnight Drive",
                    description: "Dark techno track with driving bassline",
                    duration: "6:42",
                    genre: "Techno",
                    mood: "Dark",
                    uploadDate: "2025-01-15",
                    plays: 12500,
                    likes: 678,
                    downloads: 89,
                    comments: 45,
                    coverImage: "https://via.placeholder.com/200x200/333333/ff5500?text=MD",
                    isPrivate: false,
                    downloadEnabled: true,
                    commentsEnabled: true,
                    tags: ["techno", "dark", "driving", "berlin"]
                },
                {
                    id: 2,
                    title: "Ocean Waves",
                    description: "Ambient electronic with ocean field recordings",
                    duration: "8:15",
                    genre: "Ambient",
                    mood: "Calm",
                    uploadDate: "2025-01-10",
                    plays: 8900,
                    likes: 445,
                    downloads: 156,
                    comments: 23,
                    coverImage: "https://via.placeholder.com/200x200/0080ff/ffffff?text=OW",
                    isPrivate: false,
                    downloadEnabled: true,
                    commentsEnabled: true,
                    tags: ["ambient", "nature", "calm", "meditation"]
                },
                {
                    id: 3,
                    title: "City Pulse",
                    description: "Urban electronic with industrial sounds",
                    duration: "5:28",
                    genre: "Electronic",
                    mood: "Energetic",
                    uploadDate: "2025-01-05",
                    plays: 15200,
                    likes: 892,
                    downloads: 203,
                    comments: 67,
                    coverImage: "https://via.placeholder.com/200x200/ff5500/000000?text=CP",
                    isPrivate: false,
                    downloadEnabled: false,
                    commentsEnabled: true,
                    tags: ["electronic", "urban", "industrial", "energetic"]
                }
            ],
            insights: {
                totalPlays: 285600,
                totalLikes: 18950,
                totalDownloads: 3420,
                totalComments: 1205,
                playsOverTime: [
                    {"date": "2025-01-01", "plays": 1200},
                    {"date": "2025-01-02", "plays": 1450},
                    {"date": "2025-01-03", "plays": 1680},
                    {"date": "2025-01-04", "plays": 2100},
                    {"date": "2025-01-05", "plays": 2800},
                    {"date": "2025-01-06", "plays": 2200},
                    {"date": "2025-01-07", "plays": 1950}
                ],
                topTracks: [
                    {"id": 3, "title": "City Pulse", "plays": 15200},
                    {"id": 1, "title": "Midnight Drive", "plays": 12500},
                    {"id": 2, "title": "Ocean Waves", "plays": 8900}
                ],
                geographicData: [
                    {"country": "Germany", "plays": 85600, "percentage": 30},
                    {"country": "USA", "plays": 57120, "percentage": 20},
                    {"country": "United Kingdom", "plays": 42840, "percentage": 15},
                    {"country": "Netherlands", "plays": 28560, "percentage": 10},
                    {"country": "France", "plays": 25704, "percentage": 9},
                    {"country": "Other", "plays": 45776, "percentage": 16}
                ],
                referralSources: [
                    {"source": "Direct", "plays": 114240, "percentage": 40},
                    {"source": "SoundCloud Discovery", "plays": 85680, "percentage": 30},
                    {"source": "Social Media", "plays": 57120, "percentage": 20},
                    {"source": "External Websites", "plays": 28560, "percentage": 10}
                ]
            }
        };
        
        this.charts = {};
        this.editingItem = null;
        this.confirmCallback = null;
    }

    init() {
        console.log('Initializing SoundCloud Manager...');
        this.renderAccountSelection();
        this.bindEvents();
        console.log('SoundCloud Manager initialized');
    }

    // Utility Functions
    showLoading() {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.remove('hidden');
        }
    }

    hideLoading() {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
        }
    }

    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        const container = document.getElementById('toast-container');
        if (container) {
            container.appendChild(toast);
            
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 5000);
        }
    }

    formatNumber(num) {
        return new Intl.NumberFormat('de-DE').format(num);
    }

    formatDate(dateString) {
        return new Intl.DateTimeFormat('de-DE').format(new Date(dateString));
    }

    // Account Management
    renderAccountSelection() {
        console.log('Rendering account selection...');
        const grid = document.getElementById('accounts-grid');
        if (!grid) {
            console.error('accounts-grid element not found');
            return;
        }
        
        grid.innerHTML = '';

        this.data.accounts.forEach(account => {
            const card = document.createElement('div');
            card.className = 'account-card';
            card.innerHTML = `
                <div class="account-avatar">${account.displayName.substring(0, 2)}</div>
                <div class="account-name">${account.displayName}</div>
                <div class="account-stats">
                    <div class="stat-item">
                        <div class="stat-number">${this.formatNumber(account.followers)}</div>
                        <div>Follower</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${account.tracks}</div>
                        <div>Tracks</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${account.playlists}</div>
                        <div>Playlists</div>
                    </div>
                </div>
                <button class="btn btn--primary account-select-btn" data-account-id="${account.id}">
                    Account auswählen
                </button>
            `;
            grid.appendChild(card);
        });

        // Bind account selection buttons
        document.querySelectorAll('.account-select-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const accountId = parseInt(e.target.getAttribute('data-account-id'));
                this.selectAccount(accountId);
            });
        });
    }

    selectAccount(accountId) {
        console.log('Selecting account:', accountId);
        this.showLoading();
        
        setTimeout(() => {
            this.currentAccountId = accountId;
            this.showMainApp();
            this.hideLoading();
            this.showToast('Account erfolgreich verbunden');
        }, 1500);
    }

    connectNewAccount() {
        this.showToast('Authentifizierung wird simuliert...', 'info');
        
        setTimeout(() => {
            this.showToast('Neues Konto würde hier verbunden werden', 'warning');
        }, 2000);
    }

    showMainApp() {
        console.log('Showing main app...');
        const accountSelection = document.getElementById('account-selection');
        const mainApp = document.getElementById('main-app');
        
        if (accountSelection && mainApp) {
            accountSelection.classList.add('hidden');
            mainApp.classList.remove('hidden');
            
            this.updateCurrentAccountDisplay();
            this.showSection('dashboard');
            this.renderDashboard();
        }
    }

    switchAccount() {
        console.log('Switching account...');
        this.showLoading();
        
        setTimeout(() => {
            const accountSelection = document.getElementById('account-selection');
            const mainApp = document.getElementById('main-app');
            
            if (accountSelection && mainApp) {
                accountSelection.classList.remove('hidden');
                mainApp.classList.add('hidden');
            }
            
            this.currentAccountId = null;
            this.hideLoading();
            this.showToast('Verbindung getrennt');
        }, 1000);
    }

    updateCurrentAccountDisplay() {
        const account = this.data.accounts.find(a => a.id === this.currentAccountId);
        if (!account) return;

        const container = document.getElementById('current-account');
        if (container) {
            container.innerHTML = `
                <div class="current-account-avatar">${account.displayName.substring(0, 2)}</div>
                <div class="current-account-name">${account.displayName}</div>
            `;
        }
    }

    // Navigation
    showSection(sectionName) {
        console.log('Showing section:', sectionName);
        
        // Update nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        const activeNavItem = document.querySelector(`[data-section="${sectionName}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }

        // Show section
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        const activeSection = document.getElementById(`${sectionName}-section`);
        if (activeSection) {
            activeSection.classList.add('active');
        }

        // Load section content
        switch(sectionName) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'playlists':
                this.renderPlaylists();
                break;
            case 'tracks':
                this.renderTracks();
                break;
            case 'insights':
                this.renderInsights();
                break;
        }
    }

    // Dashboard
    renderDashboard() {
        const account = this.data.accounts.find(a => a.id === this.currentAccountId);
        if (!account) return;

        const welcomeText = document.getElementById('welcome-text');
        const totalTracks = document.getElementById('total-tracks');
        const totalPlaylists = document.getElementById('total-playlists');
        const totalPlays = document.getElementById('total-plays');
        const totalFollowers = document.getElementById('total-followers');

        if (welcomeText) welcomeText.textContent = `Willkommen zurück, ${account.displayName}!`;
        if (totalTracks) totalTracks.textContent = this.formatNumber(account.tracks);
        if (totalPlaylists) totalPlaylists.textContent = this.formatNumber(account.playlists);
        if (totalPlays) totalPlays.textContent = this.formatNumber(account.totalPlays);
        if (totalFollowers) totalFollowers.textContent = this.formatNumber(account.followers);
    }

    // Playlists
    renderPlaylists() {
        const grid = document.getElementById('playlists-grid');
        if (!grid) return;

        const searchInput = document.getElementById('playlist-search');
        const sortSelect = document.getElementById('playlist-sort');
        
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const sortBy = sortSelect ? sortSelect.value : 'name';

        let playlists = [...this.data.playlists];

        // Filter
        if (searchTerm) {
            playlists = playlists.filter(p => 
                p.title.toLowerCase().includes(searchTerm) ||
                p.description.toLowerCase().includes(searchTerm)
            );
        }

        // Sort
        playlists.sort((a, b) => {
            switch(sortBy) {
                case 'name':
                    return a.title.localeCompare(b.title);
                case 'date':
                    return new Date(b.createdDate) - new Date(a.createdDate);
                case 'tracks':
                    return b.trackCount - a.trackCount;
                case 'plays':
                    return b.plays - a.plays;
                default:
                    return 0;
            }
        });

        grid.innerHTML = '';

        playlists.forEach(playlist => {
            const card = document.createElement('div');
            card.className = 'content-card';
            card.innerHTML = `
                <img src="${playlist.coverImage}" alt="${playlist.title}" class="content-card-image">
                <div class="content-card-body">
                    <div class="content-card-title">${playlist.title}</div>
                    <div class="content-card-description">${playlist.description}</div>
                    <div class="content-card-meta">
                        <span>${playlist.trackCount} Tracks</span>
                        <span>${this.formatNumber(playlist.plays)} Plays</span>
                    </div>
                    <div class="content-card-actions">
                        <button class="action-btn playlist-edit-btn" data-playlist-id="${playlist.id}">Bearbeiten</button>
                        <button class="action-btn playlist-share-btn" data-playlist-id="${playlist.id}">Teilen</button>
                        <button class="action-btn danger playlist-delete-btn" data-playlist-id="${playlist.id}">Löschen</button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });

        // Bind playlist action buttons
        document.querySelectorAll('.playlist-edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const playlistId = parseInt(e.target.getAttribute('data-playlist-id'));
                this.editPlaylist(playlistId);
            });
        });

        document.querySelectorAll('.playlist-share-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const playlistId = parseInt(e.target.getAttribute('data-playlist-id'));
                this.shareItem('playlist', playlistId);
            });
        });

        document.querySelectorAll('.playlist-delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const playlistId = parseInt(e.target.getAttribute('data-playlist-id'));
                this.deletePlaylist(playlistId);
            });
        });
    }

    editPlaylist(id) {
        this.editingItem = id ? this.data.playlists.find(p => p.id === id) : { 
            id: null, 
            title: '', 
            description: '', 
            isPrivate: false 
        };
        
        const modalTitle = document.getElementById('playlist-modal-title');
        const titleInput = document.getElementById('playlist-title');
        const descInput = document.getElementById('playlist-description');
        const privateCheck = document.getElementById('playlist-private');
        const coverPreview = document.getElementById('playlist-cover-preview');
        
        if (modalTitle) modalTitle.textContent = id ? 'Playlist bearbeiten' : 'Neue Playlist erstellen';
        if (titleInput) titleInput.value = this.editingItem.title || '';
        if (descInput) descInput.value = this.editingItem.description || '';
        if (privateCheck) privateCheck.checked = this.editingItem.isPrivate || false;
        
        if (this.editingItem.coverImage && coverPreview) {
            coverPreview.src = this.editingItem.coverImage;
            coverPreview.classList.remove('hidden');
        }
        
        this.showModal('playlist-modal');
    }

    savePlaylist() {
        const titleInput = document.getElementById('playlist-title');
        const descInput = document.getElementById('playlist-description');
        const privateCheck = document.getElementById('playlist-private');
        
        const title = titleInput ? titleInput.value.trim() : '';
        const description = descInput ? descInput.value.trim() : '';
        const isPrivate = privateCheck ? privateCheck.checked : false;
        
        if (!title) {
            this.showToast('Bitte geben Sie einen Titel ein', 'error');
            return;
        }

        if (this.editingItem && this.editingItem.id) {
            // Update existing
            const playlist = this.data.playlists.find(p => p.id === this.editingItem.id);
            if (playlist) {
                playlist.title = title;
                playlist.description = description;
                playlist.isPrivate = isPrivate;
                this.showToast('Playlist aktualisiert');
            }
        } else {
            // Create new
            const newPlaylist = {
                id: Date.now(),
                title,
                description,
                isPrivate,
                coverImage: 'https://via.placeholder.com/200x200/ff5500/ffffff?text=' + title.charAt(0),
                trackCount: 0,
                createdDate: new Date().toISOString().split('T')[0],
                plays: 0,
                likes: 0,
                tracks: []
            };
            this.data.playlists.push(newPlaylist);
            this.showToast('Playlist erstellt');
        }

        this.hideModal('playlist-modal');
        this.renderPlaylists();
    }

    deletePlaylist(id) {
        const playlist = this.data.playlists.find(p => p.id === id);
        if (playlist) {
            this.showConfirmDialog(
                'Playlist löschen',
                `Möchten Sie die Playlist "${playlist.title}" wirklich löschen?`,
                () => {
                    this.data.playlists = this.data.playlists.filter(p => p.id !== id);
                    this.renderPlaylists();
                    this.showToast('Playlist gelöscht');
                }
            );
        }
    }

    // Tracks
    renderTracks() {
        const list = document.getElementById('tracks-list');
        if (!list) return;

        const searchInput = document.getElementById('track-search');
        const sortSelect = document.getElementById('track-sort');
        
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const sortBy = sortSelect ? sortSelect.value : 'name';

        let tracks = [...this.data.tracks];

        // Filter
        if (searchTerm) {
            tracks = tracks.filter(t => 
                t.title.toLowerCase().includes(searchTerm) ||
                t.genre.toLowerCase().includes(searchTerm) ||
                (t.tags && t.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
            );
        }

        // Sort
        tracks.sort((a, b) => {
            switch(sortBy) {
                case 'name':
                    return a.title.localeCompare(b.title);
                case 'date':
                    return new Date(b.uploadDate) - new Date(a.uploadDate);
                case 'duration':
                    return a.duration.localeCompare(b.duration);
                case 'plays':
                    return b.plays - a.plays;
                default:
                    return 0;
            }
        });

        list.innerHTML = '';

        tracks.forEach(track => {
            const item = document.createElement('div');
            item.className = 'track-item';
            item.innerHTML = `
                <img src="${track.coverImage}" alt="${track.title}" class="track-cover">
                <div class="track-info">
                    <div class="track-title">${track.title}</div>
                    <div class="track-meta">${track.genre} • ${this.formatDate(track.uploadDate)}</div>
                </div>
                <div class="track-duration">${track.duration}</div>
                <div class="track-plays">${this.formatNumber(track.plays)} Plays</div>
                <div class="track-actions">
                    <button class="action-btn track-edit-btn" data-track-id="${track.id}">Bearbeiten</button>
                    <button class="action-btn track-share-btn" data-track-id="${track.id}">Teilen</button>
                    <button class="action-btn danger track-delete-btn" data-track-id="${track.id}">Löschen</button>
                </div>
            `;
            list.appendChild(item);
        });

        // Bind track action buttons
        document.querySelectorAll('.track-edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const trackId = parseInt(e.target.getAttribute('data-track-id'));
                this.editTrack(trackId);
            });
        });

        document.querySelectorAll('.track-share-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const trackId = parseInt(e.target.getAttribute('data-track-id'));
                this.shareItem('track', trackId);
            });
        });

        document.querySelectorAll('.track-delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const trackId = parseInt(e.target.getAttribute('data-track-id'));
                this.deleteTrack(trackId);
            });
        });
    }

    editTrack(id) {
        this.editingItem = id ? this.data.tracks.find(t => t.id === id) : { 
            id: null, 
            title: '', 
            description: '', 
            genre: 'Electronic',
            tags: [],
            isPrivate: false,
            downloadEnabled: true,
            commentsEnabled: true
        };
        
        const modalTitle = document.getElementById('track-modal-title');
        const titleInput = document.getElementById('track-title');
        const descInput = document.getElementById('track-description');
        const genreSelect = document.getElementById('track-genre');
        const tagsInput = document.getElementById('track-tags');
        const privateCheck = document.getElementById('track-private');
        const downloadCheck = document.getElementById('track-download');
        const commentsCheck = document.getElementById('track-comments');
        const coverPreview = document.getElementById('track-cover-preview');
        
        if (modalTitle) modalTitle.textContent = id ? 'Track bearbeiten' : 'Neuer Track';
        if (titleInput) titleInput.value = this.editingItem.title || '';
        if (descInput) descInput.value = this.editingItem.description || '';
        if (genreSelect) genreSelect.value = this.editingItem.genre || 'Electronic';
        if (tagsInput) tagsInput.value = this.editingItem.tags ? this.editingItem.tags.join(', ') : '';
        if (privateCheck) privateCheck.checked = this.editingItem.isPrivate || false;
        if (downloadCheck) downloadCheck.checked = this.editingItem.downloadEnabled !== false;
        if (commentsCheck) commentsCheck.checked = this.editingItem.commentsEnabled !== false;
        
        if (this.editingItem.coverImage && coverPreview) {
            coverPreview.src = this.editingItem.coverImage;
            coverPreview.classList.remove('hidden');
        }
        
        this.showModal('track-modal');
    }

    saveTrack() {
        const titleInput = document.getElementById('track-title');
        const descInput = document.getElementById('track-description');
        const genreSelect = document.getElementById('track-genre');
        const tagsInput = document.getElementById('track-tags');
        const privateCheck = document.getElementById('track-private');
        const downloadCheck = document.getElementById('track-download');
        const commentsCheck = document.getElementById('track-comments');
        
        const title = titleInput ? titleInput.value.trim() : '';
        const description = descInput ? descInput.value.trim() : '';
        const genre = genreSelect ? genreSelect.value : 'Electronic';
        const tags = tagsInput ? tagsInput.value.split(',').map(t => t.trim()).filter(t => t) : [];
        const isPrivate = privateCheck ? privateCheck.checked : false;
        const downloadEnabled = downloadCheck ? downloadCheck.checked : true;
        const commentsEnabled = commentsCheck ? commentsCheck.checked : true;
        
        if (!title) {
            this.showToast('Bitte geben Sie einen Titel ein', 'error');
            return;
        }

        if (this.editingItem && this.editingItem.id) {
            // Update existing
            const track = this.data.tracks.find(t => t.id === this.editingItem.id);
            if (track) {
                track.title = title;
                track.description = description;
                track.genre = genre;
                track.tags = tags;
                track.isPrivate = isPrivate;
                track.downloadEnabled = downloadEnabled;
                track.commentsEnabled = commentsEnabled;
                this.showToast('Track aktualisiert');
            }
        } else {
            // Create new
            const newTrack = {
                id: Date.now(),
                title,
                description,
                genre,
                tags,
                isPrivate,
                downloadEnabled,
                commentsEnabled,
                duration: '5:30',
                mood: 'Energetic',
                uploadDate: new Date().toISOString().split('T')[0],
                plays: 0,
                likes: 0,
                downloads: 0,
                comments: 0,
                coverImage: 'https://via.placeholder.com/200x200/ff5500/ffffff?text=' + title.charAt(0)
            };
            this.data.tracks.push(newTrack);
            this.showToast('Track erstellt');
        }

        this.hideModal('track-modal');
        this.renderTracks();
    }

    deleteTrack(id) {
        const track = this.data.tracks.find(t => t.id === id);
        if (track) {
            this.showConfirmDialog(
                'Track löschen',
                `Möchten Sie den Track "${track.title}" wirklich löschen?`,
                () => {
                    this.data.tracks = this.data.tracks.filter(t => t.id !== id);
                    this.renderTracks();
                    this.showToast('Track gelöscht');
                }
            );
        }
    }

    // Upload
    showUploadModal() {
        this.showModal('upload-modal');
    }

    simulateUpload(file) {
        const progressContainer = document.getElementById('progress-container');
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        
        if (progressContainer) progressContainer.classList.remove('hidden');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            if (progressFill) progressFill.style.width = `${progress}%`;
            if (progressText) progressText.textContent = `${Math.round(progress)}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    this.hideModal('upload-modal');
                    this.editTrack(null);
                }, 500);
            }
        }, 200);
    }

    // Share
    shareItem(type, id) {
        const item = type === 'playlist' 
            ? this.data.playlists.find(p => p.id === id)
            : this.data.tracks.find(t => t.id === id);
        
        if (item) {
            const url = `https://soundcloud.com/${type}/${item.title.toLowerCase().replace(/\s+/g, '-')}`;
            const shareLinkInput = document.getElementById('share-link');
            if (shareLinkInput) {
                shareLinkInput.value = url;
            }
            this.showModal('share-modal');
        }
    }

    copyLink() {
        const linkInput = document.getElementById('share-link');
        if (linkInput) {
            linkInput.select();
            try {
                document.execCommand('copy');
                this.showToast('Link kopiert');
            } catch (err) {
                this.showToast('Link wurde ausgewählt', 'info');
            }
        }
    }

    shareToSocial(platform) {
        const linkInput = document.getElementById('share-link');
        const link = linkInput ? linkInput.value : '';
        const message = `Check out this amazing track on SoundCloud: ${link}`;
        
        let shareUrl = '';
        switch(platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
                break;
            case 'instagram':
                this.showToast('Instagram Link wurde kopiert', 'info');
                return;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    }

    // Insights
    renderInsights() {
        // Add a small delay to ensure the canvas elements are visible
        setTimeout(() => {
            this.renderPlaysChart();
            this.renderReferralChart();
            this.renderTopTracks();
            this.renderGeographicData();
        }, 100);
    }

    renderPlaysChart() {
        const canvas = document.getElementById('plays-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        if (this.charts.playsChart) {
            this.charts.playsChart.destroy();
        }
        
        this.charts.playsChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.data.insights.playsOverTime.map(d => 
                    new Intl.DateTimeFormat('de-DE', { month: 'short', day: 'numeric' }).format(new Date(d.date))
                ),
                datasets: [{
                    label: 'Plays',
                    data: this.data.insights.playsOverTime.map(d => d.plays),
                    borderColor: '#ff5500',
                    backgroundColor: 'rgba(255, 85, 0, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return new Intl.NumberFormat('de-DE').format(value);
                            }
                        }
                    }
                }
            }
        });
    }

    renderReferralChart() {
        const canvas = document.getElementById('referral-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        if (this.charts.referralChart) {
            this.charts.referralChart.destroy();
        }
        
        const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'];
        
        this.charts.referralChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: this.data.insights.referralSources.map(r => r.source),
                datasets: [{
                    data: this.data.insights.referralSources.map(r => r.percentage),
                    backgroundColor: colors.slice(0, this.data.insights.referralSources.length),
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    renderTopTracks() {
        const container = document.getElementById('top-tracks-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.data.insights.topTracks.forEach((track, index) => {
            const item = document.createElement('div');
            item.className = 'top-tracks-item';
            item.innerHTML = `
                <div>${index + 1}. ${track.title}</div>
                <div>${this.formatNumber(track.plays)} Plays</div>
            `;
            container.appendChild(item);
        });
    }

    renderGeographicData() {
        const container = document.getElementById('geographic-data');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.data.insights.geographicData.forEach(country => {
            const item = document.createElement('div');
            item.className = 'geographic-item';
            item.innerHTML = `
                <div>${country.country}</div>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: ${country.percentage}%"></div>
                </div>
                <div>${country.percentage}%</div>
            `;
            container.appendChild(item);
        });
    }

    // Modal Management
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
            
            // Reset forms
            const form = modal.querySelector('form');
            if (form) form.reset();
            
            // Hide preview images
            const previews = modal.querySelectorAll('img');
            previews.forEach(img => img.classList.add('hidden'));
        }
    }

    showConfirmDialog(title, message, callback) {
        const titleEl = document.getElementById('confirm-title');
        const messageEl = document.getElementById('confirm-message');
        
        if (titleEl) titleEl.textContent = title;
        if (messageEl) messageEl.textContent = message;
        
        this.confirmCallback = callback;
        this.showModal('confirm-modal');
    }

    confirmAction() {
        if (this.confirmCallback) {
            this.confirmCallback();
            this.confirmCallback = null;
        }
        this.hideModal('confirm-modal');
    }

    // Event Handlers
    bindEvents() {
        console.log('Binding events...');

        // Connect new account button
        const connectBtn = document.getElementById('connect-new-btn');
        if (connectBtn) {
            connectBtn.addEventListener('click', () => this.connectNewAccount());
        }

        // Account switcher
        const switcherBtn = document.getElementById('account-switcher');
        if (switcherBtn) {
            switcherBtn.addEventListener('click', () => this.switchAccount());
        }

        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.getAttribute('data-section');
                if (section) {
                    this.showSection(section);
                }
            });
        });

        // Dashboard actions
        const uploadBtn = document.getElementById('upload-track-btn');
        if (uploadBtn) {
            uploadBtn.addEventListener('click', () => this.showUploadModal());
        }

        const createPlaylistBtn = document.getElementById('create-playlist-btn');
        if (createPlaylistBtn) {
            createPlaylistBtn.addEventListener('click', () => this.editPlaylist(null));
        }

        // Section actions
        const newPlaylistBtn = document.getElementById('new-playlist-btn');
        if (newPlaylistBtn) {
            newPlaylistBtn.addEventListener('click', () => this.editPlaylist(null));
        }

        const newTrackBtn = document.getElementById('new-track-btn');
        if (newTrackBtn) {
            newTrackBtn.addEventListener('click', () => this.showUploadModal());
        }

        // Search and sort
        const playlistSearch = document.getElementById('playlist-search');
        if (playlistSearch) {
            playlistSearch.addEventListener('input', () => this.renderPlaylists());
        }

        const playlistSort = document.getElementById('playlist-sort');
        if (playlistSort) {
            playlistSort.addEventListener('change', () => this.renderPlaylists());
        }

        const trackSearch = document.getElementById('track-search');
        if (trackSearch) {
            trackSearch.addEventListener('input', () => this.renderTracks());
        }

        const trackSort = document.getElementById('track-sort');
        if (trackSort) {
            trackSort.addEventListener('change', () => this.renderTracks());
        }

        const insightsRange = document.getElementById('insights-timerange');
        if (insightsRange) {
            insightsRange.addEventListener('change', () => this.renderInsights());
        }

        // Modal close events
        document.querySelectorAll('.modal-close, .modal-backdrop').forEach(element => {
            element.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal && (e.target.classList.contains('modal-close') || e.target.classList.contains('modal-backdrop'))) {
                    this.hideModal(modal.id);
                }
            });
        });

        // Prevent modal content clicks from closing modal
        document.querySelectorAll('.modal-content').forEach(content => {
            content.addEventListener('click', (e) => e.stopPropagation());
        });

        // Form submissions
        const playlistForm = document.getElementById('playlist-form');
        if (playlistForm) {
            playlistForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.savePlaylist();
            });
        }
        
        const trackForm = document.getElementById('track-form');
        if (trackForm) {
            trackForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveTrack();
            });
        }

        // Modal cancel buttons
        const playlistCancel = document.getElementById('playlist-cancel');
        if (playlistCancel) {
            playlistCancel.addEventListener('click', () => this.hideModal('playlist-modal'));
        }

        const trackCancel = document.getElementById('track-cancel');
        if (trackCancel) {
            trackCancel.addEventListener('click', () => this.hideModal('track-modal'));
        }

        const uploadCancel = document.getElementById('upload-cancel');
        if (uploadCancel) {
            uploadCancel.addEventListener('click', () => this.hideModal('upload-modal'));
        }

        // Confirm dialog
        const confirmOk = document.getElementById('confirm-ok');
        if (confirmOk) {
            confirmOk.addEventListener('click', () => this.confirmAction());
        }

        const confirmCancel = document.getElementById('confirm-cancel');
        if (confirmCancel) {
            confirmCancel.addEventListener('click', () => this.hideModal('confirm-modal'));
        }

        // File uploads
        const fileInput = document.getElementById('file-input');
        const uploadArea = document.getElementById('upload-area');
        
        if (uploadArea && fileInput) {
            uploadArea.addEventListener('click', () => fileInput.click());
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('dragover');
            });
            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('dragover');
            });
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
                const files = e.dataTransfer.files;
                if (files[0]) this.simulateUpload(files[0]);
            });
        }
        
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                if (e.target.files[0]) this.simulateUpload(e.target.files[0]);
            });
        }

        // Cover image uploads
        const playlistCoverUpload = document.getElementById('playlist-cover-upload');
        const playlistCoverInput = document.getElementById('playlist-cover-input');
        
        if (playlistCoverUpload && playlistCoverInput) {
            playlistCoverUpload.addEventListener('click', () => playlistCoverInput.click());
        }

        const trackCoverUpload = document.getElementById('track-cover-upload');
        const trackCoverInput = document.getElementById('track-cover-input');
        
        if (trackCoverUpload && trackCoverInput) {
            trackCoverUpload.addEventListener('click', () => trackCoverInput.click());
        }
        
        if (playlistCoverInput) {
            playlistCoverInput.addEventListener('change', (e) => {
                if (e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const preview = document.getElementById('playlist-cover-preview');
                        if (preview) {
                            preview.src = e.target.result;
                            preview.classList.remove('hidden');
                        }
                    };
                    reader.readAsDataURL(e.target.files[0]);
                }
            });
        }
        
        if (trackCoverInput) {
            trackCoverInput.addEventListener('change', (e) => {
                if (e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const preview = document.getElementById('track-cover-preview');
                        if (preview) {
                            preview.src = e.target.result;
                            preview.classList.remove('hidden');
                        }
                    };
                    reader.readAsDataURL(e.target.files[0]);
                }
            });
        }

        // Share modal
        const copyLinkBtn = document.getElementById('copy-link-btn');
        if (copyLinkBtn) {
            copyLinkBtn.addEventListener('click', () => this.copyLink());
        }

        document.querySelectorAll('.social-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const platform = btn.getAttribute('data-platform');
                if (platform) {
                    this.shareToSocial(platform);
                }
            });
        });

        console.log('Events bound successfully');
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    window.app = new SoundCloudManager();
    window.app.init();
});

// Also initialize if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        if (!window.app) {
            console.log('DOM loaded (backup), initializing app...');
            window.app = new SoundCloudManager();
            window.app.init();
        }
    });
} else {
    console.log('DOM already loaded, initializing app...');
    window.app = new SoundCloudManager();
    window.app.init();
}