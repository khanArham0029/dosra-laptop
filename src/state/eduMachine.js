import { createMachine, assign } from 'xstate';
import { 
  login, 
  registerUser, 
  logout, 
  fetchTeachers, 
  fetchStudents, 
  fetchCourses, 
  createTeacher, 
  createStudent, 
  createCourse, 
  updateTeacher, 
  updateStudent, 
  updateCourse, 
  deleteTeacher, 
  deleteStudent, 
  deleteCourse 
} from './services';

export const appMachine = createMachine({
  id: 'appMachine',
  initial: 'idle',
  context: {
    user: null,
    teachers: [],
    students: [],
    courses: [],
    error: null,
  },
  states: {
    idle: {
      on: {
        LOGIN: 'authenticating',
        REGISTER: 'registering',
        FETCH_STUDENTS: 'fetchingStudents',
        LOGOUT: 'loggingOut'
      },
    },
    authenticating: {
      invoke: {
        id: 'login',
        src: (context, event) => login(event.data),
        onDone: {
          target: 'authenticated',
          actions: assign({ user: (context, event) => event.data, error: null }),
        },
        onError: {
          target: 'error',
          actions: assign({ error: (context, event) => event.data.message }),
        },
      },
    },
    registering: {
      invoke: {
        id: 'registerUser',
        src: (context, event) => registerUser(event.data),
        onDone: {
          target: 'authenticated',
          actions: assign({ user: (context, event) => event.data, error: null }),
        },
        onError: {
          target: 'error',
          actions: assign({ error: (context, event) => event.data.message }),
        },
      },
    },
    fetchingStudents: {
      invoke: {
        id: 'fetchStudents',
        src: fetchStudents,
        onDone: {
          target: 'fetchingTeachers',
          actions: assign({ students: (context, event) => event.data }),
        },
        onError: {
          target: 'error',
          actions: assign({ error: (context, event) => event.data.message }),
        },
      },
    },
    fetchingTeachers: {
      invoke: {
        id: 'fetchTeachers',
        src: fetchTeachers,
        onDone: {
          target: 'fetchingCourses',
          actions: [
            assign({ teachers: (context, event) => event.data }),
            (context, event) => console.log('fetchTeachers', event.data)
          ],
        },
        onError: {
          target: 'error',
          actions: assign({ error: (context, event) => event.data.message }),
        },
      },
    },
    fetchingCourses: {
      invoke: {
        id: 'fetchCourses',
        src: fetchCourses,
        onDone: {
          target: 'authenticated',
          actions: assign({ courses: (context, event) => event.data }),
        },
        onError: {
          target: 'error',
          actions: assign({ error: (context, event) => event.data.message }),
        },
      },
    },
    authenticated: {
      on: {
        CREATE_TEACHER: 'creatingTeacher',
        CREATE_STUDENT: 'creatingStudent',
        CREATE_COURSE: 'creatingCourse',
        UPDATE_TEACHER: 'updatingTeacher',
        UPDATE_STUDENT: 'updatingStudent',
        UPDATE_COURSE: 'updatingCourse',
        DELETE_TEACHER: 'deletingTeacher',
        DELETE_STUDENT: 'deletingStudent',
        DELETE_COURSE: 'deletingCourse',
        LOGOUT: 'loggingOut',
      },
    },
    creatingTeacher: {
      invoke: {
        id: 'createTeacher',
        src: (context, event) => createTeacher(event.data),
        onDone: {
          target: 'authenticated',
          actions: assign({ teachers: (context, event) => [...context.teachers, event.data] }),
        },
        onError: {
          target: 'error',
          actions: assign({ error: (context, event) => event.data.message }),
        },
      },
    },
    creatingStudent: {
      invoke: {
        id: 'createStudent',
        src: (context, event) => createStudent(event.data),
        onDone: {
          target: 'authenticated',
          actions: assign({ students: (context, event) => [...context.students, event.data] }),
        },
        onError: {
          target: 'error',
          actions: assign({ error: (context, event) => event.data.message }),
        },
      },
    },
    creatingCourse: {
      invoke: {
        id: 'createCourse',
        src: (context, event) => createCourse(event.data),
        onDone: {
          target: 'authenticated',
          actions: assign({ courses: (context, event) => [...context.courses, event.data] }),
        },
        onError: {
          target: 'error',
          actions: assign({ error: (context, event) => event.data.message }),
        },
      },
    },
    updatingTeacher: {
      invoke: {
        id: 'updateTeacher',
        src: (context, event) => updateTeacher(event.data),
        onDone: {
          target: 'authenticated',
          actions: assign({ teachers: (context, event) => context.teachers.map(teacher => teacher.id === event.data.id ? event.data : teacher) }),
        },
        onError: {
          target: 'error',
          actions: assign({ error: (context, event) => event.data.message }),
        },
      },
    },
    updatingStudent: {
      invoke: {
        id: 'updateStudent',
        src: (context, event) => updateStudent(event.data),
        onDone: {
          target: 'authenticated',
          actions: assign({ students: (context, event) => context.students.map(student => student.id === event.data.id ? event.data : student) }),
        },
        onError: {
          target: 'error',
          actions: assign({ error: (context, event) => event.data.message }),
        },
      },
    },
    updatingCourse: {
      invoke: {
        id: 'updateCourse',
        src: (context, event) => updateCourse(event.data),
        onDone: {
          target: 'authenticated',
          actions: assign({ courses: (context, event) => context.courses.map(course => course.id === event.data.id ? event.data : course) }),
        },
        onError: {
          target: 'error',
          actions: assign({ error: (context, event) => event.data.message }),
        },
      },
    },
    deletingTeacher: {
      invoke: {
        id: 'deleteTeacher',
        src: (context, event) => deleteTeacher(event.data),
        onDone: {
          target: 'authenticated',
          actions: assign({ teachers: (context, event) => context.teachers.filter(teacher => teacher.id !== event.data) }),
        },
        onError: {
          target: 'error',
          actions: assign({ error: (context, event) => event.data.message }),
        },
      },
    },
    deletingStudent: {
      invoke: {
        id: 'deleteStudent',
        src: (context, event) => deleteStudent(event.data),
        onDone: {
          target: 'authenticated',
          actions: assign({ students: (context, event) => context.students.filter(student => student.id !== event.data) }),
        },
        onError: {
          target: 'error',
          actions: assign({ error: (context, event) => event.data.message }),
        },
      },
    },
    deletingCourse: {
      invoke: {
        id: 'deleteCourse',
        src: (context, event) => deleteCourse(event.data),
        onDone: {
          target: 'authenticated',
          actions: assign({ courses: (context, event) => context.courses.filter(course => course.id !== event.data) }),
        },
        onError: {
          target: 'error',
          actions: assign({ error: (context, event) => event.data.message }),
        },
      },
    },
    loggingOut: {
      invoke: {
        id: 'logout',
        src: logout,
        onDone: {
          target: 'idle',
          actions: assign({ user: null, error: null }), // Clear error on logout
        },
        onError: {
          target: 'error',
          actions: assign({ error: (context, event) => event.data.message }),
        },
      },
    },
    error: {
      on: {
        RETRY: 'idle', // Allow retry from idle state
        LOGIN: 'authenticating', // Allow login attempt from error state
      },
      actions: assign({ error: null }), // Clear error when transitioning out of error state
    },
  },
});
