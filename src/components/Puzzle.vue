<template>
  <div class="container">
    <transition name="fade">
        
      <div class="main" v-if="showItem == 'puzzle'">
          <div class="left">
            <p class="nav">Numeros
                <i class="fa fa-angle-right" aria-hidden="true"></i> Algebra
                <i class="fa fa-angle-right" aria-hidden="true"></i>
                <strong>{{ puzzle.title }}</strong>
            </p>
            <h1>{{ puzzle.title }}</h1>
            <div class="progress">
                <div class="progress-bar" :style="{'width': width + '%'}">
                </div>
                <p>{{ timer.minutes }}:<span v-if="('' + timer.seconds).length == 1" >0</span>{{ timer.seconds }}</p>
            </div>
            
            <h1 class="expression" id="expression" v-if="puzzle.type == 3" v-html="puzzle.description"></h1>
            <h1 class="expression" v-else>
                {{ puzzle.description }}
            </h1>

            <transition name="fade">
              <description-solution
                v-if="showDescriptionSolution"
                :descriptionSolution="puzzle.description_solution"
              />
            </transition>

          </div>
          <div class="right" v-if="puzzle.type != 3">
              <label 
                class="input-box" 
                v-for="(a, index) in puzzle.answers"
                :class="{'correct-answer': status == 1 && selectedAnswers.indexOf(index) != -1, 'incorrect-answer': status == 2 && selectedAnswers.indexOf(index) != -1}"
                :key="index"
              >
                <span>{{ a }}</span>
                <input 
                  v-if="puzzle.solutions.length > 1" 
                  @change="response(index)" 
                  v-model="mlt[index]" 
                  :value="index" 
                  type="checkbox"
                  :disabled="isInputsDisabled"
                />
                <input 
                  v-if=" ! (puzzle.solutions.length > 1)" 
                  @change="response(index)" 
                  type="radio" 
                  v-model="answ[index]"
                  :disabled="isInputsDisabled"
                />
                  <span class="checkmark"></span>
              </label>
          </div>
          <div class="right" v-else>
          <textarea 
            v-model="area" 
            ref="area" 
            contenteditable="contenteditable" 
            placeholder="Escribe tu respuesta" 
            class="response"
            :disabled="isInputsDisabled"
          ></textarea>
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
        
    </transition>

    <transition name="slide-down">
      <div class="page-bottom" v-if="puzzle.type == 3 && status == 0 && showItem == 'puzzle'">
        <div class="content">
            <button @click="check" class="continuar">CHECK</button>
        </div>
      </div>
    </transition>

    <transition name="slide-down">
        <div class="page-bottom correct" v-if="status == 1">
            <div class="content">
                <div class="icon"><i class="fa fa-check" aria-hidden="true"></i></div>
                <div v-if="textToShow" class="heding">
                    <h3>{{ textToShow.heading }}</h3>
                    <p>{{ textToShow.text }}</p>
                </div>
                <button @click="onClickContinueButton" class="continuar">CONTINUAR</button>
            </div>
        </div>
    </transition>

    <transition name="slide-down">
        <div class="page-bottom incorrect" v-if="status == 2">
            <div class="content">
                <div class="block-left">
                  <div class="icon"><i class="fa fa-times" aria-hidden="true"></i></div>
                  <div v-if="textToShow" class="heding">
                    <h3>{{ textToShow.heading }}</h3>
                    <p>{{ textToShow.text }}</p>
                  </div>
                </div>
                <div class="block-right">
                  <button 
                    class="continuar"
                    v-if="currentPuzzleHasVideo"
                    @click="seeVideo()"
                  >
                    SEE VIDEO
                  </button>
                  <button @click="onClickContinueButton" class="continuar">CONTINUAR
                      <!-- <div class="popover">
                        <h3>Codige de curso!</h3>
                        <p>Quisque eu congue odio, sit
                        amet sollicitudin libero. Sed et 
                        dui facilisis iaculis tellus quis.</p>
                    </div> -->
                  </button>
                </div>
            </div>
        </div>
    </transition>

    <transition name="fade">
      <Video 
        v-if="showItem == 'video'" 
        @closeVideo="closeVideo"
        :video="puzzle.video"
      />
    </transition>
  </div>


</template>
<script>
  import Video from './Video.vue'
  import DescriptionSolution from './DescriptionSolution.vue'


      export default {
        props: ['puzzle', 'puzzleCurrentLast'],
        components: {
          Video,
          DescriptionSolution
        },
        data() {
          return {
            current: 0,
            timer: {
              interval: null,
              minutes: 0,
              seconds: 0,
              full: 0
            },
            status: 0,
            selectedAnswers: [],
            mlt: {},
            area: "",
            answ: [],
            showItem: 'puzzle',
          }
        },
        created() {
            this.stopTimer()
            this.calcTimer()
            this.timer.interval = setInterval(this.tick, 1000)
        },
        mounted() {
          this.printMathJax()
        },
        watch: {
          status: function() {
            if (this.status) {
              this.stopTimer()
            }
          }
        },
        computed: {
          width() {
            return (this.timer.minutes * 60 + this.timer.seconds) / this.timer.full * 100
          },

          textToShow() {
            let number = 4
            let textToShow = this.texts[0]
          
            if (this.status == 1) {
              number = 5

              if (this.puzzleCurrentLast) {
                number = 6
              }
            }

            if (this.status == 2) {
              if (this.currentPuzzleHasFourProblemQuiz && ! this.children) {
                number = 1
              }

              if (this.currentPuzzleHasDescriptionSolution && this.currentPuzzleHasVideo) {
                number = 2
              }

              if (this.currentPuzzleHasVideo) {

              }
            }

            this.texts.forEach(text => {
              if (text.text_number == number) {
                textToShow = text
              }
            })

            if (this.status == 0) {
              textToShow = false
            }

            return textToShow
          },

          texts() {
            return this.$store.getters.getTexts
          },

          isInputsDisabled() {
            return this.status != 0
          },

          currentPuzzleHasFourProblemQuiz() {
            if (this.puzzle.four_problem_quiz) {
                return true
            }
            return false
          },

          currentPuzzleHasChildren() {
            return this.puzzle.children && this.puzzle.children.length
          },

          currentPuzzleHasDescriptionSolution() {
            if (this.puzzle.description_solution.length > 0) {
                return true
            }
            return false
          },

          currentPuzzleHasVideo() {
            if (this.puzzle.video.length > 0) {
                return true
            }
            return false
          },

          showDescriptionSolution() {
            return this.currentPuzzleHasDescriptionSolution && this.status == 2
          },

          puzzleTries() {
            return this.$store.getters.getPuzzleTries
          },

          currentPuzzleTry() {
            return this.puzzleTries.hasOwnProperty(this.puzzle.id) ? this.puzzleTries[this.puzzle.id] : 1
          },
        },
        methods: {
          onClickContinueButton() {
            if (this.status == 1) {
              this.$emit('closePuzzle', {
                  id: this.puzzle.id, 
                  status: true
                })
            }

            if (this.status == 2) {
              if ( ! this.currentPuzzleHasChildren && this.currentPuzzleHasFourProblemQuiz || (this.currentPuzzleTry > 1 && this.currentPuzzleHasFourProblemQuiz)) {
                this.$store.dispatch('setShowItem', 'fourProblemQuiz')
                return
              }

              if (this.currentPuzzleTry == 1) {
                this.$emit('closePuzzle', {
                    id: this.puzzle.id, 
                    status: false, 
                    hasChilds: this.currentPuzzleHasChildren, 
                    childPuzzles: this.puzzle.children
                  })
              }

              if (this.currentPuzzleTry > 1) {
                this.$emit('closePuzzle', {
                    id: this.puzzle.id, 
                    status: false, 
                    hasChilds: false,
                  })
              }
            }
          },

          setOperator(operator) {
            if (this.isInputsDisabled) {
              return
            }
            this.area = this.area + operator
          },

          printMathJax() {
            setTimeout(() => {
              window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, document.getElementById('expression')])
            }, 0)
          },

          check() {
            let solutions = this.puzzle.solutions
            let check = solutions.some(s => s == this.area)
            check ? this.correct() : this.wrong()
          },

          response(answer) {
            let puzzle = this.puzzle

            if (this.selectedAnswers.indexOf(answer) == -1) {
              this.selectedAnswers.push(answer)
            } else {
              this.selectedAnswers.splice(this.selectedAnswers.indexOf(answer), 1)
            }

            if (puzzle.type == 2) { // mulity solution 
              let ids = Object.keys(this.mlt)
              if(ids.length == puzzle.solutions.length) {
                  let check = true;
                  for(var s of puzzle.solutions) {
                    if ( ! (ids.indexOf(s + '') + 1)) {
                        check = false
                    }
                  }
                  check ? this.correct() : this.wrong()
              }
              return
            }

            if (puzzle.solutions.indexOf(answer * 1) + 1) {
              this.correct()
              return false
            }
            this.wrong()
          },

          correct() {
            this.status = 1
            this.current++
          },

          wrong() {
            this.status = 2
          },

          calcTimer() {
            this.timer.minutes = Math.floor(this.puzzle.timeout / 60)                        
            this.timer.seconds = Math.floor(this.puzzle.timeout % 60)
            this.timer.full = this.timer.minutes * 60 + this.timer.seconds
          },

          tick() {
            if ( ! this.timer.seconds) {
              this.timer.minutes --
              this.timer.seconds = 60
            }

            if (this.timer.seconds != 0) {
              this.timer.seconds --
            }

            if ( ! this.timer.minutes && ! this.timer.seconds) {
              this.stopTimer()
              this.wrong()
              return
            }
          },
          
          stopTimer() {
            clearInterval(this.timer.interval)
          },

          seeVideo() {
            this.setShowItem('video')
          },

          closeVideo() {
            this.setShowItem('puzzle')
            this.calcTimer()
            this.timer.interval = setInterval(this.tick, 1000)
          },

          setShowItem(itemToShow) {
            this.showItem = itemToShow
            this.status = 0
            this.selectedAnswers = []
            this.mlt = {}
            this.area = ""
            this.answ = []
          },
        }
      }
</script>
<style lang="scss" scoped>
.expression {
    font-size: 5em;
    display: block;
    margin-top: 35px;
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

.continuar {
  cursor: pointer;
}

body .container {
    width: 100%;
    background: #fff !important;
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
    width: 40%;
    background: #2399f1;
    border-radius: 10px;
    top: 0;
    transition: all .3s;
}

.right{
    padding: 117px 0 0 72px;
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

.input-box.correct-answer {
  span {
    color: #28a745;
  }

  .checkmark {
    &::after {
      background: #28a745;
    }
    border-color: #28a745;
  }
}

.input-box.incorrect-answer {
  span {
    color: #dc3545;
  }

  .checkmark {
    &::after {
      background: #dc3545; 
    }
    border-color: #dc3545;
  }
}

.page-bottom{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #F6F6F6;
    height: 150px;
    display: flex;
    align-items: center;
    .content{
        width: 1112px;
        margin-left: auto;
        margin-right: auto;
        justify-content: space-between;
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

.block-left, 
.block-right {
    display: flex;
}

.block-right button:last-child {
    margin-left: 20px;
}

</style>
