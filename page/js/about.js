var app = new Vue({
    el: "#containar_left",
    data: {
      bid: -10,
      totle: 0,
      commentLIst: [],
      svg: ""
    },
    created() {
      axios.get("/commentSvg").then(res => {
        this.svg = res.data.data.data;
        this.text = res.data.data.text.toLowerCase();
      })
  
      axios.get("/queryCommentCount", {
        params: {
          blog_id: this.bid
        }
      }).then(res => {
        this.totle = res.data.data[0].count;
      })
      axios.get("/queryCommentsBlogId", {
        params: {
          blog_id: this.bid
        }
      }).then(res => {
        this.commentLIst = res.data.data;
  
      })
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
      submit() {
        var commentText = document.getElementsByClassName("verification")[0].value;
        if(commentText.toLowerCase() !== this.text) {
          alert("刘晓旭")
          return;
        }
        var parent = this.bid;
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
  