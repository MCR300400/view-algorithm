<template>
  <div>
    <NavBarComponent :buttons="navButtons" />
    <router-view />
  </div>
</template>

<script>
import NavBarComponent from './components/NavBarComponent.vue';

export default {
  components: {
    NavBarComponent
  },
  data() {
    return {
      navButtons: [
        { text: 'Home', route: '/' },
        { text: 'DFS', route: '/dfs' },
        { text: 'BFS', route: '/bfs' },
        { text: 'BubbleSort', route: '/bubblesort' },
        { text: 'MergeSort', route: '/mergesort' },
        { text: 'QuickSort', route: '/quicksort' },
        { text: 'Dijkstras', route: '/dijkstras' },
        { text: 'Heapsort', route: '/heapsort' },
      ]
    };
  }
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
