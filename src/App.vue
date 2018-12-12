<template>
  <div>
    <Header v-if="$route.meta.isHeader"/>
    <router-view v-if=" ! $route.meta.isHeader || user" />
  </div>
</template>
<script>
    import Header from './Header'
    
    export default {
        components : {
            Header
        },
        computed: {
            user() {
                return this.$store.getters.getUser
            }
        }
    }
</script>
<style>
  /* .list-item {
    display: inline-block;
    margin-right: 10px;
  } */
  .list-enter-active, .list-leave-active {
    transition: all 0.6s;
  }
  .list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
    opacity: 0;
    transform: translateY(-30px);
  }

  .left.four-problem .expression span.mjx-chtml {
      margin: 25px 0 0 0 !important;
  }

  .slide-fade-enter-active,
  .slide-down-enter-active {
    transition: all .3s ease-in-out;
  }
  .slide-fade-leave-active,
  .slide-down-leave-active {
    transition: all .8s ease-in-out;
  }
  .slide-fade-enter,
  .slide-down-enter {
    transform: translateX(-300px);
    opacity: 0;
  }
  
  .slide-fade-leave-to {
    transform: translateX(300px);
    opacity: 0;
  }
  
  .slide-down-leave-to {
    opacity: 0;
  }


  .slide-left-enter-active,
  .slide-left-leave-active {
    transition: all .3s ease;
    position: absolute;
  }

  .slide-left-enter, .slide-left-leave-to {
    transform: translateX(-100px);
    opacity: 0;
  }

  my-date-picker{
    width: 100%;
  }

  .mydp {
    border: none;
    border-radius: none;
  }
  
  .mydp .selectiongroup input{
    border-radius: 30px;
    border: 2px solid #f5f5f5;
    padding: 23px 20px;
    font-weight: 500;
    font-size: 0.75em;
    font-family: "Roboto";
    width: 100%;
}
.mydp .selectiongroup input::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: #adadad;
  }
  .mydp .selectiongroup input::-moz-placeholder { /* Firefox 19+ */
    color: #adadad;
  }
  .mydp .selectiongroup input:-ms-input-placeholder { /* IE 10+ */
    color: #adadad;
  }
  .mydp .selectiongroup input:-moz-placeholder { /* Firefox 18- */
    color: #adadad;
  }
.mydp .btnpicker {
  height: unset;
  margin-top: 11px;
  margin-right: 6px;
}

.mydp .icon-mydpcalendar:before{
  content: "\F133";
  font-family: FontAwesome;
  font-size: 0.75em;
  color: #666666;
}

.mydp .icon-mydpremove:before{
  font-size: 0.75em;
  color: #666666;
}

  body { background: #ECEFF1; color: rgba(0,0,0,0.87); font-family: Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; }
  #message { background: white; max-width: 360px; margin: 100px auto 16px; padding: 32px 24px; border-radius: 3px; }
  #message h2 { color: #ffa100; font-weight: bold; font-size: 16px; margin: 0 0 8px; }
  #message h1 { font-size: 22px; font-weight: 300; color: rgba(0,0,0,0.6); margin: 0 0 16px;}
  #message p { line-height: 140%; margin: 16px 0 24px; font-size: 14px; }
  #message a { display: block; text-align: center; background: #039be5; text-transform: uppercase; text-decoration: none; color: white; padding: 16px; border-radius: 4px; }
  #message, #message a { box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); }
  #load { color: rgba(0,0,0,0.4); text-align: center; font-size: 13px; }
  @media (max-width: 600px) {
    body, #message { margin-top: 0; background: white; box-shadow: none; }
    body { border-top: 16px solid #ffa100; }
  }

  @import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700');

  @font-face {
      font-family: 'proximanova';
      src: url('/fonts/Proxima-Nova-Semibold.woff2') format('woff2');
      font-weight: normal;
      font-style: normal;
  }

  @font-face {
      font-family: 'proximanova-regular';
      src: url('/fonts/Proxima-Nova-Alt-Regular.woff') format('woff');
      font-weight: normal;
      font-style: normal;
  }

  @import '~toastr/build/toastr.css'; 
</style>