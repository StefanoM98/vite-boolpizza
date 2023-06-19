<script >
import axios from 'axios';
import ProjectCard from '../components/ProjectCard.vue';
// import LoadingPage from '../components/LoadingPage.vue';
// import Pagination from '../components/Pagination.vue';
import AppHeader from '../components/AppHeader.vue';

export default {
    name: 'App',
    components: {
        ProjectCard,
        // LoadingPage,
        // Pagination,
        AppHeader
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
        getProject(pageNumber = 1) {
            this.loading = true;

            const params = {
                page: pageNumber,
            }

            if (this.typeSelected !== 'TUTTI') {
                params.type_id = this.typeSelected;
            }

            if (this.technologySelected.length > 0) {
                params.technologies = this.technologySelected;

            }

            axios
                .get(`${this.myApi}/api/projects`, { params })
                .then(resp => {
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
    <AppHeader />

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
            <Pagination :datiArray="datiArray" @dati="getProject" />
            <!-- /Handle pagination -->
            
        </section>

    </div>
</template>



<style lang="scss">
@use "../style/general.scss" as *;
@use "../style/partials/variables" as *;

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