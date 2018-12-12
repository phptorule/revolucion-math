<template>
    <div class="container">
        <div class="main">
            <div class="left">
            <div class="header1">
                <h1>Material entregado</h1>
                <a href="#">CREAR NUEVO MATERIAL</a>
            </div>
            <div class="flex-display">
                <div class="box-51-left">
                <div class="circle"></div>
                <h2>Daniel Bustamente</h2>
                <h4>IV-C ENGLISH SCHOOL</h4>
                </div>
                <div class="box-51-right">
                <div class="box-51 first-51">
                    <div class="box-51-rl"></div>
                    <div class="box-51-rr">
                    <div class="data-51">
                        <h4>TIME SPENT IN PLATFORM</h4>
                        <p>Optimal</p>
                    </div>
                    <div class="data-51">
                        <h4>AVERAGE USAGE</h4>
                        <p>1.5 Hours a week</p>
                    </div>
                    </div>
                </div>
                <div class="box-51">
                    <div class="box-51-rl"></div>
                    <div class="box-51-rr">
                    <div class="data-51">
                        <h4>EJE MAS FEURTE</h4>
                        <p>Algebra</p>
                    </div>
                    <div class="data-51">
                        <h4>EJE MAS DEBIL</h4>
                        <p>Geometria</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div class="right">
  <div class="header">
    <h2>Estas viendo</h2>
    <a href="#">CAMBIAR DE CURSO</a>
  </div>
  <div class="r-main">
    <h3>4°C</h3>
    <h3>The English Institute</h3>
    <p class="student">Student name</p>
    <div class="table-item">
      <p>1</p>
      <img src="/img/profile.jpg">
      <p class="name">Joaquin B.</p>
      <a href="#">CHECK INFORMATION</a>
    </div>

    <div class="table-item">
      <p>1</p>
      <img src="/img/profile.jpg">
      <p class="name">Joaquin B.</p>
      <a href="#">CHECK INFORMATION</a>
    </div>

    <div class="table-item">
      <p>1</p>
      <img src="/img/profile.jpg">
      <p class="name">Joaquin B.</p>
      <a href="#">CHECK INFORMATION</a>
    </div>

    <div class="table-item">
      <p>1</p>
      <img src="/img/profile.jpg">
      <p class="name">Joaquin B.</p>
      <a href="#">CHECK INFORMATION</a>
    </div>
  </div>
</div>
    </div>
    </div>
</template>
<script>
    export default {

    }
</script>
<style scoped lang="scss">
h1, h2, h3, h4, h5, p{
    margin: 0;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
}


.container{
    background: #f4f1ea;
    min-height: calc(100vh - 216px);
    .main{
        margin-left: 6.641%;
        min-height: calc(100vh - 216px);
        display: flex;
    }
}

.left{
    padding-top: 70px;
    padding-right: 110px;
    width: 54.826%;
   .header1{
       width: 100%;
   }
    h1{
        color: #535353;
        font-size: 1.5em;
        margin-bottom: 46px;
        flex: 0 0 100%;
        display: inline-block;
        margin-right: auto;
    }
    a{
        font-weight: 700;
        text-decoration: none;
        font-family: 'Roboto', sans-serif;
        color: #fff;
        background: #64b5f6;
        border-radius: 30px;
        padding: 12px 20px;
        display: block;
        font-size: 0.65em;
        letter-spacing: 0.1em;
        float: right;
    }
}



.bottom{
    flex: 0 0 100%;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 30px;
    
}

.bottom-btn{
    background: #fff;
    color: #535353;
    font-weight: 700;
    font-family: "Roboto";
    border: none;
    padding: 25px 30px;
    width: 100%;
    border-radius: 11px;
    text-align: left;
    display: flex;
    justify-content: space-between;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
}

.bottom-btn:focus{
    outline: none;
}

.bottom-btn:after{
    content: "\f0d7";
    font-family: "FontAwesome";

}

.box-51-left{
    padding: 62px 75px;
    border-radius: 7px;
    background: #fff;
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .circle{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: #e1e1e1;
    }
    h2{
        font-size: 1.4em;
        margin: 15px 0;
        color: #666666;

    }
    h4{
        font-size: 0.75em;
        color: #999999;
    }
}
.first-51{
    margin-bottom: 20px;
}
.box-51{
    display: flex;
    .box-51-rr{
        background: #fff;
        height: 94px;
        min-width: 225px;
        border-radius: 0 7px 7px 0;
        padding: 19px 47px 27px 30px;
        h4{
            color: #b4b4b4;
            font-size: 0.8em;
            font-weight: 700;
            margin-bottom: 10px;
        }
        p{
            color: #666;
            font-size: 0.95em;
            margin-bottom: 21px;
        }
    }
}
.box-51-rl{
    width: 140px;
    height: 140px;
    border-radius: 7px 0 0 7px;
    background: #e1e1e1;
}
.flex-display{
    display: flex;
    justify-content: space-between;
}
.rectangle{
    width: 100%;
    height: 135px;
    background: #e1e1e1;
    margin-right: 50px;
}

.image{
    width: 70.7%;
    padding-right: 50px !important;

}

.second-table{
    height: 630px;
}

@media(max-width:1100px){
    app-sidebar{
        display: none;
    }
    .left{
        width: 100%;
    }
    .middle-box{
        flex-grow: 1;
    }
    .box-item{
        height: 240px;
    }
}

@media(max-width:1000px){
    .box-51-left{
        padding: 62px 35px;
    }
    .box-51{
        .box-51-rr{
            min-width: 160px;
        }
    }
}

@media(max-width:817px){
    .left{
        padding-right: 45px;
        .header1{
            flex: 0 0 100%;
        }
    }
    .flex-display{
        flex-wrap: wrap;
    }
    .box-51-left{
        width: 100%;
        margin-bottom: 20px;
    }
    .box-51-right{
        width: 100%;
        align-items: center;
        display: flex;
        flex-direction: column;
    }
}

@media(max-width:704px){
    .box-item{
        height: unset;
        flex-direction: column;
        .left-rec{
            width: 100%;
            border-radius: 10px 10px 0 0;
        }
        .middle-box{
            width: calc(100% - 64px);
        }
        .right-box{
            width: 100%;
            border-radius: 0 0 10px 10px;
        }
    }
    .left{
        padding-right: 60px;
    }
}

@media(max-width:485px){
    .container{
        .main{
            width: 80%;
            margin-right: auto;
            margin-left: auto;
        }
    }
    .header1{
        display: flex;
        flex-direction: column;
        align-items: center;
        h1{
            margin-bottom: 15px;
            margin-right: 0; 
        }
        a{
            float: left;
            margin-bottom: 15px;
        }
    }
    .left{
        padding-right: 0;
    }
    .box-51{
        flex-direction: column;
        width: 100%;
    }
    .box-51-rl{
        width: 100%;
    }
}

h1, h2, h3, h4, h5, p{
    margin: 0;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
}

:host{
    flex-grow: 1;
    height: auto;
    background: #fff;
}

.right{
    background: #fff;
    flex-grow: 1;
    height: auto;
    .header{
        padding: 30px 30px;
        border-bottom: 2px solid #f5f5f5;
        display: flex;
        align-items: center;
        margin-bottom: 50px;
    }
    a{
        text-decoration: none;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        border-radius: 40px;
        padding: 12px 20px;
        letter-spacing: 0.05em;
        font-size: 0.7em;
        background: #64b5f6;
        color: #fff;
    }
    h2{
        color: #535353;
        font-size: 1.45em;
        margin-right: auto;
    }
    .r-main{
        h3{
            color: #535353;
            font-size: 1.1em;
            line-height: 27px;
            padding: 0 30px;
        }
        .student{
            margin-top: 60px;
            color: #707070;
            font-size: 0.75em;
            margin-bottom: 20px;
            padding: 0 30px;
        }
        .table-item{
            display: flex;
            align-items: center;
            border-top: 2px solid #f5f5f5;
            padding: 10px 30px;
            img{
                width: 24px;
                height: 24px;
                border-radius: 50%;
                margin: 0 25px 0 36px;
            }
            p{
                color: #999999;
                font-size: 0.9em;
            }
            .name{
                margin-right: auto;
            }
            a{
                background: #faf8f5;
                color: #adadad;
                font-weight: 700;
                border: 1px solid #eeebe5;
            }

            a:hover{
                background: #64b5f6;
                border: none;
                color: #fff;
                padding: 13px 21px;
            }
        }
    }
}



</style>

