<template>
    <section id="login-form" class="main">
        <div class="formContainer">
            <h1>Login</h1>
            <div class="input-wrap">
                <input type="text" placeholder="请输入您的邮箱~" spellcheck="false" required>
                <i class="fa-solid fa-user"></i>
            </div>
            <div class="input-wrap">
                <input type="password" placeholder="请输入密码~" spellcheck="false" required>
                <i class="fa-solid fa-lock"></i>
            </div>
            <div class="rem">
                <p>
                    <input type="checkbox" v-model="remember">
                    Remember me
                </p>
                <a>Forgot password?</a>
            </div>

            <button>Login</button>

            <p class="reg">Dont't have an account?<a>Register</a></p>

        </div>
    </section>
</template>

<script>

</script>

<style scoped>
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css');

    .main{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-image: url('../assets/jinan.jpg');
        background-size:cover;
        background-position: center;
    }

    .formContainer{
        width: 30%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .formContainer h1{
        font-size: 2.5rem;
        color: black;
        margin: 25px;
    }

    .input-wrap{
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid red;
        margin-bottom: 25px;
        height: 55px;
        width: 90%;

    }

    .input-wrap i{
        font-size: 1.2rem;
        padding-right:25px;
    }

    input{
        border: none;
        outline: none;
        background-color: transparent;
        font-size: 1.2rem;
        padding: 5px 25px;
    }

    input::placeholder{
        font-size: 1.2rem;
        color: black;
    }

</style>