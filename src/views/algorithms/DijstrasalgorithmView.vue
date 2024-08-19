<template>
    <div class="dijkstra-component">
      <h2>Configurazione Dijkstra e Visualizzazione</h2>
  
      <div class="form-controls">
        <div class="form-group">
          <label for="nodeCount">Numero di nodi:</label>
          <input type="number" id="nodeCount" v-model.number="nodeCount" min="1" max="100" />
        </div>
  
        <div class="form-group">
          <label for="nodeColor">Colore dei nodi:</label>
          <input type="color" id="nodeColor" v-model="nodeColor" />
        </div>
  
        <button @click="updateSettings">Applica Impostazioni</button>
        <button @click="loadExample">Carica Esempio</button>
      </div>
  
      <div class="graph-display">
        <h3>Grafico Generato:</h3>
        <svg width="100%" height="100%" class="graph-svg">
          <circle
            v-for="(node, index) in nodes"
            :key="'node-' + index"
            :cx="node.x"
            :cy="node.y"
            r="20"
            :fill="nodeColor"
            :stroke="nodeColor"
            stroke-width="3"
          />
          <line
            v-for="(edge, index) in edges"
            :key="'edge-' + index"
            :x1="nodes[edge.source].x"
            :y1="nodes[edge.source].y"
            :x2="nodes[edge.target].x"
            :y2="nodes[edge.target].y"
            :stroke="edge.highlighted ? '#ff0000' : '#000000'"
            stroke-width="2"
            :stroke-dasharray="edge.highlighted ? '5,5' : 'none'"
          />
        </svg>
      </div>
  
      <button @click="startDijkstra">Avvia Dijkstra</button>
      <button @click="resetGraph">Reset</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DijkstraAlgorithmComponent',
    data() {
      return {
        nodeCount: 5,  // Numero di nodi predefinito
        nodeColor: '#ff0000',  // Colore predefinito dei nodi
        nodes: [],
        edges: [],
        shortestPaths: [], // Array per memorizzare i percorsi più brevi
        showShortestPaths: false, // Flag per mostrare i percorsi più brevi
        intervalId: null, // ID per il timer di aggiornamento
        stepIndex: 0 // Indice del passo attuale
      };
    },
    methods: {
      updateSettings() {
        this.generateGraph();
      },
      generateGraph() {
        this.nodes = Array.from({ length: this.nodeCount }, () => ({
          x: Math.random() * 800 + 50, // Genera una posizione casuale
          y: Math.random() * 600 + 50  // Genera una posizione casuale
        }));
        this.edges = this.createEdges(); // Crea gli archi tra i nodi
        this.shortestPaths = []; // Pulisci i percorsi precedenti
        this.showShortestPaths = false; // Nascondi i percorsi
      },
      createEdges() {
        const edges = [];
        for (let i = 0; i < this.nodeCount; i++) {
          for (let j = i + 1; j < this.nodeCount; j++) {
            edges.push({
              source: i,
              target: j,
              weight: Math.floor(Math.random() * 10) + 1 // Peso casuale tra 1 e 10
            });
          }
        }
        return edges;
      },
      loadExample() {
        // Carica un esempio di grafico predefinito
        this.nodes = [
          { x: 100, y: 100 },
          { x: 300, y: 100 },
          { x: 500, y: 100 },
          { x: 300, y: 300 },
          { x: 300, y: 500 }
        ];
        this.edges = [
          { source: 0, target: 1, weight: 2 },
          { source: 1, target: 2, weight: 3 },
          { source: 0, target: 3, weight: 1 },
          { source: 1, target: 3, weight: 4 },
          { source: 2, target: 3, weight: 5 },
          { source: 3, target: 4, weight: 6 }
        ];
      },
      startDijkstra() {
        this.showShortestPaths = true; // Mostra i percorsi più brevi
        this.shortestPaths = []; // Resetta i percorsi precedenti
        this.stepIndex = 0; // Resetta l'indice del passo
  
        // Avvia l'algoritmo Dijkstra e salva tutti i passaggi intermedi
        this.dijkstra(0);
  
        // Pulisci l'intervallo esistente se presente
        if (this.intervalId) clearInterval(this.intervalId);
  
        // Avvia l'animazione dei passaggi
        this.intervalId = setInterval(() => {
          if (this.stepIndex >= this.shortestPaths.length) {
            clearInterval(this.intervalId);
            this.showShortestPaths = false; // Nascondi i passaggi dopo la fine
          } else {
            // Mostra i percorsi più brevi a ciascun passo
            this.updateGraph(this.shortestPaths[this.stepIndex]);
            this.stepIndex++;
          }
        }, 1000); // Aggiorna ogni 1 secondo
      },
      dijkstra(startNode) {
        const distances = Array(this.nodeCount).fill(Infinity);
        const visited = Array(this.nodeCount).fill(false);
        const previousNodes = Array(this.nodeCount).fill(null);
        distances[startNode] = 0;
  
        const nodes = new Set(Array.from({ length: this.nodeCount }, (_, i) => i));
  
        while (nodes.size) {
          const currentNode = Array.from(nodes).reduce((minNode, node) =>
            distances[node] < distances[minNode] ? node : minNode,
            Array.from(nodes)[0]
          );
  
          nodes.delete(currentNode);
          visited[currentNode] = true;
  
          for (const edge of this.edges.filter(e => e.source === currentNode)) {
            if (visited[edge.target]) continue;
  
            const newDist = distances[currentNode] + edge.weight;
            if (newDist < distances[edge.target]) {
              distances[edge.target] = newDist;
              previousNodes[edge.target] = currentNode;
            }
          }
  
          // Salva lo stato attuale dei percorsi più brevi
          this.shortestPaths.push({
            nodes: [...distances],
            edges: this.edges.map(e => ({
              ...e,
              highlighted: e.source === currentNode || e.target === currentNode
            }))
          });
        }
      },
      updateGraph(state) {
        this.nodes = state.nodes || this.nodes;
        this.edges = state.edges.filter(edge => edge.highlighted);
      },
      resetGraph() {
        this.generateGraph();
        this.showShortestPaths = false; // Nascondi i percorsi più brevi
        if (this.intervalId) clearInterval(this.intervalId); // Pulisci l'intervallo se esiste
      }
    },
    mounted() {
      this.generateGraph();
    }
  };
  </script>

  
<style scoped>
.dijkstra-component {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100vw; /* Occupare tutta la larghezza dello schermo */
  height: 100vh; /* Occupare tutta l'altezza dello schermo */
  box-sizing: border-box; /* Include il padding e il bordo nella larghezza e altezza totale */
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
}

h2 {
  margin-bottom: 20px;
  color: #0b7ef1;
}

h3 {
  margin-bottom: 15px;
  color: #0b7ef1;
}

.form-controls {
  display: flex;
  gap: 20px; /* Spazio tra i controlli */
  margin-bottom: 15px;
  width: 100%; /* Assicurati che i gruppi di form si estendano in tutta la larghezza disponibile */
  max-width: 600px; /* Limita la larghezza massima per evitare che i controlli si allunghino troppo */
}

.form-group {
  flex: 1; /* Gli elementi si allargheranno per riempire lo spazio disponibile */
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="number"], input[type="color"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
}

button {
  display: inline-block;
  margin-top: 10px;
  margin-right: 10px;
  padding: 10px;
  background-color: #0b7ef1;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #1e90ff;
}

.graph-display {
  flex: 1; /* Occupare tutto lo spazio rimanente */
  display: flex;
  flex-direction: column;
  align-items: center; /* Centra gli elementi orizzontalmente */
  overflow: auto; /* Aggiunge scroll se il contenuto è troppo grande */
  margin-top: 20px; /* Spazio sopra il grafico */
}

.graph-svg {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
}
</style>
