<template>
  <sideBarAdmin />
  <section class="home-section">
    <nav>
      <div class="sidebar-button">
        <span class="dashboard">Teacher</span>
      </div>
      <div class="search-box">
        <input type="text" placeholder="Search..." v-model="searchQuery" />
      </div>
      <div class="profile-details">
        <span class="admin_name">Mahad</span>
      </div>
    </nav>
    <div class="content-container">
      <button @click="showAddCourseForm = true" class="add-course-button">Add New Course</button>
      <div v-if="showAddCourseForm" class="add-course-form">
        <h2>Add New Course</h2>
        <form @submit.prevent="performAddCourse">
          <div>
            <label for="courseName">Course Name:</label>
            <input type="text" id="courseName" v-model="newCourse.name" required />
          </div>
          <div>
            <label for="courseDescription">Description:</label>
            <input type="text" id="courseDescription" v-model="newCourse.description" required />
          </div>
          <div>
            <label for="courseDuration">Duration:</label>
            <input type="text" id="courseDuration" v-model="newCourse.duration" required />
          </div>
          <div>
            <label for="courseInstructor">Instructor:</label>
            <input type="text" id="courseInstructor" v-model="newCourse.instructor" required />
          </div>
          <div>
            <label for="courseImage">Image:</label>
            <input type="file" @change="handleImageUpload" accept="image/*" />
          </div>
          <button type="submit" :disabled="isUploading">Add Course</button>
        </form>
      </div>
      <div class="card-list">
        <router-link :to="{ name: 'courseDetails', params: { id: course.id } }" class="card-item" v-for="course in filteredCourses" :key="course.id">
          <img :src="course.imageUrl || 'images/default-course.jpg'" alt="Card Image">
          <span class="developer">{{ course.name }}</span>
          <h3>{{ course.description }}</h3>
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
import sideBarAdmin from '../components/sideBarAdmin.vue';

export default {
  name: 'TeacherView',
  components: {
    sideBarAdmin,
  },
  setup() {
    const store = useStore();
    const searchQuery = ref('');
    const showAddCourseForm = ref(false);
    const newCourse = ref({
      name: '',
      description: '',
      duration: '',
      instructor: '',
      imageUrl: ''
    });
    const isUploading = ref(false);
    const selectedImage = ref(null);

    const courseService = interpret(appMachine)
      .onTransition((state) => {
        if (state.matches('courseAdded')) {
          Swal.fire('Success', 'Course added successfully', 'success');
          store.dispatch('fetchCourses');
        } else if (state.matches('error')) {
          Swal.fire('Error', state.context.error || 'An error occurred', 'error');
        }
      })
      .start();

    const filteredCourses = computed(() => {
      return store.state.courses.filter(course =>
        course.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const handleImageUpload = (event) => {
      selectedImage.value = event.target.files[0];
    };

    const performAddCourse = async () => {
      isUploading.value = true;
      try {
        if (selectedImage.value) {
          newCourse.value.imageUrl = await store.dispatch('uploadImage', selectedImage.value);
        }
        courseService.send('ADD_COURSE', { data: newCourse.value });
        resetForm();
      } catch (error) {
        console.error('Failed to add course:', error);
      } finally {
        isUploading.value = false;
      }
    };

    const resetForm = () => {
      newCourse.value = {
        name: '',
        description: '',
        duration: '',
        instructor: '',
        imageUrl: ''
      };
      selectedImage.value = null;
      showAddCourseForm.value = false;
    };

    onMounted(() => {
      store.dispatch('fetchCourses');
    });

    return {
      searchQuery,
      showAddCourseForm,
      newCourse,
      isUploading,
      selectedImage,
      filteredCourses,
      handleImageUpload,
      performAddCourse,
      resetForm
    };
  },
};
</script>

<style scoped>
/* Your existing styles */

.add-course-button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.add-course-button:hover {
  background-color: #45a049;
}

.add-course-form {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.04);
  margin: 20px 0;
}

.add-course-form h2 {
  margin-bottom: 20px;
}

.add-course-form div {
  margin-bottom: 10px;
}

.add-course-form label {
  display: block;
  margin-bottom: 5px;
}

.add-course-form input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.add-course-form button {
  display: block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-course-form button:hover {
  background-color: #45a049;
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
