<template>
    <div class="merge-sort-component">
      <h2>Configurazione Merge Sort e Visualizzazione</h2>
  
      <div class="form-controls">
        <div class="form-group">
          <label for="elementCount">Numero di elementi:</label>
          <input type="number" id="elementCount" v-model.number="elementCount" min="1" max="5000" />
        </div>
  
        <div class="form-group">
          <label for="elementColor">Colore degli elementi:</label>
          <input type="color" id="elementColor" v-model="elementColor" />
        </div>
      </div>
  
      <button @click="updateSettings">Applica Impostazioni</button>
  
      <div class="array-display">
        <h3>Array Generato:</h3>
        <div class="array-elements">
          <div 
            v-for="(element, index) in array" 
            :key="index" 
            class="array-item" 
            :style="{ 
              backgroundColor: elementColor, 
              height: `${6 * element}px`
            }">
            <!-- Elimina la visualizzazione del testo -->
          </div>
        </div>
      </div>
  

        <button @click="startMergeSort">Avvia Merge Sort</button>
        <button @click="resetArray">Reset</button>
      </div>
  </template>
  
  
  <script>
 export default {
  name: 'MergeSortComponent',
  data() {
    return {
      elementCount: 100,  // Default number of elements
      elementColor: '#ff0000',  // Default color of elements
      array: [],
      sortingSteps: [], // Array per memorizzare gli stati dell'array
      showSortingSteps: false, // Flag per mostrare i passaggi di ordinamento
      intervalId: null, // ID per il timer di aggiornamento
      stepIndex: 0 // Indice del passo attuale
    };
  },
  methods: {
    updateSettings() {
      this.generateArray();
    },
    generateArray() {
      this.array = Array.from({ length: this.elementCount }, () => Math.floor(Math.random() * 100));
      this.sortingSteps = []; // Pulisci i passaggi precedenti
      this.showSortingSteps = false; // Nascondi i passaggi
    },
    startMergeSort() {
      this.showSortingSteps = true; // Mostra i passaggi di ordinamento
      this.sortingSteps = []; // Resetta gli stati precedenti
      this.stepIndex = 0; // Resetta l'indice del passo

      // Avvia l'algoritmo Merge Sort e salva tutti i passaggi intermedi
      this.mergeSort(this.array, 0, this.array.length - 1);

      // Pulisci l'intervallo esistente se presente
      if (this.intervalId) clearInterval(this.intervalId);

      // Avvia l'animazione dei passaggi
      this.intervalId = setInterval(() => {
        if (this.stepIndex >= this.sortingSteps.length) {
          this.array = this.sortingSteps[this.sortingSteps.length - 1]; // Mostra l'ultimo passo
          clearInterval(this.intervalId);
          this.showSortingSteps = false; // Nascondi i passaggi dopo la fine
        } else {
          this.array = this.sortingSteps[this.stepIndex]; // Aggiorna direttamente l'array
          this.stepIndex++;
        }
      }, 100); // Aggiorna ogni 0.1 secondi
    },
    mergeSort(array, start, end) {
      if (start >= end) return;

      const middle = Math.floor((start + end) / 2);
      this.mergeSort(array, start, middle);
      this.mergeSort(array, middle + 1, end);
      this.merge(array, start, middle, end);
    },
    merge(array, start, middle, end) {
      const left = array.slice(start, middle + 1);
      const right = array.slice(middle + 1, end + 1);
      let leftIndex = 0;
      let rightIndex = 0;
      let k = start;

      while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] <= right[rightIndex]) {
          array[k++] = left[leftIndex++];
        } else {
          array[k++] = right[rightIndex++];
        }
      }

      while (leftIndex < left.length) {
        array[k++] = left[leftIndex++];
      }

      while (rightIndex < right.length) {
        array[k++] = right[rightIndex++];
      }

      // Salva lo stato attuale dell'array
      this.sortingSteps.push([...array]);
    },
    resetArray() {
      this.generateArray();
      this.showSortingSteps = false; // Nascondi i passaggi di ordinamento
      if (this.intervalId) clearInterval(this.intervalId); // Pulisci l'intervallo se esiste
    }
  },
  mounted() {
    this.generateArray();
  }
};

  </script>
  
  <style scoped>
  .merge-sort-component {
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
  
  .array-display {
    flex: 1; /* Occupare tutto lo spazio rimanente */
    display: flex;
    flex-direction: column;
    align-items: center; /* Centra gli elementi orizzontalmente */
    overflow: auto; /* Aggiunge scroll se il contenuto è troppo grande */
    margin-top: 20px; /* Spazio sopra il grafico */
  }
  
  .array-elements {
    display: flex;
    flex-wrap: nowrap; /* Non permette il wrap degli elementi */
    width: 100%; /* Occupare tutta la larghezza dello schermo */
    align-items: flex-end; /* Allinea gli elementi alla base del contenitore */
    overflow-x: auto; /* Aggiunge scroll orizzontale se il contenuto è troppo largo */
  }
  
  .array-item {
    display: flex;
    align-items: flex-end; /* Allinea l'elemento alla base */
    justify-content: center;
    border-radius: 4px;
    background-color: #ccc; /* Colore di default se non viene specificato */
    color: white;
    font-weight: bold;
    text-align: center;
    font-size: 1.1em;
    flex: 1; /* Gli elementi cresceranno per riempire la larghezza */
    margin: 0;
    min-width: 1px; /* Permette agli elementi di ridursi fino a zero */
    max-width: 50px; /* Imposta una larghezza massima per evitare che gli elementi diventino troppo larghi */
  }
  </style>
  