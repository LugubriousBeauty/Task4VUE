const { createApp } = Vue 

const app = createApp({
    data() {
        return {
            events: [],
            upcomingEventsStatics: [],
            pastEventsStatics: [],
            highestAssistance: {},
            lowestAssistance: {},
            largestCapacity: {}
        }
    },
    created() {
        fetch('https://amazing-events.herokuapp.com/api/events')
        .then(response => response.json())
        .then(webData => {
            this.events = webData.events
            this.getStatics(this.events)
            this.getUpcomingEventsStatics()
            this.getPastEventsStatics()
        })
    },
    methods: {
        getStatics() {
            let statics = this.events.filter(event => event.capacity && event.assistance)
            statics = statics.sort((a, b) => ((b.assistance * 100) / b.capacity) - ((a.assistance * 100) / a.capacity))
            this.highestAssistance = statics[0]
            console.log(this.highestAssistance)
            this.lowestAssistance = statics[statics.length - 1]
            this.statics = statics.sort((a, b) => b.capacity - a.capacity)
            this.largestCapacity = statics[0]
        },
        getUpcomingEventsStatics() {
            let upcomingEvents = this.events.filter(event => event.estimate)
            let upcomingEventsCategories = [... new Set(upcomingEvents.map(event => event.category))]
            upcomingEventsCategories.forEach(category => {
                let eventsWithSameCategory = upcomingEvents.filter(event => event.category === category)
                let categoryStats = {
                    category,
                    revenue: 0,
                    percentage: 0
                }
                let numberOfEventsInCat = eventsWithSameCategory.length
                console.log(numberOfEventsInCat)
                eventsWithSameCategory.forEach(event => {
                    categoryStats.revenue += event.price * event.estimate
                    categoryStats.percentage += (event.estimate * 100) / event.capacity
                })
                categoryStats.percentage = (categoryStats.percentage/numberOfEventsInCat).toFixed(2)
                this.upcomingEventsStatics.push(categoryStats)
            })
        },
        getPastEventsStatics() {
            let pastEvents = this.events.filter(event => event.assistance)
            let pastEventsCategories = [... new Set(pastEvents.map(event => event.category))]
            pastEventsCategories.forEach(category => {
                let eventsWithSameCategory = pastEvents.filter(event => event.category === category)
                let categoryStats = {
                    category,
                    revenue: 0,
                    percentage: 0
                }
                let numberOfEventsInCat = eventsWithSameCategory.length
                console.log(numberOfEventsInCat)
                eventsWithSameCategory.forEach(event => {
                    categoryStats.revenue += event.price * event.assistance
                    categoryStats.percentage += (event.assistance * 100) / event.capacity
                })
                categoryStats.percentage = (categoryStats.percentage/numberOfEventsInCat).toFixed(2)
                this.pastEventsStatics.push(categoryStats)
            })
        }
    }
})

app.mount('#app')





