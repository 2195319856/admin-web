<template >
    <div class="content">
        <div class="background" >
            <img width="100%" height="100%" :src="backgroundImg">
        </div>
        <div  class="login">
            <label class="title">后台管理系统</label>
            <el-input class="inputTop" v-model="user.username" clearable placeholder="账号" prefix-icon="el-icon-user"></el-input>
            <el-input class="inputTop" v-model="user.password" clearable placeholder="密码" show-password prefix-icon="el-icon-lock"></el-input>
            <el-checkbox class="checkbox"  v-model="user.rememberMe">记住我</el-checkbox>
            <el-button class="inputTop" :loading="loading" type="primary" @click="login"  round>
                <span v-if="!loading">登 录</span>
                <span v-else>登 录 中...</span>
            </el-button>
        </div>
    </div>
</template>

<script>
    import {proofList,loginFrom,getUser} from "@/api/login/login"
    import "@/assets/css/login.css"
    export default {
        name: "login",
        data:()=>{
            return{
                backgroundImg:require("@/assets/58.png"),
                loading:false,

                user:{
                    username:"",
                    password:"",
                    rememberMe:false
                }
            }
        },
        methods:{
            login(){
              let i= proofList(this.user,this)
              if (i){
                  this.loading=true
                  loginFrom(this.user,this)
                  this.loading=false

              }
            },
            getCookies(){
                let s=getUser()
                this.user = {
                    username: s.username === undefined ? this.user.username : s.username,
                    password: s.password === undefined ? this.user.password : s.password,
                    rememberMe: s.rememberMe === undefined ? false : Boolean(s.rememberMe),
                }
            }
        },
        created(){
            this.getCookies()

        }
    }
</script>

<style scoped>

</style>
