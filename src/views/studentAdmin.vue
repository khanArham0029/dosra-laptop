<template>
  <sideBarAdmin />
  <section class="home-section">
    <nav>
      <div class="sidebar-button">
        <span class="dashboard">Student</span>
      </div>
      <div class="search-box">
        <input type="text" placeholder="Search..." v-model="searchQuery" />
      </div>
      <div class="profile-details">
        <span class="admin_name">Mahad</span>
      </div>
    </nav>
    <div class="home-content">
      <div class="overview-boxes">
        <div class="box">
          <div class="right-side">
            <div class="add-user-button-container">
              <button class="addUserButton" @click="showAddForm">Add User</button>
            </div>
            <div class="number">Total Students: {{ totalStudents }}</div>
          </div>
        </div>
      </div>
      <div class="sales-boxes">
        <div class="recent-sales box">
          <div class="title">All Students</div>
          <div class="sales-details">
            <ul class="details">
              <li class="topic">Sr No</li>
              <li v-for="(student, index) in filteredStudents" :key="student.id">
                {{ index + 1 }}
              </li>
            </ul>
            <ul class="details">
              <li class="topic">Name</li>
              <li v-for="student in filteredStudents" :key="student.id">{{ student.name }}</li>
            </ul>
            <ul class="details">
              <li class="topic">Email</li>
              <li v-for="student in filteredStudents" :key="student.id">{{ student.email }}</li>
            </ul>
            <ul class="details">
              <li class="topic">Enrolled</li>
              <li v-for="student in filteredStudents" :key="student.id">{{ student.enrolled }}</li>
            </ul>
            <ul class="details">
              <li class="topic">Actions</li>
              <li v-for="student in filteredStudents" :key="student.id">
                <button class="actionButton" @click="showUpdateForm(student)">Update</button>
                <button class="actionButton" @click="confirmDeleteStudent(student.id)">Delete</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Update Student Form Modal -->
    <div v-if="isUpdateFormVisible" class="modal">
      <div class="form modal-content">
        <span class="close" @click="isUpdateFormVisible = false">&times;</span>
        <h2 class="form-title">Update Student</h2>
        <form @submit.prevent="performUpdateStudent">
          <div class="input-container ic1">
            <input type="text" class="input" v-model="updateFormData.name" required />
            <div class="cut"></div>
            <label for="name" class="placeholder">Name</label>
          </div>
          <div class="input-container ic2">
            <input type="email" class="input" v-model="updateFormData.email" required />
            <div class="cut"></div>
            <label for="email" class="placeholder">Email</label>
          </div>
          <button type="submit" class="submit">Update</button>
        </form>
      </div>
    </div>

    <!-- Add Student Form Modal -->
    <div v-if="isAddFormVisible" class="modal">
      <div class="form modal-content">
        <span class="close" @click="isAddFormVisible = false">&times;</span>
        <h2 class="form-title">Add Student</h2>
        <form @submit.prevent="performAddStudent">
          <div class="input-container ic1">
            <input type="text" class="input" v-model="newStudentData.name" required />
            <div class="cut"></div>
            <label for="name" class="placeholder">Name</label>
          </div>
          <div class="input-container ic2">
            <input type="email" class="input" v-model="newStudentData.email" required />
            <div class="cut"></div>
            <label for="email" class="placeholder">Email</label>
          </div>
          <div class="input-container ic3">
            <input type="text" class="input" v-model="newStudentData.enrolled" required />
            <div class="cut"></div>
            <label for="enrolled" class="placeholder">Enrolled</label>
          </div>
          <button type="submit" class="submit">Add</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Swal from 'sweetalert2';
import sideBarAdmin from '../components/sideBarAdmin.vue';
import { interpret } from 'xstate';
import { appMachine } from '../state/eduMachine';

export default {
  name: 'adminView',
  components: {
    sideBarAdmin,
  },
  setup() {
    const store = useStore();
    const searchQuery = ref('');
    const isUpdateFormVisible = ref(false);
    const isAddFormVisible = ref(false);
    const updateFormData = ref({ id: '', name: '', email: '' });
    const newStudentData = ref({ name: '', email: '', enrolled: '' });

    const studentService = interpret(appMachine)
      .onTransition((state) => {
        if (state.matches('studentsFetched')) {
          console.log('Students fetched successfully');
        } else if (state.matches('studentAdded')) {
          Swal.fire('Success', 'Student added successfully', 'success');
        } else if (state.matches('studentUpdated')) {
          Swal.fire('Success', 'Student updated successfully', 'success');
        } else if (state.matches('studentDeleted')) {
          Swal.fire('Success', 'Student deleted successfully', 'success');
        } else if (state.matches('error')) {
          Swal.fire('Error', state.context.error || 'An error occurred', 'error');
        }
      })
      .start();

    const filteredStudents = computed(() => {
      if (!searchQuery.value) {
        return store.state.students;
      }
      return store.state.students.filter(student =>
        student.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const totalStudents = computed(() => store.state.students.length);

    const showUpdateForm = (student) => {
      updateFormData.value = { ...student };
      isUpdateFormVisible.value = true;
    };

    const showAddForm = () => {
      newStudentData.value = { name: '', email: '', enrolled: '' };
      isAddFormVisible.value = true;
    };

    const performUpdateStudent = () => {
      studentService.send('UPDATE_STUDENT', { data: updateFormData.value });
      isUpdateFormVisible.value = false;
    };

    const performAddStudent = () => {
      studentService.send('CREATE_STUDENT', { data: newStudentData.value });
      isAddFormVisible.value = false;
    };

    const confirmDeleteStudent = (studentId) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          studentService.send('DELETE_STUDENT', { data: studentId });
        }
      });
    };

    onMounted(() => {
      studentService.send('FETCH_STUDENTS');
    });

    return {
      searchQuery,
      isUpdateFormVisible,
      isAddFormVisible,
      updateFormData,
      newStudentData,
      filteredStudents,
      totalStudents,
      showUpdateForm,
      showAddForm,
      performUpdateStudent,
      performAddStudent,
      confirmDeleteStudent
    };
  }
};
</script>

<style scoped>
@import '../assets/adminPage.css';

/* Existing styles */

.add-user-button-container {
  margin: 20px 0;
}

.addUserButton {
  background-color: #08d;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.addUserButton:hover {
  background-color: #06b;
}

/* Modal styles */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.form {
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  height: 500px;
  padding: 20px;
  width: 320px;
}

.form-title {
  color: #eee;
  font-family: sans-serif;
  font-size: 36px;
  font-weight: 600;
  margin-top: 30px;
}

.input-container {
  height: 50px;
  position: relative;
  width: 100%;
}

.ic1 {
  margin-top: 20vh;
}

.ic2 {
  margin-top: 10vh;
}
.ic3 {
  margin-top: 10px;
}

.input {
  background-color: #303245;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  font-size: 18px;
  height: 100%;
  outline: 0;
  padding: 4px 20px 0;
  width: 100%;
}

.cut {
  background-color: #15172b;
  border-radius: 10px;
  height: 20px;
  left: 20px;
  position: absolute;
  top: -20px;
  transform: translateY(0);
  transition: transform 200ms;
  width: 76px;
}

.cut-short {
  width: 50px;
}

.input:focus ~ .cut,
.input:not(:placeholder-shown) ~ .cut {
  transform: translateY(8px);
}

.placeholder {
  color: #65657b;
  font-family: sans-serif;
  left: 20px;
  line-height: 14px;
  pointer-events: none;
  position: absolute;
  transform-origin: 0 50%;
  transition:
    transform 200ms,
    color 200ms;
  top: 20px;
}

.input:focus ~ .placeholder,
.input:not(:placeholder-shown) ~ .placeholder {
  transform: translateY(-30px) translateX(10px) scale(0.75);
}

.input:not(:placeholder-shown) ~ .placeholder {
  color: #808097;
}

.input:focus ~ .placeholder {
  color: #dc2f55;
}

.submit {
  background-color: #08d;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  cursor: pointer;
  font-size: 18px;
  height: 50px;
  margin-top: 38px;
  text-align: center;
  width: 100%;
}

.submit:active {
  background-color: #06b;
}

.close {
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  color: #fff; /* Initial color set to white */
}

.close:hover,
.close:focus {
  color: red;
  text-decoration: none;
  cursor: pointer;
}

.actionButton {
  color: #fff;
  background: #0171d3;
  padding: 4px 12px;
  font-size: 15px;
  font-weight: 400;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.actionButton:hover {
  background: #0d3073;
}
</style>
