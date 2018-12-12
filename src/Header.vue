<template>
          <header>
            <div class="container">
                <router-link :to="'/'">
                    <img src="/img/logo.png" class="logo" />
                </router-link>
                <div class="for-toggle">
                    <div class="navigation">
                        <a v-for="(a, index) in areas" :key="index" :href="'/area/' + a.slug">{{ a.title }}</a>
                    </div>
                </div>
                <div class="sec-toggle">
                    <div class="right-navigation">
                        <img src="/img/profile.jpg" />
                        <div class="dropdown">
                        <span @click="showRightMenu ^= 1">{{ user.name }}</span>
                        <div class="dropdown-menu" v-if="showRightMenu">
                            <a href="/profile"  class="border">Mi Perfil</a>
                            <a href="javascript:;" @click="logout()">Cerrar Sesion</a>
                        </div>
                        </div>
                    </div>
                </div>
                <i class="fa fa-bars open-menu" aria-hidden="true"></i>
                <i class="fa fa-bars open-menu2" aria-hidden="true"></i>
            </div>
        </header>
</template>
<script>
    import api from './api';

    export default {
        data() {
            return {
                areas: [],
                showRightMenu: false
            }
        },
        created() {
            this.getAllAreas();
        },
        methods: {
            goToHome() {
                this.$router.push({name: 'home'})
            },
            getAllAreas() {
                let $this = this;
                api.getAllAreas()
                    .then((data) => {
                        $this.areas = data;
                    });
            },
            logout() {
                this.$cookies.remove("token");
                this.$router.push({name:'login'});
            }
        },
        computed: {
            user() {
                return this.$store.getters.getUser
            }
        }
    }
</script>
<style lang="scss" scoped>
    header {
        width: 100%;
        padding: 25px 0;
        background: #fff;
        -webkit-box-shadow: 0 -16px 37px 6px #B8B8B8;
        box-shadow: 0 -16px 37px 6px #B8B8B8;
        position: relative;
        .container{
            width: 1112px;
            margin-right: auto;
            margin-left: auto;
            display: flex;
            align-items: center;
            .logo{
                padding-right: 100px;
            }
            a{
                color: #b3b3b3;
                text-decoration: none;
                font-family: 'Roboto', sans-serif;
                font-weight: 500;
                margin-right: 40px;
                font-size: 0.85em;
                letter-spacing: 0.03em;
            }
            a:hover{
                color: #999999;
            }
            .navigation{
                margin-right: auto;
                display: flex;
            }
            .right-navigation{
                display: flex;
                align-items: center;
                a{
                    margin-right: 25px;
                    color: #e6e6e6;
                    font-size: 1.25em;
                }
                img{
                    margin-right: 40px;
                }
                span{
                    color: #808080;
                    font-family: 'Roboto', sans-serif;
                    font-weight: 500;
                    font-size: 0.85em;
                    cursor: pointer;
                }
                span:after{
                    content: '\f078';
                font-family: FontAwesome;
                font-size: 0.7em;
                margin-left: 5px;
                margin-right: auto;
                }
                .dropdown{
                    position: relative;
                }
                .dropdown-menu{
                    background: #fff;
                    border-radius: 10px;
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    width: 256px;
                    top: 69px;
                    z-index: 2;
                    left: -105px;
                    a{
                        color: #858585;
                        font-size: 0.8em;
                        text-align: center;
                        margin: 0;
                        padding: 20px 0;
                    }
                    .border{
                        border-bottom: 2px solid #f5f4f4;
                    }
                }
                .dropdown-menu:before {
                    position: absolute;
                    z-index: -1;
                    content: '';
                    right: calc(50% - 10px);
                    top: -9px;
                    right: 18px;
                    border-style: solid;
                    border-width: 0 10px 10px 10px;
                    border-color: transparent transparent #fff transparent;
                    transition-duration: 0.3s;
                    transition-property: transform;
                    
                }
                .dot{
                    position: relative;
                    
                }
                .dot:after{
                    content: "";
                    width: 6px;
                    height: 6px;
                    background: #1875f0;
                    display: block;
                    border-radius: 50%;
                    position: absolute;
                    top: -6px;
                    right: -3px;
                }
            }
        }
    }

    .dropdown{
        position: relative;
    }
    .dropdown-menu{
        background: #fff;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        position: absolute;
        width: 256px;
        top: 56px;
        z-index: 2;
        left: -172px;
        a{
            color: #858585;
            font-size: 0.8em;
            text-align: center;
            margin: 0;
            padding: 20px 0;
        }
        .border{
            border-bottom: 2px solid #f5f4f4;
        }
    }
    .dropdown-menu:before {
        position: absolute;
        z-index: -1;
        content: '';
        right: calc(50% - 10px);
        top: -9px;
        right: 18px;
        border-style: solid;
        border-width: 0 10px 10px 10px;
        border-color: transparent transparent #fff transparent;
        transition-duration: 0.3s;
        transition-property: transform;
        
    }

    .open-menu, .open-menu2{
        display: none;
    }

    .for-toggle{
        margin-right: auto;
    }


    @media(max-width:1112px){
        .container{
        
            width: 88.045% !important;
        
        }
    }



    @media (max-width: 1050px){
        .logo{
            padding-right: 50px !important;
        }
    }

    @media (max-width: 997px){
        .container{
            a{
                margin-right: 25px !important;
            }
            .right-navigation{
                
                img{
                    margin-right: 20px !important;
                }
            }
        }
    }

    @media (max-width: 900px){
        header{
            .container{
                .for-toggle{
                    display: none;
                }
                .navigation{
                    flex-direction: column;
                    background: #fff;
                    position: absolute;
                    top: 87px;
                    right: 0;
                    width: 100%;
                    z-index: 2;
                    align-items: center;
                    a{
                        margin-bottom: 15px;
                    }
                }
                .right-navigation{
                    width: 100%;
                    justify-content: center;
                }
                i{
                    margin-left: auto;
                    color: #808080;
                    font-size: 1.3em;
                }

            }
            .sec-toggle{
                width: 100%;
            }
        }
        .open-menu{
            display: block;
        }
    }

    @media (max-width: 520px){
        header{
            .container{
                .logo{
                    padding: 0 !important;
                }
                .navigation{
                    top: 88px;
                    align-items: left;
                    a{
                        padding: 20px 0 20px 55px;
                        width: calc(100% - 55px);
                        color: #414141;
                        border-bottom: 2px solid #f5f5f5;
                        margin: 0;
                    }
                }
                
                .right-navigation{
                    right: 0;
                    width: 100%;
                    background: #fff;
                    z-index: 2;
                    img{
                        padding: 0;
                    }
                    span, .clock, .dot{
                        display: none;
                    }
                    .dropdown-menu{
                        top: 56px;
                        left: -173px;
                    }
                    .dropdown-menu:before{
                        right: 111px;
                    }
                }
            }
        }
        .open-menu{
            display: none;
        }
        .open-menu2{
            display: block;
        }
    }

    @media(min-width:900px){
        .for-toggle{
            display: block !important;
        }
    }

    @media (min-width: 520px){
        .sec-toggle{
            display: block !important;
        }
    }
</style>