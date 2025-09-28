// Define components first
const NameTest = {
    data: function() {
        return {
            name: 'Amy',
            message: 'Awesome name!'
        }
    },
    methods: {
        updateMessage() {
            if (this.name.trim()) {
                this.message = 'Awesome name!';
            } else {
                this.message = 'Please enter a name.';
            }
        }
    },
    watch: {
        name() {
            this.updateMessage();
        }
    },
    mounted() {
        this.updateMessage();
    },
    template: `
        <div class="text-center">
            <h1 class="mb-4">String Test</h1>
            <div class="mb-3">
                <label for="nameInput" class="form-label">Please enter your name:</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="nameInput"
                    v-model="name"
                    placeholder="Enter your name"
                >
            </div>
            <div class="alert alert-info" role="alert">
                {{ message }}
            </div>
        </div>
    `
};

const PostManagement = {
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
                this.statusUpdates.push({
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
};

const StudentMarks = {
    data: function() {
        return {
            students: [
                { name: 'Amy', marks: 90 },
                { name: 'Bill', marks: 80 },
                { name: 'Casey', marks: 78 },
                { name: 'David', marks: 85 },
                { name: 'Emma', marks: 92 },
                { name: 'Frank', marks: 88 },
                { name: 'Grace', marks: 95 },
                { name: 'Henry', marks: 82 },
                { name: 'Ivy', marks: 89 },
                { name: 'Jack', marks: 91 },
                { name: 'Kate', marks: 87 },
                { name: 'Leo', marks: 93 },
                { name: 'Maya', marks: 86 },
                { name: 'Noah', marks: 94 },
                { name: 'Olivia', marks: 88 },
                { name: 'Paul', marks: 90 },
                { name: 'Quinn', marks: 85 },
                { name: 'Ruby', marks: 92 },
                { name: 'Sam', marks: 89 },
                { name: 'Tina', marks: 87 },
                { name: 'Uma', marks: 91 },
                { name: 'Victor', marks: 88 },
                { name: 'Wendy', marks: 93 },
                { name: 'Xavier', marks: 86 },
                { name: 'Yara', marks: 90 },
                { name: 'Zoe', marks: 94 }
            ],
            currentPage: 1,
            itemsPerPage: 3
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.students.length / this.itemsPerPage);
        },
        paginatedStudents() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.students.slice(start, end);
        },
        pageNumbers() {
            const pages = [];
            const total = this.totalPages;
            const current = this.currentPage;
            
            // Always show first page
            if (total > 0) pages.push(1);
            
            // Show pages around current page
            for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
                if (!pages.includes(i)) pages.push(i);
            }
            
            // Always show last page if different from first
            if (total > 1) pages.push(total);
            
            return pages;
        }
    },
    methods: {
        goToPage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        }
    },
    template: `
        <div>
            <h1 class="text-center mb-4">Student Marks</h1>
            
            <!-- Student Table -->
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th class="text-start">Student Name</th>
                            <th class="text-end">Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="student in paginatedStudents" :key="student.name">
                            <td class="text-start">{{ student.name }}</td>
                            <td class="text-end">{{ student.marks }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <nav aria-label="Student marks pagination">
                <ul class="pagination">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                        <button class="page-link" @click="prevPage" :disabled="currentPage === 1">
                            Prev Page
                        </button>
                    </li>
                    
                    <template v-for="page in pageNumbers" :key="page">
                        <li class="page-item" :class="{ active: page === currentPage }">
                            <button class="page-link" @click="goToPage(page)">
                                {{ page }}
                            </button>
                        </li>
                    </template>
                    
                    <li class="page-item" v-if="totalPages > 3">
                        <span class="page-link">...</span>
                    </li>
                    
                    <li class="page-item" :class="{ active: currentPage === totalPages }" v-if="totalPages > 1">
                        <button class="page-link" @click="goToPage(totalPages)">
                            {{ totalPages }}
                        </button>
                    </li>
                    
                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                        <button class="page-link" @click="nextPage" :disabled="currentPage === totalPages">
                            Next Page
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    `
};

// Vue 2 Router Configuration
const routes = [
    { path: '/', component: NameTest },
    { path: '/post-management', component: PostManagement },
    { path: '/student-marks', component: StudentMarks }
];

const router = new VueRouter({
    mode: 'hash',
    routes
});

// AppLayout Component - Main layout with navigation
Vue.component('app-layout', {
    template: `
        <div class="container-fluid">
            <!-- Navigation -->
            <div class="container mb-4">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <div class="navbar-nav">
                            <router-link to="/" class="nav-link" active-class="active">Name Test</router-link>
                            <span class="navbar-text mx-2">|</span>
                            <router-link to="/post-management" class="nav-link" active-class="active">Post Management</router-link>
                            <span class="navbar-text mx-2">|</span>
                            <router-link to="/student-marks" class="nav-link" active-class="active">Student Marks</router-link>
                        </div>
                    </div>
                </nav>
            </div>

            <!-- Main Content -->
            <div class="container">
                <router-view></router-view>
            </div>
        </div>
    `
});


// Main Vue App
const app = new Vue({
    el: '#app',
    router: router,
    template: `
        <app-layout></app-layout>
    `
});