<template>
    <div class="home">
      <h1>Algoritmi di Riordinamento e Ricerca</h1>
      <p>Benvenuto nella nostra guida agli algoritmi di riordinamento e ricerca. Qui troverai una panoramica dei principali algoritmi utilizzati in informatica per esplorare e organizzare dati.</p>
  
      <div class="algorithm" v-for="(algorithm, index) in algorithms" :key="index">
        <router-link :to="algorithm.route">
          <h2>{{ algorithm.text }}</h2>
        </router-link>
        <p>{{ algorithm.description }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomeView',
    data() {
      return {
        algorithms: [
          { 
            text: 'DFS (Depth-First Search)', 
            route: '/dfs', 
            description: 'DFS, o Depth-First Search, è un algoritmo di ricerca utilizzato principalmente per esplorare alberi e grafi. L\'algoritmo esplora i nodi partendo dalla radice e si inoltra lungo un ramo fino a raggiungere un nodo foglia o un nodo già visitato. Utilizza una pila (stack) per mantenere traccia dei nodi da visitare, oppure può essere implementato ricorsivamente. È utile per problemi come la risoluzione di puzzle, la verifica di connessione tra nodi e la ricerca di tutti i percorsi in un grafo.' 
          },
          { 
            text: 'BFS (Breadth-First Search)', 
            route: '/bfs', 
            description: 'BFS, o Breadth-First Search, esplora un grafo o un albero livello per livello. A partire dal nodo radice, esplora tutti i nodi al livello corrente prima di passare ai nodi dei livelli successivi. Utilizza una coda (queue) per gestire i nodi da visitare. È particolarmente utile per trovare il percorso più corto in un grafo non pesato e per risolvere problemi di livello come il calcolo della distanza tra nodi.' 
          },
          { 
            text: 'Bubble Sort', 
            route: '/bubblesort', 
            description: 'Il Bubble Sort è un algoritmo di ordinamento semplice che ripetutamente attraversa l\'array da ordinare, confrontando e scambiando elementi adiacenti se sono nell\'ordine sbagliato. Questo processo viene ripetuto fino a quando l\'array è ordinato. Nonostante la sua semplicità, ha una complessità temporale di O(n^2), rendendolo inefficiente per grandi dataset. È utile per scopi didattici e per comprendere i principi di base dell\'ordinamento.' 
          },
          { 
            text: 'Merge Sort', 
            route: '/mergesort', 
            description: 'Il Merge Sort è un algoritmo di ordinamento che utilizza la tecnica divide-et-impera. Divide ricorsivamente l\'array in sottoarray più piccoli fino a ottenere array di dimensione uno, quindi combina i sottoarray ordinati per ottenere l\'array ordinato finale. Questo processo di fusione è effettuato in modo che gli elementi siano ordinati. Con una complessità temporale di O(n log n), è molto più efficiente rispetto a Bubble Sort e si adatta bene a grandi dataset.' 
          },
          { 
            text: 'Quick Sort', 
            route: '/quicksort', 
            description: 'Il Quick Sort è un algoritmo di ordinamento basato sulla tecnica divide-et-impera che sceglie un elemento chiamato pivot e riordina gli altri elementi in modo che tutti quelli minori del pivot siano a sinistra e quelli maggiori siano a destra. Questo processo è ripetuto ricorsivamente per i sottoarray a sinistra e a destra del pivot. Con una complessità media di O(n log n), è molto veloce e ampiamente utilizzato in pratica. Tuttavia, la sua complessità può degradare a O(n^2) se il pivot è scelto male.' 
          },
          { 
            text: 'Dijkstra\'s Algorithm', 
            route: '/dijkstras', 
            description: 'L\'algoritmo di Dijkstra trova il percorso più breve tra due nodi in un grafo pesato. Inizia dal nodo sorgente e aggiorna la distanza minima a tutti i nodi adiacenti. Usa una struttura di priorità (tipicamente una coda di priorità) per gestire i nodi da esplorare. È particolarmente utile per problemi di routing e navigazione, come nel calcolo del percorso ottimale in mappe stradali e reti di comunicazione. L\'algoritmo assume che i pesi dei bordi siano non negativi.' 
          },
          { 
            text: 'Heapsort', 
            route: '/heapsort', 
            description: 'Heapsort è un algoritmo di ordinamento che utilizza una struttura dati chiamata heap. Costruisce un heap massimo (o minimo) a partire dall\'array da ordinare e poi estrae il massimo (o minimo) elemento per posizionarlo alla fine dell\'array ordinato. Questo processo viene ripetuto fino a quando l\'intero array è ordinato. Con una complessità di O(n log n), Heapsort è un algoritmo di ordinamento efficiente e in-place, ma non è stabile.' 
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .home {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
    color: #0b7ef1;
  }
  
  p {
    font-size: 1.2em;
    line-height: 1.6;
    color: #333;
  }
  
  .algorithm {
    margin-bottom: 40px;
  }
  
  .algorithm h2 {
    font-size: 2em;
    margin-bottom: 10px;
    color: #1e90ff;
    cursor: pointer; /* Cambia il cursore per indicare che è cliccabile */
    text-decoration: underline; /* Sottolinea il testo per indicare che è un link */
  }
  
  .algorithm p {
    font-size: 1.1em;
    color: #555;
  }
  </style>
  