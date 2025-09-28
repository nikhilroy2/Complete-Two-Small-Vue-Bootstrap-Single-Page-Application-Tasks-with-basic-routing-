// NameTest Component - String test functionality
Vue.component('name-test', {
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
});
