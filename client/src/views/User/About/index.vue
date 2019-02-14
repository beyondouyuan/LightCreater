<template>
  <div class="page-container">
    <section class="about-container">
      <div class="about-wrapper">
      	<div class="box box-avatar">
      		<img src="static/images/ouyuan.jpg" alt="头像">
      	</div>
        <div class="box">
          <h3>系统信息</h3>
          <ul>
            <li>当前版本：LightCreater v1.0</li>
            <li>应用名称：LightCreater H5页面制作器</li>
            <li>后台技术：Express/MongoDB</li>
            <li>前台技术：Vue/Vuex</li>
          </ul>
        </div>
        <div class="box">
          <h3>关于作者</h3>
          <ul>
            <li>博客：<a href="https:beyondouyuan.github.io/">小楼昨夜前端雨</a></li>
            <li>邮箱：beyondouyuan@gmail.com</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'UserAbout'
}

</script>
<style lang="scss" scoped>
	.about-container {
		width: 100%;
		overflow: hidden;
		.about-wrapper {
			width: 50%;
			padding-top: 6vh;
			margin: 0 auto;
		}
		.box {
      font-size: 16px;
      color: #C3C3C3;
			padding-bottom: 3vh;
      li {
        line-height: 1.8;
      }
      a {
        color: #C3C3C3;
      }
		}
	}
</style>
