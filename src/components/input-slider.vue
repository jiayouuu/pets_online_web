<!--
 * @Author: 桂佳囿
 * @Date: 2025-01-16 17:36:11
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-01-19 13:46:38
 * @Description: 
-->
<template>
    <div class="content">
        <input type="range" v-model="rangeValue">
        <div class="icon-box" ref="iconBox">
            <div class="icon" >
                <div class="mouth"></div>
            </div>
        </div>
    </div>
    <input type="text">
    <button @click="router.back()">back</button>
    <button @click="router.push({
        name:'foot-animation'
    })">go</button>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import {useRouter} from 'vue-router'
const router = useRouter()
const iconBox =ref()
const rangeValue= ref(50)
watchEffect(()=>{
    iconBox.value?.style.setProperty("--delay",`-${rangeValue.value}s`);
    iconBox.value?.style.setProperty("--mouth-up-delay",`-${rangeValue.value}s`);
})

</script>

<style scoped lang="scss">
.content{
    display: flex;
    align-items: center;
    column-gap: 20px;
    .icon-box{
        width: 50px;
        height: 50px;
        @keyframes range {
            0%{
                background-color: orange;
            }
            100%{
                background-color: green;
                border-radius: 50%;
            }
        }
        @keyframes mouth {
            100%{
                border-radius: 50%;
            }
        }
        .icon{
            width: 100%;
            height: 100%;
            position: relative;
            .mouth{
               width: 60%;
               height: 60%;
               border-bottom:2px solid black;
               position: absolute;
               left: 50%;
               bottom:30%;
               transform: translateX(-50%);
               animation: mouth 100s forwards paused var(--delay);
            }
            animation: range 100s forwards paused var(--delay);
        }
    }
}
</style>