import {
    Route,
    Routes,
    BrowserRouter,
} from "react-router-dom";
import { Login } from "../Views/Login";
import { PostList } from "../Views/Post/PostList";
import { Register } from "../Views/Register";
import { Template } from "../Views/Template";
import { MDCreatePost } from "../Views/Post/MDCreatePost";

import { CommonCreatePost } from "../Views/Post/CommonCreatePost";
import { HomePageNavBarLogin } from "../Components/NavBar/HomePageNavBarLogin";
import { HomePageNavBarNoLogin } from "../Components/NavBar/HomePageNavBarNoLogin";
import { OtherPageNavBarLogin } from "../Components/NavBar/OtherPageNavBarLogin";
import { OtherPageNavBarNoLogin } from "../Components/NavBar/OtherPageNavBarNoLogin";
import 'antd/dist/antd.min.css';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={ <></> } />
                <Route path="/login" element={ <Login/> } />
                <Route path="/postList" element={ <PostList/> } />
                <Route path="/register" element={ <Register/> } />
                <Route path="/template" element={ <Template/> } />
                <Route path="/MDCreatePost" element={ <MDCreatePost/> } />
                
                <Route path="/CommonCreatePost" element={ <CommonCreatePost/> } />
                <Route path="/homePageNavBarLogin" element={ <HomePageNavBarLogin/> } />
                <Route path="/otherPageNavBarLogin" element={ <OtherPageNavBarLogin/> } />
                <Route path="/homePageNavBarNoLogin" element={ <HomePageNavBarNoLogin/> } />
                <Route path="/otherPageNavBarNoLogin" element={ <OtherPageNavBarNoLogin/> } />
                <Route path="*" element={ <></> } />
            </Routes>
        </BrowserRouter>
    );
}

export { App };
