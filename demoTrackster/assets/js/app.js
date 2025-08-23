// demoTrackster App JavaScript - Complete Functionality

class DemoTrackster {
    constructor() {
        this.data = {
            demo_submissions: [],
            track_library: [],
            playlists: [],
            label_database: [],
            text_templates: [],
            analytics: {}
        };
        
        this.currentSection = 'dashboard';
        this.filteredSubmissions = [];
        this.charts = {};
        this.currentEditId = null;
        this.currentEditType = null;
        
        this.init();
    }

    async init() {
        await this.loadSampleData();
        this.setupEventListeners();
        this.renderDashboard();
        this.renderSubmissions();
        this.renderTracks();
        this.renderPlaylists();
        this.renderLabels();
        this.renderTemplates();
        this.setupMobileNavigation();
        this.calculateAnalytics();
    }

    async loadSampleData() {
        // Sample data based on the provided structure
        this.data = {
            demo_submissions: [
                {
                    id: 1,
                    recipient: "Ametist Records",
                    contact_person: "Thorsten Hammer",
                    email: "demos@ametist-records.com",
                    status: "responded",
                    date_submitted: "2025-08-20",
                    playlist_url: "https://soundcloud.com/artist/deep-house-demos-2025",
                    tracks: ["Deep Journey", "Midnight Echo", "Urban Nights"],
                    response_details: "Er bittet um eine neue Playlist mit fertigen, vollständigen Tracks und weiteren Infos",
                    response_date: "2025-08-21",
                    plays: 0,
                    genre: "Deep House",
                    priority: "high"
                },
                {
                    id: 2,
                    recipient: "Stil vor Talent",
                    contact_person: "Till Schröder",
                    email: "demo@stilvortalent.com",
                    status: "responded",
                    date_submitted: "2025-08-20",
                    playlist_url: "https://soundcloud.com/artist/electronic-minimal-set",
                    tracks: ["Minimal Space", "Berlin Nights"],
                    response_details: "Ihre E-Mail wurde erhalten und die Demos werden angehört. Bearbeitung kann länger dauern",
                    response_date: "2025-08-20",
                    plays: 0,
                    genre: "Minimal Techno",
                    priority: "medium"
                },
                {
                    id: 3,
                    recipient: "Kittball",
                    email: "demos@kittball.com",
                    status: "responded",
                    date_submitted: "2025-08-20",
                    submission_method: "trackstack",
                    tracks: ["Groove Theory", "Bass Culture"],
                    response_details: "Demos sent per trackstack",
                    response_date: "2025-08-20",
                    plays: 0,
                    genre: "Tech House",
                    priority: "medium"
                },
                {
                    id: 4,
                    recipient: "Steyoyke",
                    email: "demo@steyoyke.com",
                    status: "responded",
                    date_submitted: "2025-08-19",
                    submission_method: "form",
                    submission_url: "https://www.steyoyke.com/submit-your-demo/",
                    tracks: ["Progressive Dreams", "Melodic Path"],
                    response_details: "Demos sent per form",
                    plays: 12,
                    genre: "Progressive House",
                    priority: "high"
                },
                {
                    id: 5,
                    recipient: "Plastic City",
                    contact_person: "Thorsten Kriebus",
                    email: "demos@plasticcity.com",
                    status: "interested",
                    date_submitted: "2025-08-19",
                    tracks: ["City Lights", "Neon Dreams"],
                    response_details: "Er möchte einige Ihrer Tracks für Plastic City auswählen",
                    response_date: "2025-08-19",
                    plays: 0,
                    genre: "Deep House",
                    priority: "high"
                },
                {
                    id: 6,
                    recipient: "Monaberry",
                    email: "info@monaberry.com",
                    status: "responded",
                    date_submitted: "2025-08-19",
                    tracks: ["Berry House", "Sweet Melody"],
                    response_details: "Erhalt der E-Mail wurde am 19.08.2025 um 21:22 Uhr bestätigt",
                    response_date: "2025-08-19",
                    plays: 6,
                    genre: "Melodic House",
                    priority: "medium"
                },
                {
                    id: 7,
                    recipient: "Feel Hype",
                    email: "demo@feelhype.com",
                    status: "pending",
                    date_submitted: "2025-08-19",
                    tracks: ["Track A1", "Track B1"],
                    response_details: "Demo sent to Feel Hype",
                    plays: 0,
                    genre: "Progressive House",
                    priority: "high"
                },
                {
                    id: 8,
                    recipient: "TerminalM",
                    email: "demo@terminalm.com",
                    status: "pending",
                    date_submitted: "2025-08-19",
                    tracks: ["Track A2", "Track B2"],
                    response_details: "Demo sent to TerminalM",
                    plays: 0,
                    genre: "Deep House",
                    priority: "low"
                },
                {
                    id: 9,
                    recipient: "Watergate",
                    email: "demo@watergate.com",
                    status: "pending",
                    date_submitted: "2025-08-19",
                    tracks: ["Track A3", "Track B3"],
                    response_details: "Demo sent to Watergate",
                    plays: 0,
                    genre: "Techno",
                    priority: "medium"
                },
                {
                    id: 10,
                    recipient: "Einmusika",
                    email: "demo@einmusika.com",
                    status: "pending",
                    date_submitted: "2025-08-19",
                    tracks: ["Track A4", "Track B4"],
                    response_details: "Demo sent to Einmusika",
                    plays: 0,
                    genre: "Tech House",
                    priority: "medium"
                },
                // Add failed deliveries
                {
                    id: 11,
                    recipient: "Drumma Records",
                    email: "demos@drumma.com",
                    status: "failed",
                    date_submitted: "2025-08-19",
                    tracks: ["Demo Track 1"],
                    response_details: "vorübergehendes Problem",
                    plays: 0,
                    genre: "Techno",
                    priority: "low"
                },
                {
                    id: 12,
                    recipient: "Katermukke",
                    email: "demos@katermukke.com",
                    status: "failed",
                    date_submitted: "2025-08-19",
                    tracks: ["Demo Track 2"],
                    response_details: "Adresse nicht gefunden",
                    plays: 0,
                    genre: "Deep House",
                    priority: "low"
                }
            ],
            track_library: [
                {id: 1, title: "Deep Journey", genre: "Deep House", bpm: 122, key: "Am", duration: "6:32"},
                {id: 2, title: "Midnight Echo", genre: "Deep House", bpm: 124, key: "Fm", duration: "7:15"},
                {id: 3, title: "Urban Nights", genre: "Deep House", bpm: 126, key: "Gm", duration: "6:45"},
                {id: 4, title: "Minimal Space", genre: "Minimal Techno", bpm: 128, key: "Em", duration: "8:22"},
                {id: 5, title: "Berlin Nights", genre: "Minimal Techno", bpm: 130, key: "Dm", duration: "7:58"},
                {id: 6, title: "Groove Theory", genre: "Tech House", bpm: 125, key: "Cm", duration: "6:15"},
                {id: 7, title: "Bass Culture", genre: "Tech House", bpm: 127, key: "Bbm", duration: "6:44"},
                {id: 8, title: "Progressive Dreams", genre: "Progressive House", bpm: 124, key: "Am", duration: "8:15"},
                {id: 9, title: "Melodic Path", genre: "Progressive House", bpm: 126, key: "Gm", duration: "7:33"},
                {id: 10, title: "City Lights", genre: "Deep House", bpm: 123, key: "Fm", duration: "6:28"}
            ],
            playlists: [
                {
                    id: 1,
                    name: "Deep House Demos 2025",
                    url: "https://soundcloud.com/artist/deep-house-demos-2025",
                    platform: "SoundCloud",
                    tracks: ["Deep Journey", "Midnight Echo", "Urban Nights"],
                    created_date: "2025-08-15"
                },
                {
                    id: 2,
                    name: "Electronic Minimal Set",
                    url: "https://soundcloud.com/artist/electronic-minimal-set",
                    platform: "SoundCloud", 
                    tracks: ["Minimal Space", "Berlin Nights"],
                    created_date: "2025-08-18"
                },
                {
                    id: 3,
                    name: "Tech House Collection",
                    url: "https://soundcloud.com/artist/tech-house-collection",
                    platform: "SoundCloud",
                    tracks: ["Groove Theory", "Bass Culture"],
                    created_date: "2025-08-12"
                }
            ],
            label_database: [
                {
                    id: 1,
                    name: "Ametist Records",
                    email: "demos@ametist-records.com",
                    website: "https://ametist-records.com",
                    genre: ["Deep House", "Melodic Techno"],
                    country: "Germany",
                    contact_person: "Thorsten Hammer",
                    submission_guidelines: "Send 3-4 finished tracks, no demos",
                    response_time: "2-4 weeks",
                    submission_method: "email"
                },
                {
                    id: 2,
                    name: "Stil vor Talent",
                    email: "demo@stilvortalent.com",
                    website: "https://stilvortalent.com",
                    genre: ["Minimal Techno", "Progressive House"],
                    country: "Germany",
                    contact_person: "Till Schröder",
                    submission_guidelines: "Quality over quantity, focus on melody",
                    response_time: "4-6 weeks",
                    submission_method: "email"
                },
                {
                    id: 3,
                    name: "Kittball",
                    email: "demos@kittball.com",
                    website: "https://kittball.com",
                    genre: ["Tech House", "Deep House"],
                    country: "Germany",
                    submission_guidelines: "Use Trackstack for submissions",
                    response_time: "2-3 weeks",
                    submission_method: "trackstack"
                }
            ],
            text_templates: [
                {
                    id: 1,
                    name: "Standard Demo Submission",
                    subject: "Demo Submission - {artist_name} - {track_titles}",
                    body: `Hello {contact_person},

I hope this email finds you well. My name is {artist_name} and I'm a producer/DJ from {location}.

I'm reaching out to submit some of my latest tracks for your consideration for {label_name}. I've been following your releases and believe my music would be a great fit for your catalog.

Please find my demo tracks here: {playlist_url}

Tracks included:
{track_list}

I'd be thrilled to discuss a potential collaboration. Thank you for your time and consideration.

Best regards,
{artist_name}
{contact_info}`
                },
                {
                    id: 2,
                    name: "Follow-up Template",
                    subject: "Follow-up: Demo Submission - {artist_name}",
                    body: `Hello {contact_person},

I hope you're doing well. I wanted to follow up on my demo submission sent on {submission_date}.

I understand you receive many submissions and appreciate your time in reviewing my music. If you need any additional information or have any feedback, I'd be happy to provide it.

Original submission: {playlist_url}

Thank you again for your consideration.

Best regards,
{artist_name}`
                }
            ]
        };

        this.filteredSubmissions = [...this.data.demo_submissions];
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.showSection(section);
            });
        });

        // Mobile navigation toggle
        document.getElementById('sidebarToggle')?.addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('active');
        });

        // Search
        document.getElementById('globalSearch')?.addEventListener('input', (e) => {
            this.handleGlobalSearch(e.target.value);
        });

        // Add buttons
        document.getElementById('addSubmissionBtn')?.addEventListener('click', () => {
            this.openSubmissionModal();
        });

        document.getElementById('addTrackBtn')?.addEventListener('click', () => {
            this.openTrackModal();
        });

        document.getElementById('addPlaylistBtn')?.addEventListener('click', () => {
            this.openPlaylistModal();
        });

        document.getElementById('addLabelBtn')?.addEventListener('click', () => {
            this.openLabelModal();
        });

        document.getElementById('addTemplateBtn')?.addEventListener('click', () => {
            this.openTemplateModal();
        });

        // Filters
        document.getElementById('statusFilter')?.addEventListener('change', () => {
            this.applyFilters();
        });

        document.getElementById('genreFilter')?.addEventListener('change', () => {
            this.applyFilters();
        });

        document.getElementById('dateFromFilter')?.addEventListener('change', () => {
            this.applyFilters();
        });

        document.getElementById('dateToFilter')?.addEventListener('change', () => {
            this.applyFilters();
        });

        document.getElementById('clearFilters')?.addEventListener('click', () => {
            this.clearFilters();
        });

        // Export buttons
        document.getElementById('exportCSV')?.addEventListener('click', () => {
            this.exportToCSV();
        });

        document.getElementById('exportPDF')?.addEventListener('click', () => {
            this.exportToPDF();
        });

        document.getElementById('exportJSON')?.addEventListener('click', () => {
            this.exportToJSON();
        });

        // Modal close buttons
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                this.closeModal();
            });
        });

        // Form submissions
        document.getElementById('submissionForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveSubmission();
        });

        document.getElementById('trackForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveTrack();
        });

        document.getElementById('playlistForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.savePlaylist();
        });

        document.getElementById('labelForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveLabel();
        });

        document.getElementById('templateForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveTemplate();
        });

        // Form cancel buttons
        document.getElementById('cancelSubmission')?.addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('cancelTrack')?.addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('cancelPlaylist')?.addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('cancelLabel')?.addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('cancelTemplate')?.addEventListener('click', () => {
            this.closeModal();
        });

        // Click outside modal to close
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal();
            }
        });
    }

    showSection(sectionName) {
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`)?.classList.add('active');

        // Update content
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionName)?.classList.add('active');

        this.currentSection = sectionName;

        // Render section-specific content if needed
        if (sectionName === 'dashboard') {
            this.renderDashboard();
        }
    }

    calculateAnalytics() {
        const submissions = this.data.demo_submissions;
        const totalSubmissions = submissions.length;
        const responded = submissions.filter(s => s.status === 'responded' || s.status === 'interested').length;
        const pending = submissions.filter(s => s.status === 'pending').length;
        const failed = submissions.filter(s => s.status === 'failed').length;
        const totalPlays = submissions.reduce((sum, s) => sum + (s.plays || 0), 0);

        this.data.analytics = {
            total_submissions: totalSubmissions,
            total_responses: responded,
            total_pending: pending,
            total_failed: failed,
            response_rate: totalSubmissions > 0 ? Math.round((responded / totalSubmissions) * 100 * 10) / 10 : 0,
            total_plays: totalPlays,
            submissions_this_month: submissions.filter(s => s.date_submitted?.includes('2025-08')).length
        };
    }

    renderDashboard() {
        this.calculateAnalytics();
        const analytics = this.data.analytics;

        // Update stat cards
        document.getElementById('totalSubmissions').textContent = analytics.total_submissions;
        document.getElementById('responseRate').textContent = `${analytics.response_rate}%`;
        document.getElementById('pendingResponses').textContent = analytics.total_pending;
        document.getElementById('failedDeliveries').textContent = analytics.total_failed;
        document.getElementById('totalPlays').textContent = analytics.total_plays;
        document.getElementById('thisMonthSubmissions').textContent = analytics.submissions_this_month;

        // Render charts
        this.renderCharts();

        // Render activity feed
        this.renderActivityFeed();
    }

    renderCharts() {
        // Status Chart
        const statusCtx = document.getElementById('statusChart');
        if (statusCtx && !this.charts.status) {
            this.charts.status = new Chart(statusCtx, {
                type: 'pie',
                data: {
                    labels: ['Responded', 'Pending', 'Failed', 'Interested'],
                    datasets: [{
                        data: [
                            this.data.demo_submissions.filter(s => s.status === 'responded').length,
                            this.data.demo_submissions.filter(s => s.status === 'pending').length,
                            this.data.demo_submissions.filter(s => s.status === 'failed').length,
                            this.data.demo_submissions.filter(s => s.status === 'interested').length
                        ],
                        backgroundColor: [
                            '#10B981', // Green
                            '#F59E0B', // Yellow
                            '#EF4444', // Red
                            '#3B82F6'  // Blue
                        ],
                        borderWidth: 2,
                        borderColor: '#1E293B'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            labels: {
                                color: '#E2E8F0'
                            }
                        }
                    }
                }
            });
        }

        // Genre Chart
        const genreCtx = document.getElementById('genreChart');
        if (genreCtx && !this.charts.genre) {
            const genreCounts = {};
            this.data.demo_submissions.forEach(s => {
                genreCounts[s.genre] = (genreCounts[s.genre] || 0) + 1;
            });

            this.charts.genre = new Chart(genreCtx, {
                type: 'bar',
                data: {
                    labels: Object.keys(genreCounts),
                    datasets: [{
                        label: 'Submissions',
                        data: Object.values(genreCounts),
                        backgroundColor: '#00D4FF',
                        borderColor: '#00D4FF',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            ticks: { color: '#E2E8F0' },
                            grid: { color: '#374151' }
                        },
                        y: {
                            ticks: { color: '#E2E8F0' },
                            grid: { color: '#374151' }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: { color: '#E2E8F0' }
                        }
                    }
                }
            });
        }

        // Timeline Chart
        const timelineCtx = document.getElementById('timelineChart');
        if (timelineCtx && !this.charts.timeline) {
            const dateCounts = {};
            this.data.demo_submissions.forEach(s => {
                dateCounts[s.date_submitted] = (dateCounts[s.date_submitted] || 0) + 1;
            });

            const sortedDates = Object.keys(dateCounts).sort();

            this.charts.timeline = new Chart(timelineCtx, {
                type: 'line',
                data: {
                    labels: sortedDates,
                    datasets: [{
                        label: 'Daily Submissions',
                        data: sortedDates.map(date => dateCounts[date]),
                        borderColor: '#10B981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            ticks: { color: '#E2E8F0' },
                            grid: { color: '#374151' }
                        },
                        y: {
                            ticks: { color: '#E2E8F0' },
                            grid: { color: '#374151' }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: { color: '#E2E8F0' }
                        }
                    }
                }
            });
        }
    }

    renderActivityFeed() {
        const activityFeed = document.getElementById('activityFeed');
        if (!activityFeed) return;

        // Get recent activities (last 5 submissions)
        const recentSubmissions = this.data.demo_submissions
            .sort((a, b) => new Date(b.date_submitted) - new Date(a.date_submitted))
            .slice(0, 5);

        activityFeed.innerHTML = recentSubmissions.map(submission => `
            <div class="activity-item">
                <div class="activity-icon" style="background: ${this.getStatusColor(submission.status)}">
                    ${this.getStatusIcon(submission.status)}
                </div>
                <div class="activity-content">
                    <h4>Demo sent to ${submission.recipient}</h4>
                    <p>${submission.tracks.join(', ')} • ${submission.date_submitted}</p>
                </div>
            </div>
        `).join('');
    }

    renderSubmissions() {
        const tbody = document.getElementById('submissionsTableBody');
        if (!tbody) return;

        tbody.innerHTML = this.filteredSubmissions.map(submission => `
            <tr>
                <td><input type="checkbox" data-id="${submission.id}"></td>
                <td>
                    <div>
                        <strong>${submission.recipient}</strong>
                        ${submission.contact_person ? `<br><small style="color: #94A3B8;">${submission.contact_person}</small>` : ''}
                    </div>
                </td>
                <td><span class="status-badge status-badge--${submission.status}">${submission.status}</span></td>
                <td>${submission.date_submitted}</td>
                <td>${submission.tracks.join(', ')}</td>
                <td style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    ${submission.response_details}
                </td>
                <td>${submission.plays || 0}</td>
                <td>
                    <button class="btn btn--secondary" style="padding: 4px 8px; font-size: 0.8rem;" onclick="demoTrackster.editSubmission(${submission.id})">Edit</button>
                    <button class="btn btn--secondary" style="padding: 4px 8px; font-size: 0.8rem; background: #EF4444;" onclick="demoTrackster.deleteSubmission(${submission.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    renderTracks() {
        const tracksGrid = document.getElementById('tracksGrid');
        if (!tracksGrid) return;

        tracksGrid.innerHTML = this.data.track_library.map(track => `
            <div class="track-card">
                <div class="card-header">
                    <div>
                        <h3 class="card-title">${track.title}</h3>
                        <p class="card-subtitle">${track.genre}</p>
                    </div>
                    <div class="card-actions">
                        <button class="btn btn--secondary" style="padding: 4px 8px; font-size: 0.8rem;" onclick="demoTrackster.editTrack(${track.id})">Edit</button>
                        <button class="btn btn--secondary" style="padding: 4px 8px; font-size: 0.8rem; background: #EF4444;" onclick="demoTrackster.deleteTrack(${track.id})">Delete</button>
                    </div>
                </div>
                <div class="card-meta">
                    <span class="meta-item">🎵 ${track.bpm} BPM</span>
                    <span class="meta-item">🎹 ${track.key}</span>
                    <span class="meta-item">⏱️ ${track.duration}</span>
                </div>
            </div>
        `).join('');
    }

    renderPlaylists() {
        const playlistsGrid = document.getElementById('playlistsGrid');
        if (!playlistsGrid) return;

        playlistsGrid.innerHTML = this.data.playlists.map(playlist => `
            <div class="playlist-card">
                <div class="card-header">
                    <div>
                        <h3 class="card-title">${playlist.name}</h3>
                        <p class="card-subtitle">${playlist.platform}</p>
                    </div>
                    <div class="card-actions">
                        <button class="btn btn--secondary" style="padding: 4px 8px; font-size: 0.8rem;" onclick="demoTrackster.editPlaylist(${playlist.id})">Edit</button>
                        <button class="btn btn--secondary" style="padding: 4px 8px; font-size: 0.8rem; background: #EF4444;" onclick="demoTrackster.deletePlaylist(${playlist.id})">Delete</button>
                    </div>
                </div>
                <div class="card-meta">
                    <span class="meta-item">🎵 ${playlist.tracks.length} tracks</span>
                    <span class="meta-item">📅 ${playlist.created_date}</span>
                    ${playlist.url ? `<a href="${playlist.url}" target="_blank" class="meta-item" style="color: #00D4FF;">🔗 View</a>` : ''}
                </div>
                <div style="margin-top: 12px; font-size: 0.8rem; color: #94A3B8;">
                    ${playlist.tracks.join(', ')}
                </div>
            </div>
        `).join('');
    }

    renderLabels() {
        const labelsGrid = document.getElementById('labelsGrid');
        if (!labelsGrid) return;

        labelsGrid.innerHTML = this.data.label_database.map(label => `
            <div class="label-card">
                <div class="card-header">
                    <div>
                        <h3 class="card-title">${label.name}</h3>
                        <p class="card-subtitle">${label.country}</p>
                    </div>
                    <div class="card-actions">
                        <button class="btn btn--secondary" style="padding: 4px 8px; font-size: 0.8rem;" onclick="demoTrackster.editLabel(${label.id})">Edit</button>
                        <button class="btn btn--secondary" style="padding: 4px 8px; font-size: 0.8rem; background: #EF4444;" onclick="demoTrackster.deleteLabel(${label.id})">Delete</button>
                    </div>
                </div>
                <div class="card-meta">
                    <span class="meta-item">📧 ${label.email}</span>
                    <span class="meta-item">⏱️ ${label.response_time}</span>
                    <span class="meta-item">📝 ${label.submission_method}</span>
                </div>
                <div style="margin-top: 12px; font-size: 0.8rem; color: #94A3B8;">
                    <strong>Genres:</strong> ${Array.isArray(label.genre) ? label.genre.join(', ') : label.genre}
                </div>
                ${label.submission_guidelines ? `<div style="margin-top: 8px; font-size: 0.8rem; color: #94A3B8;">
                    <strong>Guidelines:</strong> ${label.submission_guidelines}
                </div>` : ''}
            </div>
        `).join('');
    }

    renderTemplates() {
        const templatesList = document.getElementById('templatesList');
        if (!templatesList) return;

        templatesList.innerHTML = this.data.text_templates.map(template => `
            <div class="template-item">
                <div class="template-header">
                    <h3 class="template-name">${template.name}</h3>
                    <div class="card-actions">
                        <button class="btn btn--secondary" style="padding: 4px 8px; font-size: 0.8rem;" onclick="demoTrackster.editTemplate(${template.id})">Edit</button>
                        <button class="btn btn--secondary" style="padding: 4px 8px; font-size: 0.8rem; background: #EF4444;" onclick="demoTrackster.deleteTemplate(${template.id})">Delete</button>
                    </div>
                </div>
                <div class="template-subject">Subject: ${template.subject}</div>
                <div class="template-body">${template.body}</div>
            </div>
        `).join('');
    }

    // Modal functions
    openSubmissionModal(id = null) {
        this.currentEditId = id;
        this.currentEditType = 'submission';
        
        const modal = document.getElementById('submissionModal');
        const title = document.getElementById('submissionModalTitle');
        
        if (id) {
            title.textContent = 'Edit Submission';
            const submission = this.data.demo_submissions.find(s => s.id === id);
            if (submission) {
                document.getElementById('submissionLabel').value = submission.recipient;
                document.getElementById('submissionEmail').value = submission.email;
                document.getElementById('submissionContact').value = submission.contact_person || '';
                document.getElementById('submissionGenre').value = submission.genre;
                document.getElementById('submissionPlaylist').value = submission.playlist_url || '';
                document.getElementById('submissionTracks').value = submission.tracks.join('\n');
                document.getElementById('submissionPriority').value = submission.priority;
                document.getElementById('submissionStatus').value = submission.status;
            }
        } else {
            title.textContent = 'Add New Submission';
            document.getElementById('submissionForm').reset();
        }
        
        modal.classList.add('active');
    }

    openTrackModal(id = null) {
        this.currentEditId = id;
        this.currentEditType = 'track';
        
        const modal = document.getElementById('trackModal');
        const title = document.getElementById('trackModalTitle');
        
        if (id) {
            title.textContent = 'Edit Track';
            const track = this.data.track_library.find(t => t.id === id);
            if (track) {
                document.getElementById('trackTitle').value = track.title;
                document.getElementById('trackGenre').value = track.genre;
                document.getElementById('trackBPM').value = track.bpm;
                document.getElementById('trackKey').value = track.key;
                document.getElementById('trackDuration').value = track.duration;
            }
        } else {
            title.textContent = 'Add New Track';
            document.getElementById('trackForm').reset();
        }
        
        modal.classList.add('active');
    }

    openPlaylistModal(id = null) {
        this.currentEditId = id;
        this.currentEditType = 'playlist';
        
        const modal = document.getElementById('playlistModal');
        const title = document.getElementById('playlistModalTitle');
        
        // Populate track selector
        const trackSelector = document.getElementById('trackSelector');
        if (trackSelector) {
            trackSelector.innerHTML = this.data.track_library.map(track => `
                <div class="track-option">
                    <input type="checkbox" id="track_${track.id}" value="${track.title}">
                    <label for="track_${track.id}">${track.title} (${track.genre})</label>
                </div>
            `).join('');
        }
        
        if (id) {
            title.textContent = 'Edit Playlist';
            const playlist = this.data.playlists.find(p => p.id === id);
            if (playlist) {
                document.getElementById('playlistName').value = playlist.name;
                document.getElementById('playlistPlatform').value = playlist.platform;
                document.getElementById('playlistURL').value = playlist.url;
                
                // Check selected tracks
                playlist.tracks.forEach(trackTitle => {
                    const checkbox = document.querySelector(`input[value="${trackTitle}"]`);
                    if (checkbox) checkbox.checked = true;
                });
            }
        } else {
            title.textContent = 'Create New Playlist';
            document.getElementById('playlistForm').reset();
        }
        
        modal.classList.add('active');
    }

    openLabelModal(id = null) {
        this.currentEditId = id;
        this.currentEditType = 'label';
        
        const modal = document.getElementById('labelModal');
        const title = document.getElementById('labelModalTitle');
        
        if (id) {
            title.textContent = 'Edit Label';
            const label = this.data.label_database.find(l => l.id === id);
            if (label) {
                document.getElementById('labelName').value = label.name;
                document.getElementById('labelEmail').value = label.email;
                document.getElementById('labelContact').value = label.contact_person || '';
                document.getElementById('labelCountry').value = label.country || '';
                document.getElementById('labelWebsite').value = label.website || '';
                document.getElementById('labelGenres').value = Array.isArray(label.genre) ? label.genre.join(', ') : label.genre;
                document.getElementById('labelResponseTime').value = label.response_time || '';
                document.getElementById('labelSubmissionMethod').value = label.submission_method || '';
                document.getElementById('labelGuidelines').value = label.submission_guidelines || '';
            }
        } else {
            title.textContent = 'Add New Label';
            document.getElementById('labelForm').reset();
        }
        
        modal.classList.add('active');
    }

    openTemplateModal(id = null) {
        this.currentEditId = id;
        this.currentEditType = 'template';
        
        const modal = document.getElementById('templateModal');
        const title = document.getElementById('templateModalTitle');
        
        if (id) {
            title.textContent = 'Edit Template';
            const template = this.data.text_templates.find(t => t.id === id);
            if (template) {
                document.getElementById('templateName').value = template.name;
                document.getElementById('templateSubject').value = template.subject;
                document.getElementById('templateBody').value = template.body;
            }
        } else {
            title.textContent = 'Create New Template';
            document.getElementById('templateForm').reset();
        }
        
        modal.classList.add('active');
    }

    closeModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        this.currentEditId = null;
        this.currentEditType = null;
    }

    // Save functions
    saveSubmission() {
        const formData = {
            recipient: document.getElementById('submissionLabel').value,
            email: document.getElementById('submissionEmail').value,
            contact_person: document.getElementById('submissionContact').value,
            genre: document.getElementById('submissionGenre').value,
            playlist_url: document.getElementById('submissionPlaylist').value,
            tracks: document.getElementById('submissionTracks').value.split('\n').filter(t => t.trim()),
            priority: document.getElementById('submissionPriority').value,
            status: document.getElementById('submissionStatus').value,
            date_submitted: new Date().toISOString().split('T')[0],
            plays: 0,
            response_details: `Demo sent to ${document.getElementById('submissionLabel').value}`
        };

        if (this.currentEditId) {
            // Edit existing
            const index = this.data.demo_submissions.findIndex(s => s.id === this.currentEditId);
            if (index !== -1) {
                this.data.demo_submissions[index] = { ...this.data.demo_submissions[index], ...formData };
            }
        } else {
            // Add new
            const newId = Math.max(...this.data.demo_submissions.map(s => s.id)) + 1;
            this.data.demo_submissions.push({ id: newId, ...formData });
        }

        this.closeModal();
        this.renderSubmissions();
        this.renderDashboard();
        this.applyFilters();
    }

    saveTrack() {
        const formData = {
            title: document.getElementById('trackTitle').value,
            genre: document.getElementById('trackGenre').value,
            bpm: parseInt(document.getElementById('trackBPM').value) || 0,
            key: document.getElementById('trackKey').value,
            duration: document.getElementById('trackDuration').value
        };

        if (this.currentEditId) {
            // Edit existing
            const index = this.data.track_library.findIndex(t => t.id === this.currentEditId);
            if (index !== -1) {
                this.data.track_library[index] = { ...this.data.track_library[index], ...formData };
            }
        } else {
            // Add new
            const newId = Math.max(...this.data.track_library.map(t => t.id)) + 1;
            this.data.track_library.push({ id: newId, ...formData });
        }

        this.closeModal();
        this.renderTracks();
    }

    savePlaylist() {
        const selectedTracks = Array.from(document.querySelectorAll('#trackSelector input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value);

        const formData = {
            name: document.getElementById('playlistName').value,
            platform: document.getElementById('playlistPlatform').value,
            url: document.getElementById('playlistURL').value,
            tracks: selectedTracks,
            created_date: new Date().toISOString().split('T')[0]
        };

        if (this.currentEditId) {
            // Edit existing
            const index = this.data.playlists.findIndex(p => p.id === this.currentEditId);
            if (index !== -1) {
                this.data.playlists[index] = { ...this.data.playlists[index], ...formData };
            }
        } else {
            // Add new
            const newId = Math.max(...this.data.playlists.map(p => p.id)) + 1;
            this.data.playlists.push({ id: newId, ...formData });
        }

        this.closeModal();
        this.renderPlaylists();
    }

    saveLabel() {
        const formData = {
            name: document.getElementById('labelName').value,
            email: document.getElementById('labelEmail').value,
            contact_person: document.getElementById('labelContact').value,
            country: document.getElementById('labelCountry').value,
            website: document.getElementById('labelWebsite').value,
            genre: document.getElementById('labelGenres').value.split(',').map(g => g.trim()),
            response_time: document.getElementById('labelResponseTime').value,
            submission_method: document.getElementById('labelSubmissionMethod').value,
            submission_guidelines: document.getElementById('labelGuidelines').value
        };

        if (this.currentEditId) {
            // Edit existing
            const index = this.data.label_database.findIndex(l => l.id === this.currentEditId);
            if (index !== -1) {
                this.data.label_database[index] = { ...this.data.label_database[index], ...formData };
            }
        } else {
            // Add new
            const newId = Math.max(...this.data.label_database.map(l => l.id)) + 1;
            this.data.label_database.push({ id: newId, ...formData });
        }

        this.closeModal();
        this.renderLabels();
    }

    saveTemplate() {
        const formData = {
            name: document.getElementById('templateName').value,
            subject: document.getElementById('templateSubject').value,
            body: document.getElementById('templateBody').value
        };

        if (this.currentEditId) {
            // Edit existing
            const index = this.data.text_templates.findIndex(t => t.id === this.currentEditId);
            if (index !== -1) {
                this.data.text_templates[index] = { ...this.data.text_templates[index], ...formData };
            }
        } else {
            // Add new
            const newId = Math.max(...this.data.text_templates.map(t => t.id)) + 1;
            this.data.text_templates.push({ id: newId, ...formData });
        }

        this.closeModal();
        this.renderTemplates();
    }

    // Edit functions
    editSubmission(id) {
        this.openSubmissionModal(id);
    }

    editTrack(id) {
        this.openTrackModal(id);
    }

    editPlaylist(id) {
        this.openPlaylistModal(id);
    }

    editLabel(id) {
        this.openLabelModal(id);
    }

    editTemplate(id) {
        this.openTemplateModal(id);
    }

    // Delete functions
    deleteSubmission(id) {
        if (confirm('Are you sure you want to delete this submission?')) {
            this.data.demo_submissions = this.data.demo_submissions.filter(s => s.id !== id);
            this.renderSubmissions();
            this.renderDashboard();
            this.applyFilters();
        }
    }

    deleteTrack(id) {
        if (confirm('Are you sure you want to delete this track?')) {
            this.data.track_library = this.data.track_library.filter(t => t.id !== id);
            this.renderTracks();
        }
    }

    deletePlaylist(id) {
        if (confirm('Are you sure you want to delete this playlist?')) {
            this.data.playlists = this.data.playlists.filter(p => p.id !== id);
            this.renderPlaylists();
        }
    }

    deleteLabel(id) {
        if (confirm('Are you sure you want to delete this label?')) {
            this.data.label_database = this.data.label_database.filter(l => l.id !== id);
            this.renderLabels();
        }
    }

    deleteTemplate(id) {
        if (confirm('Are you sure you want to delete this template?')) {
            this.data.text_templates = this.data.text_templates.filter(t => t.id !== id);
            this.renderTemplates();
        }
    }

    // Filter and search functions
    applyFilters() {
        const statusFilter = document.getElementById('statusFilter')?.value;
        const genreFilter = document.getElementById('genreFilter')?.value;
        const dateFromFilter = document.getElementById('dateFromFilter')?.value;
        const dateToFilter = document.getElementById('dateToFilter')?.value;

        this.filteredSubmissions = this.data.demo_submissions.filter(submission => {
            if (statusFilter && submission.status !== statusFilter) return false;
            if (genreFilter && submission.genre !== genreFilter) return false;
            if (dateFromFilter && submission.date_submitted < dateFromFilter) return false;
            if (dateToFilter && submission.date_submitted > dateToFilter) return false;
            return true;
        });

        this.renderSubmissions();
    }

    clearFilters() {
        document.getElementById('statusFilter').value = '';
        document.getElementById('genreFilter').value = '';
        document.getElementById('dateFromFilter').value = '';
        document.getElementById('dateToFilter').value = '';
        this.filteredSubmissions = [...this.data.demo_submissions];
        this.renderSubmissions();
    }

    handleGlobalSearch(query) {
        if (!query.trim()) {
            this.filteredSubmissions = [...this.data.demo_submissions];
        } else {
            const searchTerm = query.toLowerCase();
            this.filteredSubmissions = this.data.demo_submissions.filter(submission =>
                submission.recipient.toLowerCase().includes(searchTerm) ||
                submission.genre.toLowerCase().includes(searchTerm) ||
                submission.tracks.some(track => track.toLowerCase().includes(searchTerm)) ||
                (submission.contact_person && submission.contact_person.toLowerCase().includes(searchTerm))
            );
        }
        this.renderSubmissions();
    }

    // Export functions
    exportToCSV() {
        const headers = ['Recipient', 'Email', 'Status', 'Date Submitted', 'Tracks', 'Response Details', 'Plays', 'Genre', 'Priority'];
        const csvContent = [
            headers.join(','),
            ...this.filteredSubmissions.map(sub => [
                sub.recipient,
                sub.email,
                sub.status,
                sub.date_submitted,
                `"${sub.tracks.join(', ')}"`,
                `"${sub.response_details}"`,
                sub.plays || 0,
                sub.genre,
                sub.priority
            ].join(','))
        ].join('\n');

        this.downloadFile(csvContent, 'demo_submissions.csv', 'text/csv');
    }

    exportToPDF() {
        alert('PDF export feature coming soon!');
    }

    exportToJSON() {
        const jsonContent = JSON.stringify(this.filteredSubmissions, null, 2);
        this.downloadFile(jsonContent, 'demo_submissions.json', 'application/json');
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    // Utility functions
    getStatusColor(status) {
        const colors = {
            pending: '#F59E0B',
            responded: '#10B981',
            interested: '#3B82F6',
            failed: '#EF4444'
        };
        return colors[status] || '#6B7280';
    }

    getStatusIcon(status) {
        const icons = {
            pending: '⏳',
            responded: '✅',
            interested: '🎯',
            failed: '❌'
        };
        return icons[status] || '📧';
    }

    setupMobileNavigation() {
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            const sidebar = document.getElementById('sidebar');
            const sidebarToggle = document.getElementById('sidebarToggle');
            
            if (window.innerWidth <= 1024) {
                if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                    sidebar.classList.remove('active');
                }
            }
        });
    }
}

// Initialize the application
const demoTrackster = new DemoTrackster();