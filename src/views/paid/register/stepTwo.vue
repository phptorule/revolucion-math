<template>
   <div class="container">
    <div class="main">
      <h1>Elige tu Plan</h1>
      <div class="steps">
        <div class="step-item item-active">
            <span class="blue">1</span>
            <p>STEP 1</p>
        </div>
        <div class="step-item">
            <span>2</span>
            <p>STEP 2</p>
        </div>
      </div>
      
      <div class="input-form" v-if=" ! confirm">
          <form class="login-form">
              <label for="username">Nombre</label>
              <input type="text" placeholder="Enter text here*" v-model="form.fname" :class="{'has-error': errors.has('Nombre'), 'has-success' : ! errors.has('Nombre') && submited}" v-validate="'required'" name="Nombre" />
              <small class="validate-message" v-show="errors.has('Nombre')">{{ errors.first('Nombre') }}</small>
              <label for="username">Apellido</label>
              <input type="text" placeholder="Enter text here*" v-model="form.lname" :class="{'has-error': errors.has('Apellido'), 'has-success' : ! errors.has('Apellido') && submited}" v-validate="'required'" name="Apellido" />
              <small class="validate-message" v-show="errors.has('Apellido')">{{ errors.first('Apellido') }}</small>
              <label for="username">Correo electrónico</label>
              <input type="email" placeholder="Enter text here*" v-model="form.email" :class="{'has-error': errors.has('Correo electrónico'), 'has-success' : ! errors.has('Correo electrónico') && submited}" v-validate="'required'" name="Correo electrónico" />
              <small class="validate-message" v-show="errors.has('Correo electrónico')">{{ errors.first('Correo electrónico') }}</small>
              <label for="username">Contraseña</label>
              <input type="password" placeholder="Enter text here*" v-model="form.password" :class="{'has-error': errors.has('Contraseña'), 'has-success' : ! errors.has('Contraseña') && submited}" v-validate="'required'" name="Contraseña" />
              <small class="validate-message" v-show="errors.has('Contraseña')">{{ errors.first('Contraseña') }}</small>
              
              <label for="username">Escuela</label>
              <select v-model="form.school" name="Escuela" :class="{'has-error': errors.has('Escuela'), 'has-success' : ! errors.has('Escuela') && submited}" v-validate="'required'">
                <option value="0">Por favor seleccione</option>
                <option
                    v-for="(s, index) in schools"
                    :key="index"
                    :value="s.id"
                    >
                    {{ s.name }}
                </option>
              </select>
              <small class="validate-message" v-show="errors.has('Escuela')">{{ errors.first('Escuela') }}</small>

              <label for="username">Clase</label>
              <select v-model="form.code" name="Clase" :class="{'has-error': errors.has('Clase'), 'has-success' : ! errors.has('Clase') && submited}" v-validate="'required'">
                <option
                    v-for="(c, index) in classes"
                    :key="index + ' classes'"
                    :value="c.code"
                >
                    {{ c.name }}
                </option>
              </select>
              <small class="validate-message" v-show="errors.has('Clase')">{{ errors.first('Clase') }}</small>
              <a href="javascript:;" @click="next" class="link-button">CONTINUAR</a>
            </form>
      </div>

      <Confirm :email="form.email" @confirm="confirm = false; $emit('next', flow)" v-else />

    </div>
  </div>
</template>
<script>
    import api from '../../../api' 
    import Confirm from './Confirm'

    export default {
        data() {
            return {
                submited: false,
                confirm: false,
                flow: "",
                form: {
                    fname: "",
                    lname: "",
                    email: "",
                    password: "",
                    role: "paid-user",
                    school: 0,
                    code: ""
                },
                schools: [],
                classes: [],
                all: {
                    classes: []
                }
            }
        },
        components: {
            Confirm
        },
        created() {
            this.getAllShcools();
            this.getAllClass();
        },
        methods: {
            next() {
                this.$validator.validate().then(res => {
                    if (res) {
                        let $this = this;
                        api.register(this.form, 'paid')
                            .then((data) => {
                                $this.confirm = true;
                                $this.flow = data.data.flow_return_url
                                this.$cookies.set('token', data.data.token, '1d', '/')
                            })
                    }
                })
                
            },

            getAllShcools() {
                api.getSchool()
                    .then(data => {
                        this.schools = data
                    })
            },

            getAllClass() {
                api.getClasses()
                    .then(data => {
                        this.classes = data
                        this.all.classes = data
                    })
            },
        },
        watch: {
            'form.school'() {
                this.classes = this.all.classes.filter(c => c.school_id == this.form.school)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .validate-message {
        margin-bottom: 15px;
        color:crimson;
    }
    /* Change the white to any color ;) */
    input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 30px white inset;
    }

    .main .login-form .has-error {
        border: 2px solid darkred;
    }

    .main .login-form .has-success {
        border: 2px solid darkgreen;
    }

    .container{
    width: 100%;
    background: #fafafa;
    text-align: center;
    padding: 70px 0;
}

.main{
    width: 88.045%;
    margin-left: auto;
    margin-right: auto;
    h1{
        color: #535353;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        font-size: 1.8em;
        padding-bottom: 27px;
    }
    .steps{
        display: flex;
        justify-content: center;
        .step-item{
            position: relative;
            span{
                padding: 9px 13px;
                border-radius: 50%;
                background: #f1f1f1;
                color: #b5b5b5;
                font-family: 'Roboto', sans-serif;
                font-weight: 700;
                margin: 0 55px;
                font-size: 0.7em
            }
            .blue:after{
                content: "";
                border-bottom: 1px solid #ededed;
                width: 121px;
                position: absolute;
                top: 9px;
                left: 88px;
            }
            p{
                color: #d7d7d7;
                font-family: 'Roboto', sans-serif;
                font-weight: 700;
                font-size: 0.8em;
                margin-top: 20px;
                margin-bottom: 0;
            }
        }

        .item-active{
            span{
                background: #279cf3;
                color: #fff;
            }
            p{
                color: #5e5e5e;
            }
        }

        .no-line:after{
            display: none;
        }
    }
}

.input-form{
    width: 320px;
    padding: 50px 65px;
    background: #fff;
    border-radius: 5px;
    -webkit-box-shadow: 0 0 56px -10px #CCCCCC;
    box-shadow: 0 0 56px -10px #CCCCCC;
    margin-top: 60px;
    margin-left: auto;
    margin-right: auto;
    form{
    display: flex;
    flex-direction: column;
    }
    label{
        font-family: 'Roboto', sans-serif;
        color: #707070;
        font-weight: 500;
        font-size: 0.75em;
        margin-bottom: 20px;
        text-align: left;
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
        letter-spacing: 0.03;
    }

    select {
        border: 2px solid #f5f5f5;
        padding: 15px;
        border-radius: 50px;
        font-family: 'Roboto', sans-serif;
        color: #707070;
        font-weight: 500;
        font-size: 0.7em;
        margin-bottom: 20px;
        letter-spacing: 0.03;
    }

    input:focus{
        outline: none;
        border-color: #64b5f6;
    }

    a{
        padding: 15px 22px;
        color: #fff;
        background: #1de9b6;
        width: fit-content;
        font-family: 'Roboto', sans-serif;
        font-weight: 700;
        letter-spacing: 2px;
        border-radius: 30px;
        text-decoration: none;
        margin: 20px 0;
        margin-left: auto;
        margin-right: auto;
        font-size: 0.75em;
    }
}


h1{
    margin: 0;
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


@media (max-width: 1190px){
    .main{
        width: 90%;
        margin-left: auto;
        margin-right: auto;
    }
}

@media(max-width:513px){
    .input-form{
        width: 70%;
        padding: 50px 30px;
    }
}

@media(max-width:390px){
    .step-item{
        span{
            margin: 0 30px !important; 
        }
        span:after{
            width: 61px !important;
            left: 62px !important;
        }
    }
}
</style>
