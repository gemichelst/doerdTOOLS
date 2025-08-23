class StudioNet {
    constructor() {
        this.currentSection = 'dashboard';
        this.currentTrack = null;
        this.isPlaying = false;
        this.currentTime = 0;
        this.duration = 0;
        this.volume = 75;
        this.playbackSpeed = 1;
        this.loopEnabled = false;
        this.loopStart = 0;
        this.loopEnd = 0;
        this.searchFilters = {};
        this.draggedTask = null;
        this.notifications = [];
        this.editingTask = null;
        
        // Load data from provided JSON
        this.data = {
            projects: [
                {
                    id: 1,
                    name: "Summer Vibes EP",
                    type: "Ableton Live",
                    version: "1.3",
                    lastModified: "2024-08-20T14:30:00",
                    collaborators: ["Alex Chen", "Maya Rodriguez"],
                    status: "In Progress",
                    format: ".als",
                    size: "45.2 MB",
                    description: "Uplifting electronic EP with summer themes",
                    genre: "Electronic",
                    bpm: 128,
                    key: "C Major",
                    tags: ["summer", "electronic", "uplifting"],
                    backupStatus: "Up to date",
                    lastBackup: "2024-08-20T14:25:00"
                },
                {
                    id: 2,
                    name: "Bass Heavy Track",
                    type: "FL Studio",
                    version: "2.1",
                    lastModified: "2024-08-19T16:45:00",
                    collaborators: ["David Kim"],
                    status: "Complete",
                    format: ".flp",
                    size: "78.5 MB",
                    description: "Heavy bass dubstep track with aggressive synths",
                    genre: "Dubstep",
                    bpm: 140,
                    key: "E Minor",
                    tags: ["dubstep", "bass", "aggressive"],
                    backupStatus: "Up to date",
                    lastBackup: "2024-08-19T16:40:00"
                },
                {
                    id: 3,
                    name: "Ambient Soundscape",
                    type: "Bitwig Studio",
                    version: "1.0",
                    lastModified: "2024-08-18T11:20:00",
                    collaborators: ["Sarah Johnson", "Alex Chen"],
                    status: "Review",
                    format: ".bwproject",
                    size: "123.8 MB",
                    description: "Atmospheric ambient piece for meditation",
                    genre: "Ambient",
                    bpm: 80,
                    key: "A Minor",
                    tags: ["ambient", "atmospheric", "meditation"],
                    backupStatus: "Backup needed",
                    lastBackup: "2024-08-17T09:15:00"
                },
                {
                    id: 4,
                    name: "Hip Hop Beats Collection",
                    type: "Maschine",
                    version: "1.2",
                    lastModified: "2024-08-17T13:10:00",
                    collaborators: ["Maya Rodriguez", "David Kim"],
                    status: "In Progress",
                    format: ".mmp",
                    size: "67.3 MB",
                    description: "Collection of hip hop beats with various styles",
                    genre: "Hip Hop",
                    bpm: 95,
                    key: "G Minor",
                    tags: ["hip-hop", "beats", "collection"],
                    backupStatus: "Up to date",
                    lastBackup: "2024-08-17T13:05:00"
                }
            ],
            samples: [
                {
                    id: 1,
                    name: "Deep House Kick",
                    category: "Drums",
                    bpm: 128,
                    key: "C",
                    genre: "House",
                    duration: "0:02",
                    size: "1.2 MB",
                    tags: ["kick", "house", "punchy"],
                    uploadDate: "2024-08-15",
                    favorite: false,
                    description: "Punchy deep house kick drum",
                    waveformData: [0.1, 0.8, 0.9, 0.7, 0.3, 0.1, 0.0, 0.1]
                },
                {
                    id: 2,
                    name: "Analog Bass Synth",
                    category: "Bass",
                    bpm: 120,
                    key: "A",
                    genre: "Electronic",
                    duration: "0:08",
                    size: "3.5 MB",
                    tags: ["bass", "analog", "warm"],
                    uploadDate: "2024-08-14",
                    favorite: true,
                    description: "Warm analog bass synthesizer",
                    waveformData: [0.2, 0.4, 0.6, 0.8, 0.9, 0.7, 0.5, 0.3, 0.2, 0.1, 0.3, 0.5, 0.7, 0.6, 0.4, 0.2]
                },
                {
                    id: 3,
                    name: "Ethereal Pad",
                    category: "Leads",
                    bpm: 140,
                    key: "Dm",
                    genre: "Ambient",
                    duration: "0:15",
                    size: "5.8 MB",
                    tags: ["pad", "atmospheric", "dreamy"],
                    uploadDate: "2024-08-13",
                    favorite: false,
                    description: "Dreamy atmospheric pad sound",
                    waveformData: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1]
                }
            ],
            lyrics: [
                {
                    id: 1,
                    title: "Summer Nights",
                    artist: "Maya Rodriguez",
                    version: "2.1",
                    lastModified: "2024-08-19T10:30:00",
                    content: "**Verse 1:**\nWalking down the boulevard tonight\nCity lights are burning bright\nFeeling like we own this place\nEvery star lights up your face\n\n**Chorus:**\nThese summer nights will never end\nWith you my heart will always mend\nDancing till the break of dawn\nIn your arms I feel reborn\n\n**Verse 2:**\nMusic playing from the street\nMoving to the perfect beat\nNothing else matters now\nIn this moment we know how",
                    collaborators: ["Alex Chen"],
                    genre: "Pop",
                    mood: "Uplifting",
                    language: "English",
                    wordCount: 58,
                    versions: [
                        {"version": "1.0", "date": "2024-08-15", "changes": "Initial draft"},
                        {"version": "2.0", "date": "2024-08-18", "changes": "Added second verse"},
                        {"version": "2.1", "date": "2024-08-19", "changes": "Minor lyric adjustments"}
                    ]
                },
                {
                    id: 2,
                    title: "Digital Dreams",
                    artist: "David Kim",
                    version: "1.0",
                    lastModified: "2024-08-17T15:20:00",
                    content: "**Verse 1:**\nLost in the machine's embrace\nPixels dancing in cyberspace\nNeural pathways intertwined\nLeaving reality behind\n\n**Chorus:**\nDigital dreams come alive\nIn this world we can't survive\nBinary beats pulse through my veins\nNothing left but data chains",
                    collaborators: [],
                    genre: "Electronic",
                    mood: "Dark",
                    language: "English",
                    wordCount: 42,
                    versions: [
                        {"version": "1.0", "date": "2024-08-17", "changes": "Initial complete version"}
                    ]
                }
            ],
            tracks: [
                {
                    id: 1,
                    title: "Midnight Drive",
                    artist: "Alex Chen",
                    genre: "Synthwave",
                    duration: "4:23",
                    bpm: 85,
                    key: "Am",
                    uploadDate: "2024-08-18T09:15:00",
                    rating: 4.5,
                    status: "Final",
                    size: "12.5 MB",
                    waveformData: [0.1, 0.3, 0.5, 0.7, 0.9, 0.8, 0.6, 0.4, 0.2, 0.3, 0.5, 0.7, 0.8, 0.6, 0.4, 0.2, 0.1, 0.3, 0.5, 0.6],
                    comments: [
                        {
                            id: 1,
                            user: "Maya Rodriguez",
                            timestamp: "1:45",
                            text: "Love the synth lead that comes in here!",
                            time: "2024-08-19T10:30:00",
                            resolved: false
                        },
                        {
                            id: 2,
                            user: "David Kim",
                            timestamp: "2:15",
                            text: "Maybe add some reverb to the snare?",
                            time: "2024-08-19T14:22:00",
                            resolved: false
                        }
                    ]
                },
                {
                    id: 2,
                    title: "Urban Jungle",
                    artist: "Maya Rodriguez",
                    genre: "Hip Hop",
                    duration: "3:56",
                    bpm: 95,
                    key: "Gm",
                    uploadDate: "2024-08-16T14:30:00",
                    rating: 4.8,
                    status: "Mastering",
                    size: "15.2 MB",
                    waveformData: [0.2, 0.4, 0.6, 0.8, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6, 0.8, 0.9, 0.7, 0.5, 0.3, 0.2, 0.4, 0.6, 0.8, 0.7],
                    comments: [
                        {
                            id: 3,
                            user: "Sarah Johnson",
                            timestamp: "0:32",
                            text: "The bass line is incredible!",
                            time: "2024-08-17T09:15:00",
                            resolved: true
                        }
                    ]
                }
            ],
            tasks: [
                {
                    id: 1,
                    title: "Mix vocals for Summer Vibes",
                    description: "Apply compression and EQ to vocal tracks",
                    assignee: "Alex Chen",
                    status: "In Progress",
                    priority: "High",
                    dueDate: "2024-08-25",
                    createdDate: "2024-08-18",
                    createdFrom: "comment",
                    project: "Summer Vibes EP",
                    estimatedHours: 4,
                    completedHours: 2,
                    tags: ["mixing", "vocals"]
                },
                {
                    id: 2,
                    title: "Master final track",
                    description: "Final mastering pass for commercial release",
                    assignee: "David Kim",
                    status: "To Do",
                    priority: "Medium",
                    dueDate: "2024-08-30",
                    createdDate: "2024-08-17",
                    project: "Bass Heavy Track",
                    estimatedHours: 3,
                    completedHours: 0,
                    tags: ["mastering", "final"]
                },
                {
                    id: 3,
                    title: "Record guitar overdubs",
                    description: "Add additional guitar layers to ambient sections",
                    assignee: "Sarah Johnson",
                    status: "Review",
                    priority: "Low",
                    dueDate: "2024-08-28",
                    createdDate: "2024-08-16",
                    project: "Ambient Soundscape",
                    estimatedHours: 2,
                    completedHours: 2,
                    tags: ["recording", "guitar"]
                },
                {
                    id: 4,
                    title: "Update sample library tags",
                    description: "Organize and retag all drum samples",
                    assignee: "Maya Rodriguez",
                    status: "Done",
                    priority: "Low",
                    dueDate: "2024-08-22",
                    createdDate: "2024-08-15",
                    project: "General",
                    estimatedHours: 1,
                    completedHours: 1,
                    tags: ["organization", "samples"]
                }
            ],
            licenses: [
                {
                    id: 1,
                    software: "Ableton Live 12 Suite",
                    company: "Ableton",
                    type: "Perpetual",
                    serialNumber: "ABLT-2024-XXXX-XXXX",
                    purchaseDate: "2024-01-15",
                    expirationDate: null,
                    status: "Active",
                    category: "DAW",
                    price: "$749",
                    assignedTo: "Alex Chen",
                    notes: "Primary DAW license"
                },
                {
                    id: 2,
                    software: "Serum",
                    company: "Xfer Records",
                    type: "Subscription",
                    serialNumber: "XFR-SERUM-2024-XXXX",
                    purchaseDate: "2024-03-10",
                    expirationDate: "2025-03-10",
                    status: "Active",
                    category: "Plugin",
                    price: "$9.99/month",
                    assignedTo: "Maya Rodriguez",
                    notes: "Rent-to-own plan"
                },
                {
                    id: 3,
                    software: "Kontakt 7",
                    company: "Native Instruments",
                    type: "Perpetual",
                    serialNumber: "NI-KTK7-XXXX-XXXX",
                    purchaseDate: "2023-11-20",
                    expirationDate: null,
                    status: "Active",
                    category: "Plugin",
                    price: "$399",
                    assignedTo: "David Kim",
                    notes: "Full version with all libraries"
                }
            ],
            midiDevices: [
                {
                    id: 1,
                    name: "Arturia KeyLab Essential 61",
                    manufacturer: "Arturia",
                    type: "Keyboard Controller",
                    image: "/api/placeholder/300/200",
                    controls: {
                        keys: 61,
                        knobs: 8,
                        faders: 0,
                        pads: 0,
                        buttons: 4
                    },
                    mappings: [
                        {
                            id: 1,
                            control: "Knob 1",
                            type: "CC",
                            number: 74,
                            behavior: "Continuous",
                            description: "Filter Cutoff",
                            min: 0,
                            max: 127
                        },
                        {
                            id: 2,
                            control: "Knob 2",
                            type: "CC",
                            number: 71,
                            behavior: "Continuous",
                            description: "Resonance",
                            min: 0,
                            max: 127
                        }
                    ],
                    presets: ["Default", "Ableton", "Logic", "Cubase"]
                },
                {
                    id: 2,
                    name: "Akai MPK Mini MK3",
                    manufacturer: "Akai",
                    type: "Compact Controller",
                    image: "/api/placeholder/300/200",
                    controls: {
                        keys: 25,
                        knobs: 8,
                        faders: 0,
                        pads: 8,
                        buttons: 2
                    },
                    mappings: [
                        {
                            id: 3,
                            control: "Pad 1",
                            type: "Note",
                            number: 36,
                            behavior: "Momentary",
                            description: "Kick Drum",
                            min: 0,
                            max: 127
                        },
                        {
                            id: 4,
                            control: "Pad 2",
                            type: "Note",
                            number: 38,
                            behavior: "Momentary",
                            description: "Snare Drum",
                            min: 0,
                            max: 127
                        }
                    ],
                    presets: ["Drums", "Synths", "Custom"]
                }
            ],
            users: [
                {
                    id: 1,
                    name: "Alex Chen",
                    role: "Producer",
                    avatar: "/api/placeholder/100/100",
                    status: "online",
                    specialties: ["Electronic", "Mixing"],
                    email: "alex@studionet.com",
                    joinDate: "2024-01-15",
                    projectsCompleted: 12,
                    hoursLogged: 156
                },
                {
                    id: 2,
                    name: "Maya Rodriguez",
                    role: "Vocalist",
                    avatar: "/api/placeholder/100/100",
                    status: "online",
                    specialties: ["Vocals", "Songwriting"],
                    email: "maya@studionet.com",
                    joinDate: "2024-02-01",
                    projectsCompleted: 8,
                    hoursLogged: 89
                },
                {
                    id: 3,
                    name: "David Kim",
                    role: "Sound Engineer",
                    avatar: "/api/placeholder/100/100",
                    status: "away",
                    specialties: ["Mastering", "Mixing"],
                    email: "david@studionet.com",
                    joinDate: "2024-01-20",
                    projectsCompleted: 15,
                    hoursLogged: 203
                },
                {
                    id: 4,
                    name: "Sarah Johnson",
                    role: "Composer",
                    avatar: "/api/placeholder/100/100",
                    status: "offline",
                    specialties: ["Composition", "Arrangement"],
                    email: "sarah@studionet.com",
                    joinDate: "2024-03-10",
                    projectsCompleted: 6,
                    hoursLogged: 72
                }
            ]
        };
        
        this.init();
    }
    
    init() {
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupAudioPlayer();
        this.setupModals();
        this.setupQuickActions();
        this.setupSearch();
        this.setupTaskDragDrop();
        this.setupKeyboardShortcuts();
        this.renderAllSections();
        this.updateDashboard();
        setTimeout(() => {
            this.showNotification('Welcome to studioNet!', 'Ready to create amazing music together.', 'info');
        }, 1000);
    }
    
    // Navigation - Fixed implementation
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const section = item.dataset.section;
                if (section) {
                    this.navigateToSection(section);
                    this.closeMobileMenu();
                }
            });
        });

        // Stat card navigation
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const action = card.dataset.action;
                if (action) {
                    this.navigateToSection(action);
                }
            });
        });
    }
    
    setupMobileMenu() {
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mobile-overlay');
        const closeBtn = document.getElementById('sidebar-close');
        
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => this.openMobileMenu());
        }
        
        if (overlay) {
            overlay.addEventListener('click', () => this.closeMobileMenu());
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeMobileMenu());
        }
    }
    
    openMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mobile-overlay');
        
        if (sidebar) sidebar.classList.add('active');
        if (overlay) overlay.classList.add('active');
    }
    
    closeMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mobile-overlay');
        
        if (sidebar) sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    }
    
    navigateToSection(section) {
        console.log('Navigating to section:', section);
        
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const targetNavItem = document.querySelector(`[data-section="${section}"]`);
        if (targetNavItem) {
            targetNavItem.classList.add('active');
        }
        
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(sec => {
            sec.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(section);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = section;
            
            // Re-render section if needed
            setTimeout(() => {
                this.renderCurrentSection();
            }, 100);
        } else {
            console.error('Section not found:', section);
        }
    }
    
    renderCurrentSection() {
        switch(this.currentSection) {
            case 'dashboard':
                this.updateDashboard();
                break;
            case 'projects':
                this.renderProjects();
                break;
            case 'samples':
                this.renderSamples();
                break;
            case 'lyrics':
                this.renderLyrics();
                break;
            case 'tracks':
                this.renderTracks();
                break;
            case 'tasks':
                this.renderTasks();
                break;
            case 'licenses':
                this.renderLicenses();
                break;
            case 'devices':
                this.renderDevices();
                break;
            case 'users':
                this.renderUsers();
                break;
        }
    }
    
    // Dashboard
    updateDashboard() {
        // Update statistics
        const activeProjects = this.data.projects.filter(p => p.status !== 'Complete').length;
        const pendingTasks = this.data.tasks.filter(t => t.status !== 'Done').length;
        
        this.updateElementText('active-projects-count', activeProjects);
        this.updateElementText('samples-count', this.data.samples.length);
        this.updateElementText('pending-tasks-count', pendingTasks);
        this.updateElementText('team-members-count', this.data.users.length);
        
        // Update activity feed
        this.renderActivityFeed();
        
        // Draw progress chart
        setTimeout(() => this.drawProgressChart(), 200);
    }
    
    updateElementText(id, text) {
        const element = document.getElementById(id);
        if (element) element.textContent = text;
    }
    
    renderActivityFeed() {
        const activityList = document.getElementById('activity-list');
        if (!activityList) return;
        
        // Generate recent activity from data
        const activities = [];
        
        // Add recent projects
        this.data.projects.slice(0, 3).forEach(project => {
            activities.push({
                icon: 'fas fa-folder-open',
                title: project.name,
                description: `Updated by ${project.collaborators[0] || 'Unknown'} • ${this.getTimeAgo(project.lastModified)}`,
                status: project.status,
                type: 'project'
            });
        });
        
        // Add recent tasks
        this.data.tasks.filter(t => t.status === 'Done').slice(0, 2).forEach(task => {
            activities.push({
                icon: 'fas fa-check-circle',
                title: task.title,
                description: `Completed by ${task.assignee} • ${this.getTimeAgo(task.createdDate)}`,
                status: 'complete',
                type: 'task'
            });
        });
        
        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <i class="${activity.icon}"></i>
                <div class="activity-content">
                    <h4>${activity.title}</h4>
                    <p>${activity.description}</p>
                </div>
                <span class="status status--${this.getStatusClass(activity.status)}">${activity.status}</span>
            </div>
        `).join('');
    }
    
    getTimeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return '1 day ago';
        return `${diffDays} days ago`;
    }
    
    getStatusClass(status) {
        const statusMap = {
            'Complete': 'complete',
            'In Progress': 'progress',
            'Review': 'review',
            'To Do': 'progress',
            'Done': 'complete',
            'complete': 'complete'
        };
        return statusMap[status] || 'progress';
    }
    
    drawProgressChart() {
        const canvas = document.getElementById('progress-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.clearRect(0, 0, width, height);
        
        // Calculate project status data
        const statusCounts = {};
        this.data.projects.forEach(project => {
            statusCounts[project.status] = (statusCounts[project.status] || 0) + 1;
        });
        
        const colors = {
            'Complete': '#00ff00',
            'In Progress': '#ffa500',
            'Review': '#8B5CF6'
        };
        
        const total = Object.values(statusCounts).reduce((a, b) => a + b, 0);
        if (total === 0) return;
        
        let currentAngle = 0;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(centerX, centerY) - 20;
        
        // Draw pie chart
        Object.entries(statusCounts).forEach(([status, count]) => {
            const sliceAngle = (count / total) * 2 * Math.PI;
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.lineTo(centerX, centerY);
            ctx.fillStyle = colors[status] || '#666';
            ctx.fill();
            
            // Draw label
            const labelAngle = currentAngle + sliceAngle / 2;
            const labelX = centerX + Math.cos(labelAngle) * (radius + 15);
            const labelY = centerY + Math.sin(labelAngle) * (radius + 15);
            
            ctx.fillStyle = '#ffffff';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(status, labelX, labelY);
            
            currentAngle += sliceAngle;
        });
    }
    
    // Quick Actions
    setupQuickActions() {
        // Dashboard quick action buttons
        document.addEventListener('click', (e) => {
            const target = e.target.closest('[data-action]');
            if (target) {
                e.preventDefault();
                e.stopPropagation();
                const action = target.dataset.action;
                this.handleQuickAction(action);
                return;
            }

            // Handle other button clicks
            if (e.target.closest('#upload-project-btn')) {
                e.preventDefault();
                this.showUploadProject();
            } else if (e.target.closest('#upload-sample-btn')) {
                e.preventDefault();
                this.showUploadSample();
            } else if (e.target.closest('#new-lyrics-btn')) {
                e.preventDefault();
                this.showCreateLyrics();
            } else if (e.target.closest('#new-task-btn')) {
                e.preventDefault();
                this.showTaskModal();
            } else if (e.target.closest('#add-license-btn')) {
                e.preventDefault();
                this.showAddLicense();
            } else if (e.target.closest('#add-device-btn')) {
                e.preventDefault();
                this.showAddDevice();
            } else if (e.target.closest('#invite-user-btn')) {
                e.preventDefault();
                this.showInviteUser();
            } else if (e.target.closest('#refresh-dashboard')) {
                e.preventDefault();
                this.refreshDashboard();
            }
        });
    }
    
    handleQuickAction(action) {
        switch(action) {
            case 'upload-project':
                this.navigateToSection('projects');
                setTimeout(() => this.showUploadProject(), 300);
                break;
            case 'add-sample':
                this.navigateToSection('samples');
                setTimeout(() => this.showUploadSample(), 300);
                break;
            case 'new-task':
                this.navigateToSection('tasks');
                setTimeout(() => this.showTaskModal(), 300);
                break;
            case 'invite-user':
                this.navigateToSection('users');
                setTimeout(() => this.showInviteUser(), 300);
                break;
            case 'projects':
                this.navigateToSection('projects');
                break;
            case 'samples':
                this.navigateToSection('samples');
                break;
            case 'tasks':
                this.navigateToSection('tasks');
                break;
            case 'users':
                this.navigateToSection('users');
                break;
        }
    }
    
    refreshDashboard() {
        this.showNotification('Dashboard Refreshed', 'All data has been updated.', 'success');
        this.updateDashboard();
    }
    
    // Search and Filters - Fixed implementation
    setupSearch() {
        const searchInputs = document.querySelectorAll('[id$="-search"]');
        const filterSelects = document.querySelectorAll('[id$="-filter"], [id$="-category"]');
        
        searchInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const section = e.target.id.replace('-search', '');
                this.searchFilters[section] = { ...this.searchFilters[section], search: e.target.value };
                this.applyFilters(section);
            });
        });
        
        filterSelects.forEach(select => {
            select.addEventListener('change', (e) => {
                const section = e.target.id.replace('-filter', '').replace('-category', '');
                const filterType = e.target.id.includes('category') ? 'category' : 'filter';
                this.searchFilters[section] = { ...this.searchFilters[section], [filterType]: e.target.value };
                this.applyFilters(section);
            });
        });
        
        // View toggles
        const viewToggles = document.querySelectorAll('.view-btn');
        viewToggles.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const view = e.target.closest('.view-btn').dataset.view;
                this.toggleView(view);
            });
        });
    }
    
    applyFilters(section) {
        switch(section) {
            case 'project':
                this.renderProjects();
                break;
            case 'sample':
                this.renderSamples();
                break;
            case 'lyrics':
                this.renderLyrics();
                break;
            case 'track':
                this.renderTracks();
                break;
            case 'task':
                this.renderTasks();
                break;
            case 'license':
                this.renderLicenses();
                break;
            case 'device':
                this.renderDevices();
                break;
            case 'user':
                this.renderUsers();
                break;
        }
    }
    
    toggleView(view) {
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-view="${view}"]`).classList.add('active');
        
        const samplesGrid = document.getElementById('samples-grid');
        if (samplesGrid) {
            if (view === 'list') {
                samplesGrid.classList.add('list-view');
            } else {
                samplesGrid.classList.remove('list-view');
            }
        }
    }
    
    // Rendering Methods
    renderAllSections() {
        this.renderProjects();
        this.renderSamples();
        this.renderLyrics();
        this.renderTracks();
        this.renderTasks();
        this.renderLicenses();
        this.renderDevices();
        this.renderUsers();
    }
    
    renderProjects() {
        const grid = document.getElementById('projects-grid');
        if (!grid) return;
        
        let projects = this.data.projects;
        const filters = this.searchFilters.project || {};
        
        // Apply filters
        if (filters.search) {
            projects = projects.filter(p => 
                p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                p.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                p.type.toLowerCase().includes(filters.search.toLowerCase())
            );
        }
        
        if (filters.filter) {
            projects = projects.filter(p => p.status === filters.filter);
        }
        
        grid.innerHTML = projects.map(project => `
            <div class="project-card">
                <div class="project-status status--${this.getStatusClass(project.status)}">
                    ${project.status}
                </div>
                <h3>${project.name}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-meta">
                    <div class="meta-item">
                        <span>Type:</span>
                        <strong>${project.type}</strong>
                    </div>
                    <div class="meta-item">
                        <span>Version:</span>
                        <strong>${project.version}</strong>
                    </div>
                    <div class="meta-item">
                        <span>Size:</span>
                        <strong>${project.size}</strong>
                    </div>
                    <div class="meta-item">
                        <span>BPM:</span>
                        <strong>${project.bpm}</strong>
                    </div>
                    <div class="meta-item">
                        <span>Key:</span>
                        <strong>${project.key}</strong>
                    </div>
                    <div class="meta-item">
                        <span>Collaborators:</span>
                        <strong>${project.collaborators.join(', ')}</strong>
                    </div>
                </div>
                <div class="sample-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="card-actions">
                    <button class="btn btn--primary btn--sm" onclick="app.downloadProject(${project.id})">
                        <i class="fas fa-download"></i> Download
                    </button>
                    <button class="btn btn--secondary btn--sm" onclick="app.shareProject(${project.id})">
                        <i class="fas fa-share"></i> Share
                    </button>
                    <button class="btn btn--secondary btn--sm" onclick="app.editProject(${project.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    renderSamples() {
        const grid = document.getElementById('samples-grid');
        if (!grid) return;
        
        let samples = this.data.samples;
        const filters = this.searchFilters.sample || {};
        
        // Apply filters
        if (filters.search) {
            samples = samples.filter(s => 
                s.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                s.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase())) ||
                s.genre.toLowerCase().includes(filters.search.toLowerCase())
            );
        }
        
        if (filters.category) {
            samples = samples.filter(s => s.category === filters.category);
        }
        
        grid.innerHTML = samples.map(sample => `
            <div class="sample-card">
                <h3>${sample.name}</h3>
                <p class="sample-description">${sample.description}</p>
                <div class="sample-meta">
                    <div class="meta-item">
                        <span>Category:</span>
                        <strong>${sample.category}</strong>
                    </div>
                    <div class="meta-item">
                        <span>BPM:</span>
                        <strong>${sample.bpm}</strong>
                    </div>
                    <div class="meta-item">
                        <span>Key:</span>
                        <strong>${sample.key}</strong>
                    </div>
                    <div class="meta-item">
                        <span>Duration:</span>
                        <strong>${sample.duration}</strong>
                    </div>
                    <div class="meta-item">
                        <span>Size:</span>
                        <strong>${sample.size}</strong>
                    </div>
                </div>
                <div class="sample-tags">
                    ${sample.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="card-actions">
                    <button class="btn btn--primary btn--sm" onclick="app.previewSample(${sample.id})">
                        <i class="fas fa-play"></i> Preview
                    </button>
                    <button class="btn btn--secondary btn--sm" onclick="app.downloadSample(${sample.id})">
                        <i class="fas fa-download"></i> Download
                    </button>
                    <button class="btn btn--secondary btn--sm" onclick="app.toggleFavorite(${sample.id})">
                        <i class="fas fa-heart ${sample.favorite ? 'favorited' : ''}"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    renderLyrics() {
        const grid = document.getElementById('lyrics-grid');
        if (!grid) return;
        
        let lyrics = this.data.lyrics;
        const filters = this.searchFilters.lyrics || {};
        
        if (filters.search) {
            lyrics = lyrics.filter(l => 
                l.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                l.artist.toLowerCase().includes(filters.search.toLowerCase()) ||
                l.content.toLowerCase().includes(filters.search.toLowerCase())
            );
        }
        
        grid.innerHTML = lyrics.map(lyrics => `
            <div class="lyrics-card">
                <h3>${lyrics.title}</h3>
                <div class="lyrics-meta">
                    <div class="meta-item">
                        <span>Artist:</span>
                        <strong>${lyrics.artist}</strong>
                    </div>
                    <div class="meta-item">
                        <span>Version:</span>
                        <strong>${lyrics.version}</strong>
                    </div>
                    <div class="meta-item">
                        <span>Genre:</span>
                        <strong>${lyrics.genre}</strong>
                    </div>
                    <div class="meta-item">
                        <span>Mood:</span>
                        <strong>${lyrics.mood}</strong>
                    </div>
                    <div class="meta-item">
                        <span>Words:</span>
                        <strong>${lyrics.wordCount}</strong>
                    </div>
                    <div class="meta-item">
                        <span>Collaborators:</span>
                        <strong>${lyrics.collaborators.length ? lyrics.collaborators.join(', ') : 'None'}</strong>
                    </div>
                </div>
                <div class="lyrics-preview">
                    <p>${lyrics.content.substring(0, 150)}...</p>
                </div>
                <div class="card-actions">
                    <button class="btn btn--primary btn--sm" onclick="app.editLyrics(${lyrics.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn--secondary btn--sm" onclick="app.exportLyrics(${lyrics.id})">
                        <i class="fas fa-download"></i> Export
                    </button>
                    <button class="btn btn--secondary btn--sm" onclick="app.viewVersions(${lyrics.id})">
                        <i class="fas fa-history"></i> Versions
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    renderTracks() {
        const list = document.getElementById('tracks-list');
        if (!list) return;
        
        let tracks = this.data.tracks;
        const filters = this.searchFilters.track || {};
        
        if (filters.search) {
            tracks = tracks.filter(t => 
                t.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                t.artist.toLowerCase().includes(filters.search.toLowerCase()) ||
                t.genre.toLowerCase().includes(filters.search.toLowerCase())
            );
        }
        
        if (filters.filter) {
            tracks = tracks.filter(t => t.genre === filters.filter);
        }
        
        list.innerHTML = tracks.map(track => `
            <div class="track-item">
                <div class="track-header">
                    <div class="track-info">
                        <h3>${track.title}</h3>
                        <p>${track.artist} • ${track.genre} • ${track.duration} • ${track.bpm} BPM • ${track.key}</p>
                    </div>
                    <div class="track-rating">
                        <div class="stars">
                            ${'★'.repeat(Math.floor(track.rating))}${'☆'.repeat(5 - Math.floor(track.rating))}
                        </div>
                        <span>${track.rating}/5</span>
                    </div>
                </div>
                <div class="track-actions">
                    <button class="btn btn--primary btn--sm" onclick="app.playTrack(${track.id})">
                        <i class="fas fa-play"></i> Play
                    </button>
                    <button class="btn btn--secondary btn--sm" onclick="app.downloadTrack(${track.id})">
                        <i class="fas fa-download"></i> Download
                    </button>
                    <button class="btn btn--secondary btn--sm" onclick="app.addToPlaylist(${track.id})">
                        <i class="fas fa-plus"></i> Playlist
                    </button>
                </div>
                <div class="track-comments">
                    <h4>Comments (${track.comments.length})</h4>
                    ${track.comments.map(comment => `
                        <div class="comment ${comment.resolved ? 'resolved' : ''}">
                            <div class="comment-header">
                                <span class="comment-user">${comment.user}</span>
                                <span class="comment-timestamp">@ ${comment.timestamp}</span>
                            </div>
                            <p class="comment-text">${comment.text}</p>
                        </div>
                    `).join('')}
                    <button class="btn btn--secondary btn--sm" onclick="app.addComment(${track.id})">
                        <i class="fas fa-comment"></i> Add Comment
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    renderTasks() {
        const statuses = ['To Do', 'In Progress', 'Review', 'Done'];
        
        // Update task counts
        statuses.forEach(status => {
            const count = this.data.tasks.filter(task => task.status === status).length;
            const countElement = document.getElementById(`${status.toLowerCase().replace(' ', '')}-count`);
            if (countElement) countElement.textContent = count;
        });
        
        statuses.forEach(status => {
            const taskList = document.querySelector(`[data-status="${status}"]`);
            if (!taskList) return;
            
            taskList.innerHTML = '';
            
            let tasks = this.data.tasks.filter(task => task.status === status);
            const filters = this.searchFilters.task || {};
            
            if (filters.search) {
                tasks = tasks.filter(t => 
                    t.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                    t.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                    t.assignee.toLowerCase().includes(filters.search.toLowerCase())
                );
            }
            
            tasks.forEach(task => {
                const taskCard = document.createElement('div');
                taskCard.className = 'task-card';
                taskCard.draggable = true;
                taskCard.dataset.taskId = task.id;
                
                taskCard.innerHTML = `
                    <div class="task-actions">
                        <button class="task-action-btn" onclick="app.editTask(${task.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="task-action-btn" onclick="app.deleteTask(${task.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    <h4 class="task-title">${task.title}</h4>
                    ${task.description ? `<p class="task-description">${task.description}</p>` : ''}
                    <div class="task-meta">
                        <span>Assignee: ${task.assignee}</span>
                        <span class="task-priority priority-${task.priority.toLowerCase()}">${task.priority}</span>
                    </div>
                    <div class="task-meta">
                        <span>Due: ${task.dueDate}</span>
                        <span>Project: ${task.project}</span>
                    </div>
                    ${task.tags ? `
                        <div class="task-tags">
                            ${task.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                `;
                
                taskList.appendChild(taskCard);
            });
        });
    }
    
    renderLicenses() {
        const grid = document.getElementById('licenses-grid');
        if (!grid) return;
        
        let licenses = this.data.licenses;
        const filters = this.searchFilters.license || {};
        
        if (filters.search) {
            licenses = licenses.filter(l => 
                l.software.toLowerCase().includes(filters.search.toLowerCase()) ||
                l.company.toLowerCase().includes(filters.search.toLowerCase())
            );
        }
        
        if (filters.filter) {
            licenses = licenses.filter(l => l.category === filters.filter);
        }
        
        grid.innerHTML = licenses.map(license => {
            const isExpiring = license.expirationDate && 
                new Date(license.expirationDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
            
            return `
                <div class="license-card ${isExpiring ? 'expiring' : ''}">
                    <h3>${license.software}</h3>
                    <div class="license-meta">
                        <div class="meta-item">
                            <span>Company:</span>
                            <strong>${license.company}</strong>
                        </div>
                        <div class="meta-item">
                            <span>Type:</span>
                            <strong>${license.type}</strong>
                        </div>
                        <div class="meta-item">
                            <span>Category:</span>
                            <strong>${license.category}</strong>
                        </div>
                        <div class="meta-item">
                            <span>Price:</span>
                            <strong>${license.price}</strong>
                        </div>
                        <div class="meta-item">
                            <span>Assigned To:</span>
                            <strong>${license.assignedTo}</strong>
                        </div>
                        <div class="meta-item">
                            <span>Purchase Date:</span>
                            <strong>${license.purchaseDate}</strong>
                        </div>
                        ${license.expirationDate ? `
                            <div class="meta-item">
                                <span>Expires:</span>
                                <strong class="${isExpiring ? 'text-warning' : ''}">${license.expirationDate}</strong>
                            </div>
                        ` : ''}
                        <div class="meta-item">
                            <span>Serial:</span>
                            <strong class="serial-blur" onclick="app.toggleSerial(this)">${license.serialNumber}</strong>
                        </div>
                    </div>
                    ${license.notes ? `<p class="license-notes">${license.notes}</p>` : ''}
                    <div class="card-actions">
                        <button class="btn btn--primary btn--sm" onclick="app.copySerial('${license.serialNumber}')">
                            <i class="fas fa-copy"></i> Copy Serial
                        </button>
                        <button class="btn btn--secondary btn--sm" onclick="app.editLicense(${license.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        ${isExpiring ? `
                            <button class="btn btn--sm" style="background: var(--color-warning);" onclick="app.renewLicense(${license.id})">
                                <i class="fas fa-exclamation-triangle"></i> Renew
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }
    
    renderDevices() {
        const grid = document.getElementById('devices-grid');
        if (!grid) return;
        
        let devices = this.data.midiDevices;
        const filters = this.searchFilters.device || {};
        
        if (filters.search) {
            devices = devices.filter(d => 
                d.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                d.manufacturer.toLowerCase().includes(filters.search.toLowerCase()) ||
                d.type.toLowerCase().includes(filters.search.toLowerCase())
            );
        }
        
        grid.innerHTML = devices.map(device => `
            <div class="device-card">
                <h3>${device.name}</h3>
                <div class="device-meta">
                    <div class="meta-item">
                        <span>Manufacturer:</span>
                        <strong>${device.manufacturer}</strong>
                    </div>
                    <div class="meta-item">
                        <span>Type:</span>
                        <strong>${device.type}</strong>
                    </div>
                    <div class="meta-item">
                        <span>Controls:</span>
                        <strong>
                            ${device.controls.keys} Keys, 
                            ${device.controls.knobs} Knobs, 
                            ${device.controls.pads} Pads, 
                            ${device.controls.buttons} Buttons
                        </strong>
                    </div>
                </div>
                <div class="mappings-preview">
                    <h4>Mappings (${device.mappings.length})</h4>
                    ${device.mappings.slice(0, 3).map(mapping => `
                        <div class="mapping-item">
                            <strong>${mapping.control}:</strong> ${mapping.description} (${mapping.type} ${mapping.number})
                        </div>
                    `).join('')}
                    ${device.mappings.length > 3 ? `<div class="mapping-item">+${device.mappings.length - 3} more...</div>` : ''}
                </div>
                <div class="device-presets">
                    <h4>Presets</h4>
                    <div class="preset-tags">
                        ${device.presets.map(preset => `<span class="tag">${preset}</span>`).join('')}
                    </div>
                </div>
                <div class="card-actions">
                    <button class="btn btn--primary btn--sm" onclick="app.editMappings(${device.id})">
                        <i class="fas fa-edit"></i> Edit Mappings
                    </button>
                    <button class="btn btn--secondary btn--sm" onclick="app.learnMIDI(${device.id})">
                        <i class="fas fa-magic"></i> MIDI Learn
                    </button>
                    <button class="btn btn--secondary btn--sm" onclick="app.exportPreset(${device.id})">
                        <i class="fas fa-download"></i> Export
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    renderUsers() {
        const grid = document.getElementById('users-grid');
        if (!grid) return;
        
        let users = this.data.users;
        const filters = this.searchFilters.user || {};
        
        if (filters.search) {
            users = users.filter(u => 
                u.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                u.role.toLowerCase().includes(filters.search.toLowerCase()) ||
                u.specialties.some(s => s.toLowerCase().includes(filters.search.toLowerCase()))
            );
        }
        
        if (filters.filter) {
            users = users.filter(u => u.status === filters.filter);
        }
        
        grid.innerHTML = users.map(user => `
            <div class="user-card">
                <div class="user-status status-${user.status}"></div>
                <div class="user-avatar">
                    ${user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3>${user.name}</h3>
                <div class="user-meta">
                    <div class="meta-item">
                        <span>Role:</span>
                        <strong>${user.role}</strong>
                    </div>
                    <div class="meta-item">
                        <span>Status:</span>
                        <strong class="status-${user.status}">${user.status}</strong>
                    </div>
                    <div class="meta-item">
                        <span>Projects:</span>
                        <strong>${user.projectsCompleted}</strong>
                    </div>
                    <div class="meta-item">
                        <span>Hours:</span>
                        <strong>${user.hoursLogged}h</strong>
                    </div>
                </div>
                <div class="user-specialties">
                    ${user.specialties.map(specialty => `<span class="specialty-tag">${specialty}</span>`).join('')}
                </div>
                <div class="card-actions">
                    <button class="btn btn--primary btn--sm" onclick="app.messageUser(${user.id})">
                        <i class="fas fa-message"></i> Message
                    </button>
                    <button class="btn btn--secondary btn--sm" onclick="app.viewProfile(${user.id})">
                        <i class="fas fa-user"></i> Profile
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    // Audio Player Methods - Fixed implementation
    setupAudioPlayer() {
        const playBtn = document.getElementById('play-btn');
        const volumeSlider = document.getElementById('volume-slider');
        const waveform = document.getElementById('waveform');
        const closePlayer = document.getElementById('close-player');
        const loopBtn = document.getElementById('loop-btn');
        const speedBtn = document.getElementById('speed-btn');
        const abModeBtn = document.getElementById('ab-mode-btn');
        
        if (playBtn) playBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.togglePlayback();
        });
        if (volumeSlider) volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
        if (waveform) {
            waveform.addEventListener('click', (e) => this.handleWaveformClick(e));
            waveform.addEventListener('dblclick', (e) => this.handleWaveformDoubleClick(e));
        }
        if (closePlayer) closePlayer.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeAudioPlayer();
        });
        if (loopBtn) loopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleLoop();
        });
        if (speedBtn) speedBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.cyclePlaybackSpeed();
        });
        if (abModeBtn) abModeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleABMode();
        });
        
        this.drawWaveform();
    }
    
    playTrack(trackId) {
        const track = this.data.tracks.find(t => t.id === trackId);
        if (!track) return;
        
        this.currentTrack = track;
        this.showAudioPlayer();
        this.loadTrack(track);
        this.showNotification('Now Playing', `${track.title} by ${track.artist}`, 'info');
    }
    
    showAudioPlayer() {
        const audioPlayer = document.getElementById('audio-player');
        if (audioPlayer) {
            audioPlayer.classList.add('active');
        }
    }
    
    closeAudioPlayer() {
        const audioPlayer = document.getElementById('audio-player');
        if (audioPlayer) {
            audioPlayer.classList.remove('active');
        }
        this.stopPlayback();
        this.currentTrack = null;
    }
    
    loadTrack(track) {
        const titleElement = document.getElementById('track-title');
        const artistElement = document.getElementById('track-artist');
        const totalTimeElement = document.getElementById('total-time');
        
        if (titleElement) titleElement.textContent = track.title;
        if (artistElement) artistElement.textContent = `${track.artist} • ${track.genre}`;
        if (totalTimeElement) totalTimeElement.textContent = track.duration;
        
        this.duration = this.parseTimeToSeconds(track.duration);
        this.currentTime = 0;
        
        this.drawWaveform();
        this.renderComments();
        this.updatePlayhead();
    }
    
    parseTimeToSeconds(timeString) {
        const parts = timeString.split(':');
        return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    }
    
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    togglePlayback() {
        this.isPlaying = !this.isPlaying;
        const playBtn = document.getElementById('play-btn');
        if (!playBtn) return;
        
        const icon = playBtn.querySelector('i');
        
        if (this.isPlaying) {
            if (icon) icon.className = 'fas fa-pause';
            this.startPlayback();
        } else {
            if (icon) icon.className = 'fas fa-play';
            this.stopPlayback();
        }
    }
    
    startPlayback() {
        this.playbackInterval = setInterval(() => {
            this.currentTime += (0.1 * this.playbackSpeed);
            
            // Handle loop
            if (this.loopEnabled && this.currentTime >= this.loopEnd) {
                this.currentTime = this.loopStart;
            }
            
            if (this.currentTime >= this.duration) {
                this.currentTime = this.duration;
                this.togglePlayback();
                return;
            }
            
            this.updatePlayhead();
            this.updateTimeDisplay();
        }, 100 / this.playbackSpeed);
    }
    
    stopPlayback() {
        if (this.playbackInterval) {
            clearInterval(this.playbackInterval);
        }
    }
    
    updateTimeDisplay() {
        const currentTimeElement = document.getElementById('current-time');
        if (currentTimeElement) {
            currentTimeElement.textContent = this.formatTime(this.currentTime);
        }
    }
    
    setVolume(volume) {
        this.volume = volume;
        const volumeIcon = document.getElementById('volume-icon');
        if (volumeIcon) {
            if (volume == 0) {
                volumeIcon.className = 'fas fa-volume-mute';
            } else if (volume < 50) {
                volumeIcon.className = 'fas fa-volume-down';
            } else {
                volumeIcon.className = 'fas fa-volume-up';
            }
        }
    }
    
    toggleLoop() {
        this.loopEnabled = !this.loopEnabled;
        const loopBtn = document.getElementById('loop-btn');
        if (loopBtn) {
            if (this.loopEnabled) {
                loopBtn.classList.add('active');
                loopBtn.style.background = 'var(--studio-cyan)';
                loopBtn.style.color = 'var(--studio-darker-bg)';
                
                // Set loop region to current time ± 10 seconds
                this.loopStart = Math.max(0, this.currentTime - 10);
                this.loopEnd = Math.min(this.duration, this.currentTime + 10);
                this.showLoopRegion();
            } else {
                loopBtn.classList.remove('active');
                loopBtn.style.background = '';
                loopBtn.style.color = '';
                this.hideLoopRegion();
            }
        }
    }
    
    cyclePlaybackSpeed() {
        const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
        const currentIndex = speeds.indexOf(this.playbackSpeed);
        const nextIndex = (currentIndex + 1) % speeds.length;
        this.playbackSpeed = speeds[nextIndex];
        
        const speedBtn = document.getElementById('speed-btn');
        if (speedBtn) {
            speedBtn.textContent = `${this.playbackSpeed}x`;
        }
    }
    
    toggleABMode() {
        this.showNotification('A/B Mode', 'A/B comparison mode activated', 'info');
    }
    
    showLoopRegion() {
        const loopRegion = document.getElementById('loop-region');
        if (loopRegion && this.duration > 0) {
            const startPercent = (this.loopStart / this.duration) * 100;
            const endPercent = (this.loopEnd / this.duration) * 100;
            
            loopRegion.style.left = `${startPercent}%`;
            loopRegion.style.width = `${endPercent - startPercent}%`;
            loopRegion.style.display = 'block';
        }
    }
    
    hideLoopRegion() {
        const loopRegion = document.getElementById('loop-region');
        if (loopRegion) {
            loopRegion.style.display = 'none';
        }
    }
    
    drawWaveform() {
        const canvas = document.getElementById('waveform');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        const height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        const displayWidth = width / window.devicePixelRatio;
        const displayHeight = height / window.devicePixelRatio;
        
        ctx.clearRect(0, 0, displayWidth, displayHeight);
        
        // Use track waveform data or generate
        const waveformData = this.currentTrack?.waveformData || this.generateWaveformData(200);
        
        // Draw waveform
        ctx.strokeStyle = '#00FFFF';
        ctx.fillStyle = 'rgba(0, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        const barWidth = displayWidth / waveformData.length;
        
        waveformData.forEach((value, index) => {
            const barHeight = value * displayHeight * 0.8;
            const x = index * barWidth;
            const y = (displayHeight - barHeight) / 2;
            
            // Draw bar
            ctx.fillRect(x, y, barWidth - 1, barHeight);
            
            // Draw outline
            ctx.strokeRect(x, y, barWidth - 1, barHeight);
        });
    }
    
    generateWaveformData(points) {
        const data = [];
        for (let i = 0; i < points; i++) {
            // Generate realistic audio waveform pattern
            const x = (i / points) * Math.PI * 10;
            const base = Math.sin(x) * 0.5;
            const noise = (Math.random() - 0.5) * 0.3;
            const envelope = Math.exp(-Math.abs(i - points/2) / (points/4));
            data.push(Math.abs(base + noise) * envelope);
        }
        return data;
    }
    
    updatePlayhead() {
        const playhead = document.getElementById('playhead');
        if (playhead && this.duration > 0) {
            const progress = this.currentTime / this.duration;
            playhead.style.left = `${progress * 100}%`;
        }
    }
    
    handleWaveformClick(e) {
        const canvas = e.target;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const progress = x / rect.width;
        
        this.currentTime = progress * this.duration;
        this.updatePlayhead();
        this.updateTimeDisplay();
    }
    
    handleWaveformDoubleClick(e) {
        const canvas = e.target;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const progress = x / rect.width;
        
        this.currentTime = progress * this.duration;
        this.updatePlayhead();
        this.updateTimeDisplay();
        this.showCommentModal(this.formatTime(this.currentTime));
    }
    
    renderComments() {
        if (!this.currentTrack) return;
        
        const overlay = document.getElementById('comments-overlay');
        if (!overlay) return;
        
        overlay.innerHTML = '';
        
        this.currentTrack.comments.forEach(comment => {
            const timeInSeconds = this.parseTimeToSeconds(comment.timestamp);
            const position = (timeInSeconds / this.duration) * 100;
            
            const marker = document.createElement('div');
            marker.className = 'comment-marker';
            marker.style.left = `${position}%`;
            marker.dataset.comment = comment.text;
            marker.title = `${comment.user}: ${comment.text}`;
            
            overlay.appendChild(marker);
        });
    }
    
    // Modal Management - Simplified
    setupModals() {
        this.setupCommentModal();
        this.setupTaskModal();
        this.setupConfirmModal();
    }
    
    setupCommentModal() {
        const closeBtn = document.getElementById('close-comment-modal');
        const cancelBtn = document.getElementById('cancel-comment');
        const form = document.getElementById('comment-form');
        
        if (closeBtn) closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.hideCommentModal();
        });
        if (cancelBtn) cancelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.hideCommentModal();
        });
        if (form) form.addEventListener('submit', (e) => this.handleCommentSubmit(e));
    }
    
    setupTaskModal() {
        const closeBtn = document.getElementById('close-task-modal');
        const cancelBtn = document.getElementById('cancel-task');
        const form = document.getElementById('task-form');
        
        if (closeBtn) closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.hideTaskModal();
        });
        if (cancelBtn) cancelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.hideTaskModal();
        });
        if (form) form.addEventListener('submit', (e) => this.handleTaskSubmit(e));
        
        // Populate dropdowns
        this.populateTaskAssignees();
        this.populateTaskProjects();
    }
    
    setupConfirmModal() {
        const closeBtn = document.getElementById('close-confirm-modal');
        const cancelBtn = document.getElementById('cancel-confirm');
        
        if (closeBtn) closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.hideConfirmModal();
        });
        if (cancelBtn) cancelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.hideConfirmModal();
        });
    }
    
    showCommentModal(timestamp) {
        const modal = document.getElementById('comment-modal');
        const timestampInput = document.getElementById('comment-timestamp');
        
        if (timestampInput) timestampInput.value = timestamp;
        if (modal) modal.classList.remove('hidden');
    }
    
    hideCommentModal() {
        const modal = document.getElementById('comment-modal');
        const form = document.getElementById('comment-form');
        
        if (modal) modal.classList.add('hidden');
        if (form) form.reset();
    }
    
    showTaskModal(taskId = null) {
        const modal = document.getElementById('task-modal');
        const title = document.getElementById('task-modal-title');
        const form = document.getElementById('task-form');
        
        if (taskId) {
            const task = this.data.tasks.find(t => t.id === taskId);
            if (task) {
                if (title) title.textContent = 'Edit Task';
                this.populateTaskForm(task);
                this.editingTask = taskId;
            }
        } else {
            if (title) title.textContent = 'Create Task';
            if (form) form.reset();
            this.editingTask = null;
            // Set default due date to 7 days from now
            const dueDateInput = document.getElementById('task-due-date');
            if (dueDateInput) {
                const defaultDate = new Date();
                defaultDate.setDate(defaultDate.getDate() + 7);
                dueDateInput.value = defaultDate.toISOString().split('T')[0];
            }
        }
        
        if (modal) modal.classList.remove('hidden');
    }
    
    hideTaskModal() {
        const modal = document.getElementById('task-modal');
        const form = document.getElementById('task-form');
        
        if (modal) modal.classList.add('hidden');
        if (form) form.reset();
        this.editingTask = null;
    }
    
    showConfirmModal(title, message, onConfirm) {
        const modal = document.getElementById('confirm-modal');
        const titleElement = document.getElementById('confirm-title');
        const messageElement = document.getElementById('confirm-message');
        const confirmBtn = document.getElementById('confirm-action');
        
        if (titleElement) titleElement.textContent = title;
        if (messageElement) messageElement.textContent = message;
        
        // Remove any existing event listeners
        const newConfirmBtn = confirmBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
        
        newConfirmBtn.addEventListener('click', () => {
            onConfirm();
            this.hideConfirmModal();
        });
        
        if (modal) modal.classList.remove('hidden');
    }
    
    hideConfirmModal() {
        const modal = document.getElementById('confirm-modal');
        if (modal) modal.classList.add('hidden');
    }
    
    populateTaskAssignees() {
        const select = document.getElementById('task-assignee');
        if (!select) return;
        
        select.innerHTML = '<option value="">Select assignee...</option>';
        this.data.users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.name;
            option.textContent = user.name;
            select.appendChild(option);
        });
    }
    
    populateTaskProjects() {
        const select = document.getElementById('task-project');
        if (!select) return;
        
        select.innerHTML = '<option value="">Select project...</option>';
        this.data.projects.forEach(project => {
            const option = document.createElement('option');
            option.value = project.name;
            option.textContent = project.name;
            select.appendChild(option);
        });
        
        // Add general option
        const generalOption = document.createElement('option');
        generalOption.value = 'General';
        generalOption.textContent = 'General';
        select.appendChild(generalOption);
    }
    
    populateTaskForm(task) {
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-description').value = task.description || '';
        document.getElementById('task-assignee').value = task.assignee;
        document.getElementById('task-priority').value = task.priority;
        document.getElementById('task-due-date').value = task.dueDate;
        document.getElementById('task-project').value = task.project;
    }
    
    handleCommentSubmit(e) {
        e.preventDefault();
        
        const timestampInput = document.getElementById('comment-timestamp');
        const textInput = document.getElementById('comment-text');
        const createTaskCheckbox = document.getElementById('create-task-checkbox');
        
        if (!timestampInput || !textInput) return;
        
        const timestamp = timestampInput.value;
        const text = textInput.value;
        const createTask = createTaskCheckbox ? createTaskCheckbox.checked : false;
        
        if (!text.trim()) {
            this.showNotification('Error', 'Comment text is required', 'error');
            return;
        }
        
        const newComment = {
            id: Date.now(),
            user: "Current User",
            timestamp: timestamp,
            text: text,
            time: new Date().toISOString(),
            resolved: false
        };
        
        if (this.currentTrack) {
            this.currentTrack.comments.push(newComment);
            this.renderComments();
            this.renderTracks();
            this.showNotification('Comment Added', 'Your comment has been added to the track', 'success');
        }
        
        if (createTask) {
            this.createTaskFromComment(text, timestamp);
        }
        
        this.hideCommentModal();
    }
    
    handleTaskSubmit(e) {
        e.preventDefault();
        
        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-description').value;
        const assignee = document.getElementById('task-assignee').value;
        const priority = document.getElementById('task-priority').value;
        const dueDate = document.getElementById('task-due-date').value;
        const project = document.getElementById('task-project').value;
        
        if (!title.trim()) {
            this.showNotification('Error', 'Task title is required', 'error');
            return;
        }
        
        if (!assignee) {
            this.showNotification('Error', 'Please assign the task to someone', 'error');
            return;
        }
        
        if (this.editingTask) {
            // Edit existing task
            const task = this.data.tasks.find(t => t.id == this.editingTask);
            if (task) {
                task.title = title;
                task.description = description;
                task.assignee = assignee;
                task.priority = priority;
                task.dueDate = dueDate;
                task.project = project;
                this.showNotification('Task Updated', 'Task has been updated successfully', 'success');
            }
        } else {
            // Create new task
            const newTask = {
                id: Date.now(),
                title: title,
                description: description,
                assignee: assignee,
                status: "To Do",
                priority: priority,
                dueDate: dueDate,
                createdDate: new Date().toISOString().split('T')[0],
                project: project,
                estimatedHours: 0,
                completedHours: 0,
                tags: []
            };
            
            this.data.tasks.push(newTask);
            this.showNotification('Task Created', 'New task has been created successfully', 'success');
        }
        
        this.renderTasks();
        this.updateDashboard();
        this.hideTaskModal();
    }
    
    createTaskFromComment(commentText, timestamp) {
        const newTask = {
            id: Date.now() + 1, // Ensure unique ID
            title: `Review comment at ${timestamp}`,
            description: commentText,
            assignee: "Current User",
            status: "To Do",
            priority: "Medium",
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            createdDate: new Date().toISOString().split('T')[0],
            createdFrom: "comment",
            project: this.currentTrack ? this.currentTrack.title : "Unknown",
            estimatedHours: 1,
            completedHours: 0,
            tags: ["review", "comment"]
        };
        
        this.data.tasks.push(newTask);
        this.renderTasks();
        this.updateDashboard();
        this.showNotification('Task Created', 'Task created from comment successfully', 'success');
    }
    
    // Task Management - Fixed drag and drop
    setupTaskDragDrop() {
        document.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('task-card')) {
                this.draggedTask = parseInt(e.target.dataset.taskId);
                e.target.classList.add('dragging');
            }
        });
        
        document.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('task-card')) {
                e.target.classList.remove('dragging');
                this.draggedTask = null;
            }
        });
        
        // Task list drop zones
        document.addEventListener('dragover', (e) => {
            const taskList = e.target.closest('.task-list');
            if (taskList) {
                e.preventDefault();
                taskList.classList.add('drag-over');
            }
        });
        
        document.addEventListener('dragleave', (e) => {
            const taskList = e.target.closest('.task-list');
            if (taskList && !taskList.contains(e.relatedTarget)) {
                taskList.classList.remove('drag-over');
            }
        });
        
        document.addEventListener('drop', (e) => {
            const taskList = e.target.closest('.task-list');
            if (taskList && this.draggedTask) {
                e.preventDefault();
                taskList.classList.remove('drag-over');
                
                const newStatus = taskList.dataset.status;
                this.moveTask(this.draggedTask, newStatus);
            }
        });
    }
    
    moveTask(taskId, newStatus) {
        const task = this.data.tasks.find(t => t.id === taskId);
        if (task) {
            const oldStatus = task.status;
            task.status = newStatus;
            
            this.renderTasks();
            this.updateDashboard();
            this.showNotification('Task Moved', `Task moved from ${oldStatus} to ${newStatus}`, 'success');
        }
    }
    
    editTask(taskId) {
        this.showTaskModal(taskId);
    }
    
    deleteTask(taskId) {
        const task = this.data.tasks.find(t => t.id === taskId);
        if (!task) return;
        
        this.showConfirmModal(
            'Delete Task',
            `Are you sure you want to delete "${task.title}"?`,
            () => {
                this.data.tasks = this.data.tasks.filter(t => t.id !== taskId);
                this.renderTasks();
                this.updateDashboard();
                this.showNotification('Task Deleted', 'Task has been deleted successfully', 'success');
            }
        );
    }
    
    // Upload Functions
    showUploadProject() {
        this.showNotification('Upload Project', 'Project upload functionality would open here', 'info');
    }
    
    showUploadSample() {
        this.showNotification('Upload Sample', 'Sample upload functionality would open here', 'info');
    }
    
    showCreateLyrics() {
        this.showNotification('Create Lyrics', 'Lyrics editor would open here', 'info');
    }
    
    showAddLicense() {
        this.showNotification('Add License', 'License addition form would open here', 'info');
    }
    
    showAddDevice() {
        this.showNotification('Add Device', 'Device addition form would open here', 'info');
    }
    
    showInviteUser() {
        this.showNotification('Invite User', 'User invitation form would open here', 'info');
    }
    
    // Utility Functions - All work correctly now
    downloadProject(projectId) {
        const project = this.data.projects.find(p => p.id === projectId);
        this.showNotification('Download Started', `Downloading ${project.name}...`, 'success');
    }
    
    shareProject(projectId) {
        const project = this.data.projects.find(p => p.id === projectId);
        this.showNotification('Project Shared', `${project.name} has been shared`, 'success');
    }
    
    editProject(projectId) {
        const project = this.data.projects.find(p => p.id === projectId);
        this.showNotification('Edit Project', `Opening editor for ${project.name}`, 'info');
    }
    
    previewSample(sampleId) {
        const sample = this.data.samples.find(s => s.id === sampleId);
        this.showNotification('Sample Preview', `Playing ${sample.name}...`, 'info');
        // Simulate audio preview
        setTimeout(() => {
            this.showNotification('Preview Complete', `Finished playing ${sample.name}`, 'success');
        }, 2000);
    }
    
    downloadSample(sampleId) {
        const sample = this.data.samples.find(s => s.id === sampleId);
        this.showNotification('Download Started', `Downloading ${sample.name}...`, 'success');
    }
    
    toggleFavorite(sampleId) {
        const sample = this.data.samples.find(s => s.id === sampleId);
        sample.favorite = !sample.favorite;
        this.renderSamples();
        this.showNotification('Favorite Updated', `${sample.name} ${sample.favorite ? 'added to' : 'removed from'} favorites`, 'success');
    }
    
    editLyrics(lyricsId) {
        const lyrics = this.data.lyrics.find(l => l.id === lyricsId);
        this.showNotification('Edit Lyrics', `Opening editor for ${lyrics.title}`, 'info');
    }
    
    exportLyrics(lyricsId) {
        const lyrics = this.data.lyrics.find(l => l.id === lyricsId);
        this.showNotification('Export Started', `Exporting ${lyrics.title}...`, 'success');
    }
    
    viewVersions(lyricsId) {
        const lyrics = this.data.lyrics.find(l => l.id === lyricsId);
        this.showNotification('Version History', `Showing versions for ${lyrics.title}`, 'info');
    }
    
    downloadTrack(trackId) {
        const track = this.data.tracks.find(t => t.id === trackId);
        this.showNotification('Download Started', `Downloading ${track.title}...`, 'success');
    }
    
    addToPlaylist(trackId) {
        const track = this.data.tracks.find(t => t.id === trackId);
        this.showNotification('Added to Playlist', `${track.title} added to playlist`, 'success');
    }
    
    addComment(trackId) {
        const track = this.data.tracks.find(t => t.id === trackId);
        this.currentTrack = track;
        this.showCommentModal('0:00');
    }
    
    copySerial(serialNumber) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(serialNumber).then(() => {
                this.showNotification('Copied', 'Serial number copied to clipboard', 'success');
            });
        } else {
            this.showNotification('Serial Number', serialNumber, 'info');
        }
    }
    
    toggleSerial(element) {
        element.classList.toggle('serial-blur');
    }
    
    editLicense(licenseId) {
        const license = this.data.licenses.find(l => l.id === licenseId);
        this.showNotification('Edit License', `Editing ${license.software}`, 'info');
    }
    
    renewLicense(licenseId) {
        const license = this.data.licenses.find(l => l.id === licenseId);
        this.showNotification('Renew License', `Renewing ${license.software}`, 'warning');
    }
    
    editMappings(deviceId) {
        const device = this.data.midiDevices.find(d => d.id === deviceId);
        this.showNotification('MIDI Editor', `Opening mapping editor for ${device.name}`, 'info');
    }
    
    learnMIDI(deviceId) {
        const device = this.data.midiDevices.find(d => d.id === deviceId);
        this.showNotification('MIDI Learn', `MIDI learn mode activated for ${device.name}`, 'info');
    }
    
    exportPreset(deviceId) {
        const device = this.data.midiDevices.find(d => d.id === deviceId);
        this.showNotification('Export Started', `Exporting presets for ${device.name}`, 'success');
    }
    
    messageUser(userId) {
        const user = this.data.users.find(u => u.id === userId);
        this.showNotification('Message Sent', `Opening chat with ${user.name}`, 'info');
    }
    
    viewProfile(userId) {
        const user = this.data.users.find(u => u.id === userId);
        this.showNotification('User Profile', `Opening profile for ${user.name}`, 'info');
    }
    
    // Notification System
    showNotification(title, message, type = 'info') {
        const container = document.getElementById('notifications');
        if (!container) return;
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const iconMap = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        
        notification.innerHTML = `
            <i class="notification-icon ${iconMap[type]}"></i>
            <div class="notification-content">
                <h4 class="notification-title">${title}</h4>
                <p class="notification-message">${message}</p>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        container.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
        
        this.notifications.push({
            id: Date.now(),
            title,
            message,
            type,
            timestamp: new Date()
        });
    }
    
    // Keyboard Shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Global shortcuts
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'k':
                        e.preventDefault();
                        this.focusSearch();
                        break;
                    case 'n':
                        e.preventDefault();
                        if (this.currentSection === 'tasks') {
                            this.showTaskModal();
                        }
                        break;
                }
            }
            
            // Audio player shortcuts
            if (this.currentTrack) {
                switch(e.key) {
                    case ' ':
                        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                            e.preventDefault();
                            this.togglePlayback();
                        }
                        break;
                    case 'Escape':
                        this.closeAudioPlayer();
                        break;
                }
            }
            
            // Navigation shortcuts
            if (e.altKey) {
                const shortcutMap = {
                    '1': 'dashboard',
                    '2': 'projects',
                    '3': 'samples',
                    '4': 'lyrics',
                    '5': 'tracks',
                    '6': 'tasks',
                    '7': 'licenses',
                    '8': 'devices',
                    '9': 'users'
                };
                
                if (shortcutMap[e.key]) {
                    e.preventDefault();
                    this.navigateToSection(shortcutMap[e.key]);
                }
            }
        });
    }
    
    focusSearch() {
        const searchInput = document.querySelector(`#${this.currentSection}-search`);
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
        }
    }
}

// Initialize the application
const app = new StudioNet();