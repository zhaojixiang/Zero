<template>
    <section class="login-section" id="particles-js">
        <el-form :model="loginForm" class="section-form">
            <div class="label">
                <h1>贵州省无线电管理局</h1>
                <h2>Guizhou Radio Administration</h2>
            </div>
            <el-row class="form-input">
                <el-input type="text" placeholder="请输入用户名" :maxlength="11" v-model="loginForm.userName" class="text-box" ref="account" v-on:keyup.enter="CheckLogin" />
            </el-row>
            <el-row class="form-input">
                <el-input type="password" placeholder="请输入密码" :maxlength="30" v-model="loginForm.passWord" class="text-box" ref="password" v-on:keyup.enter="CheckLogin" />
            </el-row>
            <el-row>
                <el-button :loading="logining" class="button" @click="CheckLogin">登录</el-button>
            </el-row>
            <el-row class="remember">
                <el-col :span="12" class="remember-me">
                <el-checkbox v-model="rememberMe">记住账号</el-checkbox>
                </el-col>
            </el-row>
        </el-form>
    </section>
</template>

<script>
export default {
	data() {
		return {
			logining: false,
			loginForm: {
				userName: "",
				passWord: ""
			},
			rememberMe: false
		}
	},
	methods:{
		// 登陆 监测
		CheckLogin() {
			if (this.loginForm.userName === "") {
				this.$refs.account.focus();
				this.$message.warning("请输入登录帐号");
			}
			else if (this.loginForm.password === "") {
				this.$refs.password.focus();
				this.$message.warning("请输入登录密码");
			}
			else {
				this.logining = true;
				setTimeout(() => {
					this.logining = false;
				},3000);
				this.postLogin();
			}
		},
		// 登录
		postLogin() {
			this.$api.login(this.loginForm).then( res => {
				let { msg,success,data } = res;
				if (success) {
					if (this.rememberMe) sessionStorage.setItem('userInfo',JSON.stringify(data.logonUser));
          sessionStorage.setItem('sessionKey',data.sessionKey);
          sessionStorage.setItem('freshFlag',false);          
					this.$message.success('登录成功！跳转中');
					setTimeout(()=>{
						this.$router.replace('/');
					},1000)
				} else {
					this.$message.warning(msg);
				}
			})
		}
	},
	created () {
		let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
		if ( userInfo !== null) {
			this.rememberMe = true;
			this.loginForm.userName = userInfo.userName;
		}
	},
	mounted() {
		setTimeout(() => { initParticles(); }, 300);
	}
}

</script>

<style scoped lang="less">
.login-section {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  font-family: serif;
  background-color: #20364D;
  .section-form {
    position: absolute;
    width: 400px;
    height: 490px;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -240px;
    background: rgba(0, 0, 0, .21);
    border-radius: 15px;
    text-align: center;
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
    .form-input {
      margin-bottom: 10px;
      .el-input {
          width: 79%;
      }
      .el-select {
        width: 80%;
        .el-input__inner {
          border: 0;
          color: #fff;
          border-radius: 0;
          background: transparent;
          border-bottom: 1px solid #273A4F;
        }
      }
    }
    input.text-box {
      width: 80%;
      height: 38px;
      text-indent: 8px;
      background: none;
      color: #fff;
      border-bottom: 1px solid #273A4F;
      &::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #97A8BE;
      }

      &::-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #97A8BE;
      }

      &::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #97A8BE;
      }

      &::-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color: #97A8BE;
      }
    }
    .button {
      width: 315px;
      background: #0B9EFF;
      cursor: pointer;
      height: 50px;
      color: #FFF;
      border: 0;
      font-size: 1em;
      border-radius: 6px;
      margin-top: 10px;
      font-size: 1.3em;
    }
    .remember {
      padding: 20px 50px;
      .remember-me {
        text-align: left;
      }
      .el-checkbox__inner {
        background-color: transparent;
        border-radius: 2px;
        border: 1px solid #FFF;
      }
      .el-checkbox__label {
        font-family: serif;
        color: #FFF;
        line-height: 1;
      }
    }
  }
}
</style>