<template>
	<div class="container">
        <div class="main">
    	    <div class="left">
                <h1>Resumen Informativo</h1>
                <div class="box-center">
                    <div class="r-main">
                        <select v-validate="'required'" v-model="klass" class="select" name="klass">
                            <option :value="''">Seleccione su escuela</option>
                            <option :value="klass.id" v-for="(klass, index) in classes" :key="index">{{ klass.name }}</option>
                        </select>
                        <button type="button" class="blue button" :disabled="klass == ''" @click="goToSession">START</button>
                    </div>
                </div>
                <div class="top">
                    <div class="box-left">
                        <div class="gray"></div>
                    </div>
                    <div class="box-right">
                        <div class="header">
                            <h2>Area mas debil</h2>
                            <h4>VER DETALLES</h4>
                        </div>
                        <div class="box-main">
                            <h3>Logaritmos</h3>
                            <div class="progress">
                                <div class="progess-precent"></div>
                            </div>
                            <p>20% rendimiento</p>
                        </div>
                    </div>
                </div>

                <div class="bottom">
                    <div class="b-left">
                        <div class="gray"></div>
                        <div class="text">
                            <h4>NIVEL DE USO DE LA PLATFORMA</h4>
                            <h1>Bajo</h1>
                        </div>
                    </div>
                    <div class="b-right">
                        <h4>ULTIMO MATERIAL ENTREGADO</h4>
                        <h2>Ecuaciones cuadraticas</h2>
                        <a href="#" class="blue">CREAR MATERIAL</a>
                        <a href="#" class="white">RESULTADOS</a>
                    </div>
                </div>
    	    </div>
            <side-bar></side-bar>
        </div>
	</div>
</template>

<script>
    import api from '../api'
	import SideBar from '../components/SideBar'

    export default {
        components: {
            SideBar
        },
        data() {
            return {
                classes: [],
                klass: '',
            }
        },
        mounted() {
            if (this.user.id) {
                this.getClasses()
            }
        },
        methods: {
            getClasses() {
                console.log(this.user.id)
                api.getTeacherClasses(this.user.id)
                .then(res => {
                    if (res) {
                        this.classes = res
                    }
                })
            },
            goToSession() {
                this.$router.push(`/teacher/session/${this.klass}`)
            }
        },
        watch: {
            user() {
                this.getClasses()
            }
        },
        computed: {
            user() {
                return this.$store.getters.getUser
            }
        }
    }
</script>

<style scoped lang="scss">
	h1, h2, h3, h4, h5, p{
    margin: 0;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
}

.container{
    background: #f4f1ea;
    min-height: calc(100vh - 216px);
    .main{
        margin-left: 6.641%;
        display: flex;
        min-height: calc(100vh - 216px);
    }
}

.left{
    padding-top: 70px;
    padding-right: 31px;
    width: 61.826%;
    h1{
        color: #535353;
        font-size: 1.5em;
        margin-bottom: 46px;
    }
    .box-center{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
    }
    .select{
        padding: 15px;
        border-radius: 50px;
        font-family: 'Roboto', sans-serif;
        color: #adadad;
        font-weight: 500;
        margin-right: 20px;
        font-size: 0.7em;
        letter-spacing: 0.05em;
    }
    .select:focus{
        outline: none;
        border-color: #64b5f6;
    }
    .button{
        text-decoration: none;
        font-family: 'Roboto', sans-serif;
        font-weight: 700;
        border-radius: 40px;
        padding: 12px 20px;
        letter-spacing: 0.05em;
        display: inline-block;
        background: #64b5f6;
        color: #fff;
        font-size: 18px;
        border: 1px solid #64b5f6;
        cursor: pointer;
    }
    .button:disabled{
        opacity: 0.5;
        cursor: not-allowed;
    }
    .button:focus{
        outline: none;
        border-color: #64b5f6;
    }
    .top{
        display: flex;
        background: #fff;
        border-radius: 7px;
        margin-bottom: 28px;
        .gray{
        width: 160px;
        height: 180px;
        background: #e1e1e1;
        border-radius: 7px 0 0 7px;
        }
        .box-right{
            width: 100%;
        }
        .header{
            display: flex;
            padding: 21px 30px 17px 30px;
            border-bottom: 2px solid #faf8f5;
            h2{
                color: #666666;
                font-size: 1.2em;
                margin-right: auto;
            }
            h4{
                color: #999999;
                font-size: 0.65em;
                font-weight: 700;
            }
            h4:after{
                content: "\f061";
                font-family: FontAwesome;
                margin-left: 8px;
                font-size: 0.8em;
            }
        }
        .box-main{
            padding: 24px 30px 0 30px;
            h3{
                color: #666666;
                font-size: 1.05em;
                margin-bottom: 14px;
            }
            p{
                color: #999999;
                font-size: 0.8em;
                font-style: italic;
            }

            .progress{
                width: 100%;
                height: 6px;
                background: #f0f0f0;
                position: relative;
                border-radius: 10px;
                margin-bottom: 10px;
                .progess-precent{
                    height: 6px;
                    width: 20%;
                    position: absolute;
                    top: 0;
                    background: #35ad45;
                    border-radius: 10px;
                }
            }
        }
    }

    .bottom{
        display: flex;
        justify-content: space-between;
        border-radius: 7px;
        .gray{
            width: 115px;
            height: 150px;
            background: #e1e1e1;
            border-radius: 7px 0 0 7px;
        }
        
        .b-left{
            display: flex;
            background: #fff;
            align-items: center;
            border-radius: 7px;
            margin-right: 15px;
            height: 150px;
            .text{
                padding: 0 25px;
            }
            h1{
                margin: 0;
                color: #666666;
                font-size: 2.4em;
            }
            h4{
                color: #adadad;
                font-size: 0.7em;
                font-weight: 700;
                letter-spacing: 0.03em;
            }
        }

        .b-right{
            padding: 20px 30px 19px 30px;
            background: #fff;
            border-radius: 7px;
            margin-left: 15px;
            h4{
                color: #999999;
                font-weight: 700;
                font-size: 0.7em;
                letter-spacing: 0.04em;
            }
            h2{
                color: #666666;
                font-size: 1.4em;
                margin: 6px 0 23px 0;
            }
            a{
                text-decoration: none;
                font-family: 'Roboto', sans-serif;
                font-weight: 700;
                border-radius: 40px;
                padding: 12px 20px;
                letter-spacing: 0.05em;
                font-size: 0.65em;
                
    display: inline-block;
            }
            .blue{
                background: #64b5f6;
                color: #fff;
                
            }
            .white{
                background: #faf8f5;
                border: 2px solid #eeebe5;
                color: #adadad;
            }
        }
    }
}

@media(max-width:1100px){
    app-sidebar{
        display: none;
    }
    .left{
        width: 100%;
    }
}

@media(max-width:792px){
    .bottom{
        flex-wrap: wrap;
        .b-left, .b-right{
            width: 100%;
            margin: 10px 0 !important;
        }
    }
}

@media(max-width:560px){
.left{
    .top{
        flex-direction: column;
        .gray{
            width: 100%;
            border-radius: 7px 7px 0 0;
        }
        .box-right{
            padding-bottom: 10px;
        }
    }
}
}

@media(max-width: 450px){
    .container{
        .main{
            h1{
                text-align: center;
            }
            .left{
                .bottom{
                    .b-left{
                        flex-direction: column;
                        height: unset;
                    }
                    .gray{
                        width: 100%;
                        border-radius: 10px 10px 0 0;
                        height: 95px;
                    }
                    .text{
                        text-align: center;
                        padding-top: 20px;
                        padding-bottom: 20px;
                    }
                    .b-right{
                        text-align: center;
                        margin-bottom: 35px !important;
                        a{
                            padding: 18px 30px;

                        }
                    }
                }
            }
        }
    }
}

@media(max-width:384px){
    .blue{
        margin-bottom: 10px;
    }
    .white{
        padding: 12px 29px !important;
    }

}
</style>