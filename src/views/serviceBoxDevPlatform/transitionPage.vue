<template>

</template>
<script>
  export default {
    name: 'container',
    data() {
      return {
      }
    },
    mounted() {
      this.$router.replace({
        path: '/serviceDetails',
        name: "serviceDetails",
        query: {id: this.$route.query.id}
      })
    },
    computed: {
    },
    components: {},
    created() {
    },
    methods: {
    },
    watch: {}
  }
</script>
