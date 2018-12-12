<template>
    <div>
        <div v-if=" ! modal" class="container">
            <div class="main">
                <div class="left">
                <div class="left-box">
                    <div class="left-header">

                        <img :src="'/img/page06-white.jpg'" v-if="status == GRAY && ! subject.absolute_url_gray" alt="gray color" />
                        <img :src="'/img/page06-blue.jpg'" v-if="status == BLUE && ! subject.absolute_url_blue" alt="blue color" />
                        <img :src="'/img/page06-yellow.jpg'" v-if="status == YELLOW && ! subject.absolute_url_yellow" alt="yellow color" />
        
                        <img :src="subject.absolute_url_gray" v-if="status == GRAY && subject.absolute_url_gray" alt="gray color" />
                        <img :src="subject.absolute_url_blue" v-if="status == BLUE && subject.absolute_url_blue" alt="blue color" />
                        <img :src="subject.absolute_url_yellow" v-if="status == YELLOW && subject.absolute_url_yellow" alt="yellow color" />
      
                        <h2>{{ subject.title }}</h2>
                        <router-link :to="'/dashboard'">SALIR</router-link>
                    </div>
                    <div class="left-main">          
                        <div class="box-item" 
                            v-if=" ! (hidden.indexOf(t.id) + 1)"
                            :class="getStatus(t.id, index)" 
                            v-for="(t, index) in subject.tree"
                            :key="index"
                        >
                            <div class="box-header">
                                <h4>DESAFIO</h4>
                                <h2>{{ t.title }} </h2>
                            </div>
                            <div class="box-main">
                                <p>{{ t.description }}</p>
                                <a href="javascript:;" v-if="['complete'].indexOf(getStatus(t.id, index)) + 1">COMPLETADO</a>
                                <a href="javascript:;" @click="goToTree(t.id)" v-if="['pending'].indexOf(getStatus(t.id, index)) + 1">PENDIENTE</a>
                                <a href="javascript:;" v-if="['disabled'].indexOf(getStatus(t.id, index)) + 1">BLOQUEADO</a>
                            </div>
                        </div>
                    </div>
                </div>

                </div>
                <div class="right-14">
                    <div class="right-item" v-if="subject.speed_challenge && subject.speed_challenge[0]">
                        <img src="/img/page14.jpg">
                        <h2>Desafío Velocidad</h2>
                        <h6>{{ subject.speed_challenge[0].title }}</h6>
                        <a href="javascript:;" :class="statusSpeed" @click="openSpeedChallenge(subject.speed_challenge[0])">{{ buttonSpeedText }}</a>
                    </div>

                    <div class="right-item" v-if="subject.mini && subject.mini[0]">
                        <img src="/img/page14.jpg" />
                        <h2 >{{ subject.mini[0].title }}</h2>
                        <a href="javascript:;" :class="statusMini" @click="openMiniTest(subject.mini[0])">{{ buttonMiniText }}</a>
                    </div>
                </div>
            </div>
        </div>
        <StartMiniTest v-if="modal == 'mini-test'" @goTest="goTest" />
        <start-speed-challenge v-if="modal == 'speed-challenge'" @startSpeedChallenge="startSpeedChallenge" />
    </div>
</template>
<script>
  import api from '../api';
  import StartMiniTest from '../components/StartMiniTest'
  import StartSpeedChallenge from '../components/StartSpeedChallenge'
  import SubjectItem from './SubjectItem'
  
  export default {
    components: {
        StartMiniTest,
        StartSpeedChallenge,
        SubjectItem,
    },
    data() {
      return {
        YELLOW: "yellow",
        BLUE: "blue",
        GRAY: "gray",
        status: 'blue',

        subject: {},
        results: [],
        incorrect: false,
        requirments: [],
        hidden: [],
        modal: "",
        test: false,
        speedChallenge: []
      }
    },
    created() {
        if (this.user) {
            let { slug } = this.$route.params;
            this.getSubject(slug);
            this.getResult();
        }
    },
    computed: {
        user() {
            return this.$store.getters.getUser
        },
        statusSpeed() {
            let tree_ids = this.subject.tree.map(t => t.id)
            let check = true
            for(var tree_id of tree_ids) {
                if( ! (['complete'].indexOf(this.getStatus(tree_id, 1)) + 1)) {
                    check = false
                }
            }

            let speed_id = this.subject.speed_challenge[0].id
            let results_ids = this.results.map(t => t.speed_challenge_id)
            let checkMini = results_ids.indexOf(speed_id) + 1

            if (check && ! checkMini) {
                return "pending"
            }

            if (check) {
                return "complete"
            }

            return ""
        },
        statusMini() {
            let mini_id = this.subject.mini[0].id
            let results_ids = this.results.map(t => t.mini_id)
            let check = results_ids.indexOf(mini_id) + 1
            let speed_id = this.subject.speed_challenge.length ? this.subject.speed_challenge[0].id : false
            let results = this.results.map(t => t.speed_challenge_id)
            let checkSpeed = results.indexOf(speed_id) + 1

            let tree_ids = this.subject.tree.map(t => t.id)
            let checkTrees = true
            for(var tree_id of tree_ids) {
                if( ! (['complete'].indexOf(this.getStatus(tree_id, 1)) + 1)) {
                    checkTrees = false
                }
            }

            if (check && checkSpeed || check && ! checkSpeed) {
                return "complete"
            }

            if (checkSpeed && ! check || ! speed_id && checkTrees) {
                return "pending"
            }
        },
        buttonSpeedText() {
            let tree_ids = this.subject.tree.map(t => t.id)
            let check = true
            for(var tree_id of tree_ids) {
                if( ! (['complete'].indexOf(this.getStatus(tree_id, 1)) + 1)) {
                    check = false
                }
            }

            let speed_id = this.subject.speed_challenge[0].id
            let results_ids = this.results.map(t => t.speed_challenge_id)
            let checkMini = results_ids.indexOf(speed_id) + 1

            if (check && ! checkMini) {
                return "PENDIENTE"
            }

            if (check) {
                return "COMPLETADO"
            }

            return "BLOQUEADO"
        },
        buttonMiniText() {
            let mini_id = this.subject.mini[0].id
            let results_ids = this.results.map(t => t.mini_id)
            let check = results_ids.indexOf(mini_id) + 1
            
            let speed_id = this.subject.speed_challenge.length ? this.subject.speed_challenge[0].id : false
            let results = this.results.map(t => t.speed_challenge_id)
            let checkSpeed = results.indexOf(speed_id) + 1

            let tree_ids = this.subject.tree.map(t => t.id)
            let checkTrees = true
            for(var tree_id of tree_ids) {
                if( ! (['complete'].indexOf(this.getStatus(tree_id, 1)) + 1)) {
                    checkTrees = false
                }
            }
            
            if (check && checkSpeed || check && ! checkSpeed) {
                return "COMPLETADO"
            }

            if (checkSpeed && ! check || ! speed_id && checkTrees) {
                return "PENDIENTE"
            }
                    
            return "BLOQUEADO"
        }
    },
    methods: {
        getRequirments(subject_id) {
            let $this = this
            api.getRequirments(subject_id)
            .then(data => {
                $this.hidden = data.data
            })
        },

        openMiniTest(mini) {
            let speed_id = this.subject.speed_challenge.length ? this.subject.speed_challenge[0].id : false
            let results_ids = this.results.map(t => t.speed_challenge_id)
            
            if (speed_id && (results_ids.indexOf(speed_id) + 1) || ! speed_id && results_ids) {
                this.test = mini
                this.modal = 'mini-test'
            }
        },

        goTest() {
            this.$router.push("/mini/" + this.test.slug)
        },

        openSpeedChallenge(speedChallenge) {
            let tree_ids = this.subject.tree.map(t => t.id)
            let check = true
            for(var tree_id of tree_ids) {
                if( ! (['complete'].indexOf(this.getStatus(tree_id, 0)) + 1)) {
                    check = false
                }
            }

            if (check) {
                let result = this.results.find((r) => r.tree_id == tree_id)
                this.modal = 'speed-challenge'
                this.speedChallenge = speedChallenge
            }
        },

        startSpeedChallenge() {
            this.$router.push("/speed-challenge/" + this.speedChallenge.id)
        },

        getSubject(slug) {
            let $this = this;
            api.getSubject(slug)
            .then((data) => {
                $this.subject = data;
                if ($this.subject.complete) {
                    $this.status = 'yellow'
                }
                $this.getRequirments($this.subject.id);
            });
        },

        getResult() {
            let $this = this;
            api.getResult(this.user.id)
                .then((data) => {
                    $this.results = data                
                });
        },

        goToTree(id) {
            this.getResult();
            this.$router.push('/tree/' + id);
        },

        getStatus(tree_id, index) {
            let result = this.results.find((r) => r.tree_id == tree_id)
            if ( ! result && ! index) {
                return 'pending'
            }
            return result ? result.status : 'disabled'
        }
    },
    watch: {
        user() {
            let { slug } = this.$route.params;
            this.getSubject(slug);
            this.getResult();
        }
    }
  }
</script>
<style lang="scss" scoped>
.container{
    width: 100%;
    background: #f4f1ea;
    padding: 65px 0 90px 0;
    .main{
        width: 88.045%;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    h1{
        flex: 0 0 100%;
        font-size: 1.5em;
        font-family: "Roboto";
        color: #535353;
        line-height: 2.273;
        text-align: left;
        margin: 0;
        font-weight: 500;
        letter-spacing: 0.04em;
        margin-bottom: 20px;
    }
}

.left{
    width: 65.56%;
}

.left-header{
    padding: 20px 25px;
    background: #faf8f5;
    display: flex;
    border-radius: 5px 5px 0 0;
    img{
        width: 70px;
        height: 70px;
    }

    h2{
        font-size: 22px;
        font-family: "Roboto";
        color: #666666;
        line-height: 2.273;
        text-align: left;
        margin: 0;
        font-weight: 500;
        letter-spacing: 0.03em;
        margin-right: auto;
        margin-left: 20px;
    }

    a{       
        height: 10px;
            font-family: "Roboto";
            color: rgb(255, 255, 255);
            text-align: center;
            padding: 15px 37px;
            background: #65b5f6;
            border-radius: 30px;
            text-decoration: none;
            font-size: 0.6em;
        font-weight: 700;
        letter-spacing: 0.1em;
    }
}

.left-main{
    background: #fff;
    padding: 5.51%;
    display: flex;
    border-radius: 0 0 13px 13px;
    width: 89.1%;
}

.box-item{
    padding: 0 15px;
    width: 30%;
    .box-header{
        background: #66bb6a;
        padding: 20px 26px;
        border-radius: 13px 13px 0 0;
    }
    h4, h2{
        margin: 0;
        padding: 0;
        color: #fff;
        font-family: "Roboto";
    }

    h4{
    font-size: 0.7em;
    font-weight: 500;
    letter-spacing: 0.07em;
    margin-bottom: 7px;
    }
    h2{
        font-weight: 400;
        font-size: 1.35em;
    }
    .box-main{
        padding: 29px 26px 26px 23px;
        background: #faf8f5;
        border-radius: 0 0 7px 7px;
        line-height: 18px;
        
        p{
         font-family: "Roboto";
        color: #9f9f9f;
        font-weight: 500;
        font-size: 0.8em;
        margin: 0;  
        line-height: 19px;

        }
        a{
            font-family: "Roboto";
            color: rgb(255, 255, 255);
            text-align: center;
            padding: 12px 22px;
            background: #66bb6a;
            border-radius: 30px;
            text-decoration: none;
            font-size: 0.65em;
            font-weight: 700;
            letter-spacing: 0.1em;
            display: inline-block;
            margin-top: 20px;
            margin-left: auto;
            margin-right: auto;
        }
    }
}

.right-14{
    flex-grow: 1;
    padding-left: 30px;
    .right-item{
        background: #f7f7f7;
        border-radius: 10px;
        text-align: center;
        padding: 28px 0 40px 0;
        margin-bottom: 30px;
        
        a.complete {
            background-color: #66bb6a;
            color: #fff;
        }

        a.pending {
            background-color: #65b5f6;
            color: #fff;
        }

        h2{
            color: #707070;
            font-family: 'Roboto';
            margin: 0;
            font-weight: 400;
            margin-top: 20px;
            margin-bottom: 8px;
            font-size: 1.2em;
        }

        h6{
            color: #b2b2b2;
            font-family: 'Roboto';
            margin: 0;
            font-weight: 500;
            font-size: 0.8em;
        }
        a{
            font-family: "Roboto";
            color: #999999;
            text-align: center;
            padding: 14px 26px;
            background: #e6e6e6;
            border-radius: 30px;
            text-decoration: none;
            font-size: 0.7em;
            font-weight: 700;
            letter-spacing: 0.1em;
            display: inline-block;
            margin-top: 30px;
        }
    }
}

.pending {
    .box-header{
        background: #65b5f6;
    }
    .box-main{
        a{
            background: #65b5f6
        }
    }

}

.disabled{
    .box-main{
        a{
            color: #999999;
        }
    }
    .box-header{
        background: #e6e6e6;
        h2, h4{
            color: #999;
        }
    }
    .box-main{
        a{
            background: #e6e6e6;
        }
    }

}


@media(max-width:1080px){
    .right-14{
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
        padding-left: 0;
        .right-item{
            width: 45%;
        }
    }

    .left{
        width: 100%;

    }
}

@media(max-width: 706px){
    .left{
        .left-main{
            flex-wrap: wrap;
            .box-item{
                width: 100%;
                margin-bottom: 30px;
            }
        }
    }
    .left-header{
        flex-wrap: wrap;
        a{
            margin-top: 15px;
        }
    }
}

@media(max-width:589px){
    .right-14{
        flex-wrap: wrap;
        .right-item{
            width: 100%;
        }
    }
}

@media(max-width:450px){
    .container{
        padding: 35px 0 35px 0;
    
    .main{
        h1{
            text-align: center;
        }
        .left-header{
            justify-content: center;
            flex-direction: column;
            align-items: center;
            h2{
                margin: 0;
            }
        }
    }
}
}
</style>

