<template>
  <sideBarAdmin/>
  <section class="home-section">
    <nav>
      <div class="sidebar-button">
        <span class="dashboard">Dashboard</span>
      </div>
      <div class="search-box">
        <input type="text" placeholder="Search..." v-model="searchQuery">
      </div>
      <div class="profile-details">
        <span class="admin_name">Mahad</span>
      </div>
    </nav>
    <div class="home-content">
      <div class="overview-boxes">
        <div class="box">
          <div class="right-side">
            <div class="box-topic">Total Students</div>
            <div class="number">{{ totalStudents }}</div>
          </div>
        </div>
        <div class="box">
          <div class="right-side">
            <div class="box-topic">Total Teachers</div>
            <div class="number">{{ totalTeachers }}</div>
          </div>
        </div>
        <div class="box">
          <div class="right-side">
            <div class="box-topic">Total Courses</div>
            <div class="number">{{ totalCourses }}</div>
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
              <li class="topic">Enrolled</li>
              <li v-for="student in filteredStudents" :key="student.id">{{ student.enrolled }}</li>
            </ul>
          </div>
          <div class="button">
            <a href="#">See All</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import sideBarAdmin from '../components/sideBarAdmin.vue';
import { interpret } from 'xstate';
import { appMachine } from '../state/eduMachine';

export default {
  name: 'AdminView',
  components: {
    sideBarAdmin
  },
  setup() {
    const searchQuery = ref('');
    const store = useStore();
    const service = interpret(appMachine).start();

    const filteredStudents = computed(() => {
      if (!searchQuery.value) return store.state.students;
      return store.state.students.filter(student =>
        student.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    service.onTransition((state) => {
      if (state.matches('authenticated')) {
        store.commit('setTeachers', state.context.teachers);
        store.commit('setStudents', state.context.students);
        store.commit('setCourses', state.context.courses);
      } else if (state.matches('error')) {
        // Handle errors, possibly display an alert or notification
        console.error(state.context.error);
      }
      console.log('Current state:', state.value);
    });

    onMounted(() => {
      service.send('FETCH_STUDENTS');
    });

    onUnmounted(() => {
      service.stop();
    });

    return {
      searchQuery,
      filteredStudents,
      totalTeachers: computed(() => store.state.teachers.length),
      totalStudents: computed(() => store.state.students.length),
      totalCourses: computed(() => store.state.courses.length),
    };
  },
};
</script>

<style scoped>
@import "../assets/adminPage.css";
</style>
