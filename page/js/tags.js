var tags = new Vue({
  el: "#tags",
  data: {
    listArr: [],
  },
  computed: {
    randomColor() {
      return function () {
        var red = Math.random() * 205 + 50,
          green = Math.random() * 205 + 50,
          blue = Math.random() * 205 + 50;
        return `rgb(${red}, ${green}, ${blue})`;
      };
    },
    randomFontsize() {
      return function () {
        var fontsz = Math.random() * 20 + 12;
        return fontsz + "px";
      };
    },
  },
  created() {
    axios.get("/queryTags").then((res) => {
      var tagsList = res.data.data;
      function name() {
        return Math.random() > 0.5 ? 1 : -1;
      }
      tagsList.sort(name);
      tagsList.forEach((ele) => {
        this.listArr.push({
            tag: ele.tag,
            id: ele.id
        });
      });
    });
  },
  methods: {
    juapTags(tagsId) {
      axios
        .get("/queryBlog", {
          params: {
            tags_id: tagsId
          },
        })
        .then((res) => {
            var list = res.data.data;
            var axiosArr = [];
            for (let i = 0; i < list.length; i++) {
                axiosArr.push(axios.get("/queryTagsBlog", {
                    params: {
                        id: list[i].blog_id
                    }
                }))
            }
            axios.all(axiosArr).then(axios.spread(function(...blog) {
                var arr = [...blog];
                var article = [];
                arr.forEach(ele => {
                    article.push(ele.data.data[0])
                })
                app.article = article;
            }))
        });
    },
  },
});

var hot = new Vue({
  el: "#hot",
  data: {
    hotList: [],
  },
  created() {
    axios.get("/hotBlog").then((res) => {
      var list = res.data.data;
      list.forEach((ele) => {
        ele.link = "blog_detail.html?bid=" + ele.id;
      });
      this.hotList = list;
    });
  },
});

var comment = new Vue({
  el: "#comment",
  data: {
    commentList: [],
  },
  created() {
    axios.get("/newComment").then((res) => {
      var list = res.data.data;
      list.forEach((ele) => {
        ele.time = new Date(ele.ctime * 1000)
          .toLocaleDateString()
          .replace(/\//g, "-");
      });
      this.commentList = list;
    });
  },
  methods: {
    goComment(id) {
      if (id == -10) {
        location.href = "/message.html?bid=" + id;
      }
      if (id > 0) {
        location.href = "/blog_detail.html?bid=" + id + "#" + id;
      }
    },
  },
});
