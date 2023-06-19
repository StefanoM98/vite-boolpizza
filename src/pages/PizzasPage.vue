<script >
import axios from 'axios';
import PizzaCard from '../components/PizzaCard.vue';
// import LoadingPage from '../components/LoadingPage.vue';
// import Pagination from '../components/Pagination.vue';

export default {
    name: 'App',
    components: {
        PizzaCard,
        // LoadingPage,
        // Pagination,
    },

    data() {
        return {
            myApi: 'http://localhost:8000',
            pizzas: [],
            toppings: [],
            datiArray: {
                currentPage: 1,
                lastPage: null,
            },
            totalPizzas: 0,
            loading: false,

        }
    },
    mounted() {
        this.getPizza();
        this.getTopping();
    },
    methods: {
        getPizza(pageNumber = 1) {
            this.loading = true;

            const params = {
                page: pageNumber,
            }



            axios
                .get(`${this.myApi}/api/pizzas`, { params })
                .then(resp => {
                    console.log(resp);
                    this.pizzas = resp.data.results.data;
                    this.datiArray.currentPage = resp.data.results.current_page;
                    this.datiArray.lastPage = resp.data.results.last_page;
                    this.totalPizzas = resp.data.results.total;
                })
                .finally(() => {
                    this.loading = false;

                })
        },
        getTopping() {
            axios
                .get(`${this.myApi}/api/toppings`)
                .then((resp) => {
                    this.toppings = resp.data.results
                })
        }

    }
}

</script>

<template>
    <div class="container">
        <section>
            <h1 class="text-center my-2 container ">Lista delle pizze :</h1>
            <router-link class="btn btn-info my-5" :to="{ name: 'home' }">Home</router-link>


            <p class="project-number me-4">
                Trovate : {{ totalPizzas }} pizze
            </p>

            <!-- PizzaCard Component -->
            <div class="d-flex flex-row flex-wrap gap-3">
                <div class="project " v-for="pizza in pizzas" :key="pizza.id">
                    <PizzaCard :myProject="pizza" />
                </div>
            </div>
            <!-- /PizzaCard Component -->


            <!-- Handle pagination -->
            <Pagination :datiArray="datiArray" @dati="getPizza" />
            <!-- /Handle pagination -->

        </section>

    </div>
</template>



<style lang="scss">
@use "../style/general.scss" as *;

section {
    color: rgb(153, 253, 13);

    .filter {

        .form-select {
            width: 200px; // Larghezza della select
            background-color: #5296e3;

            & option {
                background-color: #1b1b3e;
                color: #15d361f0;
            }

            &:focus {
                outline: none;
            }
        }

        .project-number {
            color: #e56729;
            font-size: 1.2rem;
            margin: 50px;
            padding-right: 90px;
        }
    }
}



.project {
    width: calc(100% / 4 - 20px);

    @media screen and (max-width: 1200px) {
        width: calc(100% / 3 - 20px);
    }

    @media screen and (max-width: 992px) {
        width: calc(100% / 2 - 20px);
    }

    @media screen and (max-width: 768px) {
        width: calc(100% - 20px);
    }
}
</style>