<template>
<div>
    <div class="container" v-if="grid.length && ! showModalFinishTest">
        <div class="main">
            <div class="left">
            <p class="nav">{{ test.area.title }}</p>
            <div class="progress" v-show="timer.minutes || timer.seconds">
                <div class="progress-bar" :style="{'width': timer.width + '%'}">
                </div>
                <p>{{ timer.minutes }}:<span v-if="('' + timer.seconds).length == 1" >0</span>{{ timer.seconds }}</p>
            </div>
                
                <br />

                <h1 class="expression" v-html="grid[row][col].description"></h1>
            </div>

            <div class="right" v-if="grid[row][col].type != 3">
                <label class="input-box" v-if="a && grid[row][col].solution" v-for="(a, index) in grid[row][col].answers.filter(o => o)" :key="index">
                    {{ a }}    
                    <input v-if="grid[row][col].solution.length > 1" @change="response(index)" v-model="mlt[index]" type="checkbox" />
                    <input v-else @change="response(index)" :checked="radio[index]" type="radio" />
                    <span class="checkmark"></span>
                </label>
            </div>

            <div class="right" v-else>
                <textarea v-model="area" ref="area" contenteditable="contenteditable" placeholder="Escribe tu respuesta" class="response"></textarea>
                <div class="operators">
                    <div class="item operator-1" @click="setOperator('\frac{}{}')"></div>
                    <div class="item operator-2" @click="setOperator('{}^{}')"></div>
                    <div class="item" @click="setOperator('\sqrt{}')">&#8730;</div>
                    <div class="item operator-3" @click="setOperator('\sqrt[]{}')"></div>
                </div>
                <div class="operators">
                    <div class="item" @click="setOperator('\geq')">&#8925;</div>
                    <div class="item" @click="setOperator('>')">&#x3e;</div>
                    <div class="item" @click="setOperator('(')">(</div>
                    <div class="item" @click="setOperator(')')">)</div>
                </div>
                <div class="operators">           
                    <div class="item" @click="setOperator('\leq')">&#8924;</div>
                    <div class="item" @click="setOperator('<')">&#60;</div>
                    <div class="item" @click="setOperator('+')">&#43;</div>
                    <div class="item" @click="setOperator('-')">&#8722;</div>
                    
                </div>
                <div class="operators">      
                    <div class="item" @click="setOperator('%')">%</div>
                    <div class="item" @click="setOperator('pi')">&#8719;</div>
                    <div class="item" @click="setOperator('\cdot')">&#215;</div>
                    <div class="item" @click="setOperator('\dfrac{}{}')">&#247;</div>
                </div>
            </div>
        </div>
        <div class="page-bottom" v-if="grid[row][col].type == 3">
            <div class="content">
                <button @click="checkResponse">CHECK</button>
            </div>
        </div>
        
        <transition name="slide-down">
            <div class="page-bottom correct" v-show="status">
                <div class="content">
                <div class="icon"><i class="fa fa-check" aria-hidden="true"></i></div>
                <div class="heding">
                    <h3>Respusta correcta!</h3>
                    <p>Has completado el Desafio Eureka </p>
                </div>
                <button>CONTINUAR</button>
                </div>
            </div>
        </transition>

        <transition name="slide-down">
            <div class="page-bottom incorrect" v-show="status == false">
                <div class="content">
                    <div class="icon"><i class="fa fa-times" aria-hidden="true"></i></div>
                    <div class="heding">
                    <h3>Desafio Velocidad</h3>
                    <p>More deatails afterwards</p>
                    </div>
                    <!-- <button >CONTINUAR <div class="popover">
                        <h3>Codige de curso!</h3>
                        <p>Quisque eu congue odio, sit
                        amet sollicitudin libero. Sed et 
                        dui facilisis iaculis tellus quis.</p>
                    </div></button> -->
                </div>
            </div>
        </transition>
    </div>
    <FinishAreaTest @goDashboard="goDashboard" v-if="showModalFinishTest" />
</div>
</template> 
<script>
    import api from '../api'
    import FinishAreaTest from '../components/FinishAreaTest'

    export default {
        data() {
            return {
                showModalFinishTest: false,
                test: {},
                col: 0,
                row: 1,
                area: "",
                grid: [],
                check: false,
                status: null,
                subject: {},
                timer: {
                    minutes: 0,
                    seconds: 0,
                    instance: false,
                    width: 100,
                    full: 0
                },
                mlt: {},
                radio: {}
            }
        },
        components: {
            FinishAreaTest
        },
        created() {
            let { slug } = this.$route.params
            this.get(slug)
        },
        methods: {
            setOperator(operator) {
                this.area = this.area + operator
            },
            checkResponse() {
                let solutions = this.grid[this.row][this.col].solution
                let check = solutions.some(s => s == this.area)
                check ? this.correct() : this.wrong()
            },
            get(slug) {
                let $this = this
                api.getAreaTest(slug)
                    .then((data) => {
                        $this.test = data
                        $this.subject = data.subject
                        $this.grid = data.grid

                        if ($this.grid[$this.row][$this.col].timeout * 1) {
                            $this.timer.minutes = Math.floor($this.grid[$this.row][$this.col].timeout / 60)
                            $this.timer.seconds = $this.grid[$this.row][$this.col].timeout % 60
                            $this.timer.full = $this.timer.minutes * 60 + $this.timer.seconds
                            
                            $this.printMathJax()
                            $this.tick()
                        }
                    })
            },
            checkMultiplyType() {
                return this.grid[this.row][this.col].solution.length > 1
            },
            response(answer) {
                let solutions = this.grid[this.row][this.col].solution
                let ids = this.mlt ? Object.keys(this.mlt) : []

                if(this.checkMultiplyType()) {
                    if (ids.length == solutions.length) {
                        let check = true;
                        for(var s of solutions) {
                            if ( ! (ids.indexOf(s + '') + 1)) {
                                check = false
                            }
                        }
                        this.mlt = {}
                        check ? this.correct() : this.wrong()
                    }
                    return 
                }

                if (solutions.indexOf(answer) + 1) {
                    this.correct()
                    return
                }

                this.wrong()
            },
            reset() {
                setTimeout(() => {
                    this.check = false
                }, 800)
            },
            printMathJax() {
              setTimeout(() => {
                window.MathJax.Hub.Queue(["Typeset", MathJax.Hub])
              }, 0)
            },
            createResult(status) {
                api.createAreaTestResultStep(this.user.id, {
                    area_test_id: this.test.id,
                    problem_status: status,
                    timer: this.test.timeout ? (this.test.timeout - (this.timer.minutes * 60 + this.timer.seconds)) : 0
                })
            },
            correct() {
                clearTimeout(this.timer.instance)         
                this.printMathJax()

                api.addPointAreaTest({area: this.test.id, user: this.user.id, points: this.grid[this.row][this.col].points})

                this.area = ""
                this.status = true
                this.mlt = {}

                if (this.grid[this.row - 1] && 
                    this.grid[this.row - 1][this.col + 1]) {
                    this.row --
                    this.col ++
                    this.createResult('success')
                    this.calcTimer()
                    if (this.grid[this.row][this.col].timeout * 1) {
                        this.tick()
                    }
                    return
                }

                if ( !  this.grid[this.row - 1] && 
                    this.grid[this.row][this.col + 1]) {
                    this.col ++
                    this.createResult('success')
                    this.calcTimer()
                    if (this.grid[this.row][this.col].timeout * 1) {
                        this.tick()    
                    }
                    return 
                }

                this.createResult('success')

                api.createAreaTestResult({user: this.user.id, area: this.test.id})
                    .then((data) => {
                        this.showModalFinishTest = true
                    })                
            },
            calcTimer() {
                clearTimeout(this.timer.instance)
                
                if (this.grid[this.row][this.col].timeout * 1) {
                    
                    this.timer.minutes = Math.floor(this.grid[this.row][this.col].timeout / 60)
                    this.timer.seconds = Math.floor(this.grid[this.row][this.col].timeout % 60)

                    this.timer.full = this.timer.minutes * 60 + this.timer.seconds
                    this.timer.width = 100
                    return 
                }
                this.timer.minutes = 0
                this.timer.seconds = 0
                this.timer.full = 0
                this.timer.width = 100
            },
            wrong() {
                
                this.printMathJax()
                this.status = false
                 if (this.grid[this.row + 1] && this.grid[this.row + 1][this.col + 1]) {
                    this.col ++
                    this.row ++
                    this.createResult('wrong')
                    this.calcTimer()
                     if (this.grid[this.row][this.col].timeout * 1) {
                        this.tick()    
                    }
                    return
                }

                if ( !  this.grid[this.row + 1] && 
                        this.grid[this.row][this.col + 1]) {
                        this.col ++
                        this.createResult('wrong')
                        this.calcTimer()
                        if (this.grid[this.row][this.col].timeout * 1) {
                            this.tick()    
                        }
                        return
                }
                
                this.createResult('wrong')

                api.createAreaTestResult({user: this.user.id, area: this.test.id})
                    .then((data) => {
                        this.showModalFinishTest = true
                    })
            },
            goDashboard() {
                this.$router.push('/dashboard')
            },
            tick() {
                
                if ( ! this.timer.seconds) {
                    this.timer.minutes --
                    this.timer.seconds = 60
                }

                if (this.timer.seconds != 0) {
                    this.timer.seconds --
                }

                this.timer.width = (this.timer.minutes * 60 + this.timer.seconds) / this.timer.full * 100

                if ( ! this.timer.minutes && ! this.timer.seconds) {
                    clearTimeout(this.timer.instance)
                    this.wrong()
                    return
                }

                this.timer.instance = setTimeout(() => {
                    this.tick()
                }, 1000)
            },
        },
        watch: {
            status() {
                setTimeout(() => {
                    this.status = null
                }, 1000)
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
.expression {
    margin-top: 20px;
    text-align: center;
}

.operator-1 {
    background: url('/img/operator-1.png') no-repeat center;
    background-size: 40%;
}

.operator-2 {
    background: url('/img/operator-2.png') no-repeat center;
    background-size: 40%;
}

.operator-3 {
    background: url('/img/operator-3.png') no-repeat center;
    background-size: 40%;
}

.container{
    width: 100%;
    background: #fff;
    .main{
        width: 1112px;
        margin-left: auto;
        margin-right: auto;
        display: flex;
    }
}

.left{
    width: 70.325%;
    border-right: 1px solid #f6f6f6;
    padding-bottom: 116px;
    img{
        margin-top: 66px;
        margin-left: 17.8%;
    }

    .description {
        margin-top: 50px;
    }
}

.nav{
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    color: #dadada;
    font-size: 0.75em;
    padding-top: 49px;
    margin-bottom: 70px;
    strong{
        color: #666666;
    }
}
.nav:before{
    content: '\f053';
    font-family: FontAwesome;
    margin-right: 20px;
    font-size: 0.75em;
}

h1{
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    margin: 0;
    color: #666666;
    margin-bottom: 25px;
}

.progress{
    position: relative;
    background: #eeebe5;
    height: 8px;
    width: 74.682%;
    border-radius: 10px;
    p{
        position: absolute;
        margin: 0;
        top: -36px;
        right: -78px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #666666;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        width: 72px;
        height: 72px;
        border-radius: 50%;
        border: 4px solid #eeebe5;
    }
}
.progress-bar{
    position: absolute;
    height: 8px;
    width: 100%;
    background: #2399f1;
    border-radius: 10px;
    top: 0;
    transition: all .3s;
}

.right{
    padding: 117px 0 30px 72px;
    display: flex;
    flex-direction: column;
    .input-box {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        color: #999999;
        font-size: 1.7em;
        display: flex;
        align-items: center;
    }

    .response {
                border: 2px solid #0093ec;
                min-width: 200px;
                border-radius: 4px;
                height: 80px;
                resize: none;
                padding: 10px;
            }

            .operators {
                margin-top: 15px;
                display: flex;
                width: 100%;
                justify-content: space-between;
                .item {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    box-shadow: 0px 2px 5px #888;
                    text-align: center;
                    line-height: 30px;
                    color: #939393;
                    font-weight: bold;
                    &:hover {
                        cursor: pointer;
                    }
                }
            }
    
}

.input-box {
    display: block;
    position: relative;
    padding-left: 35px;
    margin: 19px 0;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/* Hide the browser's default radio button */
.input-box input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

/* Create a custom radio button */
.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 16px;
    width: 16px;
    background-color: #fff;
    border: 2px solid #e9e7e1;
    border-radius: 50%;
    margin-top: 7px;
}


/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

/* Show the indicator (dot/circle) when checked */
.input-box input:checked ~ .checkmark:after {
    display: block;
}

/* Style the indicator (dot/circle) */
.input-box .checkmark:after {
 	top: 3px;
	left: 3px;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background: #e9e7e1;
}

.page-bottom{
    width: 100%;
    background: #F6F6F6;
    height: 150px;
    display: flex;
    align-items: center;
    .content{
        width: 1112px;
        margin-left: auto;
        margin-right: auto;
        button{
            display: block;
            margin-left: auto;
            background: #fff;
            font-family: 'Roboto', sans-serif;
            font-weight: 500;
            border: 2px solid #c7c7c7;
            color: #898989;
            padding: 18px 30px;
            border-radius: 40px;
            font-weight: 700;
            letter-spacing: 0.05em;
        }
    }
}

.correct{
    background: #66bb6a;
    .content{
        display: flex;
        align-items: center;
        .icon{
            width: 30px;
            height: 30px;
            background: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 25px;
            i{
                color: #66bb6a;
            }
        }
        h3, p{
            margin: 0;
            font-family: 'Roboto', sans-serif;
            font-weight: 500;
            color: #fff;
        }
        p{
            font-size: 0.8em;
            margin-top: 10px;
        }
        button{
            border: none;
        }
    }
}

.incorrect{
    background: #ef5350;
    .content{
        display: flex;
        align-items: center;
        .icon{
            width: 30px;
            height: 30px;
            background: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 25px;
            i{
                color: #ef5350;
            }
        }
        h3, p{
            margin: 0;
            font-family: 'Roboto', sans-serif;
            font-weight: 500;
            color: #fff;
        }
        p{
            font-size: 0.8em;
            margin-top: 10px;
        }
        button{
            border: none;
            position: relative;
        }
}
}


.popover{
    opacity: 1;
    width: 165px;
    padding: 15px 15px;
    background: #353c48;
    z-index: 5;
    position: absolute;
    border-radius: 5px;
    left: -27px;
    top: -139px;
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

@media(max-width:1112px){
    .container{
    .main{
        width: 88.045%;
    }
    
    }
}

@media(max-width: 800px){
    .container{
        .main{
            display: flex;
            flex-direction: column;
        }
        .left{
            width: 100%;
            border: none;
            h1{
                margin-bottom: 50px;
            }
        }
        .right{
            width: 100%;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: space-around;

            
        }
    }
}

@media(max-width:499px){
    .left{
        img{
            margin: 0;
            width: 100%;
        }
        .progress{
            p{
                right: -58px;
                top: -27px;
                width: 53px;
    height: 53px;
            }
        }
    }

    .page-bottom{
        .content{
            display: flex;
            flex-direction: column;
            .icon{
                margin: 0;
            }
            .heading{
                text-align: center;
            }
            button{
                margin: 0;
                margin-top: 12px;
            }
        }
    }
}

@media(max-width:600px){
    .container{
        background: #f4f1ea;
        .left{
            background: #fff;
            border-radius: 7px;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 30px;
            h1{
                background: #f4f1ea;
               padding-top: 70px;
               padding-bottom: 50px;
               margin: 0;
               width: 100%;
               margin-bottom: 75px;
            }
            .questions{
                flex-direction: column;
                margin-top: 25px;
                padding: 12px 50px;
                p{
                    margin: 15px 0;
                }
            }
            img{
                margin-left: auto;
                margin-right: auto;
                margin-top: 30px;
            }
        }
        .right{
            display: flex;
            flex-direction: column;
            background: #fff;
            padding: 80px 70px;
            width: auto;
            .input-box{
                font-size: 2.2em;
                .checkmark{
                    margin-top: 12px;
                }
            }
            
        }
        .page-bottom{
            height: unset;
            .content{
                text-align: center;
                width: auto;
                padding: 32px 0;
                flex-direction: column;
                button{
                    padding: 22px 79px;
                }
                h3{
                    font-size: 1.3em;
                    margin: 17px 0;
                }
                p{
                    font-size: 1em;
                    margin-bottom: 20px;
                }
            }
        }
    }
    .nav{
        display: none;
    }
    .progress{
        margin-right: 76px;
        width: 56.682%;
    }

}
</style>