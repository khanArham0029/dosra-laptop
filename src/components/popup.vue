<template>
    <div class="popup">
      <div class="popup-content">
        <p>{{ this.modalMessage }}</p>
        <button @click="closePopup">Close</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ["modalMessage"],
    methods: {
      closePopup() {
        this.$emit("close-popup");
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .popup {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 101;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: rgba(0, 0, 0, 0.7);
  
    .popup-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-radius: 8px;
      width: 300px;
      padding: 40px 30px;
      background-color: #fff;
  
      p {
        text-align: center;
      }
  
      button {
        align-self: center;
      }
    }
  }
  </style>