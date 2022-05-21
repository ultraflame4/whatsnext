<template>
  <div id="login-ctn" class="vlayer">
    <h1>Login</h1>
    <p>This app uses <br>Google Calendar & Trello.</p>
    <!--  Google sign in button -->
    <button v-if="!isgoogleLoggedIn" type="button" class="login-with-google-btn" @click="loginGoogle()"
            ref="googlesignin">
      Sign in with Google
    </button>
    <p v-else class="sign-in-success-login"> Google Signed In ✅</p>
    <!--  Trello authentication  -->
    <button class="trello-loginbutton login-button" disabled ref="trellosignin" @click="loginTrello()">Authenticate Trello</button>

  </div>
</template>

<script lang="ts" setup>

import {onMounted, Ref, ref} from "vue";
import {GoogleAuthManager} from "../apis/google";
import {TrelloAuthManager} from "../apis/trello";

const isgoogleLoggedIn = ref()
const trellosignin = <Ref<HTMLButtonElement>><any>ref(null)

GoogleAuthManager.login.on(() => {
  isgoogleLoggedIn.value = true
  trellosignin.value.disabled=false
})

function loginGoogle() {

  GoogleAuthManager.requestUserLogin()
}

function loginTrello() {
  TrelloAuthManager.requestAuthentication()

}

onMounted(() => {

})


</script>

<style lang="scss">
@use "../assets/vars.scss";


#login-ctn {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 32px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  width: 256px;
  flex-direction: column;
  gap: 24px;


  h1 {
    font-size: 24px;
    margin: 0;
  }

  & > p {
    margin: 0;
    font-size: 12px;
    color: #666;
    font-weight: bold;
    text-align: center;
  }

  .sign-in-success-login {
    color: vars.$accent;
    font-weight: bolder;
    font-size: 12px;
    border: vars.$accent solid 2px;
    padding: 8px;
    border-radius: 8px;
  }

  .trello-loginbutton{
    background-color:  #008FE4;
    color: white;
  }
}



</style>