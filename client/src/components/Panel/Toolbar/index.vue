<template>
	<section class="toolbar-container">
		<el-tooltip effect="dark" content="新建文本" placement="left">
			<button class="btn el-icon-edit" :class="{active: active === 1}" @click="toolbarClick(1)"></button>
		</el-tooltip>
		<el-tooltip effect="dark" content="图片素材" placement="left">
			<button class="btn el-icon-picture" :class="{active: active === 2}"  @click="toolbarClick(2)"></button>
		</el-tooltip>
		<el-tooltip effect="dark" content="视频素材" placement="left">
			<button class="btn el-icon-menu" :class="{active: active === 3}" @click="toolbarClick(3)"></button>
		</el-tooltip>
		<el-tooltip effect="dark" content="播放动画" placement="left">
			<button class="btn el-icon-caret-right" @click="playAnimate"></button>
		</el-tooltip>
		<el-tooltip effect="dark" content="保存" placement="left">
			<button class="btn el-icon-upload" @click="handleSavePage"></button>
		</el-tooltip>
	</section>
</template>

<script>
	import {vue2json} from '@/utils/vue2json'
	export default {
		name: 'PanelToobar',
		props: {
			toolbarClick: {
				type: Function
			},
			active: {
				type: Number
			}
		},
		methods: {
			playAnimate() {
				this.$store.dispatch('playAnimate')
			},
			handleSavePage() {
				this.$store.dispatch('saveTheme', vue2json(this.$store.state.editor.editorTheme)).then(res => {
	        console.log(res)
	      })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.toolbar-container {
		width: 60px;
		position: absolute;
		top: 0;
		left: -50px;

		.btn {
			display: block;
			width: 50px;
			height: 50px;
			margin-top: 20px;
			color: #B2BCBA;
			border: 1px solid #222222;
			border-radius: 3px 0 0 3px;
			background-color: #2B2B2B;

			&.active {
				background-color: #222222;
			}
		}
	}
</style>
