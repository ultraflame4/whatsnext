<template>
<div id="login-ctn">
  <h1>Login</h1>
  <p>This app uses <br>Google Calendar & Trello.</p>

</div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss">
#login-ctn{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  padding: 32px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  width: 256px;
  flex-direction: column;
  gap: 16px;

  &>*{
    background: none;
    margin: 0;
  }

  h1{
    font-size: 24px;
  }
  p{
    font-size: 12px;
    color: #666;
    font-weight: bold;
    text-align: center;
  }
}
</style>