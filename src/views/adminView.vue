<template>
<sideBarAdmin/>
  <section class="home-section">
    <nav>
      <div class="sidebar-button">
        <!-- <i class='bx bx-menu sidebarBtn'></i> -->
        <span class="dashboard">Dashboard</span>
      </div>
      <div class="search-box">
        <input type="text" placeholder="Search...">
        <!-- <i class='bx bx-search' ></i> -->
      </div>
      <div class="profile-details">
        <!-- <img src="images/profile.jpg" alt=""> -->
        <span class="admin_name">Mahad</span>
        <!-- <i class='bx bx-chevron-down' ></i> -->
      </div>
    </nav>
    <div class="home-content">
      <div class="overview-boxes">
        <div class="box">
          <div class="right-side">
            <div class="box-topic">Total Students</div>
            <div class="number">40,876</div>
            <div class="indicator">
              <!-- <i class='bx bx-up-arrow-alt'></i> -->
              <!-- <span class="text">Up from yesterday</span> -->
            </div>
          </div>
          <!-- <i class='bx bx-cart-alt cart'></i> -->
        </div>
        <div class="box">
          <div class="right-side">
            <div class="box-topic">Total Teachers</div>
            <div class="number">38,876</div>
            <div class="indicator">
              <!-- <i class='bx bx-up-arrow-alt'></i> -->
              <!-- <span class="text">Up from yesterday</span> -->
            </div>
          </div>
          <!-- <i class='bx bxs-cart-add cart two' ></i> -->
        </div>
        <div class="box">
          <div class="right-side">
            <div class="box-topic">Total Courses</div>
            <div class="number">69</div>
            <div class="indicator">
              <!-- <i class='bx bx-up-arrow-alt'></i> -->
              <!-- <span class="text">Up from yesterday</span> -->
            </div>
          </div>
          <!-- <i class='bx bx-cart cart three' ></i> -->
        </div>
       
      </div>
      <div class="sales-boxes">
        <div class="recent-sales box">
          <div class="title">All Students</div>
          <div class="sales-details">
            <ul class="details">
              <li class="topic">Sr No</li>
              <!-- <li><a href="#">02 Jan 2021</a></li>
              <li><a href="#">02 Jan 2021</a></li>
              <li><a href="#">02 Jan 2021</a></li>
              <li><a href="#">02 Jan 2021</a></li>
              <li><a href="#">02 Jan 2021</a></li>
              <li><a href="#">02 Jan 2021</a></li>
              <li><a href="#">02 Jan 2021</a></li> -->
            </ul>
            <ul class="details">
            <li class="topic">Name</li>
            <!-- <li><a href="#">Alex Doe</a></li>
            <li><a href="#">David Mart</a></li>
            <li><a href="#">Roe Parter</a></li>
            <li><a href="#">Diana Penty</a></li>
            <li><a href="#">Martin Paw</a></li>
            <li><a href="#">Doe Alex</a></li>
            <li><a href="#">Aiana Lexa</a></li>
            <li><a href="#">Rexel Mags</a></li>
             <li><a href="#">Tiana Loths</a></li> -->
          </ul>
          <ul class="details">
            <li class="topic">Enrolled</li>
            <!-- <li><a href="#">Delivered</a></li>
            <li><a href="#">Pending</a></li>
            <li><a href="#">Returned</a></li>
            <li><a href="#">Delivered</a></li>
            <li><a href="#">Pending</a></li>
            <li><a href="#">Returned</a></li>
            <li><a href="#">Delivered</a></li>
             <li><a href="#">Pending</a></li>
            <li><a href="#">Delivered</a></li> -->
          </ul>
          <ul class="details">
            <li class="topic">Total</li>
            <!-- <li><a href="#">$204.98</a></li>
            <li><a href="#">$24.55</a></li>
            <li><a href="#">$25.88</a></li>
            <li><a href="#">$170.66</a></li>
            <li><a href="#">$56.56</a></li>
            <li><a href="#">$44.95</a></li>
            <li><a href="#">$67.33</a></li>
             <li><a href="#">$23.53</a></li>
             <li><a href="#">$46.52</a></li> -->
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
import sideBarAdmin  from '../components/sideBarAdmin.vue';;
export default {
  name: 'adminView',  
  
  components: {
    sideBarAdmin
  }
};
</script>
<style scoped>
  @import "../assets/adminPage.css";
</style>