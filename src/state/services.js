// services.js
import { auth} from '../firebase'; // Ensure these are correctly imported from your Firebase configuration
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc,query,where } from 'firebase/firestore';
import db from '../firebase.js'
// Fetch all teachers from Firestore
export const fetchTeachers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'teachers'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching teachers:', error);
    throw error;
  }
};

// Fetch all students from Firestore
export const fetchStudents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'students'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

// Fetch all courses from Firestore
export const fetchCourses = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'courses'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

// Create a new teacher in Firestore
export const createTeacher = async (teacher) => {
  try {
    const docRef = await addDoc(collection(db, 'teachers'), teacher);
    return { id: docRef.id, ...teacher };
  } catch (error) {
    console.error('Error creating teacher:', error);
    throw error;
  }
};

// Create a new student in Firestore
export const createStudent = async (student) => {
  try {
    const docRef = await addDoc(collection(db, 'students'), student);
    return { id: docRef.id, ...student };
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
};

// Create a new course in Firestore
export const createCourse = async (course) => {
  try {
    const docRef = await addDoc(collection(db, 'courses'), course);
    return { id: docRef.id, ...course };
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

// Update a teacher in Firestore
export const updateTeacher = async (teacher) => {
  try {
    const teacherRef = doc(db, 'teachers', teacher.id);
    await updateDoc(teacherRef, teacher);
    return teacher;
  } catch (error) {
    console.error('Error updating teacher:', error);
    throw error;
  }
};

// Update a student in Firestore
export const updateStudent = async (student) => {
  try {
    const studentRef = doc(db, 'students', student.id);
    await updateDoc(studentRef, student);
    return student;
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

// Update a course in Firestore
export const updateCourse = async (course) => {
  try {
    const courseRef = doc(db, 'courses', course.id);
    await updateDoc(courseRef, course);
    return course;
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};

// Delete a teacher from Firestore
export const deleteTeacher = async (teacherId) => {
  try {
    await deleteDoc(doc(db, 'teachers', teacherId));
    return teacherId;
  } catch (error) {
    console.error('Error deleting teacher:', error);
    throw error;
  }
};

// Delete a student from Firestore
export const deleteStudent = async (studentId) => {
  try {
    await deleteDoc(doc(db, 'students', studentId));
    return studentId;
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};

// Delete a course from Firestore
export const deleteCourse = async (courseId) => {
  try {
    await deleteDoc(doc(db, 'courses', courseId));
    return courseId;
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};

// Login function
const findUserType = async (email) => {
  const collections = ['teachers', 'students', 'admins']; // Add other collections if necessary

  for (const collectionName of collections) {
    const q = query(collection(db, collectionName), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return collectionName.slice(0, -1); // Return the singular form (e.g., 'teachers' -> 'teacher')
    }
  }
  return 'unknown'; // or handle this case as needed
};

export const login = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userType = await findUserType(email);
    return { email: userCredential.user.email, uid: userCredential.user.uid, userType };
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Register a new user
export const registerUser = async ({ username, email, password, userType }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
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
    return { email: user.email, uid: user.uid };
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Logout function
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};
