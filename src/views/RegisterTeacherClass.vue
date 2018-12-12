<template>
    <div class="login">
        <div class="left">
            <header>
            <img src="/img/logo.png" />
            </header>
            <div class="main">
                <h1>Elige tu(s) clase(s)</h1>
                <div class="input-form">
                    <form class="login-form">
                        <div class="box" v-for="(item, index) in classes" :key="index">
                            <input 
                                type="checkbox" 
                                v-model="form.klass[item.id]"
                                name="klass"
                                :value="item.id" />
                            <label><span></span></label>
                            <span class="ratio-web">{{item.name}}</span><br>
                        </div>
                        <a href="javascript:;" @click="register()" class="link-button">CONTINUAR</a>
                    </form>
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
                classes: [],
                teacherData: JSON.parse(this.$cookies.get('temp_teacher')),
                form: {
                    klass: {},
                    redirect_uri: `${location.host}/login`,
                }
            }
        },
        beforeCreate() {
            const teacherData = JSON.parse(this.$cookies.get('temp_teacher')) || {}
            if (!Object.keys(teacherData).length) {
                this.$router.push({name:'register-teacher'})
            }
            
        },
        created() {
            this.getClass();
        },
        methods: {
            register() {
                this.submited = true;
                
                const choosedClasses = Object.keys(this.form.klass).filter(item => this.form.klass[item])
                
                if (choosedClasses.length) {
                    api.registerTeacher({...this.teacherData, ...this.form, classes: choosedClasses})
                        .then((data) => {
                            this.$cookies.set('token', data.data, '1d', '/')
                            this.$cookies.set('temp_teacher', '', '1h', '/')

                            let message = "";
                            message += "Ahora puedes ingresar a la plataforma ";
                            message += "con el link que te enviamos a:";
                        
                            this.$router.push({name:'success', params: {'message': message, 'email': this.teacherData.email}})
                        })
                }
                
            },
            getClass() {
                api.getAvailableClass(this.teacherData.school)
                .then(res => {
                    if (!res.length) {
                        this.$router.push({name:'register-teacher'})
                    }
                    this.classes = res
                })
                .catch(error => {
                    this.$router.push({name:'register-teacher'})
                })
            },
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

.input-form{
    .box{
        text-align: left;
        padding: 29px 30px 28px 30px;
        display: flex;
        align-items: center;

        .ratio-web{        
            font-size: 18px;
            font-family: "Roboto";
            color: rgb(102, 102, 102);
        }
        .ratio-web:before{
           content: "";
           padding: 1px 12px;
           margin-left: 30px;
           margin-right: 10px; 
        }

        .ratio-pal{        
            font-size: 18px;
            font-family: "Roboto";
            color: rgb(102, 102, 102);
        }
        .ratio-pal:before{
           content: "";
           background: url('/img/paypal-icon.jpg') no-repeat;
           padding: 1px 11px;
           margin-left: 30px;
           margin-right: 10px; 
        }
    }
    form{
        display: flex;
        flex-direction: column;
        }
        input[type=checkbox]:not(old){
            width   : 20px;
            height  : 20px;
            margin  : 0;
            margin-right: -20px;
            padding : 0;
            opacity : 0;
          }
          input[type=checkbox]:not(old) + label{
            display      : inline-block;
            background: #fff;
            border: 2px solid #f1f1f1;
            border-radius: 50%;
            line-height  : 24px;
            width: 16px;
            height: 16px;
          }

          input[type=checkbox]:not(old):checked + label{
            border: 2px solid #279cf3;
            background: #fff;
          }

          input[type=checkbox]:not(old):checked + label > span{
            width: 10px;
            height: 10px;
            line-height: 1px;
            border-radius: 50%;
            font-size: 0.3em;
            margin-bottom: 0px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 3px;
            margin-left: 3px;   
            background: #279cf3;
          }

        input:focus{
            outline: none;
            border-color: #64b5f6;
        }
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
