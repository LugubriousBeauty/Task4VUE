const { createApp } = Vue

const app = createApp({
    data() {
        return {
            current_date: undefined,
            events: [],
            filteredEvents: [],
            categories: [],
            checked: [],
            inputText: ''   
        }
    },
    created() {
        fetch('https://amazing-events.herokuapp.com/api/events')
        .then(response => response.json())
        .then(webData => {
            this.current_date = webData.currentDate
            this.events = webData.events.filter(event => event.date < webData.currentDate)
            this.filteredEvents = webData.events
            this.getCategories()
        })
        .catch(err => console.log(err))
    },
    methods: {
        getCategories() {
            this.categories = [... new Set(this.events.map(event => event.category))]
        }
    },
    computed: {
        filterEverything() {
            console.log('funca')
            const filteredByCheck = this.events.filter(event => this.checked.includes(event.category) || this.checked.length === 0)
            this.filteredEvents = filteredByCheck.filter(event => event.name.toLowerCase().trim().includes(this.inputText.toLowerCase().trim()))
        }
    }
})

app.mount('#app')







