// store/index.js
import { createStore } from 'vuex';
import { auth } from '../firebase'; // Ensure these are correctly imported from your Firebase configuration
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import db from '../firebase.js';

export default createStore({
  state: {
    user: null,
    teachers: [],
    students: [],
    courses: [],
    errorShow: false,
    errorMsg: ''
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setTeachers(state, teachers) {
      state.teachers = teachers;
    },
    setStudents(state, students) {
      state.students = students;
    },
    setCourses(state, courses) {
      state.courses = courses;
    },
    addTeacher(state, teacher) {
      state.teachers.push(teacher);
    },
    addStudent(state, student) {
      state.students.push(student);
    },
    addCourse(state, course) {
      state.courses.push(course);
    },
    updateTeacher(state, updatedTeacher) {
      const index = state.teachers.findIndex(teacher => teacher.id === updatedTeacher.id);
      if (index !== -1) {
        state.teachers.splice(index, 1, updatedTeacher);
      }
    },
    updateStudent(state, updatedStudent) {
      const index = state.students.findIndex(student => student.id === updatedStudent.id);
      if (index !== -1) {
        state.students.splice(index, 1, updatedStudent);
      }
    },
    updateCourse(state, updatedCourse) {
      const index = state.courses.findIndex(course => course.id === updatedCourse.id);
      if (index !== -1) {
        state.courses.splice(index, 1, updatedCourse);
      }
    },
    deleteTeacher(state, teacherId) {
      state.teachers = state.teachers.filter(teacher => teacher.id !== teacherId);
    },
    deleteStudent(state, studentId) {
      state.students = state.students.filter(student => student.id !== studentId);
    },
    deleteCourse(state, courseId) {
      state.courses = state.courses.filter(course => course.id !== courseId);
    },
    setError(state, { errorShow, errorMsg }) {
      state.errorShow = errorShow;
      state.errorMsg = errorMsg;
    }
  },
  actions: {
    async registerUser({ commit }, { username, email, password, userType }) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        commit('setUser', { email: user.email, uid: user.uid });

        // Determine the collection based on userType
        let collectionName;
        switch (userType) {
          case 'teacher':
            collectionName = 'teachers';
            break;
          case 'student':
            collectionName = 'students';
            break;
          case 'admin':
            collectionName = 'admins';
            break;
          default:
            throw new Error('Invalid user type');
        }

        // Data to send
        const dataObj = {
          userName: username,
          email: email,
        };

        // Create document in the respective collection
        await addDoc(collection(db, collectionName), dataObj);
        return true;
      } catch (error) {
        console.error('Signup error:', error);
        commit('setError', { errorShow: true, errorMsg: error.message });
        return false;
      }
    },
    async login({ commit }, { email, password }) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        commit('setUser', { email: userCredential.user.email, uid: userCredential.user.uid });
        return true;
      } catch (error) {
        console.error('Login error:', error);
        commit('setError', { errorShow: true, errorMsg: 'Login failed. Please check your credentials.' });
        return false;
      }
    },
    async logout({ commit }) {
      try {
        await signOut(auth);
        commit('setUser', null);
        sessionStorage.removeItem('vuex-state');
        return true;
      } catch (error) {
        console.error('Logout error:', error);
        return false;
      }
    },
    async fetchTeachers({ commit }) {
      try {
        const querySnapshot = await getDocs(collection(db, 'teachers'));
        const teachers = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        commit('setTeachers', teachers);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    },
    async fetchStudents({ commit }) {
      try {
        const querySnapshot = await getDocs(collection(db, 'students'));
        const students = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        commit('setStudents', students);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    },
    async fetchCourses({ commit }) {
      try {
        const querySnapshot = await getDocs(collection(db, 'courses'));
        const courses = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        commit('setCourses', courses);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    },
    async addTeacher({ commit }, teacher) {
      try {
        const docRef = await addDoc(collection(db, 'teachers'), teacher);
        const newTeacher = { id: docRef.id, ...teacher };
        commit('addTeacher', newTeacher);
      } catch (error) {
        console.error('Error adding teacher:', error);
      }
    },
    async addStudent({ commit }, student) {
      try {
        const docRef = await addDoc(collection(db, 'students'), student);
        const newStudent = { id: docRef.id, ...student };
        commit('addStudent', newStudent);
      } catch (error) {
        console.error('Error adding student:', error);
      }
    },
    async addCourse({ commit }, course) {
      try {
        const docRef = await addDoc(collection(db, 'courses'), course);
        const newCourse = { id: docRef.id, ...course };
        commit('addCourse', newCourse);
      } catch (error) {
        console.error('Error adding course:', error);
      }
    },
    async updateTeacher({ commit }, teacher) {
      try {
        const teacherRef = doc(db, 'teachers', teacher.id);
        await updateDoc(teacherRef, teacher);
        commit('updateTeacher', teacher);
      } catch (error) {
        console.error('Error updating teacher:', error);
      }
    },
    async updateStudent({ commit }, student) {
      try {
        const studentRef = doc(db, 'students', student.id);
        await updateDoc(studentRef, student);
        commit('updateStudent', student);
      } catch (error) {
        console.error('Error updating student:', error);
      }
    },
    async updateCourse({ commit }, course) {
      try {
        const courseRef = doc(db, 'courses', course.id);
        await updateDoc(courseRef, course);
        commit('updateCourse', course);
      } catch (error) {
        console.error('Error updating course:', error);
      }
    },
    async deleteTeacher({ commit }, teacherId) {
      try {
        await deleteDoc(doc(db, 'teachers', teacherId));
        commit('deleteTeacher', teacherId);
      } catch (error) {
        console.error('Error deleting teacher:', error);
      }
    },
    async deleteStudent({ commit }, studentId) {
      try {
        await deleteDoc(doc(db, 'students', studentId));
        commit('deleteStudent', studentId);
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    },
    async deleteCourse({ commit }, courseId) {
      try {
        await deleteDoc(doc(db, 'courses', courseId));
        commit('deleteCourse', courseId);
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  },
  getters: {
    isAuthenticated(state) {
      return !!state.user;
    },
    currentUser(state) {
      return state.user;
    },
    allTeachers(state) {
      return state.teachers;
    },
    allStudents(state) {
      return state.students;
    },
    allCourses(state) {
      return state.courses;
    }
  }
});
