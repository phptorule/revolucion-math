<template>
  <div>
    <div class="container">
      <div class="main" v-if="question && ! completed">
        <div class="left">
          <div class="header">
            <div class="heading">
              <h5>TOTAL</h5>
              <h3>{{ totalPoints }} PUNTOS</h3>
            </div>
            <div class="hearts">
              <transition-group name="list">
                <img 
                  v-for="live in lives"
                  :key="'live_' + live"
                  class="heart" 
                  src="/img/heart.jpg"
                >
              </transition-group>
            </div>
          </div>
          <p>{{ question.title }}</p>
          <div class="progress">
            <div 
              class="progress-bar" 
              :style="{'width': width + '%'}"
            ></div>
            <p>{{ timer.minutes }}:<span v-if="('' + timer.seconds).length == 1" >0</span>{{ timer.seconds }}</p>
          </div>
          <div class="task">
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
          <button
            v-if="mode == 'super-fast' && ! frozenPowerUsed"
            class="pointer"
            @click="pauseTimer"
          >
            FROZEN POWER
            <span v-if="isTimerPaused">{{frozenTimer.seconds}}</span>
          </button>
        </div>
        <div class="right">
          <h2 v-if="mode == 'normal'"></h2>
          <h2 v-if="mode == 'fast'">X2 PUNTOS</h2>
          <h2 v-if="mode == 'super-fast'">X4 PUNTOS</h2>

          <div v-if="questionType != 'custom'">
            <label 
              class="input-box" 
              :class="{'correct-answer': status == 1 && selectedAnswers.indexOf(index) != -1, 'incorrect-answer': status == 2 && selectedAnswers.indexOf(index) != -1}"
              v-for="(answer, index) in question.answers" 
              :key="'question_' + current + '_answer_' + index"
            >
              <p 
                v-if="status == 1 && selectedAnswers.indexOf(index) != -1"
                class="choose"
              >
                +{{pointPerAnswer}} PTS<br><span>CORECTO</span>
              </p>
              <p v-else>
                {{ answer }}
              </p>
              <input 
                v-if="questionType == 'regular'" 
                type="radio" 
                name="radio" 
                @change="check(index)"
                :disabled="isInputsDisabled"
              >
              <input 
                v-if="questionType == 'multi'" 
                type="checkbox" 
                :name="`checkbox_${index}`" 
                @change="check(index)"
                :disabled="isInputsDisabled"
              >
              <span class="checkmark"></span>
            </label>
          </div>

          <div v-else>
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
      </div>

    <div class="page-bottom transparent" v-if="questionType == 'custom'">
      <div class="content">
        <button @click="check" class="pointer">OMITIR</button>
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
          <button @click="next" class="pointer">CONTINUAR</button>
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
            <button @click="next" class="pointer">
                CONTINUAR
            </button>
          </div>
      </div>
    </transition>
    </div>
    <finish-speed-challenge v-if="completed" @goDashboard="goDashboard" />
  </div>
</template>

<script>
import api from '../api/index'
import FinishSpeedChallenge from '../components/FinishSpeedChallenge'

export default {
  components: {
    FinishSpeedChallenge,
  },
  data() {
    return {
      completed: false,
      id: "",
      current: 0,
      speedChallenge: {},
      mode: 'normal',
      correctInRow: 0,
      totalPoints: 0,
      lives: 3,
      frozenPowerUsed: false,
      frozenTimer: {
        interval: null,
        seconds: 10
      },
      timer: {
        interval: null,
        minutes: 0,
        seconds: 0,
        full: 0
      },
      animation: true,
      status: 0,
      // object for multi question
      multi: {},
      area: "",
      selectedAnswers: [],
      defaultPoint: 5,
      isTimerPaused: false,
    }
  },

  watch: {
    question: function() {
      this.animation = false
      let $this = this
      setTimeout(() => {                    
          $this.printMathJax()
          $this.animation = true
      }, 200)
    },

    current: function() {
      this.printMathJax()
      this.animation = false
      this.area = ""
      this.selectedAnswers = []
      this.mlt = {}
      let $this = this
      setTimeout(() => {                    
          $this.printMathJax()
          $this.animation = true
      this.stopTimer()
      this.calcTimer()
      this.startTimer()
      }, 200)
      console.log('triggered timer from watcher')
    },

    status: function() {
      if (this.status) {
        this.stopTimer()
        clearInterval(this.frozenTimer.interval)
        this.frozenTimer.seconds = 10
        this.frozenTimer.interval = null
        this.isTimerPaused = false
      }

      if (this.status == 1) {
        this.addPoints()
      }

      if (this.status == 2) {
        this.correctInRow = 0
        this.lives = --this.lives
      }

      if ((this.status && ! this.hasNextQuestion) || (this.status && this.lives < 1)) {
        api.createSpeedChallengeResult(this.user.id, {
          speed_challenge_id: this.speedChallenge.id,
          status: this.lives < 1 ? 'failed' : 'complete',
          timer: this.question.timeout ? (this.question.timeout - (this.timer.minutes * 60 + this.timer.seconds)) : 0
        })

        api.addPointSpeedChallenge({user: this.user.id, speed_challenge_id: this.speedChallenge.id,  points: this.totalPoints})
      }
    },

    correctInRow: function() {
      if (this.mode == 'normal' && this.correctInRow == 3) {
        this.correctInRow = 0
        this.mode = 'fast'
      }

      if (this.mode == 'fast' && this.correctInRow == 3) {
        this.correctInRow = 0
        this.mode = 'super-fast'
      }
    },
  },

  computed: {
    user() {
      return this.$store.getters.getUser
    },
    width() {
      return (this.timer.minutes * 60 + this.timer.seconds) / this.timer.full * 100
    },

    question() {
      return this.speedChallenge.questions && this.speedChallenge.questions.length ? this.speedChallenge.questions[this.current] : false
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

    currentMode() {
      return this.mode
    },

    isInputsDisabled() {
      return this.status != 0
    },

    hasNextQuestion() {
      return (this.current + 1) != this.speedChallenge.questions.length
    },

    pointPerAnswer() {
      if (this.mode == 'normal') {
        return this.defaultPoint
      }

      if (this.mode == 'fast') {
        return this.defaultPoint * 2 
      }

      if (this.mode == 'super-fast') {
        return this.defaultPoint * 4
      }
    }
  },

  created() {
    this.id = this.$route.params.id
    this.get(this.id)
    .then(() => {
      this.calcTimer()
      this.startTimer()
    })
  },

  methods: {
    goDashboard() {
      this.$router.push("/subject/" + this.speedChallenge['subject-slug'])
    },

    get(id) {
      return api.getSpeedChallenge(id)
      .then(data => {
        this.speedChallenge = data
      })
    },

    calcTimer() {
      let timeout = 60
      if (this.currentMode == 'normal') {
        timeout = this.question.timeout
      } else if (this.currentMode == 'fast') {
        timeout = this.question.timeout * 0.75
      } else if (this.currentMode == 'super-fast') {
        timeout = this.question.timeout * 0.5
      }
      this.timer.minutes = Math.floor(timeout / 60)                        
      this.timer.seconds = Math.floor(timeout % 60)
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
        // this.wrong()
        this.setStatus(2)
        return
      }
    },

    startTimer() {
      this.timer.interval = setInterval(this.tick, 1000)
    },

    stopTimer() {
      clearInterval(this.timer.interval)
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

          this.setStatus(isCorrect ? 1 : 2)
        }
        return
      }

      if (this.questionType == 'custom') {
        isCorrect = this.question.solutions.some(s => s == this.area)
      }

      this.setStatus(isCorrect ? 1 : 2)

      api.createSpeedChallengeResult(this.user.id, {
          speed_challenge_id: this.speedChallenge.id,
          status: 'complete',
          problem_status: 'success',
          timer: this.question.timeout ? (this.question.timeout - (this.timer.minutes * 60 + this.timer.seconds)) : 0
        })
    },

    correct() {
      console.log('correct answer')
      if (this.hasNextQuestion) {
        this.current = this.current + 1
      }
    },

    wrong() {
      console.log('wrong answer')
      if (this.hasNextQuestion) {
        this.current = this.current + 1
      }
    },

    setStatus(status) {
      this.status = status

      let answer = []

      if (this.status) {

        if (this.questionType == 'regular') {
          answer.push(this.question.answers[this.selectedAnswers[0]])
        }

        if (this.questionType == 'multi') {
          this.selectedAnswers.forEach(selectedIndex => {
            answer.push(this.question.answers[selectedIndex])
          })
        }

        if (this.questionType == 'custom') {
          answer.push(this.area)
        }
      }

      if (this.status == 1) {
        api.createSpeedChallengeProblemResult(this.user.id, {
          speed_challenge_id: this.speedChallenge.id,
          answer: answer,
          problem_status: 'success',
          status: 'complete',
          timer: this.question.timeout ? (this.question.timeout - (this.timer.minutes * 60 + this.timer.seconds)) : 0
        })
      }

      if (this.status == 2) {
        api.createSpeedChallengeProblemResult(this.user.id, {
          speed_challenge_id: this.speedChallenge.id,
          answer: answer,
          problem_status: 'wrong',
          status: 'complete',
          timer: this.question.timeout ? (this.question.timeout - (this.timer.minutes * 60 + this.timer.seconds)) : 0
        })
      }

      if (this.status == 0) {
        this.multi = {}
        this.area = ""
        this.selectedAnswers = []
      }
    },

    next() {
      if ( ! this.hasNextQuestion || this.lives < 1) {
        this.completed = true
        this.setStatus(0)
        return
      }

      if (this.status == 1) {
        this.correctInRow = ++this.correctInRow
        this.correct()
      }

      if (this.status == 2) {
        this.mode = 'normal'
        this.wrong()
      }

      this.setStatus(0)
    },

    addPoints() {
      this.totalPoints += this.pointPerAnswer
    },

    pauseTimer() {
      if (this.status == 0) {
        this.stopTimer()
        if ( ! this.isTimerPaused && ! this.frozenTimer.interval) {
          this.frozenTimer.interval = setInterval(() => {
            this.isTimerPaused = true
            if (this.frozenTimer.seconds > 0) {
              this.frozenTimer.seconds = --this.frozenTimer.seconds
            } else {
              this.startTimer()
              clearInterval(this.frozenTimer.interval)
              this.frozenTimer.interval = null
              this.isTimerPaused = false
              this.frozenTimer.seconds = 10
              this.frozenPowerUsed = true
            }
          }, 1000)
        }
      }
    }
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

.container{
    width: 100%;
    background: url('/img/page38.jpg');
    .main{
        width: 1112px;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        padding: 56px 0;
        // justify-content: space-between;
    }
}
.choose{
    background: #335cfd !important;
    color: #fff !important;
    text-align: center;
    font-size: 0.7em;
    font-weight: 700;
    padding: 12px 15px 12px 15px !important;
    span{
        font-size: 0.7em;
        font-weight: 500;
    }
}

.left{
    width: 57.546%;
    border-right: 1px solid #f6f6f6;
    padding: 60px 40px 45px 87px;
    background: #fff;
    border-radius: 10px;
    .task{
        margin-top: 66px;
        width: 42%;
    margin-left: auto;
    margin-right: auto;
    display: block;
    }
    p{
        margin: 0;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        text-align: center;
        color: #666666;
        font-size: 1.1em;
        margin-top: 70px;
        margin-bottom: 38px;
        
    }
    button{
        padding: 17px 27px;
        font-size: 0.75em;
        background: #d14bf2; /* Old browsers */
        background: -moz-linear-gradient(top, #d14bf2 0%, #8345f0 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(top, #d14bf2 0%,#8345f0 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to bottom, #d14bf2 0%,#8345f0 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d14bf2', endColorstr='#8345f0',GradientType=0 );
        text-decoration: none;
        font-family: "Roboto", sans-serif;
        margin: 0;
        color: #fff;
        padding: 16px 26px;
        font-weight: 700;
        font-size: .8em;
        letter-spacing: 0.09em;
        text-transform: uppercase;
        border-radius: 30px;
        border: none;
        margin-left: auto;
        margin-right: auto;
        display: block;
        margin-top: 57px;
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
    width: 85%;
    border-radius: 10px;
    p{
        position: absolute;
        margin: 0;
        top: -36px;
        right: -69px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        width: 72px;
        height: 72px;
        border-radius: 50%;
        background: #d32f2f;
    }
}
.progress-bar{
    position: absolute;
    height: 8px;
    width: 100%;
    background: #d32f2f;
    border-radius: 10px;
    top: 0;
    transition: all 0.3s;
}

.right{
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 10px;
    width: 26.7%;
    padding-left: 43px;
    padding-right: 43px;
    justify-content: center;

    .response {
      border: 2px solid #0093ec;
      min-width: 200px;
      width: 100%;
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
    h2{
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        color: #2e54fe;
        text-align: center;
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
    p{
        margin: 0;
        background: #faf8f5;
        border: 2px solid #eeebe5;
        color: #999999;
        width: 65.4%;
        border-radius: 6px;
        padding: 12px 0 12px 30px;
    }
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
    margin-top: 21px;
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
    background: #3159fd;
}

.input-box input:checked ~ .checkmark {
    
   border-color: #3159fd;
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

.header{
    display: flex;
    justify-content: center;
    align-items: center;
    .heading{
        margin-right: auto;
        margin-left: auto;
        h3, h5{
            margin: 0;
            font-family: 'Roboto', sans-serif;
            font-weight: 700;
            text-align: center;
        }
        h5{
            color: #999999;
        }
        h3{
            color: #535353;
            font-size: 1.4em;
        }
    }
}


@media(max-width:1112px){
    .container{
    .main{
        width: 88.045%;
        .left{
            width: 53.546%;
        }
    }
    
    }
}

@media(max-width: 900px){
    .main{
        flex-wrap: wrap;
    }
    .left{
        width: 100% !important;
        margin-bottom: 25px;
    }
    .right{
        width: 100%;
    }
}

@media(max-width: 500px){
    .container{
        .main{
            .left{
                padding: 60px 10px;
                .progress{
                    width: 73%;
                }
                p{
                    margin-top: 40px;
                    margin-bottom: 80px;
                }
                .task{
                    margin: 20px 0;
                    width: 100%;
                }
                .progress{
                    p{
                        margin-top: 0;
                    }
                }
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

    .header{
        flex-direction: column-reverse;
        .hearts{
            margin-bottom: 20px;
        }
    }
}

.pointer {
  cursor: pointer;
}

.expression {
  font-size: 5em;
  display: block;
  margin-top: 0;
  text-align: center;
}

.page-bottom.transparent {
  background: transparent;
}
</style>
