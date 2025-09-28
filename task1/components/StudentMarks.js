// StudentMarks Component - Student marks table with pagination
Vue.component('student-marks', {
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
                    
                    <li v-for="page in pageNumbers" :key="page" class="page-item" :class="{ active: page === currentPage }">
                        <button class="page-link" @click="goToPage(page)">
                            {{ page }}
                        </button>
                    </li>
                    
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
});
