class TweetCompose {
  constructor($el) {
    this.$el = $el;
    this.$tweetList = $("#feed");
    this.enabled = true;
    this.$el.on("submit", this.submit.bind(this));
    this.$el.find("textarea").on("keyup", this.updateCounter.bind(this));
  }

  submit(e) {
    e.preventDefault();
    const formData = this.$el.serialize();

    this.toggleFormEnabled();

    $.ajax({
      url: '/tweets',
      type: 'POST',
      dataType: 'json',
      data: formData,
      success: (body) => {
        console.log(body);
        this.render(body);
        this.toggleFormEnabled();
        this.resetForm();
      }
    });
  }

  updateCounter() {
    let tweetLength = $("textarea")[0].textLength;
    this.$el.find("strong").text(140 - tweetLength);
  }

  render(body) {
    let $li = $('<li>');

    let $userLink = $('<a>');
    $userLink.text(body.user.username);
    $userLink.attr('href', `/users/${body.user_id}`);
    $li.text(`${body.content} -- `);
    $li.append($userLink);
    $li.append(` -- ${body.created_at}`);

    // let $mentionList = $("<ul>");
    // let $mentionLink = $("<a>");


    this.$tweetList.prepend($li);
  }

  toggleFormEnabled() {
    if (this.enabled) {
      this.$el.find(".input").prop("disabled", true);
      this.enabled = false;
    } else {
      this.$el.find(".input").prop("disabled", false);
      this.enabled = true;
    }
  }

  resetForm() {
    this.$el.find("textarea").val("");
    this.$el.find("select").prop("selectedIndex", 0);
  }
}

module.exports = TweetCompose;
