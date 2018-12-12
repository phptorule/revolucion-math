<template>
    <div class="login">
        <div class="left">
            <header>
            <img src="/img/logo.png" />
            </header>
            <div class="main">
            <h1>Regístrate en Revolución PSU</h1>
            <form class="login-form">
                <label for="username" :class="{'error': errors.has('first name')}">Nombres</label>
                <input v-model="form.fname" class="for-after" :class="{'has-error': errors.has('first name'), 'has-success' : ! errors.has('first name') && submited}" v-validate="'required'" name="first name" type="text" placeholder="Tomas Felipe" />
                <label for="username" :class="{'error': errors.has('last name')}">Apelllidos</label>
                <input v-model="form.lname" :class="{'has-error': errors.has('last name'), 'has-success' : ! errors.has('last name') && submited}" v-validate="'required'" name="last name" type="text" placeholder="Dominguez Urrutia" />
                <label for="username" :class="{'error': errors.has('email')}">Email</label>
                <input v-model="form.email" :class="{'has-error': errors.has('email'), 'has-success' : ! errors.has('email') && submited}" v-validate="'required|email'" name="email" type="email" placeholder="tomas.felipe@gmail.com" />
                <label for="password" :class="{'error': errors.has('password')}">Crea tu contraseña</label>
                <input v-model="form.password" :class="{'has-error': errors.has('password'), 'has-success' : ! errors.has('password') && submited}" v-validate="'required'" name="password" type="password" placeholder="******" />
                <label for="username" :class="{'error': errors.has('code'), 'for-after': ! errors.has('code')}">Códige de tu curso
                    <!-- <div class="popover">
                    <h3>Codige de curso!</h3>
                    <p>Quisque eu congue odio, sit
                        amet sollicitudin libero. Sed et 
                        dui facilisis iaculis tellus quis.</p> 
                    </div> -->
                </label>
                <input v-model="form.code" :class="{'has-error': errors.has('code'), 'has-success' : ! errors.has('code') && submited}" v-validate="'required'" name="code" type="number" placeholder="Enter your Code*" />
                <a href="javascript:;" @click="register()" class="link-button">ENVIAR</a>
                <span>Ya tienes una curenta? 
                    <a href="javascript:;" @click="() => { $router.push('/login') }" class="inline-link">INGRESA</a>
                </span>
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
        <div class="right">
            <img src="/img/register.jpg" class="login-picture">
        </div>
    </div>
</template>
<script>
    import api from '../api';

    export default {
        data() {
            return {
                submited: false,
                form: {
                    fname: "",
                    lname: "",
                    email: "",
                    password: "",
                    code: "",
                    role: "student",
                    redirect_uri: "",
                }
            }
        },
        methods: {
            register() {
                this.submited = true;
                this.$validator.validate().then(res => {
                    if (res) {
                        this.form.redirect_uri = location.host + '/login'
                        api.register(this.form)
                            .then((data) => {
                                this.$cookies.set('token', data.data, '1d', '/')
                                
                                let message = "";
                                message += "Ahora puedes ingresar a la plataforma ";
                                message += "con el link que te enviamos a:";
                            
                                this.$router.push({name:'success', params: {'message': message, 'email': this.form.email}})
                            })
                    }
                })
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
    -webkit-box-shadow: 0 0 0 30px white inset;
}

.main {
    .login-form {
        input.has-error {
            border: 2px solid #B5888A;
            position: relative;
        }

        label.error {
            position: relative;
            &::after {
                content: '\f00d';
                font-family: FontAwesome;
                font-weight: normal;
                font-style: normal;
                color: #B5888A;
                font-size: 16px;
                position: absolute;
                z-index: 2;
                right: 20px;
                top: 49px;
            }
        }
    }
}

.main .login-form .has-success {
    border: 2px solid #85ADC1;
}

body{
    overflow: hidden;
}

.login{
    display:flex;
    height: 100vh;
}

.left{
    padding: 40px 80px;
    background: #fff;
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: auto;
}

.right {
    width: 60%;
}

.login-picture{
    width: 100%;
    height: 100vh;
}

.main{
    padding: 60px 0;
    h1 {
        color: #14112d;
        font-family: 'Roboto', sans-serif;
        font-size: 1.35em;
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
        
        label.error{
            color: #B5888A;
        }

        input{
            border: 2px solid #f5f5f5;
            padding: 15px;
            border-radius: 50px;
            font-family: 'Roboto', sans-serif;
            color: #adadad;
            font-weight: 500;
            margin-bottom: 20px;
            font-size: 0.7em;
            letter-spacing: 0.05em;
        }

        input:focus{
            outline: none;
            border-color: #64b5f6;
        }
    }

    a{
        padding: 15px 30px;
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
        font-size: 0.7em;
    }

    span {
        color: #9fa9ba;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        font-size: 0.85em;
        letter-spacing: 0.03em;
    }

    .inline-link{
        display: inline;
        background: none;
        color: #64b5f6;
        padding: 0 5px;
        letter-spacing: 1px;
        font-size: 0.85em;
        font-weight: 500;
    }
}

.for-after{
    position: relative;
}

.for-after::after{
    content: '\f128';
   font-family: FontAwesome;
   font-weight: normal;
   font-style: normal;
   margin:0px 0px 0px 10px;
   text-decoration:none;
   background: #64b5f6;
   color: #fff;
   padding: 2px 5px 2px 4px;
   border-radius: 50%;
   position: absolute;
   top: 0;
}

.footer{
    display: flex;
    justify-content: space-between;
    padding-bottom: 30px;
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

.popover{
    opacity: 0;
    visibility: hidden;
    width: 165px;
    padding: 15px 15px;
    background: #353c48;
    z-index: 5;
    position: absolute;
    border-radius: 5px;
    left: 19px;
    top: -119px;
    transition: all 0.3s ease-in;
    h3{
        color: #fff;
        font-family: 'Roboto', sans-serif;
        font-weight: 700;
        font-size: 1em;
        text-transform: uppercase;
        font-size: 0.9em;
        margin: 0;
    }
    p{
        color: #9fa9ba;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 0.8em;
        margin-bottom: 0;
        line-height: 18px;
    }
}

.popover:before {
    position: absolute;
    z-index: -1;
    content: '';
    right: calc(50% - 10px);
    bottom: -8px;
    border-style: solid;
    border-width: 0 10px 10px 10px;
    border-color: transparent transparent #353c48 transparent;
    transition-duration: 0.3s;
    transition-property: transform;
    transform: rotate(180deg);
}

.for-after:hover {
    .popover{
    opacity: 1;
    visibility: visible;
}
}

@media (max-width: 866px) {
    .login{
        flex-direction: column-reverse;
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



@media (max-width: 470px) {
    .left{
        padding: 30px 15px;
        width: calc(100% - 30px);
    }
}

@media (max-width: 389px) {
    .left{
        padding: 30px 15px;
        width: calc(100% - 30px);
    }
    
}

.left::-webkit-scrollbar {
    width: 0em;
}
 
.left::-webkit-scrollbar-track {
    -webkit-box-shadow: none;
}
 
.left::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}
</style>
