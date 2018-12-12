<template>
	<div>
		<div class="header">
			<div class="inner">
				<div class="block left">
					<div class="title">Class session</div>
					<div>School: {{school.name}}</div>
					<div>Class: {{klass.name}}</div>
				</div>
				<div class="block right">
					<div class="title">Session Duration: {{format(time.h)}} : {{format(time.m)}} : {{format(time.s)}}</div>
					<div>
						<button type="button" class="blue button" @click="finish">FINISH SESSION</button>
					</div>
				</div>
			</div>
		</div>
		
		<div class="wrap">
			<div class="right">
				<div class="r-main">
					<div class="table-item" v-for="(student) in sortedStudent" :key="student.id">
						<div class="student-item" @click="shows[student.id] = ! shows[student.id]; printMathJax()">
							<p>{{student.id}}</p>
							<img src="/img/profile.jpg">
							<p class="name">{{student.name}}</p>
							<div class="point" :class="activityClass(student)"></div>
						</div>
						
						<div class="wrong-answer" v-show="shows[student.id]">
							<p>
								Problem: 
								<span class="expression">{{ student.last.description }}</span>
							</p>
						</div>
				    </div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '../api'

	export default {
		name: 'TeacherSession',
		data() {
			return {
				students: [],
				startSession: new Date(),
				session: false,
				klass: {},
				school: {},
				stop: false,
				time: {
					h: 0,
					m: 0,
					s: 0,
				},
				shows: [

				]
			}
		},
		created() {
			this.startTimer()
			this.getSchool()
			this.getClass()
		},
		beforeDestroy() {
			this.stop = true
		},
		computed: {
			sortedStudent() {
				return this.students.sort((a) => {
					return a.status == 'wrong' ? -1 : 1
				})
			}
		},
		methods: {
			printMathJax() {
				window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, document.getElementsByClassName('expression')])
			},
			getSchool() {
				api.getTeacherSchool()
				.then(res => {
					this.school = res
				})
			},
			getClass() {
				api.getClass(this.$router.history.current.params.klassId)
				.then(res => {
					this.klass = res
					this.createSession()
				})
			},
			getStudents() {
				api.getClassStudents(this.$router.history.current.params.klassId, this.session)
				.then(res => {
					this.students = res
					this.printMathJax()
					setTimeout(() => {
						if (!this.stop) {
							this.getStudents()
						}
					}, 5000)
				})
			},
			format(num) {
				return num > 9 ? num : `0${num}`
			},
			activityClass(student) {
				let activity = student.activity

				if (student.status == 'wrong') {
					return 'wrong'
				}

				if (activity) {
					let studentTime = new Date(activity*1000);
					let currentTime = new Date();
					let diffInSeconds = (currentTime - studentTime) / 1000
					if (diffInSeconds < 120) {
						return 'online'
					}
				}
				
				return 'offline'
			},
			createSession() {
				const data = {
					from: this.startSession,
					class_id: this.klass.id,
				}
				api.saveSession(data)
				.then(res => {
					this.session = res.data
					this.getStudents()
				})
			},
			startTimer() {
				setTimeout(() => {
					this.time.s += 1
					if (this.time.s == 60) {
						this.time.s = 0
						this.time.m += 1
						if (this.time.m == 60) {
							this.time.m = 0
							this.time.h += 1
							if (this.time.h == 24) {
								this.time.h = 0
							}
						}
					}
					if (!this.stop) {
						this.startTimer() 
					}
				}, 1000)
			},
			finish() {
				this.stop = true
				this.$router.push('/profile/teacher')
			},
		}
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

.wrap{
	display: flex;
    justify-content: center;
}

.header{
	display: flex;
	justify-content: center;
	.inner{
		display: flex;
	    justify-content: space-between;
		margin-bottom: 20px;
		margin-top: 20px;
		width: 430px;
		.block{
			padding: 15px;
			.title{
				margin-bottom: 15px;
			}
		}
		.block.left{
			padding-left: 0;
		}
		.block.right{
			padding-right: 0;
		}
	}
	.button{
        text-decoration: none;
        font-family: 'Roboto', sans-serif;
        font-weight: 700;
        border-radius: 40px;
        padding: 12px 20px;
        letter-spacing: 0.05em;
        display: inline-block;
        background: #64b5f6;
        color: #fff;
        font-size: 0.7rem;
        border: 1px solid #64b5f6;
        cursor: pointer;
	}
	.button:focus{
        outline: none;
        border-color: #64b5f6;
    }
}

.right{
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
    	background: #fff;
    	display: inline-block;
    	width: 430px;
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
            padding: 15px 30px;
			flex-direction: column;
			.student-item {
				display: flex;
				width: 100%;
				cursor: pointer;
			}
			.wrong-answer {
				padding: 20px;
				width: 100%;
				span {
					color: #333;
					font-size: 44px;
					vertical-align: middle;
				}
			}
            .point{
            	border: 2px solid #f5f5f5;
            	width: 15px;
            	height: 15px;
            	border-radius: 50%;
            }
            .point.online{
            	background-color: #13A952;
            }
            .point.offline{
        		background-color: #f5f5f5;
            }
			.point.wrong{
        		background-color: darkred;
            }
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