// Import Components
// Note: In a real application, you would use ES6 modules or a bundler
// For this example, we'll load the components via script tags in HTML

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