<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <!-- Header -->
        <div class="text-center mb-4">
          <h1 class="display-4 text-primary">Task Manager</h1>
          <p class="lead text-muted">Organize your daily tasks efficiently</p>
        </div>

        <!-- Add Task Form -->
        <div class="card mb-4">
          <div class="card-header">
            <h3 class="card-title mb-0">
              <i class="fas fa-plus-circle me-2"></i>Add New Task
            </h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="add(task)">
              <div class="row">
                <div class="col-md-8 mb-3">
                  <label for="taskInput" class="form-label d-block text-start">
                    <strong>Enter new task:</strong>
                  </label>
                  <input 
                    id="taskInput" 
                    v-model="task" 
                    type="text" 
                    class="form-control form-control-lg" 
                    placeholder="What needs to be done?"
                    required
                  >
                </div>
                <div class="col-md-4 d-flex align-items-end mb-3">
                  <button type="submit" class="btn btn-primary btn-lg w-100">
                    <i class="fas fa-plus me-2"></i>Add Task
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Task Statistics -->
        <div class="row mb-4" v-if="taskList.length > 0">
          <div class="col-md-3">
            <div class="card text-center">
              <div class="card-body">
                <h5 class="card-title text-primary">{{ taskList.length }}</h5>
                <p class="card-text">Total Tasks</p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card text-center">
              <div class="card-body">
                <h5 class="card-title text-success">{{ completedTasks }}</h5>
                <p class="card-text">Completed</p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card text-center">
              <div class="card-body">
                <h5 class="card-title text-warning">{{ pendingTasks }}</h5>
                <p class="card-text">Pending</p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card text-center">
              <div class="card-body">
                <h5 class="card-title text-info">{{ completionPercentage }}%</h5>
                <p class="card-text">Complete</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Task List -->
        <div class="card" v-if="taskList.length > 0">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h3 class="card-title mb-0">
              <i class="fas fa-tasks me-2"></i>Your Tasks
            </h3>
            <div>
              <button 
                @click="clearCompleted" 
                class="btn btn-outline-danger btn-sm me-2"
                v-if="completedTasks > 0"
              >
                <i class="fas fa-trash me-1"></i>Clear Completed
              </button>
              <button 
                @click="markAllComplete" 
                class="btn btn-outline-success btn-sm"
                v-if="pendingTasks > 0"
              >
                <i class="fas fa-check-double me-1"></i>Mark All Complete
              </button>
            </div>
          </div>
          <div class="card-body p-0">
            <div class="list-group list-group-flush">
              <div 
                v-for="(task, index) in taskList" 
                :key="task.id" 
                class="list-group-item d-flex justify-content-between align-items-center"
                :class="{ 'bg-light': task.completed }"
              >
                <div class="d-flex align-items-center">
                  <div class="form-check me-3">
                    <input 
                      class="form-check-input" 
                      type="checkbox" 
                      :id="'task-' + task.id"
                      v-model="task.completed"
                      @change="updateTaskStatus(task)"
                    >
                    <label class="form-check-label" :for="'task-' + task.id"></label>
                  </div>
                  <div>
                    <span 
                      class="task-text d-block text-start"
                      :class="{ 'text-decoration-line-through text-muted': task.completed }"
                    >
                      {{ task.text }}
                    </span>
                    <small class="text-muted d-block">{{ task.time }}</small>
                  </div>
                </div>
                <div class="d-flex align-items-center">
                  <span 
                    class="badge me-2"
                    :class="task.completed ? 'bg-success' : 'bg-warning'"
                  >
                    {{ task.completed ? 'Completed' : 'Pending' }}
                  </span>
                  <button 
                    @click="remove(index)" 
                    class="btn btn-outline-danger btn-sm py-0"
                    title="Delete task"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-5">
          <div class="card">
            <div class="card-body">
              <i class="fas fa-clipboard-list fa-3x text-muted mb-3"></i>
              <h4 class="text-muted">No tasks yet</h4>
              <p class="text-muted">Add your first task above to get started!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TasksPage',
  data: function() {
    return {
      taskList: [],
      task: ''
    };
  },
  computed: {
    completedTasks() {
      return this.taskList.filter(task => task.completed).length;
    },
    pendingTasks() {
      return this.taskList.filter(task => !task.completed).length;
    },
    completionPercentage() {
      if (this.taskList.length === 0) return 0;
      return Math.round((this.completedTasks / this.taskList.length) * 100);
    }
  },
  methods: {
    add: function(status) {
      if (!status.trim()) return;
      this.taskList.unshift({
        id: Date.now(),
        text: status.trim(),
        time: new Date().toLocaleString(),
        completed: false
      });
      this.task = '';
    },
    remove: function(index) {
      this.taskList.splice(index, 1);
    },
    updateTaskStatus: function(task) {
      // Task status is automatically updated via v-model
      console.log(`Task "${task.text}" marked as ${task.completed ? 'completed' : 'pending'}`);
    },
    clearCompleted: function() {
      this.taskList = this.taskList.filter(task => !task.completed);
    },
    markAllComplete: function() {
      this.taskList.forEach(task => {
        task.completed = true;
      });
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

.list-group-item {
  border-left: none;
  border-right: none;
  transition: all 0.3s ease;
}

.list-group-item:hover {
  background-color: rgba(0, 123, 255, 0.05);
}

.task-text {
  font-size: 1rem;
  line-height: 1.4;
}

.btn {
  transition: all 0.3s ease;
}

.badge {
  font-size: 0.75em;
}

.display-4 {
  font-weight: 300;
}

.lead {
  font-weight: 300;
}

/* Custom checkbox styling */
.form-check-input:checked {
  background-color: #198754;
  border-color: #198754;
}

.form-check-input:focus {
  border-color: #198754;
  box-shadow: 0 0 0 0.2rem rgba(25, 135, 84, 0.25);
}
</style>
