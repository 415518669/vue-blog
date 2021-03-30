var app = new Vue({
  el: "#containar_left",
  data: {
    msg: "",
    page: 1,
    pageSize: 5,
    count: 0,
    article: [],
    bid: "",
    blog: {},
    svg: "",
    text: "",
    totle: 0,
    commentLIst: []
  },
  created() {
    axios.get("/queryEveryDay").then((res) => {
      this.msg = res.data.data[0].content;
    });


    axios.get("/queryBlogCount").then((res) => {
      this.count = res.data.data[0].count;
    });

    var param = location.search.split("?")[1].split("&");
    for (let i = 0; i < param.length; i++) {
      if (param[i].split("=")[0] == "bid") {
        this.bid = param[i].split("=")[1];
      }
    }
    axios
      .get("/blogDetail", {
        params: {
          bid: this.bid,
        },
      })
      .then((res) => {
        this.blog = res.data.data[0];
      });
    axios.get("/commentSvg").then(res => {
      this.svg = res.data.data.data;
      this.text = res.data.data.text.toLowerCase();
    })

    axios.get("/queryCommentsBlogId", {
      params: {
        blog_id: this.bid
      }
    }).then(res => {
      var list = res.data.data;
      list.forEach((ele, i) => {
        if(ele.parent > -1) {
          ele.options = "回复@" + ele.parent_name;
        }
      })
      this.commentLIst = res.data.data;

    })
    axios.get("/queryCommentCount", {
      params: {
        blog_id: this.bid
      }
    }).then(res => {
      this.totle = res.data.data[0].count;
    })
  },
  computed: {
    countPage() {
      return Math.ceil(this.count / this.pageSize);
    },
  },
  watch: {
    page: {
      handler() {
        this.getToolPage(this.page, this.pageSize);
      },
      immediate: true,
    },
  },
  methods: {
    changeSvg() {
      axios.get("/commentSvg").then(res => {
        this.svg = res.data.data.data;
        this.text = res.data.data.text.toLowerCase();
      })
    },
    changePage(e) {
      if (e.target.innerText == "<" && this.page > 1) {
        this.page -= 1;
      }
      if (e.target.innerText == ">" && this.page < this.countPage) {
        this.page += 1;
      }
      if (e.target.innerText !== "<" && e.target.innerText !== ">") {
        this.page = e.target.innerText;
      }
    },
    getToolPage(page, pageSize) {
      var that = this;
      axios
        .get("/queryBlog", {
          params: {
            page: page - 1,
            pageSize: pageSize,
          },
        })
        .then((res) => {
          var list = res.data.data;
          list.forEach((ele, i) => {
            ele.ctime = new Date(ele.ctime * 1000)
              .toLocaleDateString()
              .replace(/\//g, "-");
            ele.link = "/blog_detail.html?bid=" + ele.id;
          });
          that.article = list;
        });
    },
    submit() {
      var commentText = document.getElementsByClassName("verification")[0].value;
      if(commentText.toLowerCase() !== this.text) {
        alert("刘晓旭")
        return;
      }
      var parent = document.getElementById("comment_parent").value;
      var parent_name = document.getElementById("comment_parent_name").value;
      var username = document.getElementsByClassName("comment_name")[0].value;
      var email = document.getElementsByClassName("comment_mail")[0].value;
      var comment = document.getElementById("textarea").value;
      var data = {
        parent,
        blog_id: this.bid,
        username,
        email,
        comment,
        parent_name
      };
      axios.post("/insertComment", data).then((res) => {
        alert("提交成功")
      });
    },
    replyComment(id, name) {
      document.getElementById("comment_parent").value = id;
      document.getElementById("comment_parent_name").value = name;
      location.href = "#about_message";
    },
    resetAll() {},
  },
});
