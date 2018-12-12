<template>
    <div class="login">
        <div class="left">
        <a href="/">
            <header>
                <img src="/img/logo.png">
            </header>
        </a>
        <div class="main">
            <h1>Bienvenido!</h1>
            <p>{{ message }}</p>
            <span v-if="email">{{ email }}</span>
            <div v-if="link">
                <a class="link-button" href="/">INGRESAR</a>
            </div>
        </div>
        <div class="footer">
            <p>© Revolucion PSU</p>
            <div class="social">
            <a href="#" class="instagram"><i class="fa fa-instagram" aria-hidden="true"></i></a>
            <a href="#" class="facebook"><i class="fa fa-facebook" aria-hidden="true"></i></a>
            <a href="#" class="twitter"><i class="fa fa-twitter" aria-hidden="true"></i></a>
        </div>
        </div>
        </div>
        <div class="right">
        <img src="/img/page25.jpg" class="login-picture">
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            message: "",
            email: "",
            link: false
        }
    },
    created() {
        this.message = this.$route.params.message;
        this.email = this.$route.params.email;
        this.link = this.$route.params.link;
    }
}
</script>
<style lang="scss" scoped>
header:hover {
    cursor: pointer;
}

.login{
    background: #fff;
    display:flex;
    height: 100vh;
}

.left{
    padding: 40px 80px 20px 80px;
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.right {
    width: 60%;
}

.login-picture{
    width: 100%;
    height: 100vh;
}

.main{
    span {
        font-size: 27px;
        font-weight: bold;
    }

    h1 {
        color: #14112d;
        font-family: 'Roboto', sans-serif;
        font-size: 1.85em;
        margin-bottom: 27px;
        font-weight: 700;
    }

    p{
        color: #999999;
        font-family: 'Roboto', sans-serif;
        font-size: 1.4em;
        font-weight: 400;
        margin: 0;
        margin-bottom: 44px;
    }

    a{
        padding: 15px 30px;
        color: #fff;
        background: #1de9b6;
        width: fit-content;
        font-family: 'Roboto', sans-serif;
        font-weight: 700;
        letter-spacing: 2px;
        border-radius: 30px;
        text-decoration: none;
        display: inline-block;
        font-size: 0.7em;
    }
}

.footer{
    display: flex;
    justify-content: space-between;
    padding-top: 35px;
    p{
        color: #9fa9ba;
        font-family: 'proximanova-regular'
    }

    a{
        background: #f7f8fb;
        border: 1px solid #e3e7ed;
        border-radius: 50%;
    }

    .instagram{
        padding: 11px 13px;
    }
    .facebook{
        padding: 11px 15px;
    }
    .twitter{
        padding: 11px 12px;
        display: inline-block
    }
    i{
        color: #9fa9ba;
    }
}


@media (max-width: 866px) {
    .login{
        flex-direction: column-reverse;
        justify-content: space-between;
    }

    .left{
        width: calc(100% - 160px);
        height: 100vh;
    }
    .right{
        display: none;
    }
    .login-picture{
        width: 100%;
        height: 350px;
    }
    .footer{
        p{padding-bottom: 15px;}
    }
}

@media (max-width: 470px) {
    .left{
        padding: 30px 15px;
        width: calc(100% - 30px);
    }
}
</style>


