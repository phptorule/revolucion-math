<template>
   <div class="container">
    <div class="main">
      <h1>Elige tu Plan</h1>
      <div class="steps">
        <div class="step-item item-active">
            <span class="blue">1</span>
            <p>STEP 1</p> 
        </div>
        <div class="step-item item-active">
            <span class="no-line">2</span>
            <p>STEP 2</p>
        </div>
      </div>
      
      <div class="input-form">
          <form class="login-form">
            <div class="box">
                <input type="radio" v-model="payment" name="gender" value="flow"><label><span></span></label><span class="ratio-web">Flow</span><br>
            </div>
        </form>
      </div>

      <div class="form-bottom">
        <a href="javascript:;" @click="finish()" class="link-button">CONTINUAR</a>
      </div>

    </div>
  </div>

</template>
<script>
    export default {
        props: ['flow'],
        data() {
            return {
                payment: 'flow'
            }
        },
        methods: {
            finish() {
                window.location.href = this.flow
                // this.$router.push({name:'success', params: {'message': 'Ya eres parte de la revolución matemática.', 'link': true}})
            }
        }
    }
</script>
<style lang="scss" scoped>
    .container{
    width: 100%;
    background: #fafafa;
    text-align: center;
    padding: 70px 0;
    min-height: calc(100vh - 356px);
}

.main{
    width: 1112px;
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
            span:after{
                content: "";
                border-bottom: 1px solid #ededed;
                width: 121px;
                position: absolute;
                top: 9px;
                left: 88px;
            }
            .blue:after{
                border-bottom: 1px solid #279cf3;
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

.form-bottom {
    margin-top: 60px;
    margin-left: auto;
    margin-right: auto;
}

.input-form{
    width: 350px;
    background: #fff;
    border-radius: 5px;
    -webkit-box-shadow: 0 0 56px -10px #CCCCCC;
    box-shadow: 0 0 56px -10px #CCCCCC;
    margin-top: 60px;
    margin-left: auto;
    margin-right: auto;

    .box{
        text-align: left;
        padding: 29px 30px 28px 30px;
        display: flex;
        align-items: center;
        border-bottom: 2px solid #f4f4f4;

        .ratio-web{        
            font-size: 18px;
            font-family: "Roboto";
            color: rgb(102, 102, 102);
        }
        .ratio-web:before{
           content: "";
           background: url('/img/web-icon.jpg') no-repeat;
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
    input[type=radio   ]:not(old){
        width   : 20px;
        height  : 20px;
        margin  : 0;
        margin-right: -20px;
        padding : 0;
        opacity : 0;
      }
      input[type=radio   ]:not(old) + label{
        display      : inline-block;
        background: #fff;
        border: 2px solid #f1f1f1;
        border-radius: 50%;
        line-height  : 24px;
        width: 16px;
        height: 16px;
      }

      input[type=radio]:not(old):checked + label{
        border: 2px solid #279cf3;
        background: #fff;
      }

      input[type=radio]:not(old):checked + label > span{
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


h1{
    margin: 0;
}

.no-border {
    border: none;
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

@media(max-width:448px){
    .input-form{
        width: 100%;
    }
}


@media(max-width:390px){
    .step-item {
        span {
            margin: 0 30px !important; 
        }
        span:after {
            width: 61px !important;
            left: 62px !important;
        }
    }
}
</style>
