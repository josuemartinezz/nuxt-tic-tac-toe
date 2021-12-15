<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="flex items-center justify-center h-screen flex-col">
    <h1 v-if="game.winner" class="flex items-center">
      Gano <span v-html="game.winner"></span>
    </h1>
    <div class="grid-cols-3 grid relative mt-5">
      <div
        v-if="!settings.isGaming"
        class="absolute w-full h-full inset-0 z-50"
      ></div>
      <div
        v-for="({ icon, style }, index) in settings.grid"
        :key="index"
        :class="[
          {
            'hover:bg-gray-50 cursor-pointer': !icon,
          },
        ]"
        class="p-12 relative overflow-hidden"
        @click="!icon ? select(index) : null"
      >
        <span
          :class="style"
          class="inset-0 absolute flex items-center justify-center select-none fill-current border-black"
          v-html="icon"
        ></span>
      </div>
    </div>
    <button
      class="mt-6 px-7 py-2 shadow-lg shadow-blue-500/30 bg-blue-500 font-medium border-2 hover:text-blue-500 border-transparent hover:border-blue-500 hover:bg-white rounded-full outline-none text-white cursor-pointer transition-all duration-300 text-sm"
      @click="reset()"
    >
      Reiniciar
    </button>
  </div>
</template>

<script>
import { winner } from '@/utils/winner'

export default {
  name: 'IndexPage',
  data() {
    return {
      settings: {
        grid: [
          { style: 'border-r-2 border-b-2', icon: '', element: '' },
          { style: 'border-b-2', icon: '', element: '' },
          { style: 'border-l-2 border-b-2', icon: '', element: '' },
          { style: 'border-r-2 border-b-2', icon: '', element: '' },
          { style: 'border-b-2', icon: '', element: '' },
          { style: 'border-l-2 border-b-2', icon: '', element: '' },
          { style: 'border-r-2', icon: '', element: '' },
          { style: '', icon: '', element: '' },
          { style: 'border-l-2', icon: '', element: '' },
        ],
        isGaming: true,
        elements: {
          x: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>',
          0: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 12c0 3.859 3.14 7 7 7 3.859 0 7-3.141 7-7s-3.141-7-7-7c-3.86 0-7 3.141-7 7zm12 0c0 2.757-2.243 5-5 5s-5-2.243-5-5 2.243-5 5-5 5 2.243 5 5z"></path></svg>',
        },
      },
      game: { zero: false, winner: null },
    }
  },
  methods: {
    select(position) {
      this.game.zero = !this.game.zero
      if (this.game.zero) {
        this.settings.grid.splice(position, 1, {
          ...this.settings.grid[position],
          icon: this.settings.elements.x,
          element: 'X',
        })
      } else {
        this.settings.grid.splice(position, 1, {
          ...this.settings.grid[position],
          icon: this.settings.elements['0'],
          element: '0',
        })
      }
      if (winner([...this.settings.grid])) {
        const { icon } = winner([...this.settings.grid])
        this.game.winner = icon
        this.settings.isGaming = false
      }
    },

    reset() {
      this.game.zero = false
      this.game.winner = null
      this.settings.isGaming = !false
      this.settings.grid.forEach((item, index) => {
        this.settings.grid.splice(index, 1, {
          ...this.settings.grid[index],
          icon: '',
          element: '',
        })
      })
    },
  },
}
</script>
