import {
    Route,
    Routes,
    BrowserRouter,
} from "react-router-dom";

import { PageTemplate } from "../Views/Template";
import { Register } from "../Views/Register";
import { Login } from "../Views/Login";
import { PostEditor } from "../Views/Post/PostEditor";
import { PostList } from "../Views/Post/PostList";
import { CommonCreatePost } from "../Views/Post/CommonCreatePost";

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

                <Route path="/postList" element={ <PostList/> } />
                <Route path="/CommonCreatePost" element={ <CommonCreatePost/> } />
                <Route path="*" element={ <></> } />
            </Routes>
        </BrowserRouter>
    );
}

export { App };
