<template>
    <div class="main1">
          <img src="/img/page12.jpg">
          <h1>Enviamos un código a <span>{{ email }}</span></h1>
          <h3>Revisa tu email e introduce el código aquí</h3>
          <input type="text" v-model="code" placeholder="Enter your code">
          <div v-show="invalid">
              <span class="error-msg">Code is invalid</span>
          </div>
          <a href="javascript:;" @click="confirm()">VERTIFICAR</a>
        </div>
</template>
<script>
    import api from '../../../api'
    
    export default {
        data() {
            return {
                code: "",
                invalid: false
            }
        },
        props: ['email'],
        methods: {
            confirm() {
                this.invalid = false;
                api.confirm({email: this.email, code: this.code, redirect_uri: location.host })
                    .then((data) => {
                        if (data.data) {
                            this.$emit('confirm')
                            return ;
                        }
                        this.invalid = true;
                    })
            }
        }
    }
</script>
<style lang="scss" scoped>
.error-msg {
    display: block;
    color: brown;
    margin-bottom: 15px;
    font-weight: 600;
}

.main1{
    -webkit-box-shadow: 0 0 56px -10px #CCCCCC;
    box-shadow: 0 0 56px -10px #CCCCCC;
    width: 576px;
    padding: 44px 0;
    text-align: center;
    background: #fff;
    border-radius: 10px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 60px;
    h1{
        color: #666666;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        padding-top: 27px;
        padding-bottom: 15px;
        font-size: 1.3em;
        span{
            color: #1875f0;
        }
    }
    h3{
        color: #808080;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        padding-bottom: 33px;
        margin: 0;
        font-size: 0.9em;
    }
    a{
        padding: 19px 25px;
        font-size: 0.7em;
        color: #fff;
        background: #1de7b5;
        width: fit-content;
        font-family: 'Roboto', sans-serif;
        font-weight: 700;
        letter-spacing: 2px;
        border-radius: 30px;
        text-decoration: none;
        display: inline-block;
    }
    input{
        border: 2px solid #f5f5f5;
        padding: 15px 41px;
        border-radius: 50px;
        font-family: 'Roboto', sans-serif;
        color: #707070;
        font-weight: 500;
        font-size: 0.73em;
        margin-bottom: 20px;
        letter-spacing: 0.03em;
        display: block;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
    }

    input:focus{
        outline: none;
        border-color: #64b5f6;
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

@media(max-width:1112px){
    .container{
    .main{
        width: 88.045%;
    }
    
    }
}

@media (max-width: 1190px){
    .main{
        width: 90%;
        margin-left: auto;
        margin-right: auto;
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

@media(max-width:704px){
    .main1{
        width: 90%;
    }
}

@media(max-width:415px){
    .main1{
        width: 100%;
    }
}
</style>

