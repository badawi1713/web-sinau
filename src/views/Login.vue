<template>
<div class="login-page">

    <header>
        <div class="logo">
            <a href="#">
                <img class="logo-text" src="../assets/Logo.svg" alt="logo-image">
            </a>
        </div>
        <ul class="nav">
            <li>
                <a href="">Find Training</a>
            </li>
            <li>
                <a href="">Community</a>
            </li>
            <li>
                <a href="">About Us</a>
            </li>
            <li>
                <a><i class="fa fa-user"></i></a>
                <ul>
                    <li> <a href="">Dashboard</a></li>
                    <li><a href="" class="logout">Logout</a></li>
                </ul>
            </li>
        </ul>
    </header>

    <section class="login-page">
        <form action="" @submit="doSave">
            <div class="box">
                <div class="form-head">
                    <h2>Login to Sinau Koding</h2>
                    <p>Let We Know Your Participant</p>
                    <div class="form-body">
                     <input
        v-model="user.username"
        type="text"
        placeholder="Username"
        autofocus
        class="form-control"
        :class="{'is-invalid': hasSubmit && user.username.length === 0}"
      />

       <input
        v-model="user.password"
        type="password"
        placeholder="Password"
        class="form-control"
        :class="{'is-invalid': hasSubmit && user.password.length === 0}"
      />
                       
                        
                    </div>
                    <div class="form-footer">
                        <button type="submit">  <template v-if="isLoading">
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span class="sr-only">Loading...</span>
        </template>
        <template v-else>Login</template></button>
                    </div>
                </div>
            </div>
        </form>
    </section>

</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import User from "../Entities/User";

import axios, { AxiosResponse } from "axios";

// import Cookies from "js-cookie";

@Component({ name: "login" })
export default class Login extends Vue {
  public user: User = new User();

  public rememberMe: boolean = false;

  public hasSubmit: boolean = false;

  public isLoading: boolean = false;

  public get isValid(): boolean {
    return this.user.username !== "" && this.user.password !== "";
  }

  public doSave(event: Event): void {
    event.preventDefault();

    this.hasSubmit = true;

    if (!this.isLoading && this.isValid) {
      this.isLoading = true;

      // console.log(JSON.stringify(this.user));

      axios
        .post("http://192.168.0.152:9000/login", {
          username: this.user.username,
          password: this.user.password
        })
        .then(response => {
          console.log(response.data);
          if (response.data.status == "200") {
            this.hasSubmit = false;
            this.user = new User();
            // @ts-ignore
            this.$doCookieOperation("session", response.data.data);

            this.$notify({
              group: "default",
              title: "Login",
              text: "Success!",
              type: "success"
            });

            this.$router.push("/participant");
            // Cookies.set("session", JSON.stringify(response.data.data)); //Hanya bisa menyimpan dalam bentuk string
          } else {
            // alert("Invalid login!");
            this.$notify({
              group: "default",
              title: "Login",
              text: "Invalid Login!",
              type: "error"
            });
          }
        })
        .catch(error => {
          console.log(error);
           this.$notify({
              group: "default",
              title: "Login",
              text: error.toString(),
              type: "error"
            });
        })
        .finally(() => {
          this.isLoading = false;
        });

      // setTimeout(() => {
      //   this.isLoading = false;
      //   this.hasSubmit = false;

      //   this.user = new User();
      // }, 1000);
    }
  }
}
</script>

<style scoped lang="scss">


* {
    box-sizing: border-box;
}

.login-page {
    padding: 0;
    margin: 0;
    background-color: #edf1f8;
    font-family: "Monstserrat", sans-serif;
}

header {
    background-color: white;
    height: 66px;
}

header * {
    color: #01111c;
}

header .logo {
    float: left;
    height: inherit;
    margin-left: 2em;
}

header .logo img {
    height: 80%;
}

header .logo-text {
    margin: 9px
}

header ul{
    float: right;
    list-style: none;
    margin: 0;
    padding: 0;
    height: inherit;
}

header ul li{
    float: left;
    position: relative;
    height: inherit;
}

header ul li a{
    display: block;
    padding: 21px;
    font-size: 1.1em;
    text-decoration: none;
    height: inherit;
}

header ul li a:hover{
    background-color: #df205b;
    color: white;
    transition: 0.5s;
}

header ul li ul {
    position: absolute;
    top: 66px;
    right: 0px;
    width: 180px;
    display: none;
}

header ul li ul li {
    width: 100%;
}

header ul li:hover ul {
    display: block;
}

header ul li ul li a {
    padding: 10px;
    background-color: white;
    color: #444
}

header ul li ul li a.logout{
    background-color: white;
    color: red;
}

/* header ul li ul li a.l:hover{
    background-color: rgb(155,150,150);
} */


/* LOGIN FORM */
.login-page {
    height: 100vh;
    position: relative;
}

.login-page .box {
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%,-50%);
    display: flex;
    flex-direction: column;
    width: 320px;
}

.login-page .box .form-head h2 {
    text-align: center;
    margin: 10px 0px;
    color: #01111c;
    margin-bottom: 2rem;
}

.login-page .box .form-head p{
    text-align: center;
    margin: 10px 0px;
    color: crimson;
    margin-bottom: 3rem;
}

.login-page .box .form-body {
    display:flex;
    flex-direction: column;
}

.login-page .box .form-body input {
    height: 40px;
    margin-bottom: 20px;
    border: 1px solid #fff;
    border-radius: 5px;
    width: 100%;
    padding-left: 1rem;
    transition: box-shadow 0.5s ease;
}

.login-page .box .form-body input:focus{
    box-shadow: 0px 0px 10px crimson;
    border-color: crimson;
    border-radius: 5px;
}

.login-page .box .form-body input::placeholder {
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    color: darkslategrey;
}

.login-page .box .form-footer button {
    height: 40px;
    width: 100%;
    border-radius: 5px;
    padding: 0 50px;
    background-color: crimson;
    color: white;
    border: none;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 20px;
}

.login-page .box .form-footer button:hover{
    box-shadow: 0px 0px 10px rgb(165, 18, 48);
    background-color: rgb(150, 29, 53);
}

 .form-control {
      position: relative;
      font-size: 16px;
      height: auto;
      padding: 10px;

      &:focus {
        z-index: 2;
      }
    }
    
</style>