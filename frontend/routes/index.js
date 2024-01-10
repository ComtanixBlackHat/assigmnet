import NotFound from '../src/components/NotFound.vue';
import Home from '../src/components/Home.vue'
import Login from '../src/components/login.vue'
import Register from '../src/components/Register.vue'
import SinglePost from '../src/components/SinglePost.vue';
import addpost from '../src/components/CreatePost.vue'
import updatepost from '../src/components/UpdatePost.vue'
import mypost from '../src/components/Mypost.vue'
const routes = [
  
  { path: '/:catchAll(.*)', component: NotFound },
  {
    path: '/dashboard',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('session_token')) {
        next('/login'); 
      } else {
        next();
      }
    },
  },
  { path: '/login', component: Login },
  {path: '/register' , component : Register},
  { path: '/post/:id', component: SinglePost ,
  beforeEnter: (to, from, next) => {
    if (!localStorage.getItem('session_token')) {
      next('/login'); 
    } else {
      next();
    }
  },
},
  {path : '/addpost' , component : addpost,
  beforeEnter: (to, from, next) => {
    if (!localStorage.getItem('session_token')) {
      next('/login'); 
    } else {
      next();
    }
  },
} ,
  {path : '/updatePost/:id' , component : updatepost,
  beforeEnter: (to, from, next) => {
    if (!localStorage.getItem('session_token')) {
      next('/login'); 
    } else {
      next();
    }
  },
},
{path : '/mypost' , component : mypost,
beforeEnter: (to, from, next) => {
  if (!localStorage.getItem('session_token')) {
    next('/login'); 
  } else {
    next();
  }
},
}
];
export default routes;