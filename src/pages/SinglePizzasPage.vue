<script>
export default {
    name: "SinglePizzasPage",
    data() {
        return {
            pizza: null,
            apiUrl: 'http://localhost:8000'
        }
    },
    mounted() {
        const slug = this.$route.params.slug;
        axios.get(`${this.apiUrl}/api/pizzas/${slug}`).then((resp) => {

            // if (resp.data.success) {
            //     this.project = resp.data.results
            // } else {
            //     this.errorMessage = resp.data.error
            // }
            this.pizza = resp.data.results;
        }
        )
    }
}

</script>
    
<template>
    <div>

    </div>
</template>


<style lang="scss" scoped></style>