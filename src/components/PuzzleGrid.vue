<template>
    <div>
        <div v-if=" ! puzzle.show" class="container">
            <div class="main">
                <div class="left">
                    <div class="top">
                        <div class="circle"></div>
                        <h2>Lost pieces of the puzzle Eureka!</h2>
                    </div>
                    <div class="bottom">
                        <div 
                            class="box-item item-1" 
                            :class="{'inactive': index && checkAcive(p.id), 'complete': checkComplete(p.id)}" 
                            v-for="(p, index) in problemPuzzles"
                            :key="index"
                        >
                        <div class="with-border">
                            <h4>{{ p.title }}</h4>
                            <div class="svg-icon">
                                <img :src="getPartPuzzle(index, problemPuzzles.length)" alt="">
                            </div>
                        </div>
                        <a class="puzzle-link" v-if="index && checkAcive(p.id) || checkComplete(p.id)">BLOQUEADO</a>
                        <a
                            class="puzzle-link" 
                            @click="openPuzzle(p.id)" 
                            v-else-if="! checkComplete(p.id)"
                        >
                            Recuperar
                        </a>
                        </div>
                    </div>
                </div>
                
                <div class="right">
                    <div class="top">
                        <div class="circle"></div>
                        <h2>Puzzle Eureka!</h2>
                    </div>
                    <div class="bottom">
                        <div class="top-b">
                            <div class="text-image-block">
                                <div 
                                    id="description"
                                    class="tree-description"
                                    :class="{'font-18': tree.type == 3}"
                                >
                                    {{ currentParentProblem.description }}
                                </div>
                                <img 
                                    class="puzzle-image"
                                    :src="puzzleImgSrc" 
                                    alt="alt" 
                                />
                            </div>
                        </div>

                        <a href="javascript:;" v-if=" ! locked">BLOQUEADO</a>
                        <a href="javascript:;" @click="closePuzzleGrid()" class="completed" v-if="locked">DESBLOQUEADO</a>
                    </div>     
                </div>
            </div>
        </div>
        <Puzzle
          v-else 
          @closePuzzle="closePuzzle($event)"
          :puzzle="puzzleCurrent"
          :puzzleCurrentLast="puzzleCurrentLast"
        />
    </div>
</template>
<script>

    import Puzzle from '../components/Puzzle'
    import api from '../api/index'

    export default {
        props: ['tree', 'puzzles'],
        data() {
          return {
            puzzle: {
              show: false,
              current: {},
            },
            // corrects: [],
            puzzleImgSrc: "",
            siblings: [],
          }
        },
        components: {
            Puzzle
        },
        mounted() {
          this.printMathJax()
        },
        updated() {
           this.updateImgSrc()
        },
        created() {
          this.printMathJax()
          this.updateImgSrc()
        },
        computed: {          
            puzzleCurrent() {
                return this.puzzle.current
            },

            problemPuzzles() {
                return this.puzzles
            },

            puzzlesLength() {
                return this.puzzles.length
            },

            puzzleCurrentLast() {
                let last = this.puzzles[this.puzzlesLength - 1]
                let current = this.puzzle.current
                return current.id == last.id
            },

            currentParentProblem() {
                return this.$store.getters.getCurrentParentProblem
            },

            isCurrentParentQuiz() {
                return this.currentParentProblem && ! this.currentParentProblem.hasOwnProperty("parent_id")
            },

            isCurrentParentPuzzle() {
                return this.currentParentProblem && this.currentParentProblem.hasOwnProperty("parent_id")
            },

            currentCorrectsPuzzlesLength() {
                let puzzle_ids = this.puzzles.map((e) => e.id)
                let count = 0
                this.corrects.forEach(correctId => {
                    puzzle_ids.forEach(puzzleId => {
                        if (correctId == puzzleId) {
                            count++
                        }
                    })
                })
                return count
            },

            locked() {
                let locked = false
                let puzzle_keys = this.puzzles.map((e) => e.id)
                locked = puzzle_keys.every((e) => this.corrects.find((p) => p == e))
                return locked
            },

            puzzleTries() {
              return this.$store.getters.getPuzzleTries
            },

            corrects() {
              return this.$store.getters.getCorrects
            },
        },
        methods: {
            checkBluePuzzle(index) {
                let puzzle = this.problemPuzzles[index]
                let puzzleRow
                let prevPuzzle

                if ( ! index && ! this.corrects.indexOf(puzzle.id) + 1) {
                    return true
                }

                if (puzzle) {
                    for(var i in this.tree.puzzle) {
                        puzzleRow = this.tree.puzzle[i]
                        prevPuzzle = this.tree.puzzle[i - 1] || false
                        
                        if (puzzleRow.id == puzzle.id &&
                            prevPuzzle &&
                            this.corrects.indexOf(prevPuzzle.id) + 1) {
                            return true;
                        }
                    }
                }
                
                return false
            },

            checkGreenPuzzle(index) {
                let puzzle = this.problemPuzzles[index]
                
               if (puzzle && this.corrects.indexOf(puzzle.id) + 1) {
                  return true;
                }
            },

            printMathJax() {
              setTimeout(() => {
                window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, document.getElementById('description')])
              }, 0)
            },

            updateImgSrc() {
                this.puzzleImgSrc = '/img/puzzles/' + (this.puzzles.length ) + '/' + (this.currentCorrectsPuzzlesLength ? this.currentCorrectsPuzzlesLength + '.jpg' : 'empty.jpg')
            },

            getPartPuzzle(part, grid) {
                return '/img/puzzles/' + grid + '/part-' + (part + 1) + '.png'
            },

            closePuzzle(result) {
              this.printMathJax()
              this.puzzle.show = false

              if ( ! result.status && result.hasChilds) {
                //if we must go down
                this.$store.commit('setCurrentParentProblem', this.puzzle.current)
                this.$store.dispatch('setPuzzles', result.childPuzzles)
                this.$store.commit('setShowItem', 'puzzleGrid')
              }

              if (result.status) {
                this.$store.commit('setCorrects', result.id)
                // this.corrects.push(result.id)

                if (this.locked && this.puzzle.current.parent_id) {
                  // if must go up to parent puzzles
                  this.getParentSiblings(this.puzzle.current.id)
                }
              }
            },

            closePuzzleGrid() {
              this.$emit('closePuzzleGrid', {
                locked: this.locked,
                parentType: this.isCurrentParentQuiz ? 'quiz' : 'puzzle',
                parentPuzzles: this.isCurrentParentPuzzle ? this.siblings : null,
                puzzle: this.isCurrentParentPuzzle ? this.puzzle.current : null,
              })

              this.$store.commit('setPuzzle', {})
            },

            openPuzzle(id) {
              if (this.locked) {
                return
              }

              let $this = this
              api.getPuzzle(id)
              .then(data => {
                $this.puzzle.show = true
                $this.puzzle.current = data
                $this.$store.commit('setPuzzle', data)

                if ($this.puzzleTries && $this.puzzleTries.hasOwnProperty(data.id)) {
                  $this.$store.commit('setPuzzleTry', {
                    id: data.id, 
                    "try": 2
                  })
                } else {
                  $this.$store.commit('setPuzzleTry', {
                    id: data.id, 
                    "try": 1
                  })
                }

              })
            },

            checkComplete(id) {
              if (this.corrects.indexOf(id) + 1) {
                return true;
              }
            },

            checkAcive(id) {
                for(var i in this.puzzles) {
                    if (this.puzzles[i].id == id && this.corrects.indexOf(this.puzzles[i - 1].id) + 1) {
                        return false;
                    }
                }

                return ! (this.corrects.indexOf(id) + 1);
            },

            getParentSiblings(id) {
              return api.getPuzzleSiblings(id)
              .then(data => {
                  this.siblings = data
                  console.log(data)
              })
            },
        },
        watch: {
            corrects() {  
                console.log(this.puzzleImgSrc)
            },

            puzzle() {
                this.printMathJax()
            },
        }
    }
</script>
<style lang="scss" scoped>
    h1, h2, h3, h4, h5, h6, p, a{
        margin: 0;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
    }

.container{
    width: 100%;
    background: #f6f6f6 !important;
    padding: 54px 0;
    .main{
        width: 1112px;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        justify-content: space-between;
    }
}

.left{
    background: #fff;
    border-radius: 10px;
    width: 48.562%;
    .top{
        display: flex;
        background: #faf8f5;
        align-content: center;
        padding: 20px 25px;
        border-radius: 10px 10px 0 0;
        .circle{
            height: 50px;
            flex: 0 0 50px;
            background: #e6e5e2;
            border-radius: 50%;
            margin-right: 20px;
        }
        h2{
            font-size: 1em;
            color: #7a7979;
            line-height: 45px;
        }
    }
    .bottom{
        padding: 25px 10px;
        display: flex;
        flex-wrap: wrap;
        text-align: center;
     
        
        .box-item{
            border-radius: 16px;
            background: #faf9f5;
            text-align: center;
            width: 29.17%;
            height: 160px;
            margin: 0 10px 50px 10px;
            .with-border{
                border: 2px solid #f4f1ea;
                border-radius: 16px 16px 0 0;
                border-bottom: none;
                padding-top: 20px;
                padding-bottom: 18px;

            }
            h4{
                color: #666666;
                font-size: 0.95em;
                margin: 0 0 20px 10px;
                width: 126px;
                white-space: nowrap;
                overflow: hidden !important;
                text-overflow: ellipsis;
            }
            a{
                background: #65b5f6;
                color: #fff;
                letter-spacing: 0.1em;
                display: inherit;
                border: 2px solid #65b5f6;
                border-radius: 0 0 16px 16px;
                padding: 15px;
                font-size: 0.65em;
                text-transform: uppercase;
                padding: 11px;
            }
            
        }
        .box-item:not(.inactive) .puzzle-link:hover {
            cursor: pointer;
        }
    }
}

.svg-icon{
    width: 80px;
    height: 80px;
    margin-left: auto;
    margin-right: auto;
    img{
        width: 100%;
        height: 100%;
    }
}

.right{
    width: 48.562%;
    border-radius: 10px;
    svg{
        width: 118px;
        height: 115px;
        padding: 7px;
    }
    
    .svg-1{
        fill: #eeeeee;
    }
    .svg-2{
        width: 156px;
        left: 75px;
        fill: #f3f3f3;
    }
    .svg-3{
        width: 156px;
        left: 186px;
        fill: #f7f7f7;
    }

    .svg-4{
        left: 2.4px;
        top: 52px;
        width: 226px;
        height: 200px;
        fill: #f7f7f7;
    }
    .svg-5{
        height: 150px;
        top: 77px;
        width: 161px;
        left: 183px;
        fill: #eeeeee;
    }
    
    
    .svg-blue {
        fill: #65b5f6;
    }

    .svg-green {
        fill: #66bb6a;
    }

    .top-b{
        position: relative;
        margin-left: calc((100% - 373px) / 2);
    
    }
    .bottom-b{
        position: relative;
        margin-left: calc((100% - 373px) / 2);
    
    }
    svg{
        position: absolute;
    }
    .top{
        display: flex;
        background: #faf8f5;
        align-content: center;
        padding: 20px 25px;
        border-radius: 10px 10px 0 0;
        .circle{
            height: 50px;
            flex: 0 0 50px;
            background: #e6e5e2;
            border-radius: 50%;
            margin-right: 20px;
        }
        h2{
            font-size: 1em;
            color: #7a7979;
            line-height: 45px;
        }
    }

    .bottom{
        background: #fff;
        height:366px;
        padding-top: 40px;
        border-radius: 0 0 10px 10px;
        position: relative;
        .image{
            position: absolute;
            padding: 0 10px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -114%);
            z-index: 2;
        }
        img{
            position: absolute;
        }
        a{
            position: absolute;
            bottom: 54px;
            left: 38%;
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

        a.completed {
            background: #66bb6a;
            color: #fff;
        }
    }
}

.item-1{
    svg{
        width: 37px;
        stroke-width: 4px;
    }
}

.item-4{
    svg{
        padding: 2px;
        width: 50px;
        stroke-width: 3px;
    }
}

.item-5{
    .with-border{
        padding-bottom: 26px !important;
        h4{
            margin-bottom: 12px !important;
        }
        .svg-icon{
            margin-right: 42%;
        }
    }
    
    svg{
        padding: 4px;
    stroke-width: 2px;
    }
}
.inactive{
    h4{
        color: #999999 !important;
    }
    svg{
        stroke: #999999;
    }
    a{
        background: #e6e6e6 !important;
        color: #999 !important;
        border-color: #e6e6e6 !important;
    }
}
.complete {
    h4 {
        color: #66bb6a !important;
    }
     svg{
        stroke: #66bb6a;
    }
    a{
        background: #66bb6a !important;
        color: #fff !important;
        border-color: #66bb6a !important;
    }
}

@media(max-width:1112px){
    .container{
    .main{
        width: 88.045%;
    }
    }

    .left{
        .bottom{
            justify-content: center;
            .box-item{
                width: 40%;
            }
        }
    }
}

@media(max-width: 899px){
    .main{
        flex-wrap: wrap;
    }
    .left{
        width:100%;
        margin-bottom: 25px;
    }
    .right{
        width: 100%;
    }
}

@media(max-width:458px){
    .top{
        h2{
            text-align: center;
        }
    }
    .right{
        .top-b, .bottom-b{
            margin-left: calc((100% - 210px) / 2);
        }
        .bottom{
            height: 239px;
            .svg-1{
                width: 66px;
            }
            .svg-2{
                width: 87px;
                left: 44px;
            }
            .svg-3{
                width: 88px;
                left: 109px;
            }
            .svg-4{
                top: 12px;
                width: 130.8px;
                left: 0;
            }
            .svg-5{
                top: 37px;
                width: 87.5px;
                left: 109px;
            }
            .image{
                top: 126px;
                margin-left: calc((100% - 106px) / 2);
                img{
                    width: 100px;
                }
            }
            a{
                bottom: 15px;
                left: 34%;
            }
        }
    }
}

@media(max-width:440px){
    .left, .right{
        .top{
            align-items: center;
            flex-direction: column;
            .circle{
                width: 50px;
                margin: 0 0 10px 0;
            }
            h2{
                line-height: 15px;
            }
        }
    }
    .left{
        .bottom{
            .box-item{
                width: 45%;
            }
        }
    }

}

@media(max-width: 326px){
    .left{
        .bottom{
            .box-item{
                width: 60%;
                margin: 0;
                margin-bottom: 25px;
            }
        }
    }
}

.text-image-block {
    position: relative;
    height: 230px;
    width: 335px;
}

.tree-description {
    display: inline;
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    font-size: 34px;
    font-weight: 500;
}

.tree-description.font-18 {
    font-size: 18px;
}

.puzzle-image {
    position: relative;
}

</style>
