<!--
 * @Author: 桂佳囿
 * @Date: 2025-01-16 15:27:04
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-01-16 16:56:20
 * @Description: 底部动画组件
-->

<template>
   <div class="foot-animation">
        <div class="background" />
        <div class="bear " />
    </div>
</template>

<script setup lang="ts">
</script>
<style scoped lang="scss">
@keyframes bgMove {
    0% {
        left:0;
    }

    100% {
        left: -2560px;
    }
}

@keyframes bearMove {
    0% {
        top: 45%;
        left: 0;
        transform: translateX(0);
    }

    100% {
        top: 45%;
        left: 50%;
        transform: translateX(-50%);

    }
}

@keyframes bearRun {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: -1280px 0;
    }
}

.foot-animation {
    width: 1120px;
    height: 224px;
    position: relative;
    overflow: hidden;
    .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 3680px;
        height: 224px;
        background: #fff url(@/assets/images/animation/background.png) repeat-x;
        background-size:auto 100%;
        transition: all 4s ease-in;
        animation: bgMove 5s linear 1.5s infinite;
    }

    .bear {
        width: 160px;
        height: 80px;
        position: absolute;
        top: 45%;
        left: 0;
        background: url(@/assets/images/animation/bear.png) no-repeat;
        background-size: auto 100%;
        animation: bearMove 2s ease-in-out 1 forwards,bearRun .6s steps(8) infinite;
    }
}
</style>