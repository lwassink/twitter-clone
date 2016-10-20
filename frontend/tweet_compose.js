class TweetCompose {
  constructor($el) {
    this.$el = $el;
    this.$tweetList = $("#feed");
    this.enabled = true;

    this.$el.on("submit", this.submit.bind(this));
    this.$el.find("textarea").on("keyup", this.updateCounter.bind(this));
    $(".add-mentioned-user").on("click",
      this.addMentionedUser.bind(this));
    $(".mentioned-users").on("click",
      this.removeMentionedUser.bind(this));
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

    let $mentionList = $("<ul>");

    $(body.mentions).each((idx, mention) => {
      $mentionList.append($("<li>"));

      let $mentionLink = $("<a>");
      $mentionLink.text(mention.user.username);
      $mentionLink.attr("href", `/users/${mention.user_id}`);
      $($mentionList[0].lastChild).append($mentionLink);
    });

    $li.append($mentionList);
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
    $("strong").text("140");
    $(".mentioned-users").empty();
  }

  addMentionedUser(e) {
    e.preventDefault();
    let selectHTML = $("#mention-template").html();
    $(".mentioned-users").append(selectHTML);
  }

  removeMentionedUser(e) {
    e.preventDefault();
    let $target = $(e.target)[0];
    console.log($target.className);
    if ($target.className === "remove-mentioned-user"){
      $(e.target.parentElement).remove();
    }
  }

}

module.exports = TweetCompose;
