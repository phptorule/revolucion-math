<template>
    <div class="container">
        <div class="main">
            <img src="/img/page13.jpg" />
            <h1>Mini Test</h1>
            <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit accusantium tempora quam atque optio minima repudiandae neque voluptas eaque obcaecati, ullam dignissimos. Eius quisquam nisi blanditiis adipisci qui odit inventore.</h3>
            <a href="javascript:;" @click="$emit('goTest')">CONTINUAR</a>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['test']
    }
</script>
<style scoped lang="scss">
.container{
    background: #fafafa;
    width: 100%;
    min-height: calc(100vh - 216px);
    display: flex;
    align-items: center;
    .main{
        -webkit-box-shadow: 0 0 56px -10px #CCCCCC;
    	box-shadow: 0 0 56px -10px #CCCCCC;
        width: 412px;
        padding: 44px 70px;
        text-align: center;
        background: #fff;
        border-radius: 10px;
        margin: 15px;
        margin-right: auto;
        margin-left: auto;
        h1{
            color: #666666;
            font-family: 'Roboto', sans-serif;
            font-weight: 500;
            font-size: 1.6em;
        }
        h3{
            color: #808080;
            font-family: 'Roboto', sans-serif;
            font-weight: 500;
            
        }
        a{
            padding: 15px 30px;
            color: #fff;
            background: #64b5f6;
            width: fit-content;
            font-family: 'Roboto', sans-serif;
            font-weight: 700;
            letter-spacing: 2px;
            border-radius: 30px;
            text-decoration: none;
            font-size: 0.7em;
        }
        .with-padding{
            padding-bottom: 30px;
        }
    }
}

@media (max-width: 576px){
    .main{
    width: 90% !important;
    margin: 40px !important;
    padding: 38px 10px !important;
    }
}
</style>
