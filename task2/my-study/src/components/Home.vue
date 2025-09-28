<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <!-- Welcome Message -->
        <div class="text-center mb-4">
          <h1 class="display-4 text-primary">
            Welcome {{ fullName }}!
          </h1>
        </div>

        <!-- Name Input Section -->
        <div class="card mb-4">
          <div class="card-header">
            <h3 class="card-title mb-0">What is your name?</h3>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="firstName" class="form-label">First Name:</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="firstName" 
                  v-model="firstName"
                  placeholder="Enter your first name"
                >
              </div>
              <div class="col-md-6 mb-3">
                <label for="lastName" class="form-label">Last Name:</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="lastName" 
                  v-model="lastName"
                  placeholder="Enter your last name"
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Image Selection -->
        <div class="card mb-4">
          <div class="card-header">
            <h3 class="card-title mb-0">Choose your preference:</h3>
          </div>
          <div class="card-body">
            <div class="row justify-content-center">
              <div class="col-auto">
                <div class="form-check">
                  <input 
                    class="form-check-input" 
                    type="radio" 
                    name="imageChoice" 
                    id="ocean" 
                    value="ocean" 
                    v-model="selectedImage"
                  >
                  <label class="form-check-label" for="ocean">
                    Ocean
                  </label>
                </div>
              </div>
              <div class="col-auto">
                <div class="form-check">
                  <input 
                    class="form-check-input" 
                    type="radio" 
                    name="imageChoice" 
                    id="mountain" 
                    value="mountain" 
                    v-model="selectedImage"
                  >
                  <label class="form-check-label" for="mountain">
                    Mountain
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Image Display -->
        <div class="card" v-if="selectedImage">
          <div class="card-body text-center">
            <img 
              :src="currentImageSrc" 
              :alt="selectedImage" 
              class="img-fluid rounded shadow"
              style="max-height: 400px; width: 100%; object-fit: cover;"
            >
            <p class="mt-3 text-muted">
              You selected: <strong>{{ selectedImage.charAt(0).toUpperCase() + selectedImage.slice(1) }}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      firstName: 'Amy',
      lastName: 'Smith',
      selectedImage: 'ocean'
    }
  },
  computed: {
    fullName() {
      if (this.firstName.trim() && this.lastName.trim()) {
        return `${this.firstName.trim()} ${this.lastName.trim()}`;
      }
      return 'Guest';
    },
    currentImageSrc() {
      if (this.selectedImage === 'mountain') {
        return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
      } else if (this.selectedImage === 'ocean') {
        return 'https://plus.unsplash.com/premium_photo-1666286163385-abe05f0326c4?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
      }
      return '';
    }
  }
}
</script>

<style scoped>
.card {
  border: none;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.form-control:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

.form-check-input:checked {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.display-4 {
  font-weight: 300;
}
</style>
