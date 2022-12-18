import {
    Route,
    Routes,
    BrowserRouter,
} from "react-router-dom";

import { PageTemplate } from "../Views/Template";
import { Register } from "../Views/Register";
import { Login } from "../Views/Login";
import { Post } from "../Views/Post";
import { PostEditor } from "../Views/PostEditor";
import { PostList } from "../Views/PostList";

import 'antd/dist/antd.min.css';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={ <PageTemplate type="home" /> } />
                <Route path="/home" element={ <PageTemplate type="home" /> } />
                <Route path="/register" element={ <Register /> } />
                <Route path="/login" element={ <Login/> } />
                <Route path="/post/new/text" element={ <PostEditor type="text" /> } />
                <Route path="/post/new/md" element={ <PostEditor type="md" /> } />
                <Route path="/post/new/vote" element={ <PostEditor type="vote" /> } />
                <Route path="/posts" element={ <PostList /> } />
                <Route path="/posts/mine" element={ <PostList type="mine"/> } />
                <Route path="/posts/keep" element={ <PostList type="keep"/> } />
                <Route path="/posts/tag" element={ <PostList type="tag"/> } />
                <Route path="/post/:id" element={ <Post /> } />
                <Route path="*" element={ <></> } />
            </Routes>
        </BrowserRouter>
    );
}

export { App };
