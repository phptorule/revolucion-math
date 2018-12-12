<template>
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
</template>

<script>
	export default {
		name: 'SideBar'
	}
</script>

<style scoped lang="scss">
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