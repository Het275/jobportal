import * as React from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

import { getPost, getPosts } from "./Api's";

function Home() {
  const posts = getPosts();

  return (
    <div>
      <h1>Posts</h1>
      <nav>
        <ul>
          {posts.map(({ id, title }) => (
            <li key={id}>
              <Link to={`blog/${id}`}>{title}</Link>
              <Link to={`users`}>Users</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

function Post() {
  const { id } = useParams();
  const post = getPost(id);

  return (
    <div>
      <h1>{post.id}</h1>
      <p>{post.content}</p>
    </div>
  );
}

function Users() {
  const params = useParams()
  const userId = params.userId
  return(
    <>
      <h1>Details about user {userId}</h1>
    </>
  );
}

function UserDetails() {
  const params = useParams()
  const userId = params.userId
  return <div>Details about user {userId}</div>
}

export default function Params() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='users' element={<Users />}>
          <Route path=':userId' element={<UserDetails />}/>
        </Route>
        <Route path="/blog/:id" element={<Post />} />
      </Routes>
    </Router>
  );
}