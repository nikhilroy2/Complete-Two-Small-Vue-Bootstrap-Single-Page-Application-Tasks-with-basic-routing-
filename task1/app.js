// Import Components
// Note: In a real application, you would use ES6 modules or a bundler
// For this example, we'll load the components via script tags in HTML

// Register Vuejs Paginate component
if (typeof VuejsPaginate !== 'undefined') {
    Vue.component('paginate', VuejsPaginate);
} else {
    // Fallback: Create a simple pagination component
    Vue.component('paginate', {
        props: ['pageCount', 'pageRange', 'marginPages', 'clickHandler', 'prevText', 'nextText', 'containerClass', 'activeClass'],
        template: `
            <nav>
                <ul :class="containerClass">
                    <li class="page-item" :class="{ disabled: $parent.currentPage === 1 }">
                        <button class="page-link" @click="$parent.prevPage()" :disabled="$parent.currentPage === 1">
                            {{ prevText }}
                        </button>
                    </li>
                    <li v-for="page in pageNumbers" :key="page" class="page-item" :class="{ active: page === $parent.currentPage }">
                        <button class="page-link" @click="clickHandler(page)">
                            {{ page }}
                        </button>
                    </li>
                    <li class="page-item" :class="{ disabled: $parent.currentPage === pageCount }">
                        <button class="page-link" @click="$parent.nextPage()" :disabled="$parent.currentPage === pageCount">
                            {{ nextText }}
                        </button>
                    </li>
                </ul>
            </nav>
        `,
        computed: {
            pageNumbers() {
                const pages = [];
                const total = this.pageCount;
                const current = this.$parent.currentPage;
                
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
        }
    });
}

// Vue 2 Router Configuration
const routes = [
    { path: '/', component: Vue.component('name-test') },
    { path: '/post-management', component: Vue.component('post-management') },
    { path: '/student-marks', component: Vue.component('student-marks') }
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