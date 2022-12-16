import {
    Route,
    Routes,
    BrowserRouter,
} from "react-router-dom";

import { PageTemplate } from "../Views/Template";
import { Register } from "../Views/Register";
import { Login } from "../Views/Login";
import { PostList } from "../Views/Post/PostList";
import { MDCreatePost } from "../Views/Post/MDCreatePost";
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

                <Route path="/postList" element={ <PostList/> } />
                <Route path="/MDCreatePost" element={ <MDCreatePost/> } />
                <Route path="/CommonCreatePost" element={ <CommonCreatePost/> } />
                <Route path="*" element={ <></> } />
            </Routes>
        </BrowserRouter>
    );
}

export { App };
