<template>
  <div id="login-ctn" class="vlayer">
    <h1>Login</h1>
    <p>This app uses <br>Google Calendar & Trello.</p>
    <!--  Google sign in button -->
    <button v-if="!isgoogleLoggedIn" type="button" class="login-with-google-btn" @click="loginGoogle()"
            :disabled="isautologin">
      Sign in with Google
    </button>
    <p v-else class="sign-in-success-login"> Google Signed In ✅</p>
    <!--  Trello authentication  -->
    <button v-if="!istrelloLoggedIn" class="trello-loginbutton login-button" :disabled="!isgoogleLoggedIn" @click="loginTrello()">Authenticate
      Trello
    </button>
    <p v-else class="sign-in-success-login"> Trello Authenticated ✅</p>

  </div>
</template>

<script lang="ts" setup>

import {onMounted, Ref, ref} from "vue";
import {GoogleAuthManager} from "../apis/google";
import {TrelloAuthManager} from "../apis/trello";

const isgoogleLoggedIn = ref(false)
const istrelloLoggedIn = ref(false)
const isautologin = ref(true)


GoogleAuthManager.login.on(() => {
  isgoogleLoggedIn.value = true
  // attempt auto login to trello
  TrelloAuthManager.useExistingToken().then(() => {
    console.log("trello auto login success")
  }).catch(reason => {
    console.log("trello auto login failed", reason)
  })
})

TrelloAuthManager.login.on(() => {
  istrelloLoggedIn.value = true
})

function loginGoogle() {

  GoogleAuthManager.requestUserLogin()
}

function loginTrello() {
  console.log("Trello login")
  TrelloAuthManager.requestAuthentication()

}

onMounted(() => {
  // trigger auto sign in flow
  setTimeout(()=>{
    console.log("Attempting google auto login")
    if (!GoogleAuthManager.loginWithExistingToken()){
      console.warn("Google auto login failed")
      setTimeout(()=>{isautologin.value=false},500)
    }
  },1000)
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



  .trello-loginbutton {
    background-color: #008FE4;
    color: white;
  }
}


</style>