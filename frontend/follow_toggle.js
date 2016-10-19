class FollowToggle {
  constructor($el) {
    this.userId = $el.data("user-id");
    this.followState = String($el.data("initial-follow-state"));
    this.$el = $el;
    this.render();

    //Set up button listener
    this.$el.on("click", this.handleClick.bind(this));
  }

  render() {
    if (this.followState === "true") {
      this.$el.text("Unfollow");
      this.$el.prop("disabled", false);
    } else if (this.followState === "false") {
      this.$el.text("Follow");
      this.$el.prop("disabled", false);
    } else if (this.followState === "Unfollowing") {
      this.$el.text("Unfollowing...");
      this.$el.prop("disabled", true);
    } else if (this.followState === "Following") {
      this.$el.text("Following...");
      this.$el.prop("disabled", true);
    }
  }

  handleClick(e) {
    // debugger
    e.preventDefault();
    let requestType;

    if (this.followState === "true") {
      requestType = 'DELETE';
      this.followState = "Unfollowing";
    } else
    if (this.followState === "false") {
      requestType = 'POST';
      this.followState = "Following";
    }

    //Freeze the button
    this.render();

    $.ajax({
      url: `/users/${this.userId}/follow`,
      type: requestType,
      dataType: 'json',
      success: () => {
        this.toggleFollowState();
        this.render();
      }
    });
  }

  toggleFollowState() {
    if (this.followState === "Unfollowing") {
      this.followState = "false";
    } else if (this.followState === "Following") {
      this.followState = "true";
    }
  }
}

module.exports = FollowToggle;
