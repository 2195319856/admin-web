import {AESUtil} from "@/utils/aes"
import Cookies from 'js-cookie'
//输入验证
export function proofList(user,o) {
    if (user.username===null||user.username===""){
        o.$message.error('用户名不能为空');
        return false
    }else if (user.password===null||user.password===""){
        o.$message.error('密码不能为空');
        return false
    }else {
        return true
    }

}
//登录
export function loginFrom(user,o) {
    let password=AESUtil.aesEncrypt(user.password)
    let login={
        "username":user.username,
        "password":password
    }
    if (user.rememberMe){
        setUser(login)
    }else {
        deleteUser()
    }
    o.axios.post("",login).then((data)=>{
            console.log(data)
        }).catch((error)=>{
            console.log(error)
    })
}
//保存信息
export function setUser(login) {
    Cookies.set("rememberMe", login.rememberMe)
    Cookies.set("username", login.username)
    Cookies.set("password", login.password)
}
//删除信息
export function deleteUser() {
    Cookies.remove("username")
    Cookies.remove("password")
    Cookies.remove("rememberMe")
}
//获取信息
export function getUser() {
    let username=Cookies.get("username")
    let password=''
    if (Cookies.get("password")  !== undefined){
        password=AESUtil.aesDecrypt(Cookies.get("password"))
    }
    let rememberMe=Cookies.get("rememberMe")
    return {"username":username,"password":password,"rememberMe":rememberMe}
}
