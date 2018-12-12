<template>
  <div class="sd-container">
    <div class="sd-head">
      Solution
    </div>
    <div 
      id="description-solution-content"
      class="sd-content"
      v-html="descriptionSolution" 
    ></div>
  </div>
</template>

<script>
export default {
  props: ['descriptionSolution'],
  
  data() {
    return {

    }
  },

  created() {
    this.printMathJax()
  },

  methods: {
    printMathJax() {
      let $this = this
      setTimeout(() => {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, document.getElementById('description-solution-content')])
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.sd-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 2px solid #666666;
  border-radius: 5px;
  font-family: 'Roboto', sans-serif;
  padding: 20px;
  width: 60%;
  margin: auto;
}

.sd-head {
  display: flex;
  width: 100%;
  font-size: 1em;
  font-weight: 600;
  color: #666666;
}

.sd-content {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 3em;
  font-weight: 600;
  color: #666666;
}
</style>


