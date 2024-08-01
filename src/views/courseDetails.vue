<template>
  <div v-if="loading">
    <p>Loading...</p>
  </div>
  <div v-else>
    <h1>{{ course.name }}</h1>
    <img :src="course.imageUrl || 'images/default-course.jpg'" alt="Course Image">
    <p>{{ course.description }}</p>
    <p>Instructor: {{ course.instructor }}</p>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { interpret } from 'xstate';
import { appMachine } from '../state/eduMachine';

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const loading = ref(true);
    const store = useStore();
    const service = interpret(appMachine)
      .onTransition((state) => {
        if (state.matches('authenticated')) {
          loading.value = false;
        }
      })
      .start();

    const course = computed(() => {
      return store.state.courses.find(course => course.id === props.id) || {};
    });

    onMounted(() => {
      if (!course.value.name) {
        service.send('FETCH_COURSES');
      } else {
        loading.value = false;
      }
    });

    return {
      loading,
      course
    };
  }
};
</script>

<style scoped>
/* Add styles here if necessary */
</style>
