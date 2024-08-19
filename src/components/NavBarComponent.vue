<template>
    <nav class="navbar">
      <ul>
        <li v-for="button in filteredButtons" :key="button.text">
          <router-link :to="button.route">{{ button.text }}</router-link>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBarComponent',
    props: {
      buttons: {
        type: Array,
        required: true,
        default: () => []
      }
    },
    computed: {
      filteredButtons() {
        return this.buttons.filter(button => button.route !== this.$route.path);
      }
    }
  };
  </script>
  
  <style scoped>
  .navbar {
    background-color: #0b7ef1; /* Colore di sfondo della navbar */
    padding: 10px 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
  }
  
  ul {
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
    width: 100%;
    justify-content: space-evenly; /* Distribuzione uniforme dei bottoni */
  }
  
  li {
    margin: 0;
  }
  
  router-link {
    display: block;
    padding: 10px 20px;
    color: white; /* Testo bianco per un contrasto migliore */
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 20px; /* Bottoni arrotondati */
    background-color: #1e90ff; /* Colore di sfondo dei bottoni */
    transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
  }
  
  router-link:hover {
    background-color: #63a4ff; /* Colore di sfondo al passaggio del mouse */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Aggiunge un'ombra al passaggio del mouse */
    transform: scale(1.1); /* Leggera espansione al passaggio del mouse */
  }
  
  router-link:active {
    background-color: #0056b3; /* Colore quando il link è attivo */
    color: white;
  }
  
  router-link[aria-current="page"] {
    background-color: #0056b3; /* Colore del bottone attivo (rotta corrente) */
    color: white;
    cursor: default;
    pointer-events: none;
  }
  </style>
  