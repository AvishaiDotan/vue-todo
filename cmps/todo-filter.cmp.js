import { showErrorMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"
export default {
    name: 'todoFilter',
    template:`        
        <section>
            <p>Filter</p>
            <form @input="setFilter">
                <input v-model="filterBy.txt" type="search" placeholder="Search"/>

                <select v-model="filterBy.state" @change="setFilter">
                    <option value="">All</option>
                    <option>Active</option>
                    <option>Done</option>
                </select>

            </form>  
        </section>
    `,
    data() {
        return {
            filterBy: {
                txt: '',
                importance: 3,
                state: ''
            }
        }
    },
    methods: {
        setFilter() {
            this.$emit('set-filter', {...this.filterBy})   
        },
    },
    created() {
        this.setFilter = utilService.debounce(this.setFilter)
    },
}

