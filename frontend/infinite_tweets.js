class InfiniteTweets {
  constructor($el) {
    this.$el = $el;
    this.maxCreatedAt = null;
    $(".fetch-more").on("click", this.fetchTweets.bind(this));
  }

  fetchTweets(e) {
    e.preventDefault();

    let dataBody;
    if (this.maxCreatedAt) {
      dataBody = {max_created_at: this.maxCreatedAt};
    } else {
      dataBody = {};
    }

    $.ajax({
      url: '/feed',
      type: 'GET',
      //Will be auto serialized into the url query part
      data: dataBody,
      dataType: 'json',
      success: this.insertTweets
    });
  }

  insertTweets(body) {
    let $ul = $("#feed");
    $(body).each((idx, tweet) => {
      let $li = $("<li>");
      $li.text(JSON.stringify(tweet));
      $ul.append($li);
    });

    console.log($(body));
  }
}

module.exports = InfiniteTweets;
