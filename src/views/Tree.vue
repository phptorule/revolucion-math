<template>
    <div v-if="tree.quiz && tree.quiz.length">
      <!-- <transition name="fade"> -->
        <div v-if="showItem == 'quiz'" class="container">
            <transition name="slide-down">
                <div class="main" v-if="animation">
                    <div class="left">
                    
                        <p class="nav" v-if="tree.subject">{{ tree.subject.area.title }}
                            <i class="fa fa-angle-right"></i> {{ tree.subject.title }}
                            <i class="fa fa-angle-right"></i>
                            <strong v-if="tree">{{ tree.title }}</strong>
                        </p>
                        
                        <h1>{{ tree.quiz[current].title }}</h1>

                        <div class="progress">
                            <div class="progress-bar" :style="{'width': width + '%'}">
                            </div>
                            <p>{{ timer.minutes }}:<span v-if="('' + timer.seconds).length == 1" >0</span>{{ timer.seconds }}</p>
                        </div>
                    
                        <h1 class="expression" id="expression" v-if="tree.quiz[current].mathjax" v-html="tree.quiz[current].description"></h1>
                        <h1  class="expression" v-else>
                            {{ tree.quiz[current].description }}
                        </h1>

                        <transition name="fade">
                          <description-solution
                            v-if="currentQuizHasDescriptionSolution && status == 2"
                            :descriptionSolution="descriptionSolution"
                          />
                        </transition>
                    
                    </div>
                    
                    <div class="right" v-if="tree.quiz[current].type != 3">
                        <label 
                          v-if="tree.quiz && tree.quiz.length && a" 
                          class="input-box"
                          v-for="(a, index) in tree.quiz[current].answers" 
                          :class="{'correct-answer': status == 1 && selectedAnswers.indexOf(index) != -1, 'incorrect-answer': status == 2 && selectedAnswers.indexOf(index) != -1}"
                          :key="index"
                        >
                          <math 
                            v-if="tree.quiz[current].type == 3" 
                            xmlns="http://www.w3.org/1998/Math/MathML" 
                            v-html="a"
                          ></math>
                          <span v-else>
                            {{ a }}
                          </span>
                          <input 
                            v-if="tree.quiz[current].solutions.length > 1" 
                            @change="response(index)" 
                            v-model="mlt[index]" 
                            :value="index" 
                            type="checkbox"
                            :disabled="isInputsDisabled"
                          />
                          <input 
                            v-if=" ! (tree.quiz[current].solutions.length > 1)" 
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

            <div class="page-bottom" v-if="this.tree.quiz[this.current].type == 3">
                <div class="content">
                    <button @click="check" class="continuar">CHECK</button>
                </div>
            </div>

            <!-- <transition name="slide-down">
                <div class="page-bottom" v-if="false">
                    <div class="content">
                        <button>OMITIR</button>
                    </div>
                </div>
            </transition> -->

            <transition name="slide-down">
                <div class="page-bottom correct" v-if="status == 1 && animation">
                    <div class="content">
                        <div class="icon"><i class="fa fa-check" aria-hidden="true"></i></div>
                        <div class="heding" v-if="textToShow">
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
                            <div class="heding" v-if="textToShow">
                              <h3>{{ textToShow.heading }}</h3>
                              <p>{{ textToShow.text }}</p>
                            </div>
                        </div>

                        <div class="block-right">
                            <button 
                              v-if="currentQuizHasVideo" 
                              @click="seeVideo()"
                            >
                              SEE VIDEO
                            </button>
                            <button 
                              @click="onClickContinueButton" 
                              class="continuar"
                            >
                              CONTINUAR 
                             
                            </button>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
      <!-- </transition> -->
        <transition name="fade">
            <Incorrect 
              v-if="showItem == 'incorrect'"
              @onClickContinuar="setShowItem(nextItemToShow)"
            />
        </transition>
        <transition name="fade">
            <PuzzleGrid 
              v-if="showItem == 'puzzleGrid'" 
              @closePuzzleGrid="closePuzzleGrid($event)" 
              :tree="tree.quiz[current]"
              :puzzles="puzzles"
            />
        </transition>
        <transition name="fade">
            <FourProblemQuiz 
              v-if="showItem == 'fourProblemQuiz'"
              @treeCompletedFromFourProblemQuiz="treeCompletedFromFourProblemQuiz"
            />
        </transition>
        <transition name="fade">
            <Video 
              v-if="showItem == 'video'" 
              @closeVideo="closeVideo" 
              :video="tree.quiz[current].video"
            />
        </transition>
    </div>
</template>
<script>
    import api from '../api';
    import Incorrect from '../components/Incorrect';
    import PuzzleGrid from '../components/PuzzleGrid';
    import Video from '../components/Video';
    import FourProblemQuiz from '../components/FourProblemQuiz';
    import DescriptionSolution from '../components/DescriptionSolution.vue'
    
    export default {
        data() {
            return {
              timer: {
                interval: null,
                minutes: 0,
                seconds: 0,
                width: 100,
                full: 0
              },
              status: 0,
              animation: true,
              mlt: {},
              area: "",
              selectedAnswers: [],
              answ: []
            }
        },    
        components: {
            Incorrect,
            PuzzleGrid,
            Video,
            FourProblemQuiz,
            DescriptionSolution
        },
        created() {
          this.$store.commit('clearTreeData')
          this.$store.commit('clearFourProblemQuizData')
          let { id } = this.$route.params
          this.getTree(id)
          this.readFilters()
          this.getAllAnswerTexts()
        },
        mounted() {
            this.printMathJax()
        },
        computed: {
            tree() {
              return this.$store.getters.getTree
            },

            current() {
              return this.$store.getters.getCurrent
            },

            currentQuizTry() {
              return this.$store.getters.getCurrentQuizTry
            },

            showItem() {
              return this.$store.getters.getShowItem
            },

            currentQuizHasVideo() {
              return this.tree.quiz[this.current].video.length > 0
            },

            currentQuizHasPuzzles() {
              return this.tree.quiz[this.current].puzzle.length > 0
            },

            currentQuizHasFourProblemQuiz() {
              if (this.tree.quiz[this.current].four_problem_quiz) {
                return Object.keys(this.tree.quiz[this.current].four_problem_quiz).length > 0
              } else {
                return false
              }
            },

            currentQuizHasDescriptionSolution() {
              return this.tree.quiz[this.current].description_solution.length > 0
            },

            treeHasNextQuiz() {
              return this.tree && this.tree.quiz && (this.current + 1) != this.tree.quiz.length
            },

            nextItemToShow() {
              let next = 'quiz'

              if (this.showItem == 'quiz') {

                if (this.currentQuizTry == 1) {

                  if (this.status == 1) {
                    next = 'quiz'
                  }

                  if (this.status == 2) {

                    if (this.current == 0) {
                      next = 'incorrect'
                    } else {

                      if (this.currentQuizHasPuzzles) {
                        next = 'puzzleGrid'
                      } else if (this.currentQuizHasFourProblemQuiz) {
                        next = 'fourProblemQuiz'
                      } else {
                        next = 'quiz'
                      }
                    }
                  }
                } else {
                  
                  if (this.status == 1) {
                    next = 'quiz'
                  }

                  if (this.status == 2) {

                    if (this.currentQuizHasFourProblemQuiz) {
                      next = 'fourProblemQuiz'
                    } else {
                      next = 'quiz'
                    }
                  }
                }
              }

              if (this.showItem == 'incorrect') {

                if (this.currentQuizTry == 1) {

                  if (this.currentQuizHasPuzzles) {
                    next = 'puzzleGrid'
                  } else if (this.currentQuizHasFourProblemQuiz) {
                    next = 'fourProblemQuiz'
                  } else {
                    next = 'quiz'
                  }
                } else {

                  if (this.currentQuizHasFourProblemQuiz) {
                    next = 'fourProblemQuiz'
                  } else {
                    next = 'quiz'
                  }
                }
              }

              if (this.showItem == 'video') {
                
                if (this.currentQuizTry == 1) {

                  if (this.currentQuizHasPuzzles) {
                    next = 'puzzleGrid'
                  } else if (this.currentQuizHasFourProblemQuiz) {
                    next = 'fourProblemQuiz'
                  } else {
                    next = 'quiz'
                  }
                } else {

                  if (this.currentQuizHasFourProblemQuiz) {
                    next = 'fourProblemQuiz'
                  } else {
                    next = 'quiz'
                  }
                }
              }

              if (this.showItem == 'puzzleGrid') {
                next = 'puzzle'
              }

              if (this.showItem == 'puzzle') {
                next = 'puzzleGrid'
              }

              if (this.showItem == 'fourProblemQuiz') {
                next = 'quiz'
              }

              return next
            },

            textToShow() {
              let number = 1
              let textToShow = this.texts[0]

              if (this.status == 2) {

                if (this.current == 0) {

                  if (this.currentQuizTry == 1) {
                    
                    if (this.currentQuizHasDescriptionSolution && this.currentQuizHasFourProblemQuiz && ! this.currentQuizHasPuzzles && ! this.currentQuizHasVideo) {
                      number = 1
                    }
      
                    if (this.currentQuizHasDescriptionSolution && this.currentQuizHasVideo && ! this.currentQuizHasFourProblemQuiz && ! this.currentQuizHasPuzzles) {
                      number = 2
                    }
      
                    if ( ! this.currentQuizHasDescriptionSolution && this.currentQuizHasVideo && ! this.currentQuizHasFourProblemQuiz && ! this.currentQuizHasPuzzles) {
                      number = 3
                    }
      
                    if (this.currentQuizHasPuzzles && ! this.currentQuizHasDescriptionSolution && ! this.currentQuizHasVideo && ! this.currentQuizHasFourProblemQuiz) {
                      number = 4
                    }
                  }
                } else {

                  if (this.nextItemToShow == 'fourProblemQuiz') {
                    number = 1
                  } else if (this.nextItemToShow == 'puzzleGrid') {
                    number = 4
                  } else if (this.currentQuizHasDescriptionSolution && this.currentQuizHasVideo) {
                    number = 2
                  } else if (this.currentQuizHasVideo && ! this.currentQuizHasDescriptionSolution) {
                    number = 3
                  }
                }

                if (this.nextItemToShow == 'quiz') {
                  return false
                }
              }

              if (this.status == 1) {
                number = 5

                if ( ! this.treeHasNextQuiz) {
                  number = 8
                }

                if (this.currentQuizTry == 2) {
                  number = 7
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

            width() {
              return (this.timer.minutes * 60 + this.timer.seconds) / this.timer.full * 100
            },

            isInputsDisabled() {
              return this.status != 0
            },

            puzzles() {
              return this.$store.getters.getPuzzles
            },

            texts() {
              return this.$store.getters.getTexts
            },
            
            user() {
                return this.$store.getters.getUser
            },

            descriptionSolution() {
              return this.tree.quiz[this.current].description_solution
            },
        },
        watch: {
          'current': function() {
            this.$store.dispatch('setCurrentQuizTry', 1)
            this.$store.dispatch('setPuzzles', this.tree.quiz[this.current].puzzle)
            this.$store.commit('clearCorrects')
            this.$store.commit('clearPuzzleTries')
            this.$store.commit('clearCurrentParentProblem')
            this.printMathJax()
            this.animation = false
            this.area = ""
            this.selectedAnswers = []
            this.mlt = {}
            let $this = this
            setTimeout(() => {                    
                $this.printMathJax()
                $this.animation = true
            }, 200)
            this.stopTimer()
            this.calcTimer()
            this.timer.interval = setInterval(this.tick, 1000)
            console.log('triggered timer from watcher')
          },
          'status': function() {
              if (this.status) {
                this.stopTimer()
              }

              if (this.status == 1 && ! this.treeHasNextQuiz) {
                api.createResult(this.user.id, {
                  tree_id: this.tree.id,
                  status: 'complete'
              })
            }
          },
        },
        methods: {
            setShowItem(showItem) {
              this.$store.dispatch('setShowItem', showItem)

              if (this.status == 1 && this.treeHasNextQuiz) {
                this.$store.dispatch('setCurrent', this.current + 1)
              } 

              if (this.status == 2 && this.nextItemToShow == 'quiz') {
                this.stopTimer()
                this.calcTimer()
                this.timer.interval = setInterval(this.tick, 1000)
                console.log('timer triggered from setShowitem')
              }

              if (this.status == 2 && (this.showItem == 'puzzleGrid' || this.showItem == 'fourProblemQuiz')) {
                this.$store.commit('setCurrentParentProblem', this.tree.quiz[this.current])
              }

              this.status = 0
              this.selectedAnswers = []
              this.answ = []
              this.mlt = {}
            },

            treeCompletedFromFourProblemQuiz() {
              this.setShowItem('quiz')
              this.status = 1
            },

            onClickContinueButton() {
              if (this.status == 1 && ! this.treeHasNextQuiz) {
                this.$router.push('/subject/' + this.tree.subject.slug)
              }
              this.setShowItem(this.nextItemToShow)
            },

            printMathJax() {
              setTimeout(() => {
                window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, document.getElementById('expression')])
              }, 0)
            },
            
            setOperator(operator) {
              if (this.isInputsDisabled) {
                return
              }
              this.area = this.area + operator
            },

            readFilters() {
                let filter = this.$route.query
                for(var f in filter) {
                    if (this.toCamelCase(f) in this) {
                        this[this.toCamelCase(f)]()
                    }
                }
            },

            toCamelCase(str) {
                return str
                    .replace(/\_(.)/g, function($1) { return $1.toUpperCase(); })
                    .replace(/\_/g, '')
                    .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
            },

            getTypeQuiz() {
                return this.tree.quiz[this.current].solutions.length > 1
            },

            response(answer) {
              let quiz = this.tree.quiz[this.current]

              if (this.selectedAnswers.indexOf(answer) == -1) {
                this.selectedAnswers.push(answer)
              } else {
                this.selectedAnswers.splice(this.selectedAnswers.indexOf(answer), 1)
              }

              if (this.getTypeQuiz()) { // mulity solution 
                  let ids = Object.keys(this.mlt)
                  if(ids.length == quiz.solutions.length) {
                      let check = true;
                      for(var s of quiz.solutions) {
                        if ( ! (ids.indexOf(s + '') + 1)) {
                            check = false
                        }
                      }
                      check ? this.correct() : this.wrong()
                  }
                  return
              }

              if (quiz.solutions.indexOf(answer * 1) + 1) {
                  this.correct(quiz)
                  return false
              }
              this.wrong()
            },

            check() {
              let solutions = this.tree.quiz[this.current].solutions
              let check = solutions.some(s => s == this.area)
              check ? this.correct() : this.wrong()
            },

            correct(quiz) {
              this.status = 1

              api.createQuizResult(this.user.id, {
                  quiz_id: this.tree.quiz[this.current].id,
                  tree_id: this.tree.id,
                  problem_status: 'success',
                  timer: this.tree.quiz[this.current].timeout ? (this.tree.quiz[this.current].timeout - (this.timer.minutes * 60 + this.timer.seconds)) : 0
              })

              if ( ! this.tree.quiz[this.current]) {
                this.printMathJax()
                return
              }
            },

            wrong() {
                api.createQuizResult(this.user.id, {
                    quiz_id: this.tree.quiz[this.current].id,
                    tree_id: this.tree.id,
                    problem_status: 'wrong',
                    timer: this.tree.quiz[this.current].timeout ? (this.tree.quiz[this.current].timeout - (this.timer.minutes * 60 + this.timer.seconds)) : 0
                })
              
              this.status = 2                
            },

            getTree(id) {
                let $this = this;
                api.getTree(id)
                  .then((data) => {
                      $this.$store.dispatch('setTree', data)
                      $this.$store.dispatch('setPuzzles', data.quiz[0].puzzle)
                      $this.calcTimer()
                      $this.timer.interval = setInterval($this.tick, 1000)
                      console.log('triggered timer from ajax')
                      // $this.tree = data;
                      $this.printMathJax()
                  })
            },

            getAllAnswerTexts() {
                let $this = this
                api.getAllAnswerTexts()
                .then(data => {
                    $this.$store.dispatch('setAllAnswerTexts', data.data)
                })
            },

            seeVideo() {
              this.setShowItem('video')
            },

            calcTimer() {
              this.timer.minutes = Math.floor(this.tree.quiz[this.current].timeout / 60)                        
              this.timer.seconds = Math.floor(this.tree.quiz[this.current].timeout % 60)
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
              clearInterval(this.timer.interval);
            },

            closePuzzleGrid(result) {
              console.log(result)
              // this.$store.dispatch('setPuzzles', this.tree.quiz[this.current].puzzle)
              // this.$store.dispatch('setCurrentQuizTry', 2)
              // this.calcTimer()
              // let $this = this
              // this.timer.interval = setInterval($this.tick, 1000)
              if (result.locked) {
                if (result.parentType == 'quiz') {
                  this.setShowItem('quiz')
                  this.$store.dispatch('setCurrentQuizTry', 2)
                  this.calcTimer()
                  this.timer.interval = setInterval(this.tick, 1000)
                } else {
                  this.$store.dispatch('setPuzzles', result.parentPuzzles)
                  if (result.parentPuzzles[0].parent_id == 0) {
                    this.$store.commit('setCurrentParentProblem', this.tree.quiz[this.current])
                  }
                  this.setShowItem('puzzleGrid')
                }
              }
              this.status = 0;
              this.printMathJax()
            },

            // changePuzzles(childPuzzles) {
              // this.$store.dispatch('setPuzzles', childPuzzles)
              // this.setShowItem('puzzleGrid')
            // },

            // setFirstLevelPuzzles() {
              // this.$store.dispatch('setPuzzles', this.tree.quiz[this.current].puzzle)
              // this.$store.dispatch('setCurrentQuizTry', 2)
              // this.calcTimer()
              // let $this = this
              // this.timer.interval = setInterval($this.tick, 1000)
            // },

            closeVideo() {
              this.setShowItem(this.nextItemToShow)
              this.status = 0;
              this.printMathJax()
            },
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

.block-left, 
.block-right {
    display: flex;
}

.block-right {
    button {
        cursor: pointer;
    }
}

.expression {
    font-size: 5em;
    display: block;
    margin-top: 35px;
    text-align: center;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
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

    p.active {
        color: #66bb6a;
        border-bottom: 3px solid #66bb6a;
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

.block-right button:last-child {
    margin-left: 20px;
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
</style>