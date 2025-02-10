<template>
<div class="form-container">
<el-form :model="passwordForm" :rules="rules" ref="passwordForm" label-width="100px">
  <el-form-item label="旧密码" prop="oldPassword">
    <el-input v-model="passwordForm.name"></el-input>
  </el-form-item>
  <el-form-item label="新密码" prop="newPassword">
    <el-input v-model="passwordForm.name"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="confirmPassword">
    <el-input v-model="passwordForm.name"></el-input>
  </el-form-item>
</el-form> 
</div>     
</template>


<script>
 
export default {
    data(){
        return{
            passwordForm:{
                oldPassword:"",
                newPassword:"",
                confirmPassword:""
            },
            rules:{
                oldPassword:{
                    required:true,
                    message:"请输入旧密码",
                    trigger:"blur"
                },
                newPassword:{
                    required:true,
                    message:"请输入新密码",
                    trigger:"blur"
                },
                confirmPassword:{
                    required:true,
                    message:"请再次输入新密码",
                    trigger:"blur"
                }
            }
        }
    },
    name:"userCenter"

}

</script>

<style scoped>
    .el-form{
        width: 50%;
    }

    .form-container{
        display: flex;
        justify-content: center;
        
    }

    
</style>