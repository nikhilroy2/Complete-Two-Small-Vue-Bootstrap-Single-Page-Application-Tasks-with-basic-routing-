// StudentMarks Component - Student marks table with pagination
Vue.component('student-marks', {
    data: function() {
        return {
            perPage: 3,
            currentPage: 1,
            units: [
                { name: "Amy",   mark: 90 },
                { name: "Bill",  mark: 80 },
                { name: "Casey", mark: 78 },
                { name: "David", mark: 84 },
                { name: "Emma",  mark: 92 },
                { name: "Frank", mark: 67 },
                { name: "Gina",  mark: 74 },
                { name: "Harry", mark: 88 },
                { name: "Ivy",   mark: 95 },
                { name: "Jack",  mark: 69 },
                { name: "Karen", mark: 81 },
                { name: "Liam",  mark: 76 },
                { name: "Maya",  mark: 83 },
                { name: "Noah",  mark: 59 },
                { name: "Olivia",mark: 91 },
                { name: "Paul",  mark: 72 },
                { name: "Quinn", mark: 85 },
                { name: "Rachel",mark: 77 },
                { name: "Sam",   mark: 63 },
                { name: "Tina",  mark: 87 },
                { name: "Umar",  mark: 58 },
                { name: "Vicky", mark: 79 },
                { name: "Will",  mark: 94 },
                { name: "Xavier",mark: 66 },
                { name: "Yasmin",mark: 70 },
                { name: "Zack",  mark: 82 }
            ]
        }
    },
    computed: {
        getContent: function () {
            let current = this.currentPage * this.perPage;
            let start = current - this.perPage;
            return this.units.slice(start, current);
        },
        totalPages() {
            return Math.ceil(this.units.length / this.perPage);
        }
    },
    methods: {
        //sets the clicked page
        clickCallback: function (pageNum) {
            this.currentPage = Number(pageNum);
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
                    <caption>Semester 1, 2025</caption>
                    <thead class="table-dark">
                        <tr>
                            <th scope="col" id="sName">Student Name</th>
                            <th scope="col" id="sMarks">Marks</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr v-for="unit in getContent" :key="unit.name">
                            <td headers="sName">{{ unit.name }}</td>
                            <td headers="sMarks">{{ unit.mark }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Vue Paginate template -->
            <paginate 
                :page-count="totalPages"    
                :page-range="6" 
                :margin-pages="1"
                :click-handler="clickCallback" 
                :prev-text="'Prev Page'" 		
                :next-text="'Next Page'" 
                :container-class="'pagination'" 
                :active-class="'currentPage'"
            >
            </paginate>
        </div>
    `
});
