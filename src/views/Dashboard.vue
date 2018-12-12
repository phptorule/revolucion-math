<template>
    <div>
        <div v-if=" ! showModalStartArea" class="container">
            <div class="main">
                <div class="main-left">
                    <h1>{{ area.title }}</h1>
                    <div v-for="(group, index) in area.subjects" v-if="group.length" :key="index" class="item-areas flex-100">
                        
                        <div v-for="(s, i) in group" :key="i" class="box" :class='"flex-" + s.level' >
                            <div  @click="goToSubject(s.slug)">
                                <SubjectItem :star="true" @setStatus="setStatus(s.id, $event)" :results="results" :subject="s" :group="area.subjects[index - 1] ? area.subjects[index - 1] : false" />
                            </div>

                            <p @click="goToSubject(s.slug)">{{ s.title }}</p>
                        </div>

                        <div class="link flex-100" v-if="checkExistAreaTest(index)" @click="() => { startAreaTest(index) }">
                            <a href="javascript:void(0);" :class="avalibleAreaTest(group, index)">{{ checkExistAreaTest(index).title }}</a>
                        </div>
                    </div>
                </div>

                <div class="main-right">
                    <h1>Próximas lases</h1>

                    <div class="box-item" v-if="lastCompleteSubject">
                        <div class="box-header">
                            <img src="/img/page06-yellow.jpg" v-if=" ! lastCompleteSubject.absolute_url_yellow" alt="" />
                            <img  width="70" :src="lastCompleteSubject.absolute_url_yellow" v-else alt="yellow color" />
                            <h3>{{ lastCompleteSubject.title }}</h3>
                        </div>
                        <div class="box-main">
                            {{ lastCompleteSubject.description }}
                        </div>
                    </div>

                    <div v-else class="box-item">
                        <div class="box-header">
                            <div class="circle"></div>
                            <h3></h3>
                        </div>
                        <div class="box-main"></div>
                    </div>
                    <div class="right-middle">
                    <h2>Ranking del colegio Sebastiane English School</h2>
                    <div class="table-top">
                        <p>Student name</p>
                        <p>Area Score</p>
                    </div>
                    <div
                        class="table-item"
                        v-for="(r, index) in ranking"
                        :key="`randing ${index}`"
                        :class="{'active': r.id == user.id}"
                    >
                        <p>{{ index + 1 }}</p>
                        <img src="/img/profile.jpg" alt="" />
                        <div class="name">
                        <p>{{ r.name }}</p>
                        </div>
                        <p>{{ r.ranking.area_score.toFixed(1) }} pts</p>
                    </div>

                    <div class="table-bottom">
                        <button>National ranking</button>
                    </div>
                    </div>

                    <div class="right-bottom">
                    <h3>Privacidad</h3>
                    <p>Vestibulum quis orci urna. Integer pellentesque 
                        risus eu arcu tempus eleifend.</p>
                        <label class="switch">
                        <input type="checkbox">
                        <span class="slider"></span>
                        </label>
                    </div>


                </div>
            </div>
        </div>  
        <StartAreaTest v-else :line="line" @goTest="goTest" />
    </div>
</template>
<script>    
    import api from '../api'
    import toastr from 'toastr'
    import SubjectItem from './SubjectItem'
    import StartAreaTest from '../components/StartAreaTest'

    export default {
        data() {
            return {
                area: {},
                results: [],
                tests: [],
                showModalStartArea: false,
                line: 0,
                lastCompleteSubject: false,
                ranking: []
            }
        },
        components: {
            SubjectItem,
            StartAreaTest
        },
        created() {
            let { slug } = this.$route.params;
            this.getArea(slug)
            if (this.user) {
                this.getResult()
            }
            this.getAreaTests()
            this.getLastCompleteSubject()
        },
        methods: {
            getRanking() {
                let $this = this
                api.getRankingByArea(this.area.id)
                    .then((data) => {
                        $this.ranking = data.data                         
                        $this.ranking = Object.values(data.data).sort((a, b) => {
                            return b.ranking.area_score - a.ranking.area_score
                        }).slice(0, 5)
                    })
            },
            getLastCompleteSubject() {
                let $this = this
                api.getLastCompleteSubject()
                    .then((data) => {
                        if(data.data) {
                            $this.lastCompleteSubject = data.data
                        }
                    })
            },
            getAreaTests() {
                let $this = this
                api.getAreaTests()
                    .then((data) => {
                        $this.tests = data
                    })
            },
            checkExistAreaTest(line) {
                return this.tests.find(t => t.after_subject_line == line && t.area_id == this.area.id)
            },
            startAreaTest(line) {
                this.line = line
                this.showModalStartArea = true
            },
            goTest() {
                let test = this.tests.find(t => t.after_subject_line == this.line && t.area_id == this.area.id)
                this.$router.push('/area-test/' + test.slug)
            },
            setStatus(subject_id, status) {
                let subject = this.area.subject.filter(s => s.id == subject_id).pop()
                subject.status = status
            },
            getResult() {
                let $this = this;
                api.getResult(this.user.id)
                    .then((data) => {
                        $this.results = data
                    });
            },
            getArea(slug) {
                let $this = this;
                api.getArea(slug)
                    .then((data) => {
                        $this.area = data;
                        $this.getRanking();
                    });
            },
            goToSubject(slug) {
                let subject = this.area.subject.find((s) => s.slug == slug);
                
                if (['blue', 'yellow'].indexOf(subject.status) + 1 && ! subject.parent) {
                    this.$router.push('/subject/' + slug)
                    return ;
                }

                if (subject.parent) {
                    if (subject.parent.complete) {
                        this.$router.push('/subject/' + slug)
                        return ;
                    }
                    
                    // toastr.warning('Before you continue, you need to complete “' + subject.parent.title + '” in Area: ' + subject.parent.area.title);    
                    return ;
                }
            },
            checkAvalibleGroup(group) {
                if (group) {
                    return group.every((s) => s.complete)
                }
                return true
            },
            avalibleAreaTest(group, index) {
                let check = group.filter(e => e.complete).length == group.length ? true : false
                if ( ! check) {
                    return 'a-white'
                }
                
                let checkComplete = this.results.filter(r => r.area_test_id == this.checkExistAreaTest(index).id).length

                if (checkComplete) {
                    return 'a-green'
                }

                return 'a-blue'
            }
        },
        computed: {
            user() {
                return this.$store.getters.getUser
            }
        },
        watch: {
            user() {
                this.getResult()
            }
        }
    }
</script>
<style scoped lang="scss">
.flex-100 {
    flex-basis: 100%;
}

.flex-50 {
    flex-basis: 50%;
}

.flex-33 {
    flex-basis: 33%;
}

.item-areas {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.box:hover {
    cursor: pointer;
}

.container {
    width: 100%;
    background: #f4f1ea;
    padding: 40px 0 80px 0;
    .main{
        width: 1112px;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        justify-content: space-between;
    }
}

.blue{
    background: #d2effe;
    font-family: "Roboto", sans-serif;
    margin: 0;
    color: #2675b5;
    font-weight: 500;
    padding: 20px 0;
    border-radius: 10px;
    position: relative;
    margin-bottom: 23px;
    flex: 0 0 100%;
}

.blue:before{
    content: '\f02d';
    font-family: FontAwesome;
    margin-right: 10px;
    margin-left: 28px;
}

.span-blue:after, .span-red:after{
    content: '\f00d';
    font-family: FontAwesome;
    position: absolute;
    top: -15px;
    right: -10px;
    background: #ffffff;
    color: #a8a8a8;
    border: 4px solid #f4f1ea;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    cursor: pointer;
}

.red{
    background: #ffccbc;
    font-family: "Roboto", sans-serif;
    margin: 0;
    color: #e64a19;
    font-weight: 500;
    padding: 20px 0;
    border-radius: 10px;
    position: relative;
    flex: 0 0 100%;
}

.red:before{
    content: '\f07c';
    font-family: FontAwesome;
    margin-right: 10px;
    margin-left: 28px;
}

.main-left{
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border-radius: 10px;
    width: 34.5%;
    margin-top: 30px;
    justify-content: space-around;
    padding: 0 158px;
    -webkit-box-shadow: 0 0 40px -2px #D9D9D9;
    box-shadow: 0 0 40px -2px #D9D9D9;
    h1{
        color: #535353;
        font-family: "Roboto", sans-serif;
        margin: 0;
        flex: 0 0 100%;
        text-align: center;
        font-weight: 500;
        font-size: 1.5em;
        margin: 40px 0 30px 0;
    }
    a{
        text-decoration: none;
        font-family: "Roboto", sans-serif;
        margin: 0;
        color: #fff;
        padding: 12px 20px;
        display: inline-block;
        font-weight: 500;
        font-size: .65em;
        letter-spacing: 0.09em;
        text-transform: uppercase;
        border-radius: 30px;
        margin-bottom: 50px;
    }
    .a-yellow{
        background: #f5c067; /* Old browsers */
background: -moz-linear-gradient(top, #f5c067 0%, #f4a93c 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(top, #f5c067 0%,#f4a93c 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to bottom, #f5c067 0%,#f4a93c 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f5c067', endColorstr='#f4a93c',GradientType=0 );
    }
    .a-blue{
        background: #65b5f6;
    }
    .a-green{
        background: #41AD48;
    }
    .a-white{
        border: 2px solid #F9F9F9;
        color: #C2C2C3;
        background: #fdfefe; /* Old browsers */
background: -moz-linear-gradient(top, #fdfefe 0%, #f3f4f8 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(top, #fdfefe 0%,#f3f4f8 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to bottom, #fdfefe 0%,#f3f4f8 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fdfefe', endColorstr='#f3f4f8',GradientType=0 );
    }
    .a-pink{
        padding: 17px 27px;
        font-size: 0.75em;
        background: #d14bf2; /* Old browsers */
background: -moz-linear-gradient(top, #d14bf2 0%, #8345f0 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(top, #d14bf2 0%,#8345f0 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to bottom, #d14bf2 0%,#8345f0 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d14bf2', endColorstr='#8345f0',GradientType=0 );
    }


    .box{
        margin-bottom: 45px;
        text-align: center;
        i{
            font-size: 0.7em;
            margin: 5px 0;
        }
        .big{
            font-size: 1.1em;
            height: 16px;
            width: 16px;
        }
        .yellow{
            color: #ffb03c;
        }
        .gray{
            color: #535353;
        }
        p{
            color: #535353;
            font-family: "Roboto", sans-serif;
        margin: 0;
        font-weight: 500;
        }
        
    }
}

.main-right{
    margin-top: 30px;
    width: 31.476%;
    
    h1{
        font-size: 1.25em;
        font-family: "Roboto";
        color: rgb(83, 83, 83);
        line-height: 2.083;
        margin: 0;             
      flex: 0 0 100%;
      margin-bottom: 10px;
    }
    .box-item{
        width: 100%;
        -webkit-box-shadow: 0 0 40px -2px #D9D9D9;
    box-shadow: 0 0 40px -2px #D9D9D9;
        .box-header{
            padding: 20px 25px;
            display: flex;
            background: #faf8f5;
            border-radius: 7px 7px 0 0;
            align-items: center;
            .circle{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: #e6e5e2;
                margin-right: 20px;
            }
            img {
                border-radius: 50%;
            }
            h3{
                margin: 0;
                font-family: "Roboto";
                color: #666666;
                font-weight: 500;
                font-size: 1em;
                margin-left: 20px;
            }
        }
    
        .box-main{
            background: #fff;
            border-radius: 0 0 7px 7px;
            padding: 21px 25px 28px 25px;
            p{
                color: #666666;
                margin: 0;
                font-size: 1.05em;
                font-weight: 400;
                font-family: "Roboto";
            }
            .nivel{
                margin: 0;
                display: inline;
                font-family: "Roboto";
                color: #666;
                font-size: 0.9em;
                font-weight: 500;
            }
            span{
                color: #fff;
                background: #fbc02d;
                border-radius: 20px;
                font-family: "Roboto";
                padding: 6px 16px;
                font-size: 0.7em;
                font-weight: 500;
                margin-left: 10px;
            }
            .green{
                background: #52dc90;
            }
            
            .blue{
                background: #1677cb;
            }
            .watch{
                margin: 28px 0;
            }
    
            .watch:before{
                content: "\f017";
                font-family: FontAwesome;
                font-size: 1em;
                margin-right: 20px;
            }
    
            .user:before{
                content: "\f007";
                font-family: FontAwesome;
                font-size: 1em;
                margin-right: 20px;
            }
    
            a{
                background: #64b5f6;
                font-family: "Roboto";
                color: #fff;
                text-decoration: none;
                margin-top: 34px;
                border-radius: 25px;
                padding: 14px 22px;
                font-weight: 500;
        font-size: 0.7em;
        letter-spacing: 0.1em;
        display: inline-block;
            }
        }
    }
}

.right-middle{
    background: #f8f7f3;
    border: 2px solid #e5e3e0;
    border-radius: 10px;
    margin: 40px 0;
    h2{
        color: #535353;
        font-family: "Roboto";
    font-weight: 500;
    font-size: 1em;
    padding-left: 30px;
    padding-top: 10px;
    padding-right: 38px;
    line-height: 27px;
    }

    .table-top{
        display: flex;
        padding: 0 85px 0 30px;
        justify-content: space-between;
        p{
            font-family: "Roboto";
            font-weight: 500;
            color: #838382;
            font-size: 0.8em;
        }
    }
    .active{
        background: #2ca0f7;
        p{
            color: #fff !important;
            font-weight: 400 !important;
        }
    }

    .table-item{
        display: flex;
        padding: 15px 85px 12px 30px;
        align-items: center;
        border-top: 2px solid #e5e3e0;
        
        p{
            font-family: "Roboto";
            font-weight: 500;
            color: #acacab;
            font-size: 0.82em;
            margin: 0;
        }
        img{
            width: 25px;
            height: 25px;
            border-radius: 50%;
            margin: 0 22px 0 15px;
        }
        .name{
            margin-right: auto;
        }
    }

    .table-bottom{
        width: 100%;
        button{
            background: #fff;
            font-family: "Roboto";
            font-weight: 500;
            width: 100%;
            border: none;
            border-radius: 0 0 10px 10px;
            color: #8A8A8A;
            font-size: 1em;
            text-transform: uppercase;
            padding: 22px 0;
        }
    }

}

.right-bottom{
    background: #f8f7f3;
    border: 2px solid #e5e3e0;
    border-radius: 10px;
    padding: 30px 20px 25px 20px;
    h3{
        color: #535353;
        font-family: "Roboto";
        font-weight: 500;
        text-align: center;
        font-size: 1em;
        margin-top: 0;
    }
    p{
        color: #999999;
        font-family: "Roboto";
        font-weight: 500;
        text-align: center;
        font-size: 0.9em;
    }
}

.flex-100{
    flex: 0 0 100%;
    text-align: center;
    
}


.switch {
    position: relative;
    display: block;
    width: 66px;
    height: 30px;
    margin-right: auto;
    margin-left: auto;
  }
  
  .switch input {display:none;}
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    border: 2px solid #f0f0f0;
    border-radius: 25px;
    -webkit-transition: .4s;
    transition: .4s;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 2px;
    bottom: 3px;
    background-color: #e6e6e6;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 50%;
  }

  .slider:after{
      content: "OFF";
      position: absolute;
      top: 5px;
      right: 11px;
      font-family: "Roboto", sans-serif;
      font-weight: 700;
      color: #7a7a7a;
      font-size: 0.8em;
      transition: .4s;
  }
  
  
  
  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;

  }

  input:checked + .slider{
    border: 2px solid #64b5f6;
    background: #64b5f6;
  }
  
  input:checked + .slider:before {
    -webkit-transform: translateX(35px);
    -ms-transform: translateX(35px);
    transform: translateX(35px);
    background: #fff;
  }

  input:checked + .slider:after{
    content: "ON";   
    color: #fff;  
    right: 30px; 
  }

@media(max-width:1112px){
    .container{
    .main{
        width: 88.045%;
    }
    
    }
}


@media(max-width: 1087px){
    .main-left{
        width: 100%;
        padding: 0 16%;
    }
    .main-right{
        width: 100%;
    }
}

@media(max-width:425px){
    .container{
        padding-bottom: 30px;
    }
    .main-right{
        h1{
            text-align: center;
        }
        .box-header{
            flex-direction: column;
            .circle{
                margin-bottom: 15px;
            }
        }
        .right-middle{
            h2{
                text-align: center;
            }
        }
        .right-bottom{
            display: none;
        }
    }
}

@media(max-width: 364px){
    .table-top{
        padding: 0 20px 0 20px !important;
    }
 .table-item{
     padding: 15px 20px 12px 20px !important;
 }
 .box-header, .box-main{
    padding-left: 10px !important;
    padding-right: 10px !important;
 }
}

</style>

