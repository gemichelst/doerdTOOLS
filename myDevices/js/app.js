// myDevices Application JavaScript

class MyDevicesApp {
    constructor() {
        this.devices = [];
        this.currentDevice = null;
        this.currentView = 'dashboard';
        this.editingDevice = null;
        this.categories = ['Treiber', 'Tools', 'Keys', 'Daten', 'Dokumentation'];
        this.operatingSystems = ['Universal', 'Windows', 'Linux', 'macOS', 'Android', 'iOS'];
        this.cpuTypes = ['Universal', 'x64', 'x86', 'ARM64', 'ARM'];
        this.deviceTypes = ['Computer', 'Smartphone', 'Tablet', 'IoT Device', 'Network Device', 'Gaming Console', 'Smart TV', 'Andere'];
        
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.renderDashboard();
        this.updateStats();
    }

    // Data Management
    loadData() {
        const saved = localStorage.getItem('myDevicesData');
        if (saved) {
            const data = JSON.parse(saved);
            this.devices = data.devices || [];
        } else {
            // Initialize with sample data
            this.devices = [
                {
                    id: Date.now(),
                    name: "Gaming PC",
                    type: "Computer",
                    description: "Mein Gaming-Computer mit RTX 4080",
                    icon: "💻",
                    files: [
                        {
                            id: 1,
                            category: "Treiber",
                            name: "NVIDIA GeForce Treiber",
                            version: "536.67",
                            os: "Windows",
                            cpuType: "x64",
                            size: "512 MB",
                            uploadDate: "2024-08-01",
                            description: "Aktueller NVIDIA Grafiktreiber"
                        },
                        {
                            id: 2,
                            category: "Tools",
                            name: "MSI Afterburner",
                            version: "4.6.5",
                            os: "Windows",
                            cpuType: "x64",
                            size: "45 MB",
                            uploadDate: "2024-07-15",
                            description: "GPU Overclocking Tool"
                        }
                    ],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    id: Date.now() + 1,
                    name: "iPhone 15 Pro",
                    type: "Smartphone",
                    description: "Mein persönliches iPhone",
                    icon: "📱",
                    files: [
                        {
                            id: 3,
                            category: "Keys",
                            name: "iTunes Backup Passwort",
                            version: "1.0",
                            os: "iOS",
                            cpuType: "ARM64",
                            size: "1 KB",
                            uploadDate: "2024-06-20",
                            description: "Verschlüsselungsschlüssel für iTunes Backups"
                        }
                    ],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            ];
            this.saveData();
        }
    }

    saveData() {
        const data = {
            devices: this.devices,
            lastSaved: new Date().toISOString()
        };
        localStorage.setItem('myDevicesData', JSON.stringify(data));
    }

    // Event Listeners
    setupEventListeners() {
        // Header actions
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.filterDevices(e.target.value);
        });
        
        document.getElementById('addDeviceBtn').addEventListener('click', () => {
            this.showAddDeviceModal();
        });

        // Back button
        document.getElementById('backBtn').addEventListener('click', () => {
            this.showDashboard();
        });

        // Device form
        document.getElementById('deviceForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleDeviceSubmit();
        });

        // Upload form
        document.getElementById('uploadForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFileUpload();
        });

        // File input change
        document.getElementById('fileInput').addEventListener('change', (e) => {
            if (e.target.files[0]) {
                const fileName = e.target.files[0].name;
                const nameInput = document.getElementById('fileNameInput');
                if (!nameInput.value) {
                    nameInput.value = fileName.split('.')[0];
                }
            }
        });

        // Tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.switchTab(category);
            });
        });

        // Upload button
        document.getElementById('uploadFileBtn').addEventListener('click', () => {
            this.showUploadModal();
        });

        // Edit device button
        document.getElementById('editDeviceBtn').addEventListener('click', () => {
            this.showEditDeviceModal();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideAllModals();
            }
        });
    }

    // UI Rendering
    renderDashboard() {
        const grid = document.getElementById('deviceGrid');
        const emptyState = document.getElementById('emptyState');
        
        if (this.devices.length === 0) {
            grid.innerHTML = '';
            emptyState.classList.remove('hidden');
            return;
        }

        emptyState.classList.add('hidden');
        grid.innerHTML = this.devices.map(device => this.createDeviceCard(device)).join('');
        this.currentView = 'dashboard';
    }

    createDeviceCard(device) {
        const fileCount = device.files ? device.files.length : 0;
        const lastUpdate = device.updatedAt ? new Date(device.updatedAt).toLocaleDateString('de-DE') : 'Nie';
        
        return `
            <div class="device-card" onclick="app.showDeviceDetail('${device.id}')">
                <div class="device-card__header">
                    <div class="device-card__icon">${device.icon}</div>
                    <div class="device-card__info">
                        <h3>${this.escapeHtml(device.name)}</h3>
                        <span class="device-card__type">${this.escapeHtml(device.type)}</span>
                    </div>
                </div>
                <p class="device-card__description">${this.escapeHtml(device.description || 'Keine Beschreibung')}</p>
                <div class="device-card__stats">
                    <span class="device-card__stat">
                        📁 ${fileCount} Dateien
                    </span>
                    <span class="device-card__stat">
                        📅 ${lastUpdate}
                    </span>
                </div>
                <div class="device-card__actions">
                    <button class="btn btn--small btn--secondary" onclick="event.stopPropagation(); app.showEditDeviceModal('${device.id}')">
                        ✏️
                    </button>
                    <button class="btn btn--small btn--danger" onclick="event.stopPropagation(); app.confirmDeleteDevice('${device.id}')">
                        🗑️
                    </button>
                </div>
            </div>
        `;
    }

    showDeviceDetail(deviceId) {
        const device = this.devices.find(d => d.id == deviceId);
        if (!device) return;

        this.currentDevice = device;
        this.currentView = 'detail';

        // Update device info
        document.getElementById('deviceIcon').textContent = device.icon;
        document.getElementById('deviceName').textContent = device.name;
        document.getElementById('deviceType').textContent = device.type;
        document.getElementById('deviceDescription').textContent = device.description || 'Keine Beschreibung';

        // Show device detail view
        document.getElementById('dashboard').classList.add('hidden');
        document.getElementById('deviceDetail').classList.remove('hidden');

        // Switch to "all" tab and render files
        this.switchTab('all');
    }

    showDashboard() {
        this.currentDevice = null;
        this.currentView = 'dashboard';
        document.getElementById('dashboard').classList.remove('hidden');
        document.getElementById('deviceDetail').classList.add('hidden');
        this.renderDashboard();
    }

    switchTab(category) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            }
        });

        // Update category title
        const categoryNames = {
            'all': 'Alle Dateien',
            'Treiber': '🔧 Treiber',
            'Tools': '🛠️ Tools',
            'Keys': '🔑 Keys',
            'Daten': '📊 Daten',
            'Dokumentation': '📋 Dokumentation'
        };
        document.getElementById('currentCategoryTitle').textContent = categoryNames[category];

        // Render files for category
        this.renderFileList(category);
    }

    renderFileList(category) {
        const fileList = document.getElementById('fileList');
        const noFiles = document.getElementById('noFiles');
        
        if (!this.currentDevice || !this.currentDevice.files) {
            fileList.innerHTML = '';
            noFiles.classList.remove('hidden');
            return;
        }

        let files = this.currentDevice.files;
        if (category !== 'all') {
            files = files.filter(file => file.category === category);
        }

        if (files.length === 0) {
            fileList.innerHTML = '';
            noFiles.classList.remove('hidden');
            return;
        }

        noFiles.classList.add('hidden');
        fileList.innerHTML = `
            <table class="file-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Kategorie</th>
                        <th>Version</th>
                        <th>OS</th>
                        <th>CPU</th>
                        <th>Größe</th>
                        <th>Datum</th>
                        <th>Aktionen</th>
                    </tr>
                </thead>
                <tbody>
                    ${files.map(file => this.createFileRow(file)).join('')}
                </tbody>
            </table>
        `;
    }

    createFileRow(file) {
        const categoryIcons = {
            'Treiber': '🔧',
            'Tools': '🛠️',
            'Keys': '🔑',
            'Daten': '📊',
            'Dokumentation': '📋'
        };

        const osIcons = {
            'Windows': '🪟',
            'Linux': '🐧',
            'macOS': '🍎',
            'Android': '🤖',
            'iOS': '📱',
            'Universal': '🌐'
        };

        return `
            <tr>
                <td class="file-name">${this.escapeHtml(file.name)}</td>
                <td>
                    <span class="file-category">
                        ${categoryIcons[file.category] || '📁'} ${this.escapeHtml(file.category)}
                    </span>
                </td>
                <td>${this.escapeHtml(file.version || '-')}</td>
                <td>${osIcons[file.os] || ''} ${this.escapeHtml(file.os || 'Universal')}</td>
                <td>${this.escapeHtml(file.cpuType || 'Universal')}</td>
                <td>${this.escapeHtml(file.size || '-')}</td>
                <td>${file.uploadDate ? new Date(file.uploadDate).toLocaleDateString('de-DE') : '-'}</td>
                <td class="file-actions">
                    <button class="btn btn--small btn--secondary" onclick="app.downloadFile('${file.id}')" title="Herunterladen">
                        ⬇️
                    </button>
                    <button class="btn btn--small btn--danger" onclick="app.confirmDeleteFile('${file.id}')" title="Löschen">
                        🗑️
                    </button>
                </td>
            </tr>
        `;
    }

    // Modal Management
    showAddDeviceModal() {
        this.editingDevice = null;
        document.getElementById('deviceModalTitle').textContent = 'Neues Gerät hinzufügen';
        document.getElementById('deviceForm').reset();
        document.getElementById('deviceIconSelect').value = '💻';
        document.getElementById('deviceModal').classList.remove('hidden');
    }

    showEditDeviceModal(deviceId) {
        const device = deviceId ? this.devices.find(d => d.id == deviceId) : this.currentDevice;
        if (!device) return;

        this.editingDevice = device;
        document.getElementById('deviceModalTitle').textContent = 'Gerät bearbeiten';
        document.getElementById('deviceNameInput').value = device.name;
        document.getElementById('deviceTypeSelect').value = device.type;
        document.getElementById('deviceDescInput').value = device.description || '';
        document.getElementById('deviceIconSelect').value = device.icon;
        document.getElementById('deviceModal').classList.remove('hidden');
    }

    hideDeviceModal() {
        document.getElementById('deviceModal').classList.add('hidden');
        this.editingDevice = null;
    }

    showUploadModal() {
        if (!this.currentDevice) return;
        document.getElementById('uploadForm').reset();
        document.getElementById('uploadModal').classList.remove('hidden');
    }

    hideUploadModal() {
        document.getElementById('uploadModal').classList.add('hidden');
    }

    showConfirmModal(title, message, onConfirm) {
        document.getElementById('confirmTitle').textContent = title;
        document.getElementById('confirmMessage').textContent = message;
        document.getElementById('confirmBtn').onclick = () => {
            onConfirm();
            this.hideConfirmModal();
        };
        document.getElementById('confirmModal').classList.remove('hidden');
    }

    hideConfirmModal() {
        document.getElementById('confirmModal').classList.add('hidden');
    }

    hideAllModals() {
        this.hideDeviceModal();
        this.hideUploadModal();
        this.hideConfirmModal();
        this.hideToast();
    }

    // Form Handlers
    handleDeviceSubmit() {
        const name = document.getElementById('deviceNameInput').value.trim();
        const type = document.getElementById('deviceTypeSelect').value;
        const description = document.getElementById('deviceDescInput').value.trim();
        const icon = document.getElementById('deviceIconSelect').value;

        if (!name || !type) {
            this.showToast('Bitte füllen Sie alle Pflichtfelder aus.', 'error');
            return;
        }

        if (this.editingDevice) {
            // Update existing device
            this.editingDevice.name = name;
            this.editingDevice.type = type;
            this.editingDevice.description = description;
            this.editingDevice.icon = icon;
            this.editingDevice.updatedAt = new Date().toISOString();
            this.showToast('Gerät erfolgreich aktualisiert!', 'success');
        } else {
            // Create new device
            const newDevice = {
                id: Date.now(),
                name,
                type,
                description,
                icon,
                files: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            this.devices.push(newDevice);
            this.showToast('Gerät erfolgreich hinzugefügt!', 'success');
        }

        this.saveData();
        this.hideDeviceModal();
        
        if (this.currentView === 'dashboard') {
            this.renderDashboard();
        } else if (this.currentDevice && this.editingDevice && this.currentDevice.id === this.editingDevice.id) {
            // Update current device view
            this.showDeviceDetail(this.editingDevice.id);
        }
        
        this.updateStats();
    }

    handleFileUpload() {
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];
        
        if (!file || !this.currentDevice) {
            this.showToast('Bitte wählen Sie eine Datei aus.', 'error');
            return;
        }

        const name = document.getElementById('fileNameInput').value.trim();
        const category = document.getElementById('categorySelect').value;
        const version = document.getElementById('versionInput').value.trim();
        const os = document.getElementById('osSelect').value;
        const cpuType = document.getElementById('cpuSelect').value;
        const description = document.getElementById('descriptionInput').value.trim();

        if (!name || !category) {
            this.showToast('Bitte füllen Sie alle Pflichtfelder aus.', 'error');
            return;
        }

        // Read file as base64 for storage
        const reader = new FileReader();
        reader.onload = (e) => {
            const newFile = {
                id: Date.now(),
                name,
                category,
                version: version || '1.0',
                os: os || 'Universal',
                cpuType: cpuType || 'Universal',
                size: this.formatFileSize(file.size),
                uploadDate: new Date().toISOString(),
                description,
                fileData: e.target.result,
                fileName: file.name,
                mimeType: file.type
            };

            if (!this.currentDevice.files) {
                this.currentDevice.files = [];
            }
            this.currentDevice.files.push(newFile);
            this.currentDevice.updatedAt = new Date().toISOString();

            this.saveData();
            this.hideUploadModal();
            this.showToast('Datei erfolgreich hochgeladen!', 'success');
            
            // Refresh file list
            const currentTab = document.querySelector('.tab-btn.active').dataset.category;
            this.switchTab(currentTab);
        };

        reader.readAsDataURL(file);
    }

    // File Operations
    downloadFile(fileId) {
        if (!this.currentDevice || !this.currentDevice.files) return;
        
        const file = this.currentDevice.files.find(f => f.id == fileId);
        if (!file || !file.fileData) return;

        try {
            // Create download link
            const link = document.createElement('a');
            link.href = file.fileData;
            link.download = file.fileName || file.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            this.showToast('Datei wird heruntergeladen...', 'success');
        } catch (error) {
            this.showToast('Fehler beim Herunterladen der Datei.', 'error');
        }
    }

    confirmDeleteFile(fileId) {
        this.showConfirmModal(
            'Datei löschen',
            'Sind Sie sicher, dass Sie diese Datei löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
            () => this.deleteFile(fileId)
        );
    }

    deleteFile(fileId) {
        if (!this.currentDevice || !this.currentDevice.files) return;
        
        const fileIndex = this.currentDevice.files.findIndex(f => f.id == fileId);
        if (fileIndex === -1) return;

        this.currentDevice.files.splice(fileIndex, 1);
        this.currentDevice.updatedAt = new Date().toISOString();
        this.saveData();
        this.showToast('Datei erfolgreich gelöscht!', 'success');
        
        // Refresh file list
        const currentTab = document.querySelector('.tab-btn.active').dataset.category;
        this.switchTab(currentTab);
    }

    confirmDeleteDevice(deviceId) {
        const device = this.devices.find(d => d.id == deviceId);
        if (!device) return;

        this.showConfirmModal(
            'Gerät löschen',
            `Sind Sie sicher, dass Sie "${device.name}" und alle zugehörigen Dateien löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.`,
            () => this.deleteDevice(deviceId)
        );
    }

    deleteDevice(deviceId) {
        const deviceIndex = this.devices.findIndex(d => d.id == deviceId);
        if (deviceIndex === -1) return;

        this.devices.splice(deviceIndex, 1);
        this.saveData();
        this.showToast('Gerät erfolgreich gelöscht!', 'success');
        
        if (this.currentDevice && this.currentDevice.id == deviceId) {
            this.showDashboard();
        } else {
            this.renderDashboard();
        }
        
        this.updateStats();
    }

    // Search and Filter
    filterDevices(query) {
        const cards = document.querySelectorAll('.device-card');
        const searchTerm = query.toLowerCase();
        
        cards.forEach(card => {
            const name = card.querySelector('.device-card__info h3').textContent.toLowerCase();
            const type = card.querySelector('.device-card__type').textContent.toLowerCase();
            const description = card.querySelector('.device-card__description').textContent.toLowerCase();
            
            if (name.includes(searchTerm) || type.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });

        // Update empty state
        const visibleCards = Array.from(cards).filter(card => card.style.display !== 'none');
        const emptyState = document.getElementById('emptyState');
        
        if (visibleCards.length === 0 && query) {
            emptyState.querySelector('h3').textContent = 'Keine Geräte gefunden';
            emptyState.querySelector('p').textContent = `Keine Geräte entsprechen "${query}"`;
            emptyState.classList.remove('hidden');
        } else if (this.devices.length === 0) {
            emptyState.querySelector('h3').textContent = 'Keine Geräte gefunden';
            emptyState.querySelector('p').textContent = 'Fügen Sie Ihr erstes Gerät hinzu, um loszulegen.';
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
        }
    }

    // UI Updates
    updateStats() {
        const deviceCount = this.devices.length;
        const deviceCountElement = document.getElementById('deviceCount');
        deviceCountElement.textContent = `${deviceCount} Gerät${deviceCount !== 1 ? 'e' : ''}`;
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        
        toastMessage.textContent = message;
        toast.className = `toast toast--${type}`;
        toast.classList.remove('hidden');
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            this.hideToast();
        }, 3000);
    }

    hideToast() {
        document.getElementById('toast').classList.add('hidden');
    }

    // Utility Functions
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return String(text).replace(/[&<>"']/g, (m) => map[m]);
    }

    // Export/Import Functions (for future use)
    exportData() {
        const data = {
            devices: this.devices,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `mydevices-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        this.showToast('Daten erfolgreich exportiert!', 'success');
    }

    importData(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.devices && Array.isArray(data.devices)) {
                    this.devices = data.devices;
                    this.saveData();
                    this.renderDashboard();
                    this.updateStats();
                    this.showToast('Daten erfolgreich importiert!', 'success');
                } else {
                    throw new Error('Invalid file format');
                }
            } catch (error) {
                this.showToast('Fehler beim Importieren der Daten.', 'error');
            }
        };
        reader.readAsText(file);
    }
}

// Global functions for onclick events
function showAddDeviceModal() {
    app.showAddDeviceModal();
}

function showUploadModal() {
    app.showUploadModal();
}

function hideDeviceModal() {
    app.hideDeviceModal();
}

function hideUploadModal() {
    app.hideUploadModal();
}

function hideConfirmModal() {
    app.hideConfirmModal();
}

function hideToast() {
    app.hideToast();
}

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new MyDevicesApp();
});

// Handle browser back/forward
window.addEventListener('popstate', () => {
    if (app.currentView === 'detail') {
        app.showDashboard();
    }
});

// Prevent form submission on Enter key in search
document.addEventListener('keydown', (e) => {
    if (e.target.id === 'searchInput' && e.key === 'Enter') {
        e.preventDefault();
    }
});

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';
