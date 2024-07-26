<template>
  <sideBarAdmin />
  <section class="home-section">
    <nav>
      <div class="sidebar-button">
        <!-- <i class='bx bx-menu sidebarBtn'></i> -->
        <span class="dashboard">Teacher</span>
      </div>
      <div class="search-box">
        <input type="text" placeholder="Search..." v-model="searchQuery" />
        <!-- <i class='bx bx-search' ></i> -->
      </div>
      <div class="profile-details">
        <!-- <img src="images/profile.jpg" alt=""> -->
        <span class="admin_name">Mahad</span>
        <!-- <i class='bx bx-chevron-down' ></i> -->
      </div>
    </nav>
    <div class="home-content">
      <div class="overview-boxes">
        <div class="box">
          <div class="right-side">
            <!-- add teacher button -->
            <div class="add-user-button-container">
              <button class="addUserButton" @click="isAddFormVisible = true">Add Teacher</button>
            </div>
            <div class="number">Total Teachers: {{ totalTeachers }}</div>
            <div class="indicator">
              <!-- <i class='bx bx-up-arrow-alt'></i> -->
              <!-- <span class="text">Up from yesterday</span> -->
            </div>
          </div>
          <!-- <i class='bx bx-cart-alt cart'></i> -->
        </div>
      </div>

      <div class="sales-boxes">
        <div class="recent-sales box">
          <div class="title">All Teachers</div>
          <div class="sales-details">
            <ul class="details">
              <li class="topic">Sr No</li>
              <li v-for="(teacher, index) in filteredTeachers" :key="teacher.id">
                {{ index + 1 }}
              </li>
            </ul>
            <ul class="details">
              <li class="topic">Name</li>
              <li v-for="teacher in filteredTeachers" :key="teacher.id">{{ teacher.name }}</li>
            </ul>
            <ul class="details">
              <li class="topic">Email</li>
              <li v-for="teacher in filteredTeachers" :key="teacher.id">{{ teacher.email }}</li>
            </ul>
            <ul class="details">
              <li class="topic">Subjects</li>
              <li v-for="teacher in filteredTeachers" :key="teacher.id">{{ teacher.subjects }}</li>
            </ul>
            <ul class="details">
              <li class="topic">Actions</li>
              <li v-for="teacher in filteredTeachers" :key="teacher.id">
                <button class="actionButton" @click="showUpdateForm(teacher)">Update</button>
                <button class="actionButton" @click="deleteTeacher(teacher.id)">Delete</button>
              </li>
            </ul>
          </div>
          <div class="button">
            <a href="#">See All</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Teacher Form Modal -->
    <div v-if="isAddFormVisible" class="modal">
      <div class="form modal-content">
        <span class="close" @click="isAddFormVisible = false">&times;</span>
        <h2 class="form-title">Add Teacher</h2>
        <form @submit.prevent="addTeacher">
          <div class="input-container ic1">
            <input type="text" class="input" v-model="addFormData.name" required />
            <div class="cut"></div>
            <label for="name" class="placeholder">Name</label>
          </div>
          <div class="input-container ic2">
            <input type="email" class="input" v-model="addFormData.email" required />
            <div class="cut"></div>
            <label for="email" class="placeholder">Email</label>
          </div>
          <div class="input-container ic3">
            <input type="number" class="input" v-model="addFormData.age" required />
            <div class="cut"></div>
            <label for="age" class="placeholder">Age</label>
          </div>
          <div class="input-container ic3">
            <input type="text" class="input" v-model="addFormData.subjects" required />
            <div class="cut"></div>
            <label for="subjects" class="placeholder">Subjects</label>
          </div>
          <button type="submit" class="submit">Add</button>
        </form>
      </div>
    </div>

    <!-- Update Teacher Form Modal -->
    <div v-if="isUpdateFormVisible" class="modal">
      <div class="form modal-content">
        <span class="close" @click="isUpdateFormVisible = false">&times;</span>
        <h2 class="form-title">Update Teacher</h2>
        <form @submit.prevent="updateTeacher">
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
          <div class="input-container ic3">
            <input type="text" class="input" v-model="updateFormData.subjects" required />
            <div class="cut"></div>
            <label for="subjects" class="placeholder">Subjects</label>
          </div>
          <button type="submit" class="submit">Update</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { doc, getDocs, collection, deleteDoc, updateDoc, addDoc } from 'firebase/firestore'
import db from '../firebase.js'
import sideBarAdmin from '../components/sideBarAdmin.vue'

export default {
  name: 'adminView',
  components: {
    sideBarAdmin
  },
  data() {
    return {
      teachers: [],
      searchQuery: '',
      isAddFormVisible: false,
      isUpdateFormVisible: false,
      addFormData: {
        name: '',
        email: '',
        age: '',
        subjects: ''
      },
      updateFormData: {
        id: '',
        name: '',
        email: '',
        subjects: ''
      }
    }
  },
  created() {
    this.fetchTeachers()
  },
  methods: {
    async fetchTeachers() {
      try {
        const querySnapshot = await getDocs(collection(db, 'teachers'))
        this.teachers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
      } catch (error) {
        console.error('Error fetching teachers: ', error)
      }
    },
    async addTeacher() {
      try {
        const docRef = await addDoc(collection(db, 'teachers'), {
          name: this.addFormData.name,
          email: this.addFormData.email,
          age: this.addFormData.age,
          subjects: this.addFormData.subjects
        })
        this.teachers.push({
          id: docRef.id,
          ...this.addFormData
        })
        this.isAddFormVisible = false
        this.addFormData = {
          name: '',
          email: '',
          age: '',
          subjects: ''
        }
      } catch (error) {
        console.error('Error adding teacher: ', error)
      }
    },
    async deleteTeacher(teacherId) {
      try {
        await deleteDoc(doc(db, 'teachers', teacherId))
        this.teachers = this.teachers.filter((teacher) => teacher.id !== teacherId)
      } catch (error) {
        console.error('Error deleting teacher: ', error)
      }
    },
    showUpdateForm(teacher) {
      this.updateFormData = { ...teacher }
      this.isUpdateFormVisible = true
    },
    async updateTeacher() {
      try {
        const teacherRef = doc(db, 'teachers', this.updateFormData.id)
        await updateDoc(teacherRef, {
          name: this.updateFormData.name,
          email: this.updateFormData.email,
          subjects: this.updateFormData.subjects
        })
        this.teachers = this.teachers.map((teacher) =>
          teacher.id === this.updateFormData.id
            ? {
                ...teacher,
                name: this.updateFormData.name,
                email: this.updateFormData.email,
                subjects: this.updateFormData.subjects
              }
            : teacher
        )
        this.isUpdateFormVisible = false
      } catch (error) {
        console.error('Error updating teacher: ', error)
      }
    }
  },
  computed: {
    filteredTeachers() {
      if (!this.searchQuery) {
        return this.teachers
      }
      return this.teachers.filter((teacher) =>
        teacher.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
    totalTeachers() {
      return this.teachers.length
    }
  }
}
</script>

<style scoped>
@import '../assets/adminPage.css';

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
  margin-top: 40px;
}

.ic2 {
  margin-top: 30px;
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
  background: #0a2558;
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
