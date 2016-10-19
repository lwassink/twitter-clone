const FollowToggle = require('./follow_toggle');

class UsersSearch {
  constructor($el) {
    this.$el = $el;
    this.$input = $($el.find("input"));
    this.$ul = $($el.find(".users"));
    this.$input.on("keyup", this.handleInput.bind(this));
  }

  handleInput() {
    $.ajax({
      url: "/users/search",
      type: 'GET',
      dataType: 'json',
      data: this.$input.serialize(),
      success: (body) => {
        this.renderResults(body);
      }
    });
  }

  renderResults(searchResults) {
    this.$ul.empty();

    $(searchResults).each((idx, result) => {
      let $li = $("<li>");
      let $anchor = $("<a>");
      $anchor.text(result.username);
      $anchor.attr("href", `/users/${result.id}`);
      $li.append($anchor);

      let $followButton = $("<button>");
      $followButton.attr("data-user-id", result.id);
      $followButton.attr("data-initial-follow-state", result.followed);
      $followButton.css("margin-left", "10px");
      new FollowToggle($followButton);
      $li.append($followButton);

      this.$ul.append($li);
    });
  }
}

module.exports = UsersSearch;
