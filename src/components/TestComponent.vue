<template>
  <div
    class="test"
    :style="`background:${backgroundStringArr.join(
      ','
    )};background-size:${backgroundSize};`"
  ></div>
  <div v-for="(val, idx) in backgroundStringArr" :key="idx">
    <input
      type="text"
      v-model="backgroundStringArr[idx]"
      style="width: 500px; padding: 6px 12px"
    />
  </div>
  <button @click="reset">reset</button>
  <button @click="toggleAnimation">animation</button>

  <h1>{{ backgroundStringArr }}</h1>
</template>

<script lang="ts">
import { ref, Ref, toRef, reactive } from 'vue'

type NAME = string

export default {
  name: 'SomeComponent',
  setup() {
    const backgroundStringArrTemp = [
      'linear-gradient(239.39deg, #000000 0%, #ffb864 100%)',
      'radial-gradient(ellipse at 0% 0%, #6545e6 0%, #1634ff 100%)',
      'linear-gradient(121.51deg, #00982f 0%, #ffd464 100%)',
      'linear-gradient(38.68deg, #248900 0%, #2495e7 100%)',
      'radial-gradient(ellipse at 50% 0%, #493500 4.41%, #00d9ff 100%)',
      'linear-gradient(226.64deg, #500052 0%, #ddb300 100%)',
    ]
    let backgroundStringArr = ref([
      'linear-gradient(239.39deg, #000000 0%, #ffb864 100%)',
      'radial-gradient(ellipse at 0% 0%, #6545e6 0%, #1634ff 100%)',
      'linear-gradient(121.51deg, #00982f 0%, #ffd464 100%)',
      'linear-gradient(38.68deg, #248900 0%, #2495e7 100%)',
      'radial-gradient(ellipse at 50% 0%, #493500 4.41%, #00d9ff 100%)',
      'linear-gradient(226.64deg, #500052 0%, #ddb300 100%)',
    ])

    const backgroundSize = ref('100% 100%;')
    const animation = ref('gradient 10s ease infinite;')

    const reset = () => {
      backgroundStringArr.value = backgroundStringArrTemp
    }
    const isAnimationToggled = ref(false)

    const toggleAnimation = () => {
      if (isAnimationToggled.value == true) {
        backgroundSize.value = '100% 100%;'
        animation.value = 'none 10s ease infinite;'
        isAnimationToggled.value = false
      } else {
        backgroundSize.value = '250% 250%;'
        animation.value = 'gradient 10s ease infinite;'
        isAnimationToggled.value = true
      }
    }
    return {
      backgroundStringArr,
      reset,
      toggleAnimation,
      backgroundSize,
      animation,
      isAnimationToggled,
    }
  },
}
</script>

<style lang="scss" scoped>
.test {
  width: 1000px;
  height: 1000px;
  background-blend-mode: overlay, screen, lighten, hard-light, screen, normal;
  animation: gradient 48s linear infinite;
  //   transform: rotate(180deg);
  @keyframes gradient {
    0% {
      background-position: 0% 0%;
    }
    25% {
      background-position: 0% 80%;
    }
    50% {
      background-position: 80% 80%;
    }
    75% {
      background-position: 80% 0%;
    }
    100% {
      background-position: 0% 0%;
    }
  }
}
</style>
