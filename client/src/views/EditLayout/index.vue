<template>
	<div class="layout-container">
		<section class="header-container">
			<header-edit :handleGoBack="handleGoBack"></header-edit>
		</section>
		<section class="content-container">
        <router-view></router-view>
        </section>
    <Footer></Footer>
	</div>
</template>

<script>
	import HeaderEdit from '@/components/Header/Edit'
	import Footer from '@/components/Footer'
	export default {
		data() {
			return {

			}
		},
		components: {
			HeaderEdit,
			Footer
		},
		methods: {
			/**
			 * [handleGoBack 返回对应类型作品首页]
			 * awesome method! 没时间解释了，快上车！
			 * @author handsome Ou Yuan
			 * @version  [version]
			 * @date     2018-12-10
			 * @modified 2018-12-10T18:20:50+0800
			 * @return   {[type]}                 [description]
			 */
			handleGoBack() {
				const SINGLE = 'SINGLE'
				const { name } = this.$route
				if(name.toUpperCase().includes(SINGLE)) {
					 this.$router.replace({name: 'SingleTheme'})
				} else {
					this.$router.replace({name: 'MultipleTheme'})
				}
			}
		}
	}
</script>
