<template>
  <div class="main-website-container">
    <header id="home">
      <div class="top-top affix-top" data-spy="affix" data-offset-top="60">
        <div class="container top-menu-first ">
          <div class="logo ">
            <a href="#">
              <img class="home-logo" src="http://wp.revolucionpsu.cl/wp-content/themes/psu/img/logo1.png" alt="logo">            
            </a>
          </div>
        </div>
      </div>    
    </header>
          
    <div class="white-part first-part padding-part-big"> 	
      <div class="container flex">
        <div class="col-lg-6 col-md-6 margin-auto">
           <h2> Dispara tu puntaje <br>en la PSU de Matemáticas</h2>
           <p> Revolución PSU es una plataforma<br> 100% virtual, cuyo algoritmo único en el mundo modela <br>  la instrucción de un profesor <br>particular, integrando lógica,<br> conocimiento matemático y creatividad.</p>         
        </div>   
        <div class="col-lg-6 col-md-6 text-center"> <img class="first-top-img" src="http://wp.revolucionpsu.cl/wp-content/themes/psu/img/first-part-img.jpg"> </div>      
      </div>
      <div class="container">
        <div class="col-lg-12 col-md-12">
          <div class="left text-center small-center">
            <div class="free-trail-blue">
                <a href="#contact" style="display: block; margin-bottom: 5px" v-smooth-scroll>PRUEBA GRATIS</a>                
                <a href="/login" style="display: block; margin-bottom: 5px" v-smooth-scroll>Login</a>
                <a href="/register" style="display: block;" v-smooth-scroll>Register</a>
            </div>
            <p class="blue">No credit card required</p>
          </div>
          <div class="left margin-left-50 video-small">
            <div class="video-part blue-color">  

               <button type="button" class="btn btn-primary video-btn" data-toggle="modal" data-target="#myModal" data-src="" >
                   <img class="video-img" src="http://wp.revolucionpsu.cl/wp-content/themes/psu/img/video.png"> Ver Video
               </button>

               <!-- Modal -->
                <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModal" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">                    
                      <div class="modal-body">

                        <button type="button" class="close cross" data-dismiss="modal" aria-label="Close">                      
                          <span aria-hidden="true">&times;</span>
                        </button>        
                        <!-- 16:9 aspect ratio -->
                        <div class="embed-responsive embed-responsive-16by9">
                          <iframe id="video" width="560" height="315" src="https://www.youtube.com/embed/CwaqqjY-zs4" frameborder="0" allow="autoplay; encrypted-media"></iframe>
                        </div>
                                                     
                      </div>

                    </div>
                  </div>
                </div> 

            </div> 
          </div>    
        </div> 
      </div> 
    </div>

    <div class="blue-gradient third-part padding-part">   
      <div class="container flex">           
         <div class="col-lg-7 col-md-6 col-sm-12 third-right">
           <h3 class="white">¿Cómo funciona?</h3>           
           <p class="white">Si un alumno no sabe resolver un ejercicio, lo guiamos con ejercicios más simples hasta que POR SÍ MISMO adquiera las herramientas para resolver el ejercicio original. <br>
                <br>Este método educativo se llama <b>construccionismo</b>.</p>        
         </div>
          <div class="col-lg-5 col-md-6 col-sm-12 third-img-up"><img class="" src="http://wp.revolucionpsu.cl/wp-content/themes/psu/img/blue-pic.png"></div>
      </div>
    </div>


    <div class="white-part fourth-part contact" id="contact">   
      <div class="container text-center">         
          <h3 class="blue-color">Prueba el algoritmo y descubre la Revolución</h3>                  
          <form action="/action_page.php">            
            <input v-validate="'required'" :class="{'has-error': errors.has('Nombre'), 'has-success' : ! errors.has('Nombre') && submited}" type="text" id="firstname" name="Nombre" placeholder="Nombre*" v-model="form.name" />           
            <input v-validate="'required|email'" :class="{'has-error': errors.has('Email'), 'has-success' : ! errors.has('Email') && submited}" type="text" id="email" name="Email" placeholder="Email*"  v-model="form.email" />
            <input v-validate="'required:password'" :class="{'has-error': errors.has('Contraseña'), 'has-success' : ! errors.has('Contraseña') && submited}"  name="Contraseña" type="password" placeholder="Crea tu Contraseña*"  v-model="form.password" />
            <div class="free-trail-blue text-center">
                <a class="form-button" href="javascript:;" @click="submit()"> 
                    <span class="text-center">COMENZAR MI PRUEBA GRATIS <b>*No requiere trajeta de crédito</b>
                    </span>
                </a>
            </div>
            
           
            <span class="small"> <i class="material-icons">phone_iphone</i> <span class="small-text">Cualquier duda que tengas contactanos a nuestro Whatsapp: +569XXXXXXX</span></span>
          </form>          
      </div>    
    </div>
    <div class="violet-gradient third-part fifth-part padding-part">   
      <div class="container flex">  
         <div class="col-lg-7 col-md-6 col-sm-12 col-xs-12 third-img-up"><img class="" src="http://wp.revolucionpsu.cl/wp-content/themes/psu/img/reading.png"></div>         
         <div class="col-lg-5 col-md-6 col-sm-12 col-xs-12 third-right">
           <div class="float-right">
             <h3 class="white "> Nuestro objetivo es desarrollar  el pensamiento</h3>
             <p class="white ">Para triunfar en la PSU no basta con memorizar. Nuestro algoritmo te lleva a desarrollar tu lógica y creatividad.</p>        
           </div>
         </div>
      </div>
    </div>
    <div class="white-part sixth-part padding-part-boxes">
    	<h3 class="blue-color text-center">Elige la opción que prefieras</h3>   
      <div class="container flex">      	
         <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 text-center left-box-up">
           <div class="price-box-left">  
  	         <h3 class="">Plan Explorador</h3>
  	         <div class="text-center price"> <sup>$</sup><b>0/</b> MES</div> 
  	         <p> Acceso limitado<br> a la platforma</p>  
  	         <div class="free-trail-blue">
                   <a href="#contact" v-smooth-scroll>PRUEBA GRATIS</a>
               </div>         
         	 </div> 
         </div>         
         <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 right-six text-center">
           <div class="price-box-right">  
  	         <h3 class="">Plan Revolucionario</h3>
  	         <div class="text-center price"> <sup>$</sup><b>5900/</b> MES</div>
  	         <p>Acceso completo</p>   
  	         <div class="free-trail-blue"><a href="/paid/register">COMENZAR</a></div>               
           </div> 
         </div>

      </div>
    </div>
    <div class="green-gradient ">   
      <div class="container flex">                 
         <div class="col-lg-6 col-md-6 col-sm-12 third-right">
           <h3 class="white">¿Por qué sólo en Matemática?</h3>     
          <p class="white">El método construccionista que desarrollamos en Revolución PSU, se aplica naturalmente a matemática más que a otras asignaturas.
        <br><br>Actualmente estamos investigando cómo aplicar el sistema en otras materias.
        </p>    

         </div>
         <div class="col-lg-6 col-md-6 col-sm-12 third-img-up text-center fifth-part"><img class="last-img" src="http://wp.revolucionpsu.cl/wp-content/themes/psu/img/school.png"></div>
      </div>
    </div>
  </div><!-- /container -->
</template>
<script>
    import api from '../api'
    export default {
        data() {
            return {
                form: {
                    name: '',
                    email: '',
                    password: '',
                    redirect_uri: location.host  + '/login'
                },
                submited: false
            }
        },
        methods: {
            submit() {
                this.submited = true
                let $this = this
                this.$validator.validate().then(res => {
                    if (res) {
                        api.createDemoUser(this.form)
                            .then((data) => {
                                let params = {
                                    message: 'Ahora puedes ingresar a la plataforma con el link que te enviamos a:',
                                    email: $this.form.email
                                }
                                $this.$router.push({name:'success', params})
                            })
                    }
                })                
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '~bootstrap/scss/bootstrap.scss';
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
    @import url('https://fonts.googleapis.com/css?family=Open+Sans');

    /*
    Theme Name: WP ConcordSoft Basic Bootstrap Thema
    Author: Mladen PrijiД‡
    Author URI: http://concordsoft.com/
    Version: 1.0
    Tags: responsive, white, bootstrap

    */

    @font-face {
        font-family: NexaBlack;
        src: url("/fonts/NexaBlack.otf");
    }
    @font-face {
        font-family: Hero;
        src: url("/fonts/Hero.otf");
    }

    /*Start*/
    button:focus {
        outline:0;    
    }
    a:hover{
        text-decoration:none;    
    }
    html, body {
    margin: auto 0; 
    font-family: Hero;
    }
    /* Header */
    .affix-top{
        background:#fff;    
    }
    .navbar {   
        padding: 0rem 1rem;
    }
    .navigation .main-menu .nav-item a {
        color: #acacac;
        font-size: 15px;
        font-weight: 600;   
        letter-spacing: 1px;
        padding-bottom: 7px;
    }
    .navigation .main-menu .nav-item {
    padding: 0 2%;
    }
    .navigation .main-menu .nav-item.active a, .navigation .main-menu .nav-item a:hover {
    border-bottom: 7px solid #e1e1e1;
    color:#1e3598;
    }
    .navigation .main-menu {
    padding-top:15px;
    display: inherit;
    justify-content: inherit;
    align-items: inherit;
    list-style-type: none; 
    width:100%;  
    }
    .logo {  
    flex-basis: 20%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    display: -webkit-flex;
    -webkit-align-items: center;
    padding: 5px;
    padding-left:15px;
    }
    .logo img.home-logo {
    width: 130px;
    float:left;
    margin-right:10px;
    }
    .navigation {  
    width:40%;
    align-items: center;
    -webkit-align-items: center;
    }
    .free-trail{
    flex-basis: 20%;
    margin:auto 0;
    }
    .free-trail a{  
    color:#acacac;
    border:1px solid #1e3598;
    border-radius:30px;
    padding:5px 25px;
    font-size:17px;
    }
    .free-trail a:hover{  
    background:#fff;
    transition: all .5s ease-in-out 0s;
    color:#005b7f;
    }
    .video-part button, .video-part button:hover, .video-part button:focus, .btn-primary:not(:disabled):not(.disabled):active {  
    background:transparent;
    border:0;
    color:#1e3598;
    outline:none;
    box-shadow: none;
    }

    .modal-dialog {
        max-width: 620px;
        margin: 50px auto;
    }
    .modal-body {
    position:relative;
    padding:0px;
    }
    .close {
    position:absolute;
    right:-30px;
    top:-20px;
    z-index:999;
    font-size:2rem;
    font-weight: normal;
    color:#fff!important;
    opacity:1;
    }

        
    /* All */
    .no-marg-bottom{
    margin-bottom:0;
    }
    .white-part{
    background: #fff;
    }
    .grey-part{
    background: #d7d7d7;
    }
    .blue-part{
    background: #1e3598;
    }
    .blue-color{
    color: #1e3598;
    }
    .blue{
    color: #1e3598;
    font-size: 14px;
    letter-spacing: 0.2px;
    margin-top: 10px;  
    }
    .flex {
    display: flex;
    justify-content: space-around;
    }
    .flex-start {
    display: flex;
    justify-content: flex-start;
    }
    .flex-a-center {
    align-items: center;
    }
    .flex-a-end {
    align-items: flex-end;
    }
    .h3-title {
    color:#808080;
    font-weight:600;
    }
    p {
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 1px;
    margin-bottom: 30px;
    color:#808080;
    }
    .white {
    color:#fff;
    }
    h3 {
    margin-bottom: 20px;
    }   
    .margin-auto{
    margin: auto 0px;
    }  
    .left {
    float:left;
    }  
    .margin-left-50{
    margin-left:50px;
    }  
    .blue-gradient { background: linear-gradient(to right, #070772 , #67bdf4);}

    .violet-gradient { background: linear-gradient(to right, #e4e3fb , #716f9d);}
    .green-gradient {  background: linear-gradient(to bottom right, #2f4442, #43605e);}
    .float-right{
    float:right;
    }  
    /* First-part */

    .padding-part{
    padding:60px 0;
    }
    .padding-part-boxes{
    padding:80px 0;
    }
    .padding-part-big{
    padding:70px 0 160px;
    }
    .first-part .first-top-img{
    width:90%;
    }
    .video-img{
    width: 45px!important;
    float: left;
    margin-top: -10px;
    margin-right: 15px;
    }
    h2{    
    color:#1e3598;  
    text-transform: uppercase;
    font-size: 36px;
    }
    .first-part h2{    
    line-height:1.4;
    margin-bottom:30px;
    }
    .free-trail-blue a, input.submit{
    background:#1e3598; 
    color:#fff;
    padding:7px 50px;
    font-size:18px;
    border-radius:30px;
    border:1px solid #1e3598;
    box-shadow: 0px 8px 12px rgba(30, 52, 152, 0.4);
    }
    .free-trail-blue a:hover, input.submit:hover{  
    background:#fff; 
    transition: all .5s ease-in-out 0s;
    color:#1e3598;
    }
    /* Second-part */
    .second-part {
    position:relative;
    }
    .second-part img{
    width:55%;
    }
    .second-part img.play{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width:70px;
    cursor:pointer;
    }
    .second-part img.play:hover{
    opacity:0.8;
    }
    /* Third-part */
    .third-part img{
    max-width:100%;
    height:350px;
    }
    .third-right{
    margin:auto 0;
    }
    /*Fourth-part*/
    .fourth-part{
    padding:80px 0 30px;
    }
    input {
    width: 100%;
    border: 1px solid #1e3598;
    background: transparent;
    padding: 4px 10px;
    margin-bottom: 50px;
    font-size: 18px; 
    }
    ::-webkit-input-placeholder {
    color: #1e3598;    
    }
    ::-moz-placeholder {
    color: #1e3598;
    }
    :-ms-input-placeholder {
    color: #1e3598;
    }
    :-moz-placeholder {
    color: #1e3598;
    }
    form .submit{  
    margin: 20px 0 10px;
    padding: 7px 30px;
    width:auto;
    font-size:16px;
    }
    form span{  
    display:block;
    }
    span.small{
    color: #000;
    font-size: 14px;
    margin-top: 10px;
    display:block;
    }
    span.small .material-icons{
    float:left;
    }
    .contact form {
    width:350px;
    margin:80px auto 20px;
    }
    .form-button {
        position: relative;
        width: 300px;
        height: 60px;
        display: block;
        margin:60px auto 30px;
        font-size:16px;
    }
    .form-button input{
        border:0;
    }
    .form-button span{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width:90%;
        font-size:16px;
    }
    .form-button span b{
        font-weight:100;
        font-size:12px;
        display:block;
    }
    /* Sixth-part */
    .sixth-part .right-six{ 
    padding-left: 0;
    }
    .price-box-right{
    background:#e4e3fb;  
    width:350px;
    padding:45px 20px 50px;
    margin-top:40px;
    margin-left: -1px;
    border:1px solid #c6cff1;  
    border-left:1px solid #e4e3fb;
    }
    .sixth-part .price{
    font-size:30px;
    color: #1e3598;
    padding-bottom:15px;
    margin: 30px 0;
    }
    .price-box-left p{
    margin-bottom: 60px;
    }
    .price-box-right p{
    margin-bottom: 40px;
    }
    .sixth-part .price b{
    font-size:68px;  
    }
    .sixth-part .price sup {    
    font-size: 32px; 
    top: -0.9em;   
    }
    .price-box-left{
    border:1px solid #c6cff1;
    width:350px;
    padding:80px 20px 70px;
    float:right;
    }
    .left-box-up{    
    padding-right:0;   
    }
    .last-img{    
    height:480px;   
    }
    .padding-part-boxes h3{    
    margin-bottom:70px;   
    }
    /* Footer */
    footer{   
    padding:30px 0; 
    background:#000;    
    }
    p.blue-footer{    
    color:#1081ae; 
    margin-bottom:0; 
    font-size:16px;  
    }


    @media (min-width: 992px) {
    .container {
        max-width: 1100px;
    }
    }
    @media (min-width: 1200px) {
    .container {
        max-width: 1190px;
    }
    }


    @media only screen and (max-width:1199px){
    .navigation {
        width: 60%;    
    }
    .flex-a-center {
        align-items: inherit;
    }
    .navigation{
        justify-content: flex-end;    
        float: right;   
        padding:15px 0 0px 15px;
    }
    .navigation button .material-icons{
        color: #fff;
    }
    .free-trail {
        justify-content: flex-start;
        flex-basis: 30%;
    }
    .affix-top{
        position:fixed;
        width:100%;
        z-index:3;
    }
    .affix-top .flex {
        display: inherit;    
    }
    .free-trail{
        position:absolute;
        top: 30px;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .logo {
        float:left;    
    }
    .navigation .main-menu .nav-item {
        padding: 5px 2%;
    }
    .navigation .main-menu .nav-item a {   
        font-size: 17px;  
        padding-bottom: 3px;
    }
    .navigation .main-menu .nav-item.active a, .navigation .main-menu .nav-item a:hover {     
        border-bottom: 3px solid #e1e1e1;
    }
    .navigation .main-menu{
        padding-bottom: 20px;
    }
    .first-part{
        padding-top: 90px;
    }
    }
    @media only screen and (max-width:769px){
    .flex{
        display:inherit;
    }
    h2 {    
        font-size: 28px;
    }
    .second-part img {
        width: 70%;
        height: auto;
    }
    .third-img-up {
        text-align:center;
        margin-bottom:20px;
    }
    .third-img-up img {
        height:250px;
    }
    .h3-title{
        text-align:center;
    }
    .small-top{
        clear:both;
    }
    .sixth-part p {  
        margin-bottom: 10px;    
    }
    .sixth-part .price {   
        padding-bottom: 30px;
    }
    .sixth-part .right-six {
        border-left: 0;
        padding-left: 15px;
    }
    .logo {   
        justify-content: center;
        float:none;    
    }
    .small-center{
        float: none;
        margin: 40px auto 0;
    }
    .padding-part-big {
        padding: 70px 0 90px;
    }
    .float-right {   
        float: none!important;
        margin-top:30px;
        text-align: center;
    }
    .violet-gradient{   
        height:600px;
    }
    .left-box-up {
        padding-right: 15px;
    }
    .price-box-left {       
        padding: 40px 20px 40px;
        float: none;
        text-align: center;
        margin: 0 auto;
    }
    .price-box-right {   
        width: 350px;
        padding: 40px 20px 40px;    
        float: none;
        margin: 30px auto 0;
    }
    .padding-part-boxes h3 {
        margin-bottom: 40px;
    }
    .sixth-part .price {
        padding-bottom: 0px;
    }
    .sixth-part .price b {
        font-size: 60px;
    }
    .green-gradient {
        padding: 30px 0;
        text-align: center;
    }
    .padding-part,.padding-part-big {   
        text-align: center;
    }
    header{
        padding-bottom: 50px;
    }
    .first-part .video-small{
        float:none;
        margin:0 auto;
    }
    .first-part .video-small img{
        float:none;    
    }
    .modal-open .modal {
        padding-right: 0!important;
        display: block;
        width: 90%;
        margin: 40px auto;
    }
    .close {    
        right: 10px;
        top: -40px;   
    }
    }
    @media only screen and (max-width:480px){
    .free-trail {   
        top: 10px;
        left: inherit;    
        right: 15px;
        transform: inherit;
    }
    .free-trail a {     
        padding: 3px 15px;
        font-size: 14px;
    }
    h2 {
        font-size: 24px;
    }
    .logo{
        padding-top: 10px;
    }
    .third-part img {   
        height: 150px;
    }
    h3 {
        font-size: 24px;
    }
    .navigation {    
        padding: 35px 0 0px 15px;
        width:45%;
    }
    .sixth-part .price span {
        font-size: 52px;   
    }
    .navigation .main-menu {   
        width: 150px;
        text-align:right;
    }
    .navigation button{
        padding-right: 0;
    }
    .violet-gradient{   
        height:500px;
    }
    .contact form {
        width: 80%;   
    }
    .price-box-left, .price-box-right {   
        width: 100%;    
    }
    .sixth-part .price b {
        font-size: 46px;
    }
    .form-button {   
        width: 100%; 
        height: 70px;    
        margin: 10px auto 30px;  
    }
    }

    .modal .html5-video-player .ytp-pause-overlay, .modal .ytp-expand-pause-overlay .ytp-pause-overlay{   
    display:none!important;    
    }

    .has-error {
        border: 2px solid darkred;
    }
</style>