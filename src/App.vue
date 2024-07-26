<script>
import FooterBar from './components/Footer.vue';
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    FooterBar,NavBar
  },
  data() {
    return {
      userFooter: null,
      userNavBarHeader:null
    }
  },
  created() {
    this.checkRoute();
  },
  mounted() {

  },
  methods: {
    // to not show footer in login, signup and forgot password pages
    checkRoute() {
      this.userNavBarHeader = true;
      if(this.$route.name==="signup" || this.$route.name==="login" || this.$route.name==="forgot-password" || this.$route.name==="adminView" || this.$route.name==="studentAdmin" || this.$route.name==="teacherAdmin")
      {
        if(this.$route.name==="adminView" || this.$route.name==="studentAdmin" || this.$route.name==="teacherAdmin")
        {
          this.userNavBarHeader = false;
        }
        this.userFooter = true;
        return
      }
      this.userFooter = false;
     
    }
    
  },
  watch:{
    $route(){
      this.checkRoute();
    },
  },
};
</script>

<template>
  <div>
  <NavBar v-if="userNavBarHeader" />
    <router-view></router-view>
    <FooterBar v-if="!userFooter" />
  </div>
</template>

<style >
</style>