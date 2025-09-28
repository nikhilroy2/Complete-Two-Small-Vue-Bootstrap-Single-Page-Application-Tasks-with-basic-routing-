<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center mb-4">Units</h1>
        
        <!-- Units Table -->
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead class="table-dark">
              <tr>
                <th scope="col">Code</th>
                <th scope="col">Description</th>
                <th scope="col" class="text-end">cp</th>
                <th scope="col">Type</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="unit in units" :key="unit.code">
                <td class="fw-bold">{{ unit.code }}</td>
                <td>{{ unit.description }}</td>
                <td class="text-end">{{ unit.cp }}</td>
                <td>
                  <span class="badge" :class="getTypeBadgeClass(unit.type)">
                    {{ unit.type }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Summary -->
        <div class="row mt-4">
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Total Units</h5>
                <p class="card-text display-6">{{ units.length }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Total Credit Points</h5>
                <p class="card-text display-6">{{ totalCreditPoints }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Units from "../assets/units.json";

export default {
  name: 'UnitsPage',
  data: function() {
    return { 
      units: Units 
    }
  },
  computed: {
    totalCreditPoints() {
      return this.units.reduce((total, unit) => total + parseFloat(unit.cp), 0);
    }
  },
  methods: {
    getTypeBadgeClass(type) {
      switch(type) {
        case 'Core':
          return 'bg-primary';
        case 'Software Development':
          return 'bg-success';
        case 'Systems Analysis':
          return 'bg-info';
        default:
          return 'bg-secondary';
      }
    }
  }
}
</script>

<style scoped>
.table {
  border-radius: 0.375rem;
  overflow: hidden;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.table thead th {
  border-bottom: 2px solid #dee2e6;
  font-weight: 600;
}

.table tbody tr:hover {
  background-color: rgba(0, 123, 255, 0.075);
}

.badge {
  font-size: 0.75em;
  padding: 0.375rem 0.75rem;
}

.card {
  border: none;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.display-6 {
  font-weight: 300;
  color: #0d6efd;
}
</style>
