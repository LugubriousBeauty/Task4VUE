const { createApp } = Vue

const app = createApp({
  data() {
    return {
      events: [],
      dataCard: {}
    }
  },
  created() {
    fetch('https://amazing-events.herokuapp.com/api/events')
    .then(response => response.json())
    .then(webData => {
      this.events = webData.events
      const id = new URLSearchParams(location.search).get('id')
      this.dataCard = this.events.find(event => event._id === id)
      console.log(id)
    })
    .catch(err => console.log(err))
  },
})
app.mount('#app')