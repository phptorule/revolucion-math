<template>
  <div class="container">
    <div class="main">
      <div class="left four-problem">
        <p class="nav">{{ tree.subject.area.title }}
          <i class="fa fa-angle-right" aria-hidden="true"></i> {{ tree.subject.title }}
          <i class="fa fa-angle-right" aria-hidden="true"></i>
          <strong>{{ fourProblemQuiz.title }}</strong>
        </p>
        <div class="header">
            <h1>{{ fourProblemQuiz.title }}</h1>
        </div>
        
        <div class="questions">
          <p v-for="(group, index) in fourProblemQuiz.groups" 
            :key="`group_title_${group.id}`" 
            :class="{'pending': currentGroup == index, 'complete': currentGroup > index || completed}"
          >
            {{ `#${index+1} ${group.title}` }}
          </p>
        </div>
        <h1 class="expression">
          <transition name="slide-fade">
            <div v-if="animation">
              <div 
                v-if="questionType == 'custom'" 
                ref="expression" 
                key="expression-block" 
                v-html="question.description"
              ></div>
              <div 
                v-else 
                key="expression-block"
              >
                {{ question.description }}
              </div>  
            </div>
          </transition>
        </h1>
      </div>
      <div class="right" v-if="questionType != 'custom'">
          <label 
            class="input-box" 
            :class="{'correct-answer': status == 1 && selectedAnswers.indexOf(index) != -1, 'incorrect-answer': status == 2 && selectedAnswers.indexOf(index) != -1}"
            v-for="(answer, index) in question.answers" 
            :key="`answer_${currentGroup}_${currentQuestion}_${index}`"
          >
            <math 
              v-if="questionType == 'custom'" 
              xmlns= "http://www.w3.org/1998/Math/MathML" 
              v-html="answer"
            ></math>
            <span v-else>
              {{ answer }}
            </span>
            <input 
              v-if="questionType == 'regular'" 
              type="radio" 
              name="radio"
              ref="radios"
              @change="check(index)"
              :disabled="isInputsDisabled"
            >
            <input 
              v-if="questionType == 'multi'" 
              type="checkbox" 
              ref="radios"
              :name="`checkbox_${index}`" 
              @change="check(index)"
              :disabled="isInputsDisabled"
            >
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

    <div class="page-bottom transparent" v-if="questionType == 'custom'">
      <div class="content">
        <button @click="check" class="continuar">OMITIR</button>
      </div>
    </div>

    <transition name="slide-down">
      <div class="page-bottom correct" v-if="status == 1">
        <div class="content">
          <div class="icon"><i class="fa fa-check" aria-hidden="true"></i></div>
          <div class="heding">
            <!-- <h3>Respusta correcta!</h3> -->
            <!-- <p>Has completado el Desafio Eureka </p> -->
          </div>
          <button @click="next" class="continuar">CONTINUAR</button>
        </div>
      </div>
    </transition>

    <transition name="slide-down">
      <div class="page-bottom incorrect" v-if="status == 2">
          <div class="content">
            <div class="icon"><i class="fa fa-times" aria-hidden="true"></i></div>
            <div class="heding">
              <!-- <h3>Desafio Velocidad</h3> -->
              <!-- <p>More deatails afterwards</p> -->
            </div>
            <button @click="next" class="continuar">CONTINUAR 
                <!-- <div class="popover">
                <h3>Codige de curso!</h3>
                <p>Quisque eu congue odio, sit
                  amet sollicitudin libero. Sed et 
                  dui facilisis iaculis tellus quis.</p>
              </div> -->
              </button>
          </div>
      </div>
    </transition>
  </div>
</template>

<script>
import api from '../api'

export default {
    data() {
        return {
          // completed 4-problem quiz
          completed: false,
          // 0 - default, 1 - correct, 2 - wrong. Sets to 0, after answer
          status: 0,
          // object for multi question
          multi: {},
          area: "",
          selectedAnswers: [],
          animation: true
        }
    },
    computed: {
        user() {
                return this.$store.getters.getUser
        },

        tree() {
          return this.$store.getters.getTree
        },

        current() {
          return this.$store.getters.getCurrent
        },

        puzzle() {
          return this.$store.getters.getPuzzle
        },

        fourProblemQuiz() {
          if (this.puzzle.four_problem_quiz) {
            return this.puzzle.four_problem_quiz
          } else {
            return this.tree.quiz[this.current].four_problem_quiz
          }
        },

        currentGroup() {
          return this.$store.getters.getCurrentGroup
        },

        currentQuestion() {
          return this.$store.getters.getCurrentQuestion
        },

        question() {
          return this.fourProblemQuiz.groups[this.currentGroup].questions[this.currentQuestion]
        },

        treeHasNextQuiz() {
          return (this.current + 1) != this.tree.quiz.length
        },

        questionType() {
          if (this.question.type == 1) {
            return 'regular'
          }

          if (this.question.type == 2) {
            return 'multi'
          }

          if (this.question.type == 3) {
            return 'custom'
          }
        },

        hasNextGroup() {
          return (this.fourProblemQuiz.groups.length - 1) != this.currentGroup
        },

        hasNextQuestion() {
          return (this.fourProblemQuiz.groups[this.currentGroup].questions.length - 1) != this.currentQuestion
        },

        isInputsDisabled() {
          return this.status != 0
        },
    },
    watch: {
      completed() {
        if (this.completed) {
          //complete logic
          console.log('four problem quiz completed do things')
          if (Object.keys(this.puzzle).length) {
            this.$store.dispatch('setCurrentGroup', 0)
            this.$store.dispatch('setCurrentQuestion', 0)
            this.$store.commit('setCorrects', this.puzzle.id)
            this.setShowItem('puzzleGrid')
          } else if (this.treeHasNextQuiz) {
            this.$store.dispatch('setCurrentGroup', 0)
            this.$store.dispatch('setCurrentQuestion', 0)
            this.$store.dispatch('setCurrent', this.current + 1)
            this.$store.commit('setPuzzle', {})
            this.setShowItem('quiz')
          } else {
            this.$emit('treeCompletedFromFourProblemQuiz')
          }
        }
      },
      
      question() {
        this.animation = false
        let $this = this
        setTimeout(() => {                    
            $this.printMathJax()
            $this.animation = true
        }, 200)
      }
    },
    methods: {
      setShowItem(showItem) {
        this.$store.dispatch('setShowItem', showItem)
      },

      printMathJax() {
        let _this = this
        setTimeout(() => {
          window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, _this.$refs.expression])
        }, 0)
      },

      setOperator(operator) {
        if (this.isInputsDisabled) {
          return
        }
        this.area = this.area + operator
      },

      check(index) {
        let isCorrect = false

        if (this.selectedAnswers.indexOf(index) == -1) {
          this.selectedAnswers.push(index)
        } else {
          this.selectedAnswers.splice(this.selectedAnswers.indexOf(index), 1)
        }

        if (this.questionType == 'regular') {
          isCorrect = this.question.solutions.indexOf(index) == -1 ? false : true
        }

        if (this.questionType == 'multi') {
          if (this.multi.hasOwnProperty(index)) {
            delete this.multi[index]
          } else {
            this.multi[index] = true
          }
          let ids = Object.keys(this.multi)

          // check if selected checkboxes number equal solutions length
          if(ids.length == this.question.solutions.length) {
            isCorrect = true

            for(var s of this.question.solutions) {
              if ( ! (ids.indexOf(s + '') + 1)) {
                isCorrect = false
              }
            }

            // this.next(isCorrect)
            this.setStatus(isCorrect ? 1 : 2)
          }
          return
        }

        if (this.questionType == 'custom') {
          isCorrect = this.question.solutions.some(s => s == this.area)
        }

        this.setStatus(isCorrect ? 1 : 2)
        console.log(isCorrect)

        api.createFourProblemResult(this.user.id, {
          four_problem_question_id: this.question.id,
          problem_status: isCorrect ? 'success' : 'wrong',
          tree_id: this.tree.id,
        })
        // this.next(isCorrect)
      },

      correct() {
        console.log('correct answer')
      
        // check if has more groups then go to next group
        if ( ! this.hasNextGroup) {
          this.completed = true
          return
        }

        this.$store.dispatch('setCurrentGroup', (this.currentGroup + 1))
      },

      wrong() {
        console.log('wrong answer')
        this.$store.dispatch('setCurrentQuestion', this.hasNextQuestion ? (this.currentQuestion + 1) : this.current)
      },

      setStatus(status) {
        this.status = status

        if (this.status == 0) {
          this.multi = {}
          this.area = ""
          this.selectedAnswers = []

          if ( ! this.hasNextQuestion) {
            this.$refs['radios'].forEach((e) => {
                e.checked = false
            })
          }
        }
      },

      next() {
        this.status == 1 ? this.correct() : this.wrong()
        this.setStatus(0)
      },
    },
    mounted() {
      this.printMathJax()
    }
}
</script>

<style lang="scss" scoped>

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

.container {
  width: 100%;
  .main {
    width: 1112px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
  }
}

h1 {
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  margin: 0;
  color: #666666;
  margin-bottom: 25px
}

.expression {
  font-size: 5em;
  display: block;
  margin-top: 0;
  text-align: center;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // min-width: 100%;
  // min-height: 300px;
  // font-size: 30px;
  // color: black;
  // font-weight: 600;
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
    text-align: center;
    flex-grow: 2;
    margin-bottom: 50px;
}

.header{
    display: flex;
    justify-content: center;
    align-items: center;
    p{
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
        margin-right: 25px;
    }
}

.questions{
    display: flex;
    align-items: center;
    justify-content: center;
    p{
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        color: #999;
        padding: 12px;
        margin: 0;
        border-bottom: 3px solid #d6d6d6;
        margin-right: 25px;
    }
    .pending {
      color: #65b5f6;
      border-bottom-color: #65b5f6;
    }

    .complete {
      color: #66bb6a;
      border-bottom-color: #66bb6a;
    }
}

.right{
    padding: 117px 0 0 72px;
    display: flex;
    flex-direction: column;

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

    .input-box {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      color: #999999;
      font-size: 1.7em;
      display: flex;
      align-items: center;
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
            .questions{
                flex-wrap: wrap;
            }
            .header{
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
                right: -76px;
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
            }
            .questions{
                flex-direction: row;
                justify-content: space-between;
                margin-top: 25px;
                padding: 12px 15px;
                p{
                    margin: 15px 0;
                }
            }
            img{
                margin-left: auto;
                margin-right: auto;
                margin-top: 30px;
            }
            .header{
                flex-direction: column;
                width: 100%;
                p{
                    margin: 0;
                    margin-top: 25px;
                }
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
}

.page-bottom.transparent {
    background: transparent;
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
</style>
