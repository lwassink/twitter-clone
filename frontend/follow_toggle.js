class FollowToggle {
  constructor($el) {
    this.userId = $el.data("user-id");
    this.followState = String($el.data("initial-follow-state"));
    this.$el = $el;
    this.render();
    this.handleClick();
  }

  render() {
    if (this.followState === "true") {
      this.$el.text("Unfollow");
    } else if (this.followState === "false") {
      this.$el.text("Follow");
    }
  }

  handleClick() {
    this.$el.on("click", (e) => {
      e.preventDefault();
      let requestType;
      if (this.followState === "true") {
        requestType = 'DELETE';
      } else
      if (this.followState === "false") {
        requestType = 'POST';
      }
      $.ajax({
        url: `/users/${this.userId}/follow`,
        type: requestType,
        dataType: 'json',
        success: () => {
          this.toggleFollowState();
          this.render();
        }
      });
    });
  }

  toggleFollowState() {
    if (this.followState === "true") {
      this.followState = "false";
    } else if (this.followState === "false") {
      this.followState = "true";
    }
  }
}

module.exports = FollowToggle;
