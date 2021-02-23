<template>
  <h1>Number is: {{ dice }}</h1>
  <div>Number of rolls: {{ rolls.length }}</div>
  <div>Total: {{ total }}</div>
  <button @click="roll()">Let's roll the dice</button>
  <button @click="restart()">Restart</button>
  <ul>
    <li v-for="(t, index) in rolls" :key="index">
      {{ t }}
    </li>
  </ul>
  <test-component></test-component>
</template>

<script lang="ts">
import { reactive, computed, toRefs, onBeforeMount, ref, Ref } from 'vue'
import TestComponent from './components/TestComponent.vue'

interface Game {
  dice: number
  rolls: number[]
  total: number
}

export default {
  components: { TestComponent },
  setup() {
    const isInitialized = ref(false)
    const sleep = (time: number) => new Promise((r) => setTimeout(r, time))
    const game: Game = reactive({
      dice: 0,
      rolls: [],
      total: computed(() => game.rolls.reduce((p, c) => p + c, 0)),
    })

    onBeforeMount(() => {
      return new Promise((r) => {
        setTimeout(() => {
          isInitialized.value = true
          r()
        }, 3000)
      })
    })

    const roll = () => {
      game.dice = Math.floor(Math.random() * Math.floor(5)) + 1
      game.rolls.unshift(game.dice)
    }

    const restart = () => {
      game.dice = 0
      game.rolls = []
    }

    return {
      ...toRefs(game),
      roll,
      restart,
    }
  },
}
</script>

<style scoped></style>
