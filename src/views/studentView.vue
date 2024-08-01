<template>
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
    <div class="content-container">
      <div class="card-list">
        <router-link :to="{ name: 'courseDetails', params: { id: course.id } }" class="card-item" v-for="course in filteredCourses" :key="course.id">
          <img :src="course.imageUrl || 'images/default-course.jpg'" alt="Card Image">
          <span class="developer">{{ course.name }}</span>
          <h3>{{ course.description }}</h3>
          <p class="instructor">Instructor: {{ course.instructor }}</p>
          <div class="arrow">
            <i class="fas fa-arrow-right card-icon"></i>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { interpret } from 'xstate';
import { appMachine } from '../state/eduMachine';
import Swal from 'sweetalert2';

export default {
  name: 'StudentView',
  setup() {
    const store = useStore();
    const searchQuery = ref('');
    const courseService = interpret(appMachine)
      .onTransition((state) => {
        if (state.matches('coursesFetched')) {
          console.log('Courses fetched successfully');
        } else if (state.matches('error')) {
          Swal.fire('Error', state.context.error || 'An error occurred', 'error');
        }
      })
      .start();

    const filteredCourses = computed(() => {
      if (!searchQuery.value) {
        return store.state.courses;
      }
      return store.state.courses.filter(course =>
        course.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    onMounted(() => {
      courseService.send('FETCH_COURSES');
    });

    return {
      searchQuery,
      filteredCourses,
    };
  },
};
</script>

<style scoped>
/* Existing styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.home-section {
  position: relative;
  background: #f5f5f5;
  min-height: 100vh;
  width: 100%;
  transition: all 0.5s ease;
}

.sidebar.active ~ .home-section {
  width: calc(100% - 60px);
  left: 60px;
}

.home-section nav {
  display: flex;
  justify-content: space-between;
  height: 80px;
  background: #fff;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  padding: 0 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease;
}

.sidebar.active ~ .home-section nav {
  left: 60px;
  width: calc(100% - 60px);
}

.home-section nav .sidebar-button {
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 500;
}

nav .sidebar-button i {
  font-size: 35px;
  margin-right: 10px;
}

.home-section nav .search-box {
  position: relative;
  height: 50px;
  max-width: 550px;
  width: 100%;
  margin: 0 20px;
}

nav .search-box input {
  height: 100%;
  width: 100%;
  outline: none;
  background: #F5F6FA;
  border: 2px solid #EFEEF1;
  border-radius: 6px;
  font-size: 18px;
  padding: 0 15px;
}

nav .search-box .bx-search {
  position: absolute;
  height: 40px;
  width: 40px;
  background: #2697FF;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 4px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  font-size: 22px;
  transition: all 0.4 ease;
}

.home-section nav .profile-details {
  display: flex;
  align-items: center;
  background: #F5F6FA;
  border: 2px solid #EFEEF1;
  border-radius: 6px;
  height: 50px;
  min-width: 190px;
  padding: 0 15px 0 2px;
}

nav .profile-details img {
  height: 40px;
  width: 40px;
  border-radius: 6px;
  object-fit: cover;
}

nav .profile-details .admin_name {
  font-size: 15px;
  font-weight: 500;
  color: #333;
  margin: 0 10px;
  white-space: nowrap;
}

nav .profile-details i {
  font-size: 25px;
  color: #333;
}

.home-section .home-content {
  position: relative;
  padding-top: 104px;
}

.content-container {
  margin: 100px 20px 0 20px;
}

/* Card List Styles */
.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  max-width: 1250px;
  margin: 20px auto 50px;
  padding: 20px;
  gap: 20px;
}

.card-list .card-item {
  background: #fff;
  padding: 26px;
  border-radius: 8px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.04);
  list-style: none;
  cursor: pointer;
  text-decoration: none;
  border: 2px solid transparent;
  transition: border 0.5s ease;
}

.card-list .card-item:hover {
  border: 2px solid #000;
}

.card-list .card-item img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.card-list .card-item .developer {
  font-size: 18px;
  font-weight: 600;
  margin-top: 10px;
}

.card-list .card-item h3 {
  font-size: 16px;
  color: #333;
  margin-top: 5px;
}

.card-list .card-item .instructor {
  font-size: 14px;
  color: #777;
  margin-top: 5px;
}

.card-list .card-item .arrow {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.card-list .card-item .arrow .card-icon {
  font-size: 24px;
  color: #333;
}
</style>
