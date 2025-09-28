// PostManagement Component - Status post management
Vue.component('post-management', {
    data: function() {
        return {
            statusText: 'Task 10.1',
            statusUpdates: [
                { id: 1, text: 'Task 9.1' },
                { id: 2, text: 'Task 10.1' }
            ],
            nextId: 3
        }
    },
    methods: {
        addStatus() {
            if (this.statusText.trim()) {
                this.statusUpdates.unshift({
                    id: this.nextId++,
                    text: this.statusText.trim()
                });
                this.statusText = '';
            }
        },
        deleteStatus(id) {
            this.statusUpdates = this.statusUpdates.filter(status => status.id !== id);
        }
    },
    template: `
        <div>
            <h1 class="text-center mb-4">Status Post App</h1>
            
            <!-- Status Input Section -->
            <div class="card mb-4">
                <div class="card-body">
                    <div class="mb-3">
                        <label for="statusInput" class="form-label">Status:</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            id="statusInput"
                            v-model="statusText"
                            placeholder="Enter your status"
                        >
                    </div>
                    <button 
                        type="button" 
                        class="btn btn-success"
                        @click="addStatus"
                    >
                        POST
                    </button>
                </div>
            </div>

            <!-- Status Updates Section -->
            <div class="card">
                <div class="card-body">
                    <h3 class="mb-3">Status Updates</h3>
                    <div v-if="statusUpdates.length === 0" class="text-muted">
                        No status updates yet.
                    </div>
                    <div v-else>
                        <div 
                            v-for="status in statusUpdates" 
                            :key="status.id"
                            class="status-item d-flex justify-content-between align-items-center"
                        >
                            <span>{{ status.text }}</span>
                            <button 
                                type="button" 
                                class="btn btn-warning btn-sm"
                                @click="deleteStatus(status.id)"
                            >
                                DELETE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
});
