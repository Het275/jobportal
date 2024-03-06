const posts = [
    {
      id: "react-router-preventing-transitions",
      title: "Preventing transitions with React Router",
      content:
        "Respecting your user’s input is not only a solid business decision, but it also shows you care about little UX details. One of the most frustrating experiences a user can have is when they spend time inputting data into your app, accidentally hit a hotkey to navigate away from the current route, then have to restart the form all over. There are a few different approaches to fixing this bad UX but in this post, we’ll focus on how React Router v5 can help by warning before a route transition."
    },
    {
      id: "react-router-programmatically-navigate",
      title: "Programmatically navigate with React Router",
      content:
        "What I love about React Router is its dedication to declarative, “React like” code. The whole goal of the redesign to React Router v3 to v4 was to align React Router’s vision with React’s. Fundamentally, what this means is that the same mental model that applies to React should also apply to React Router."
    },
    {
      id: "react-router-query-strings",
      title: "Query Strings with React Router",
      content:
        "When you’re building for the web, sometimes you need to pass information via the URL. To do this, you can use a query string. You’ve probably seen them before IRL. Here’s an example from Twitter’s analytics page."
    },
    {
        id: "react-router-query-strings1",
        title: "Query Strings with React Router",
        content:
          "When you’re building for the web, sometimes you need to pass information via the URL. To do this, you can use a query string. You’ve probably seen them before IRL. Here’s an example from Twitter’s analytics page."
    },
    {
        id: "react-router-query-strings2",
        title: "Query Strings with React Router",
        content:
          "When you’re building for the web, sometimes you need to pass information via the URL. To do this, you can use a query string. You’ve probably seen them before IRL. Here’s an example from Twitter’s analytics page."
    },  
  ];
  
  export function getPost(postId) {
    return posts.find(({ id }) => postId === id);
  }
  
  export function getPosts() {
    return posts.map(({ id, title }) => ({ id, title }));
  }
  