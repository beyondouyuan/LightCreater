<template>
	<div class="layout-container">
		<section class="header-container">
			<header-bar></header-bar>
		</section>
		<section class="content-container">
            <!-- <transition name="fade"> -->
                <router-view></router-view>
            <!-- </transition> -->
        </section>
        <Footer></Footer>
	</div>
</template>

<script>
	import HeaderBar from '@/components/Header/Bar'
	import Footer from '@/components/Footer'
	export default {
		data() {
			return {

			}
		},
		components: {
			HeaderBar,
			Footer
		}
	}
</script>