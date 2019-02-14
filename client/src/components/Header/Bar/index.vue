<template>
	<header class="header">
		<div class="header-container">
			<a href="javascript:;">
				<div class="logo-box">
					<img src="static/images/ouyuan.jpg" alt="logo">
				</div>
			</a>
			<nav class="navigation">
				<ul>
					<li
						v-for="(item, index) of navList"
						:class="{'active': item.name === $route.name}"
						@click="handleSwitchPage(item)"
						>
						<span>{{item.title}}</span>
					</li>
				</ul>
			</nav>
			<div class="logout-box">
				<span class="user-name">{{userName}}</span>
				<el-button @click="handleLogout" type="primary" class="logout-btn">登出</el-button>
			</div>
		</div>
	</header>
</template>

<script>
	const navList = [{
		title: 'H5作品',
		name: 'MultipleTheme',
		path: '/',
		active: false
	}, {
		title: '单页作品',
		name: 'SingleTheme',
		path: '/single',
		active: false
	}, {
		title: '关于作者',
		name: 'UserAbout',
		path: '/user',
		active: false
	}]
	import { requestUserLogout } from '@/api'
	export default {
		data() {
			return {
				userName: this.$store.state.user.userInfo.nickname || 'admin',
				navList
			}
		},
		mounted() {
		},
		methods: {
			handleSwitchPage(item) {
				const { name } = item
				this.$router.push(item)
			},
			handleLogout() {
				requestUserLogout()
				.then(res => {
					const {
						code,
						message
					} = res
					if (code === 200) {
            this.$notify({
              title: '成功',
              message: message,
              type: 'success'
            })
            this.$store.dispatch('userInfoAction', {})
            setTimeout(() => {
              location.href = '/login'
            }, 300)
          }
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		width: 100%;
		height: 60px;
		border-bottom: 1px solid rgba(0, 0, 0, .1);
		background-color: #2B2B2B;

		.header-container {
			width: 90%;
			height: 100%;
			margin: 0 auto;
			text-align: center;
		}

		.logo-box {
			float: left;
			width: 60px;
			height: 60px;
			display: flex;
			align-items: center;
			justify-content: center;
			img {
				width: 100%;
				height: 100%;
				max-width: 50px;
				max-height: 50px;
			}
		}

		.navigation {
			height: 100%;
			float: left;
			padding-left: 50px;
			li {
				width: 110px;
				height: 60px;
				line-height: 60px;
				float: left;
				text-align: center;
				box-sizing: border-box;
				> span {
					display: block;
					font-size: 16px;
					color: #C3C3C3;
					cursor: pointer;
				}

				&.active {
					background-color: #222222;
					> span {
						color: #FFFFFF;
					}
				}
			}
		}
		.logout-box {
			float: right;
			display: flex;
			align-items: center;
			height: 60px;
			.user-name {
				color: #FFFFFF;
				margin-right: 10px;
			}
		}
	}
</style>
