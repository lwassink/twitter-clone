const FollowToggle = require("./follow_toggle");
const UsersSearch = require("./users_search");
const TweetCompose = require("./tweet_compose");
const InfiniteTweets = require("./infinite_tweets");

$(() => {
  // follow/unfollow users
  $(".follow-toggle").each((idx, el) => {
    let toggler = new FollowToggle($(el));
  });

  // user search
  $("nav.users-search").each((idx, el) => {
    let searcher = new UsersSearch($(el));
  });

  // tweet compose
  $(".tweet-compose").each((idx, el) => {
    let composer = new TweetCompose($(el));
  });

  // infinite scroll of tweets
  $(".infinite-tweets").each((idx, el) => {
    let scroller = new InfiniteTweets($(el));
  });
});
