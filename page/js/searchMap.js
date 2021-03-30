var search = new Vue({
    el: "#article",
    data: {
        searchMapList: [],
    },
    methods: {

    },
    created() {
        axios.get("/querySearchMap").then(res => {
            this.searchMapList = res.data.data;
        })
    }
})