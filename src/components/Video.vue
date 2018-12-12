<template>
    <div class="container">
    <h1>
        Check our video!
    </h1>
    <iframe :src="'https://www.youtube.com/embed/' + youtubeId + '?color=ffffff&title=0&byline=0&portrait=0'" frameborder="0"
        webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
        <a href="javascript:;" @click="close()">CONTINUER</a>
    </div>
</template>
<script>
    export default {
        props: ['video'],
        data() {
            return {
                youtubeId: ''
            }
        },
        created() {
            let id = this.getYoutubeId(this.video);
            this.youtubeId = id;
        },
        
        methods: {
            getYoutubeId(url) {
                let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
                let match = url.match(regExp);
                return (match && match[7].length==11) ? match[7] : false;
            },
            close() {
                this.$emit('closeVideo');
            }
        }
    }
</script>
<style lang="scss" scoped>
.container{
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f6f6f6;
    padding: 60px 0;
    min-height: calc(100vh - 336px);
    h1{
        color: #535353;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        margin:0;
        font-size: 1.5em;
    }
    iframe{
        margin: 40px 0;
        border-radius: 20px;
        width: 730px;
        height: 410px;
    }
    a{
        padding: 15px 30px;
        color: #909090;
        background: none;
        border: 2px solid #909090;
        width: fit-content;
        font-family: 'Roboto', sans-serif;
        font-weight: 700;
        letter-spacing: 2px;
        border-radius: 30px;
        text-decoration: none;
        font-size: 0.7em;
    }

    a:hover{
        background: #64b5f6;
        border: none;
        color: #fff;
        padding: 17px 32px;
    }
}

@media (max-width:711px){
    .container{
    iframe{
        width: 100% !important;
        height: 50vw;
    }
}
}
</style>
