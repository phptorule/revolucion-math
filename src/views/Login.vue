<template>
    <div class="login">
        <div class="left-login">
            <header>
            <img src="/img/logo.png">
            </header>
            <div class="main-page1">
            <h1>Ingresa a tu cuenta</h1>
            <form class="login-form">
                <label for="username">Usuario</label>
                <input type="email" @keyup.enter="login()" name="email" :class="{'has-error': errors.has('email'), 'has-success' : ! errors.has('email') && submited}" v-validate="'required|email'" placeholder="example@gmail.com" v-model="form.email" />
                <small class="validate-message" v-show="errors.has('email')">{{ errors.first('email') }}</small>
                <label for="password">Contraseña</label>
                
                <input type="password" @keyup.enter="login()" name="password" :class="{'has-error': errors.has('password'), 'has-success' : ! errors.has('password') && submited}" v-validate="'required'" placeholder="******" v-model="form.password" />
                <small class="validate-message" v-show="errors.has('password')">{{ errors.first('password') }}</small>

                <a href="javascript:;" @click="login()" class="link-button">INGRESAR</a>
                <span @click="() => { $router.push('/register') }" >Olvidé mi contraseña?</span>
            </form>
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
        <div class="right-page1">
            <img src="/img/login.jpg" class="login-picture" />
        </div>
    </div>
</template>
<script>
    
    import api from '../api'
    import axios from 'axios'

    export default {
        data() {
            return {
                submited: false,
                form: {
                    email: "",
                    password: ""
                }
            }
        },
        methods: {
            login() {
                this.submited = true;
                this.$validator.validate().then(res => {
                    if (res) {
                        api.login(this.form)
                            .then((data) => {
                                this.$cookies.set('token', data.data)                                
                                axios.defaults.headers['Authorization'] = "Bearer " + data.data
                                this.$store.dispatch('setUser')
                                api.checkMe().then(res => {
                                    if (res.includes('teacher')) {
                                        this.$router.push('/profile/teacher')
                                    } else {
                                        this.$router.push({name:'dashboard'})
                                    }
                                })
                            })
                    }
                });
            }
        }
    }
</script>
<style scoped lang="scss">
    .validate-message {
        margin-bottom: 15px;
        color:crimson;
    }
    /* Change the white to any color ;) */
    input:-webkit-autofill {
        box-shadow: 0 0 0 30px white inset;
    }

    .main-page1 .login-form .has-error {
        border: 2px solid darkred;
    }

    .main-page1 .login-form .has-success {
        border: 2px solid darkgreen;
    }

    .login{
        display:flex;
        height: 100vh;
        background: #fff;
    }

    .left-login{
        padding: 40px 80px 20px 80px;
        width: 40%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .right-page1 {
        width: 60%;
    }

    .login-picture{
        width: 100%;
        height: 100vh;
    }

    .main-page1{
        h1 {
            color: #14112d;
            font-family: 'Roboto', sans-serif;
            font-size: 1.5em;
            margin-bottom: 40px;
            font-weight: 700;
        }

        .login-form{
            display: flex;
            flex-direction: column;

            label{
                font-family: 'Roboto', sans-serif;
                color: #707070;
                font-weight: 500;
                font-size: 0.75em;
                margin-bottom: 20px;
            }
            input{
                border: 2px solid #f5f5f5;
                padding: 15px;
                border-radius: 50px;
                font-family: 'Roboto', sans-serif;
                color: #707070;
                font-weight: 500;
                font-size: 0.7em;
                margin-bottom: 20px;
                letter-spacing: 0.05em;
            }

            input:focus{
                outline: none;
                border-color: #64b5f6;
            }
            input[type=password]{
                font-size: 0.9em;
                letter-spacing: 0.1em;
            }
        }

        a{
            font-size: 0.7em;
            padding: 17px 30px;
            color: #fff;
            background: #1de9b6;
            width: fit-content;
            align-self: flex-start;
            font-family: 'Roboto', sans-serif;
            font-weight: 700;
            letter-spacing: 2px;
            border-radius: 30px;
            text-decoration: none;
            margin: 20px 0;
        }

        span {
            color: #64b5f6;
            font-family: 'Roboto', sans-serif;
            font-weight: 500;
            font-size: 0.85em;
            cursor: pointer;
        }
        span:focus{
            outline: none;
        }
    }

    ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        color: #adadad;
    }
    ::-moz-placeholder { /* Firefox 19+ */
        color: #adadad;
    }
    :-ms-input-placeholder { /* IE 10+ */
        color: #adadad;
    }
    :-moz-placeholder { /* Firefox 18- */
        color: #adadad;
    }


    .footer{
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
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
        }

        .left-login{
            width: calc(100% - 160px);
            height: 100vh;
        }
        .right-page1{
            
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
        .left-login{
            padding: 30px 15px;
            width: calc(100% - 30px);
        }

    }
</style>
