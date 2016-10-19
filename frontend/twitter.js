const FollowToggle = require("./follow_toggle");

$(() => {
  $(".follow-toggle").each((idx, el) => {
    let toggler = new FollowToggle($(el));
  });
});
