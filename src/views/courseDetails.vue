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
  import { doc, getDoc } from 'firebase/firestore';
  import db from '../firebase.js';
  
  export default {
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        course: null,
        loading: true,
      };
    },
    async mounted() {
      try {
        const docRef = doc(db, 'courses', this.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.course = docSnap.data();
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Failed to fetch course details:', error);
      } finally {
        this.loading = false;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add styles here if necessary */
  </style>
  