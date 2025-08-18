// growBuddy - Cannabis Aufzucht Planer
// Hauptanwendung JavaScript

class GrowBuddyApp {
    constructor() {
        this.currentView = 'dashboard';
        this.currentMonth = new Date();
        this.currentTaskFilter = 'all';
        this.editingGroupId = null;
        this.currentTaskId = null;
        
        // Initialisiere Datenstruktur
        this.data = {
            growthPhases: [
                {
                    id: "germination",
                    name: "Keimung",
                    duration: "1-7 Tage",
                    description: "Samen keimen und entwickeln erste Wurzeln",
                    minDays: 1,
                    maxDays: 7,
                    careInstructions: "Feuchtigkeit und Dunkelheit, 20-25°C",
                    fertilizing: "Keine Düngung notwendig"
                },
                {
                    id: "seedling",
                    name: "Sämlingsphase", 
                    duration: "1-3 Wochen",
                    description: "Erste Blätter entwickeln sich",
                    minDays: 7,
                    maxDays: 21,
                    careInstructions: "60-70% Luftfeuchtigkeit, vorsichtige Pflege",
                    fertilizing: "Ab 10-15cm oder 2-4 Blättern beginnen"
                },
                {
                    id: "vegetative",
                    name: "Vegetative Phase",
                    duration: "2-8 Wochen", 
                    description: "Kräftiges Wachstum von Blättern und Stängeln",
                    minDays: 14,
                    maxDays: 56,
                    careInstructions: "18/6 Lichtzyklus, 22-28°C, 40-70% Luftfeuchtigkeit",
                    fertilizing: "7ml Dünger pro 1L Wasser alle 10 Tage"
                },
                {
                    id: "flowering",
                    name: "Blütephase",
                    duration: "6-12 Wochen",
                    description: "Knospenbildung und Harzproduktion", 
                    minDays: 42,
                    maxDays: 84,
                    careInstructions: "12/12 Lichtzyklus, 20-26°C, 40-50% Luftfeuchtigkeit",
                    fertilizing: "10ml Dünger pro 1L Wasser alle 10 Tage"
                },
                {
                    id: "harvest",
                    name: "Ernte",
                    duration: "Variable",
                    description: "Erntereife erreicht, Trichome milchig-bernsteinfarben",
                    minDays: 90,
                    maxDays: 150,
                    careInstructions: "Trocknung und Aushärtung",
                    fertilizing: "Keine Düngung mehr"
                }
            ],
            fertilizerTypes: [
                "Wachstumsdünger (N-P-K 20-10-20)",
                "Blütedünger (N-P-K 10-30-20)", 
                "Wurzelstimulator",
                "CalMag-Zusatz",
                "Organischer Flüssigdünger",
                "Mineralischer Universaldünger"
            ],
            commonStrains: [
                "Northern Lights", "White Widow", "Skunk #1", "AK-47", "Blueberry",
                "Haze", "Kush", "Amnesia", "Diesel", "Critical"
            ],
            locations: [
                "Indoor (Growbox)", "Outdoor (Garten)", "Gewächshaus", 
                "Balkon", "Dachboden", "Keller"
            ],
            cultivationGroups: [],
            tasks: [],
            documentation: []
        };

        // Lade Daten aus LocalStorage
        this.loadData();
        
        // Initialisiere Event Listeners
        this.initEventListeners();
        
        // Initialisiere Views
        this.initViews();
        
        // Zeige Dashboard
        this.showView('dashboard');
        
        // Erstelle Sample-Daten falls keine vorhanden
        if (this.data.cultivationGroups.length === 0) {
            this.createSampleData();
        }
    }

    // Event Listeners initialisieren
    initEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.currentTarget.getAttribute('data-view');
                this.showView(view);
            });
        });

        // Add Group Buttons
        document.getElementById('add-group-btn').addEventListener('click', () => this.showGroupModal());
        document.getElementById('add-group-btn-2').addEventListener('click', () => this.showGroupModal());

        // Group Form
        document.getElementById('group-form').addEventListener('submit', (e) => this.saveGroup(e));
        document.getElementById('cancel-group').addEventListener('click', () => this.hideGroupModal());
        document.getElementById('close-group-modal').addEventListener('click', () => this.hideGroupModal());

        // Task Modal
        document.getElementById('close-task-modal').addEventListener('click', () => this.hideTaskModal());
        document.getElementById('cancel-task').addEventListener('click', () => this.hideTaskModal());
        document.getElementById('complete-task').addEventListener('click', () => this.completeTask());

        // Documentation Modal
        document.getElementById('add-documentation-btn').addEventListener('click', () => this.showDocumentationModal());
        document.getElementById('documentation-form').addEventListener('submit', (e) => this.saveDocumentation(e));
        document.getElementById('cancel-documentation').addEventListener('click', () => this.hideDocumentationModal());
        document.getElementById('close-documentation-modal').addEventListener('click', () => this.hideDocumentationModal());

        // Documentation Type Change
        document.getElementById('doc-type').addEventListener('change', (e) => {
            const photoGroup = document.getElementById('photo-upload-group');
            photoGroup.style.display = e.target.value === 'photo' ? 'block' : 'none';
        });

        // Calendar Navigation
        document.getElementById('prev-month').addEventListener('click', () => this.previousMonth());
        document.getElementById('next-month').addEventListener('click', () => this.nextMonth());

        // Task Filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentTaskFilter = e.target.getAttribute('data-filter');
                this.updateTaskFilters();
                this.renderTasks();
            });
        });

        // Modal Outside Click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.hideAllModals();
            }
        });
    }

    // Views initialisieren
    initViews() {
        // Setze heutiges Datum als Standard
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('start-date').value = today;
        document.getElementById('doc-date').value = today;
    }

    // View wechseln
    showView(viewName) {
        // Alle Views ausblenden
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });

        // Navigation aktualisieren
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Gewählte View anzeigen
        document.getElementById(`${viewName}-view`).classList.add('active');
        document.querySelector(`[data-view="${viewName}"]`).classList.add('active');

        this.currentView = viewName;

        // View-spezifische Aktionen
        switch(viewName) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'groups':
                this.renderGroups();
                break;
            case 'calendar':
                this.renderCalendar();
                break;
            case 'tasks':
                this.renderTasks();
                break;
            case 'documentation':
                this.renderDocumentation();
                break;
        }
    }

    // Dashboard rendern
    renderDashboard() {
        this.updateStats();
        this.renderDashboardGroups();
        this.renderDashboardTasks();
    }

    // Statistiken aktualisieren
    updateStats() {
        const totalGroups = this.data.cultivationGroups.length;
        const totalPlants = this.data.cultivationGroups.reduce((sum, group) => sum + group.plantCount, 0);
        const pendingTasks = this.data.tasks.filter(task => !task.completed && this.isTaskDue(task)).length;
        const avgAge = totalGroups > 0 ? 
            Math.round(this.data.cultivationGroups.reduce((sum, group) => sum + this.getPlantAge(group.startDate), 0) / totalGroups) : 0;

        document.getElementById('total-groups').textContent = totalGroups;
        document.getElementById('total-plants').textContent = totalPlants;
        document.getElementById('pending-tasks').textContent = pendingTasks;
        document.getElementById('avg-age').textContent = avgAge;
    }

    // Dashboard Gruppen rendern
    renderDashboardGroups() {
        const container = document.getElementById('dashboard-groups');
        
        if (this.data.cultivationGroups.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-seedling"></i>
                    <h3>Keine Aufzuchtgruppen</h3>
                    <p>Erstellen Sie Ihre erste Aufzuchtgruppe um zu beginnen.</p>
                    <button class="btn btn-primary" onclick="app.showGroupModal()">
                        <i class="fas fa-plus"></i> Erste Gruppe erstellen
                    </button>
                </div>
            `;
            return;
        }

        container.innerHTML = this.data.cultivationGroups.map(group => {
            const age = this.getPlantAge(group.startDate);
            const weeks = Math.floor(age / 7);
            const phase = this.getCurrentPhase(age);
            const progress = this.getPhaseProgress(age);

            return `
                <div class="group-card">
                    <div class="group-header">
                        <div class="group-name">${group.name}</div>
                        <div class="group-phase">${phase.name}</div>
                    </div>
                    <div class="group-details">
                        <div class="group-detail">
                            <div class="group-detail-value">${age}</div>
                            <div class="group-detail-label">Tage</div>
                        </div>
                        <div class="group-detail">
                            <div class="group-detail-value">${weeks}</div>
                            <div class="group-detail-label">Wochen</div>
                        </div>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <div class="group-info">
                        <span><i class="fas fa-seedling"></i> ${group.plantCount} Pflanzen</span>
                        <span><i class="fas fa-cannabis"></i> ${group.strain}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${group.location}</span>
                    </div>
                    <div class="group-actions">
                        <button class="btn btn-sm btn-secondary" onclick="app.editGroup('${group.id}')">
                            <i class="fas fa-edit"></i> Bearbeiten
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="app.deleteGroup('${group.id}')">
                            <i class="fas fa-trash"></i> Löschen
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Dashboard Aufgaben rendern
    renderDashboardTasks() {
        const container = document.getElementById('dashboard-tasks');
        const upcomingTasks = this.data.tasks
            .filter(task => !task.completed && this.isTaskDue(task))
            .slice(0, 5);

        if (upcomingTasks.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-check-circle"></i>
                    <h3>Keine anstehenden Aufgaben</h3>
                    <p>Alle Aufgaben sind erledigt!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = upcomingTasks.map(task => this.renderTaskCard(task)).join('');
    }

    // Aufgabenkarte rendern
    renderTaskCard(task) {
        const group = this.data.cultivationGroups.find(g => g.id === task.groupId);
        const isOverdue = new Date(task.dueDate) < new Date();
        const dueDateFormatted = this.formatDate(task.dueDate);

        return `
            <div class="task-card ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}" 
                 onclick="app.showTaskModal('${task.id}')">
                <div class="task-icon ${task.type}">
                    <i class="fas ${this.getTaskIcon(task.type)}"></i>
                </div>
                <div class="task-content">
                    <div class="task-title">${task.title}</div>
                    <div class="task-description">${task.description}</div>
                    <div class="task-meta">
                        <span class="task-date ${isOverdue ? 'overdue' : ''}">
                            <i class="fas fa-calendar"></i> ${dueDateFormatted}
                        </span>
                        ${group ? `<span><i class="fas fa-leaf"></i> ${group.name}</span>` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    // Aufgaben-Icon ermitteln
    getTaskIcon(type) {
        const icons = {
            fertilizing: 'fa-tint',
            watering: 'fa-hand-holding-water',
            phase: 'fa-seedling',
            measurement: 'fa-ruler',
            note: 'fa-sticky-note'
        };
        return icons[type] || 'fa-tasks';
    }

    // Gruppen rendern
    renderGroups() {
        const container = document.getElementById('groups-list');
        
        if (this.data.cultivationGroups.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-seedling"></i>
                    <h3>Keine Aufzuchtgruppen</h3>
                    <p>Erstellen Sie Ihre erste Aufzuchtgruppe um zu beginnen.</p>
                    <button class="btn btn-primary" onclick="app.showGroupModal()">
                        <i class="fas fa-plus"></i> Erste Gruppe erstellen
                    </button>
                </div>
            `;
            return;
        }

        container.innerHTML = this.data.cultivationGroups.map(group => {
            const age = this.getPlantAge(group.startDate);
            const weeks = Math.floor(age / 7);
            const phase = this.getCurrentPhase(age);

            return `
                <div class="group-list-item">
                    <div class="group-list-header">
                        <div>
                            <h3 class="group-name">${group.name}</h3>
                            <div class="group-phase">${phase.name}</div>
                        </div>
                        <div class="group-list-actions">
                            <button class="btn btn-sm btn-secondary" onclick="app.editGroup('${group.id}')">
                                <i class="fas fa-edit"></i> Bearbeiten
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="app.deleteGroup('${group.id}')">
                                <i class="fas fa-trash"></i> Löschen
                            </button>
                        </div>
                    </div>
                    <div class="group-list-details">
                        <div class="group-detail">
                            <div class="group-detail-label">Alter</div>
                            <div class="group-detail-value">${age} Tage (${weeks} Wochen)</div>
                        </div>
                        <div class="group-detail">
                            <div class="group-detail-label">Pflanzen</div>
                            <div class="group-detail-value">${group.plantCount}</div>
                        </div>
                        <div class="group-detail">
                            <div class="group-detail-label">Sorte</div>
                            <div class="group-detail-value">${group.strain}</div>
                        </div>
                        <div class="group-detail">
                            <div class="group-detail-label">Standort</div>
                            <div class="group-detail-value">${group.location}</div>
                        </div>
                        <div class="group-detail">
                            <div class="group-detail-label">Startdatum</div>
                            <div class="group-detail-value">${this.formatDate(group.startDate)}</div>
                        </div>
                    </div>
                    ${group.notes ? `<div class="group-notes"><strong>Notizen:</strong> ${group.notes}</div>` : ''}
                </div>
            `;
        }).join('');
    }

    // Kalender rendern
    renderCalendar() {
        const container = document.getElementById('calendar');
        const monthNames = [
            'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
            'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
        ];
        
        document.getElementById('current-month').textContent = 
            `${monthNames[this.currentMonth.getMonth()]} ${this.currentMonth.getFullYear()}`;

        const firstDay = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
        const lastDay = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay() + 1); // Start mit Montag

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let html = `
            <div class="calendar-header">
                <div class="calendar-day-header">Mo</div>
                <div class="calendar-day-header">Di</div>
                <div class="calendar-day-header">Mi</div>
                <div class="calendar-day-header">Do</div>
                <div class="calendar-day-header">Fr</div>
                <div class="calendar-day-header">Sa</div>
                <div class="calendar-day-header">So</div>
            </div>
            <div class="calendar-grid">
        `;

        for (let i = 0; i < 42; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            
            const isCurrentMonth = currentDate.getMonth() === this.currentMonth.getMonth();
            const isToday = currentDate.getTime() === today.getTime();
            const events = this.getEventsForDate(currentDate);

            html += `
                <div class="calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}"
                     onclick="app.selectCalendarDay('${currentDate.toISOString().split('T')[0]}')">
                    <div class="calendar-day-number">${currentDate.getDate()}</div>
                    <div class="calendar-events">
                        ${events.map(event => `<div class="calendar-event ${event.type}"></div>`).join('')}
                    </div>
                </div>
            `;
        }

        html += '</div>';
        container.innerHTML = html;
    }

    // Events für Datum ermitteln
    getEventsForDate(date) {
        const events = [];
        const dateStr = date.toISOString().split('T')[0];

        // Aufgaben für dieses Datum
        this.data.tasks.forEach(task => {
            if (task.dueDate === dateStr) {
                events.push({
                    type: task.type,
                    title: task.title
                });
            }
        });

        return events;
    }

    // Vorherigen Monat anzeigen
    previousMonth() {
        this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
        this.renderCalendar();
    }

    // Nächsten Monat anzeigen
    nextMonth() {
        this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
        this.renderCalendar();
    }

    // Kalendertag auswählen
    selectCalendarDay(dateStr) {
        console.log('Kalendertag ausgewählt:', dateStr);
        // Hier könnte ein Modal für Tagesdetails geöffnet werden
    }

    // Aufgaben rendern
    renderTasks() {
        const container = document.getElementById('tasks-list');
        let tasks = [...this.data.tasks];

        // Filter anwenden
        switch(this.currentTaskFilter) {
            case 'pending':
                tasks = tasks.filter(task => !task.completed);
                break;
            case 'completed':
                tasks = tasks.filter(task => task.completed);
                break;
            case 'overdue':
                tasks = tasks.filter(task => !task.completed && new Date(task.dueDate) < new Date());
                break;
        }

        // Sortieren nach Fälligkeitsdatum
        tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

        if (tasks.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-tasks"></i>
                    <h3>Keine Aufgaben</h3>
                    <p>Keine Aufgaben für den ausgewählten Filter gefunden.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = tasks.map(task => this.renderTaskCard(task)).join('');
    }

    // Aufgaben-Filter aktualisieren
    updateTaskFilters() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${this.currentTaskFilter}"]`).classList.add('active');
    }

    // Dokumentation rendern
    renderDocumentation() {
        const container = document.getElementById('documentation-list');
        
        if (this.data.documentation.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-camera"></i>
                    <h3>Keine Dokumentation</h3>
                    <p>Fügen Sie Fotos und Notizen zur Dokumentation hinzu.</p>
                    <button class="btn btn-primary" onclick="app.showDocumentationModal()">
                        <i class="fas fa-plus"></i> Erste Dokumentation
                    </button>
                </div>
            `;
            return;
        }

        container.innerHTML = this.data.documentation.map(doc => {
            const group = this.data.cultivationGroups.find(g => g.id === doc.groupId);
            
            return `
                <div class="documentation-item">
                    <div class="documentation-image">
                        ${doc.photoUrl ? `<img src="${doc.photoUrl}" alt="${doc.title}">` : '<i class="fas fa-image"></i>'}
                    </div>
                    <div class="documentation-content">
                        <div class="documentation-title">${doc.title || this.getDocumentationTitle(doc.type)}</div>
                        <div class="documentation-meta">
                            ${this.formatDate(doc.date)} • ${group ? group.name : 'Unbekannte Gruppe'}
                        </div>
                        <div class="documentation-description">${doc.description}</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Dokumentations-Titel ermitteln
    getDocumentationTitle(type) {
        const titles = {
            photo: 'Foto',
            fertilizing: 'Düngung',
            watering: 'Bewässerung',
            measurement: 'Messung',
            note: 'Notiz'
        };
        return titles[type] || 'Dokumentation';
    }

    // Gruppen-Modal anzeigen
    showGroupModal(groupId = null) {
        this.editingGroupId = groupId;
        const modal = document.getElementById('group-modal');
        const title = document.getElementById('group-modal-title');
        const form = document.getElementById('group-form');

        if (groupId) {
            const group = this.data.cultivationGroups.find(g => g.id === groupId);
            title.textContent = 'Aufzuchtgruppe bearbeiten';
            
            // Formular mit Gruppendaten füllen
            document.getElementById('group-name').value = group.name;
            document.getElementById('plant-count').value = group.plantCount;
            document.getElementById('strain').value = group.strain;
            document.getElementById('location').value = group.location;
            document.getElementById('start-date').value = group.startDate;
            document.getElementById('notes').value = group.notes || '';
        } else {
            title.textContent = 'Neue Aufzuchtgruppe';
            form.reset();
            document.getElementById('start-date').value = new Date().toISOString().split('T')[0];
        }

        modal.classList.add('active');
    }

    // Gruppen-Modal ausblenden
    hideGroupModal() {
        document.getElementById('group-modal').classList.remove('active');
        this.editingGroupId = null;
    }

    // Gruppe speichern
    saveGroup(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const groupData = {
            name: document.getElementById('group-name').value,
            plantCount: parseInt(document.getElementById('plant-count').value),
            strain: document.getElementById('strain').value,
            location: document.getElementById('location').value,
            startDate: document.getElementById('start-date').value,
            notes: document.getElementById('notes').value
        };

        if (this.editingGroupId) {
            // Gruppe bearbeiten
            const index = this.data.cultivationGroups.findIndex(g => g.id === this.editingGroupId);
            this.data.cultivationGroups[index] = { ...this.data.cultivationGroups[index], ...groupData };
        } else {
            // Neue Gruppe erstellen
            const newGroup = {
                id: this.generateId(),
                ...groupData,
                currentPhase: 'germination',
                createdAt: new Date().toISOString()
            };
            this.data.cultivationGroups.push(newGroup);
            
            // Automatische Aufgaben erstellen
            this.createTasksForGroup(newGroup);
        }

        this.saveData();
        this.hideGroupModal();
        this.renderCurrentView();
    }

    // Gruppe bearbeiten
    editGroup(groupId) {
        this.showGroupModal(groupId);
    }

    // Gruppe löschen
    deleteGroup(groupId) {
        if (confirm('Möchten Sie diese Aufzuchtgruppe wirklich löschen? Alle zugehörigen Aufgaben und Dokumentationen werden ebenfalls gelöscht.')) {
            // Gruppe entfernen
            this.data.cultivationGroups = this.data.cultivationGroups.filter(g => g.id !== groupId);
            
            // Zugehörige Aufgaben entfernen
            this.data.tasks = this.data.tasks.filter(t => t.groupId !== groupId);
            
            // Zugehörige Dokumentation entfernen
            this.data.documentation = this.data.documentation.filter(d => d.groupId !== groupId);
            
            this.saveData();
            this.renderCurrentView();
        }
    }

    // Aufgaben für Gruppe erstellen
    createTasksForGroup(group) {
        const startDate = new Date(group.startDate);
        
        // Düngung-Aufgaben basierend auf Wachstumsphasen
        const vegetativeStart = new Date(startDate);
        vegetativeStart.setDate(vegetativeStart.getDate() + 14); // Nach 2 Wochen
        
        const floweringStart = new Date(startDate);
        floweringStart.setDate(floweringStart.getDate() + 56); // Nach 8 Wochen

        // Vegetative Düngung alle 10 Tage
        for (let i = 0; i < 4; i++) {
            const dueDate = new Date(vegetativeStart);
            dueDate.setDate(dueDate.getDate() + (i * 10));
            
            this.data.tasks.push({
                id: this.generateId(),
                groupId: group.id,
                type: 'fertilizing',
                title: 'Düngung - Vegetative Phase',
                description: '7ml Dünger pro 1L Wasser',
                dueDate: dueDate.toISOString().split('T')[0],
                completed: false,
                recurring: true,
                recurringDays: 10
            });
        }

        // Blüte-Düngung alle 10 Tage
        for (let i = 0; i < 6; i++) {
            const dueDate = new Date(floweringStart);
            dueDate.setDate(dueDate.getDate() + (i * 10));
            
            this.data.tasks.push({
                id: this.generateId(),
                groupId: group.id,
                type: 'fertilizing',
                title: 'Düngung - Blütephase',
                description: '10ml Dünger pro 1L Wasser',
                dueDate: dueDate.toISOString().split('T')[0],
                completed: false,
                recurring: true,
                recurringDays: 10
            });
        }

        // Tägliche Gieß-Erinnerungen für die ersten 30 Tage
        for (let i = 0; i < 30; i++) {
            const dueDate = new Date(startDate);
            dueDate.setDate(dueDate.getDate() + i);
            
            this.data.tasks.push({
                id: this.generateId(),
                groupId: group.id,
                type: 'watering',
                title: 'Tägliches Gießen',
                description: 'Feuchtigkeit prüfen und bei Bedarf gießen',
                dueDate: dueDate.toISOString().split('T')[0],
                completed: false,
                recurring: true,
                recurringDays: 1
            });
        }
    }

    // Aufgaben-Modal anzeigen
    showTaskModal(taskId) {
        this.currentTaskId = taskId;
        const task = this.data.tasks.find(t => t.id === taskId);
        const group = this.data.cultivationGroups.find(g => g.id === task.groupId);
        const modal = document.getElementById('task-modal');
        const body = document.getElementById('task-modal-body');

        body.innerHTML = `
            <div class="task-details">
                <h4>${task.title}</h4>
                <p><strong>Beschreibung:</strong> ${task.description}</p>
                <p><strong>Fälligkeitsdatum:</strong> ${this.formatDate(task.dueDate)}</p>
                <p><strong>Aufzuchtgruppe:</strong> ${group ? group.name : 'Unbekannt'}</p>
                <p><strong>Status:</strong> ${task.completed ? 'Erledigt' : 'Offen'}</p>
                ${task.recurring ? `<p><strong>Wiederholung:</strong> Alle ${task.recurringDays} Tage</p>` : ''}
            </div>
        `;

        const completeBtn = document.getElementById('complete-task');
        completeBtn.style.display = task.completed ? 'none' : 'block';

        modal.classList.add('active');
    }

    // Aufgaben-Modal ausblenden
    hideTaskModal() {
        document.getElementById('task-modal').classList.remove('active');
        this.currentTaskId = null;
    }

    // Aufgabe als erledigt markieren
    completeTask() {
        if (!this.currentTaskId) return;

        const task = this.data.tasks.find(t => t.id === this.currentTaskId);
        task.completed = true;
        task.completedAt = new Date().toISOString();

        // Wenn wiederkehrende Aufgabe, neue Aufgabe erstellen
        if (task.recurring) {
            const newDueDate = new Date(task.dueDate);
            newDueDate.setDate(newDueDate.getDate() + task.recurringDays);

            const newTask = {
                ...task,
                id: this.generateId(),
                dueDate: newDueDate.toISOString().split('T')[0],
                completed: false,
                completedAt: null
            };

            this.data.tasks.push(newTask);
        }

        this.saveData();
        this.hideTaskModal();
        this.renderCurrentView();
    }

    // Dokumentations-Modal anzeigen
    showDocumentationModal() {
        const modal = document.getElementById('documentation-modal');
        const groupSelect = document.getElementById('doc-group');
        
        // Gruppen-Optionen aktualisieren
        groupSelect.innerHTML = '<option value="">Gruppe auswählen</option>' +
            this.data.cultivationGroups.map(group => 
                `<option value="${group.id}">${group.name}</option>`
            ).join('');

        modal.classList.add('active');
    }

    // Dokumentations-Modal ausblenden
    hideDocumentationModal() {
        document.getElementById('documentation-modal').classList.remove('active');
        document.getElementById('documentation-form').reset();
        document.getElementById('photo-upload-group').style.display = 'none';
    }

    // Dokumentation speichern
    saveDocumentation(event) {
        event.preventDefault();

        const documentation = {
            id: this.generateId(),
            groupId: document.getElementById('doc-group').value,
            date: document.getElementById('doc-date').value,
            type: document.getElementById('doc-type').value,
            description: document.getElementById('doc-notes').value,
            createdAt: new Date().toISOString()
        };

        // Foto-Upload simulieren (in echter App würde hier ein Upload stattfinden)
        const photoFile = document.getElementById('doc-photo').files[0];
        if (photoFile) {
            // In einer echten Anwendung würde hier das Foto hochgeladen werden
            documentation.photoUrl = URL.createObjectURL(photoFile);
        }

        this.data.documentation.push(documentation);
        this.saveData();
        this.hideDocumentationModal();
        this.renderCurrentView();
    }

    // Alle Modals ausblenden
    hideAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    }

    // Aktuelle View neu rendern
    renderCurrentView() {
        this.showView(this.currentView);
    }

    // Pflanzenalter berechnen (in Tagen)
    getPlantAge(startDate) {
        const start = new Date(startDate);
        const today = new Date();
        const diffTime = Math.abs(today - start);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    // Aktuelle Wachstumsphase ermitteln
    getCurrentPhase(age) {
        for (const phase of this.data.growthPhases) {
            if (age >= phase.minDays && age <= phase.maxDays) {
                return phase;
            }
        }
        // Fallback zur letzten Phase
        return this.data.growthPhases[this.data.growthPhases.length - 1];
    }

    // Phasen-Fortschritt berechnen
    getPhaseProgress(age) {
        const phase = this.getCurrentPhase(age);
        const progress = ((age - phase.minDays) / (phase.maxDays - phase.minDays)) * 100;
        return Math.min(100, Math.max(0, progress));
    }

    // Prüfen ob Aufgabe fällig ist
    isTaskDue(task) {
        const dueDate = new Date(task.dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        dueDate.setHours(0, 0, 0, 0);
        return dueDate <= today;
    }

    // Datum formatieren
    formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    // Eindeutige ID generieren
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Sample-Daten erstellen
    createSampleData() {
        const sampleGroups = [
            {
                id: 'group-1',
                name: 'Northern Lights Indoor',
                plantCount: 4,
                strain: 'Northern Lights',
                location: 'Indoor (Growbox)',
                startDate: '2025-07-15',
                currentPhase: 'vegetative',
                createdAt: '2025-07-15T10:00:00Z',
                notes: 'Erste Indoor-Zucht, Growbox 120x120cm'
            },
            {
                id: 'group-2',
                name: 'Outdoor Balkon Mix',
                plantCount: 2,
                strain: 'White Widow',
                location: 'Balkon',
                startDate: '2025-06-01',
                currentPhase: 'flowering',
                createdAt: '2025-06-01T09:30:00Z',
                notes: 'Balkon südseitig, viel Sonnenlicht'
            }
        ];

        this.data.cultivationGroups = sampleGroups;
        
        // Aufgaben für Sample-Gruppen erstellen
        sampleGroups.forEach(group => {
            this.createTasksForGroup(group);
        });

        this.saveData();
    }

    // Daten in LocalStorage speichern
    saveData() {
        try {
            localStorage.setItem('growBuddyData', JSON.stringify(this.data));
        } catch (error) {
            console.error('Fehler beim Speichern der Daten:', error);
        }
    }

    // Daten aus LocalStorage laden
    loadData() {
        try {
            const savedData = localStorage.getItem('growBuddyData');
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                // Merge mit Standard-Daten um neue Features zu unterstützen
                this.data = { ...this.data, ...parsedData };
            }
        } catch (error) {
            console.error('Fehler beim Laden der Daten:', error);
        }
    }
}

// App initialisieren wenn DOM geladen ist
document.addEventListener('DOMContentLoaded', () => {
    window.app = new GrowBuddyApp();
});