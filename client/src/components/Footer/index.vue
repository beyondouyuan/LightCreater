<template>
    <section class="footer-container">
        <footer class="footer-box">
            wow-creater
            <p>Copyright © {{Date.now() | parseTime('{y}')}} wow-creater 版权所有 Powered by wow-creater</p>
        </footer>
    </section>
</template>
<style lang="scss" scoped>
.footer-container {
    margin-top: 20px;
    padding: 30px 0;
    border-top: 1px dashed #222222;
    color: #B2BCBA;
    background-color: transparent;
}
.footer-box {
    text-align: center;
}
</style>