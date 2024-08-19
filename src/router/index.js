// src/router/index.js

import BfsView from '@/views/algorithms/BfsView.vue';
import BubbleSortView from '@/views/algorithms/BubbleSortView.vue';
import DfsView from '@/views/algorithms/DfsView.vue';
import DijstrasalgorithmView from '@/views/algorithms/DijstrasalgorithmView.vue';
import HeapsortView from '@/views/algorithms/HeapsortView.vue';
import MergeSortView from '@/views/algorithms/MergeSortView.vue';
import QuickSortView from '@/views/algorithms/QuickSortView.vue';
import HomeView from '@/views/HomeView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/dfs',
    name: 'Dfs',
    component: DfsView,
  },
  {
    path: '/bfs',
    name: 'Bfs',
    component: BfsView,
  },
  {
    path: '/bubblesort',
    name: 'BubbleSort',
    component: BubbleSortView,
  },
  {
    path: '/mergesort',
    name: 'Mergesort',
    component: MergeSortView,
  },
  {
    path: '/quicksort',
    name: 'Quicksort',
    component: QuickSortView,
  },
  {
    path: '/dijkstras',
    name: 'Dijkstras',
    component: DijstrasalgorithmView,
  },
  {
    path: '/heapsort',
    name: 'Heapsort',
    component: HeapsortView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
