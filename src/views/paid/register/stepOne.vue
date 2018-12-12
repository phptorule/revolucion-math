<template>
    <div>
        <transition-group name="slide-left" mode="out-in">
            <div :key="1" v-show="step == 1" class="container">
                <div class="main">
                    <h1>Elige tu Plan</h1>
                    <div class="steps">
                    <div class="step-item item-active">
                        <span>1</span>
                        <p>STEP 1</p>
                    </div>
                    <div class="step-item">
                        <span>2</span>
                        <p>STEP 2</p>
                    </div>
                    </div>

                    <div class="plans">
                    <div class="plan-item">
                        <div class="plan-head">
                        <h2>Plan explorador</h2>
                        <h1>$4000<span>/mes</span></h1>
                        </div>
                        <div class="plan-body">
                        <p class="check">Acceso completo al método Revolución PSU</p>
                        <p class="uncheck">Acceso completo a nuestras clases online en vivo</p>
                        <p class="uncheck">Profesores atentos a responder tus dudas</p>
                        <p class="uncheck">Seguimiento personalizado  de tu rendimiento</p>
                        <a href="javascript:;" @click="next()">OBTENER</a>
                        </div>
                    </div>

                    <div class="plan-item plan-green">
                        <div class="plan-head">
                            <h2>Plan explorador</h2>
                            <h1>$4000<span>/mes</span></h1>
                        </div>
                        <div class="plan-body">
                            <p class="check">Acceso completo al método Revolución PSU</p>
                            <p class="check">Acceso completo a nuestras clases online en vivo</p>
                            <p class="check">Profesores atentos a responder tus dudas</p>
                            <p class="check">Seguimiento personalizado  de tu rendimiento</p>
                            <a href="javascript:;" @click="next()">OBTENER</a>
                        </div>
                        </div>
                    </div>
                </div>
            </div>  
            <stepTwo :key="2" @next="next($event)" v-show="step == 2" />
            <stepThree :key="3" :flow="flow" v-if="step == 3" />
        </transition-group>
    </div>
</template>
<script>
    import stepTwo from '@/views/paid/register/stepTwo';
    import stepThree from '@/views/paid/register/stepThree';

    export default {
        data() {
            return {
                step: 2,
                flow: "",
                form: {}
            }
        },
        components: {
            stepTwo,
            stepThree
        },
        methods: {
            next(data) {
                this.flow = data || {}
                this.step ++
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
            span:after{
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

.plans{
    background: #fff;
    border-radius: 5px;
    width: 100%;
    display: flex;
    background: #fafafa;
    justify-content: center;
    margin-top: 80px;
    .plan-item{
    
        width: 41%;
        -webkit-box-shadow: 0 0 56px -10px #CCCCCC;
        box-shadow: 0 0 56px -10px #CCCCCC;
    }

    .plan-head{
        background: #64b5f6;
        border-radius: 5px 5px 0 0;
        border-bottom: 1px solid #f0f0f0;
        h1, h2{
            color: #fff;
            font-family: 'Roboto', sans-serif;
            font-weight: 700;
        }
        h2{
            padding-top: 35px;
            margin-top: 0;
            letter-spacing: 2px;
            text-transform: uppercase;
            font-weight: 500;
            font-size: 1.2em;
        }
        h1{
            font-size: 2.4em;
            padding-bottom: 35px;
            position: relative;
            span{
                font-weight: 500;
                font-size: 0.4em;
                position: absolute;
                top: 9px;       
            }
        }
    }

    .plan-body{
        background: #fff;
        text-align: left;
        border-radius: 0 0 5px 5px;
        padding-bottom: 35px;
        display: flex;
        flex-direction: column;
        p{
            border-bottom: 1px solid #f0f0f0;
            padding: 17px 0;
            margin: 0;
            color: #808080;
            font-family: 'Roboto', sans-serif;
            font-weight: 500;
            font-size: 0.75em;
            padding-left: 30px;
            letter-spacing: 0.03em;
        }
        a{
            padding: 15px 30px;
        color: #fff;
        background: #64b5f6;
        width: fit-content;
        align-self: flex-start;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        letter-spacing: 2px;
        border-radius: 30px;
        text-decoration: none;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        margin-top: 30px;
        font-size: 0.8em;
        }
    }

    .plan-green{
        margin-left: 35px;
        .plan-head{
            background: #66bb6a;
        }
        .plan-body{
            a{
                background: #66bb6a;
            }
        }
    }
}


h1{
    margin: 0;
}

.check:before{
    content: '\f00c';
    font-family: FontAwesome;
    color: #fff;
    background: #30ae91;
    padding: 5px;
    font-size: 8pt;
    border-radius: 50%;
    margin-right: 15px;
}

.uncheck:before{
    content: '\f00d';
    font-family: FontAwesome;
    color: #fff;
    background: #ef5350;
    padding: 5px 6px;
    font-size: 8pt;
    border-radius: 50%;
    margin-right: 15px;
}

@media (max-width: 1190px){
    .main{
        width: 90%;
        margin-left: auto;
        margin-right: auto;
    }
}

@media(max-width:1000px){
    .plans{
        .plan-item{
            width: 48%;
        }
    }
}

@media(max-width:848px){
    .plans{
        flex-wrap: wrap;
        .plan-item{
            width: 100%;
        }
        .plan-green{
            margin: 30px 0;
        }
        .plan-body{
            p{
                padding-left: 45px;
                position: relative;
            }
            p:before{
                position: absolute;
                left: 13px;
            }
        }
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

