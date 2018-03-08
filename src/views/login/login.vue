<template>
	<div class="login-section" id="particles-js">
	<!-- <img src="/static/img/login_bg.png" class="bg_img"> -->
		<div class="logining">
			<div class="label">
				<h1>贵州省无线电管理局</h1>
				<h2>Guizhou Radio Administration</h2>
			</div>
			<div class="form">
				<div class="message">{{ validation.firstError('name') }}</div>
				<div class="input-group">
				<figure class="input-wrap">
					<img src="../../../static/img/input_bg.png" class="input-img" />
					<div class="input-user">
						<span class="input-group-user"></span>
						<input type="text" class="form-control" v-model="name" placeholder="请输入用户名" autocomplete="off">
					</div>
				</figure>
			</div>
			<div class="message">{{ validation.firstError('password') }}</div>
			<div class="input-group">
				<figure class="input-wrap">
					<img src="../../../static/img/input_bg.png" class="input-img" />
					<div class="input-user">
					<span class="input-group-password"></span>
					<input type="password" class="form-control" v-model="password" placeholder="请输入密码" autocomplete="off">
					</div>
				</figure>
			</div>
			<!--<div class="rember">-->
			<!--<Checkbox v-model="remember">记住登录</Checkbox>-->
			<!--</div>-->
			<div class="login">
				<el-button type="primary" long class="login-btn" @click="login" :loading="loading">登录</el-button>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped lang='less'>
	@-webkit-keyframes scrollbg {
		0% {
		-webkit-transform: scale(1.1);
		transform: scale(1.1);
		}
		50% {
		-webkit-transform: scale(1);
		transform: scale(1);
		}
		100% {
		-webkit-transform: scale(1.1);
		transform: scale(1.1);
		}
	}
	@keyframes scrollbg {
		0% {
		-webkit-transform: scale(1.1);
		transform: scale(1.1);
		}
		50% {
		-webkit-transform: scale(1);
		transform: scale(1);
		}
		100% {
		-webkit-transform: scale(1.1);
		transform: scale(1.1);
		}
	}
	.login-section {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		font-family: serif;
		background-color: #20364D;
		.logining {
			position: relative;
			width: 400px;
			height: auto;
			/*display: flex;*/
			/*flex-direction: column;*/
			left: 70%;
			border: 1px solid rgba(255, 255, 255, 0.3);
			border-radius: 4px;
			background: rgba(3, 73, 153, 0.5);
			padding-bottom: 40px;
			margin-top: 200px;
			.bg_img {
				position: fixed;
				top: 0;
				left: 0;
				min-height: 100%;
				height: auto;
				width: 100%;
				z-index: -1;
				-webkit-animation-duration: 30s;
				-webkit-animation-name: scrollbg;
				-webkit-animation-timing-function: linear;
				-webkit-animation-iteration-count: infinite;
				animation-duration: 30s;
				animation-name: scrollbg;
				animation-timing-function: linear;
				animation-iteration-count: infinite
			}
			.label {
				padding-top: 40px;
				padding-bottom: 20px;
					h1, h2 {
						color: #fff;
						text-align: center;
					}
					h1 {
						font-size: 28px;
						letter-spacing: 5px;
					}
					h2 {
						font-size: 18px;
						letter-spacing: 2px;
					}
			}
			.form {
				.message {
					color: red;
					width: 80%;
					margin: auto;
					height: 20px;
					text-align: center;
				}
				.input-group {
					width: 75%;
					margin: auto auto 40px auto;
					display: flex;
					flex-direction: row;
					height: 34px;
					.input-wrap {
						position: relative;
						.input-img {
							width: 100%;
							height: auto;
						}
						.input-user {
							position: absolute;
							width: 100%;
							height: auto;
							top: 0;
							left: 0;
							.input-group-user,.input-group-password {
								width: 15%;
								height: 45px;
								background-repeat: no-repeat;
								background-position: center;
								display: inline-block;
							}
							.input-group-user {
								background-image: url('/static/img/login_user.png');
							}
							.input-group-password {
								background-image: url('/static/img/login_pass.png');							
							}
							.form-control {
								display: inline-block;
								width: 80%;
								height: 45px;
								border: none;
								outline: none;
								vertical-align: top;
								background: none;
								color: white;
							}
						}
					}
				}
				.login {
					width: 80%;
					margin: 16px auto auto auto;
					.login-btn {
						width: 100%;
					}
				}
			}
		}
	}
	
	.rember {
		width: 75%;
		height: auto;
		margin: auto;
		color: white;
		letter-spacing: 1px;
		font-size: 14px;
		vertical-align: top;
	}
	input::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #fff;
	}

	input:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #fff;
	}

	input::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #fff;
	}

	input:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: #fff;
	}

	@media (max-width: 1366px) {
		#login {
		width: 360px;
		left: 65%;
		margin-top: 100px;
		}
	}
</style>
<script>
  export default {
    data() {
      return {
        single: false,
        name: '',
        password: '',
        remember: false,
        loading: false,
      }
    },
    validators: {
      name: function(value) {
        return Validator.value(value).required('请输入用户名');
      },
      password: function(value) {
        return Validator.value(value).required('请输入密码');
      },
    },
    created() {
		setTimeout(() => {
			initParticles();
		},500);
    },
    methods: {
      login: function() {
        this.loading = true;
        this.$validate()
          .then(success => {
            if (success) {
              this.$api.user.login({
                userName: this.name,
                hashedPassword: this.password,
              }).then(res => {
                console.log(res,'res');
                this.$api.user.verify({
                  SessionKey:'dsfdsfdsfdsf'
                }).then(r=>{
                  console.log(r,'verify');
                })
                // if (res.success) {
                //   this.loading = false;
                //   localStorage.uid = res.data.id;
                //   localStorage.ability = res.data.ability;
                //   localStorage.user_name = res.data.name;
                //   this.$message.success('登录成功');
                // }
              }).catch((err) => {
                console.log('错误：', err);
                this.loading = false;
                console.log(err);
              })
            } else {
              this.loading = false;
            }
          });
      },
    }
  }

</script>
