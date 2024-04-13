<template>
    <div class="welcome">
      <div class="center-content">
        <p>欢迎使用跨域身份认证系统！</p>
        <p>@对对对队</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {};
    },
  };
  </script>
  
  <style lang="less" scoped>
  .welcome {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh; 
  
  .center-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
    line-height: 30px;
    p{
      font-size: 30px;
      font-family: "Helvetica Neue", sans-serif;
    }

  }
}
  </style>