import Administrator from "../components/administrator/Administrator";
import Classify from "../components/classify/Classify";
import Favorite from "../components/favorite/Favorite";
import Inform from "../components/inform/Inform";
import Login from "../components/login/Login";
import Main from "../components/main/Main";
import Message from "../components/message/Message";
import Trolley from "../components/trolley/Trolley";
import Merchandies from "../components/main/merchandise/Merchandise";
import HomePage from "../components/main/homepage/HomePage";
import Result from "../components/main/search/Result";
import Preview from "../components/administrator/content/Preview";
import AContent from "../components/administrator/content/AContent";
import MyEmpty from "../components/empty/MyEmpty";
import UserContent from "../components/administrator/content/UserContent";
import Plus from "../components/administrator/content/Plus";

const routes=[
    {
        path:'/',
        element:<Main/>,
        children:[
            {
                path:'/home',
                element:<HomePage/>
            },
            {
                path:'/shopping/:id',
                element:<Merchandies/>
            }
        ]
    },
    {
        path:'login',
        element:<Login/>
    },
    {
        path:'inform',
        element:<Inform/>
    },
    {
        path:'mess',
        element:<Message/>
    },
    {
        path:'search',
        element:<Result/>
    },
    {
        path:'favorite',
        element:<Favorite/>,
    },
    {
        path:'classify',
        element:<Classify/>,
    },
    {
        path:'trolley',
        element:<Trolley/>,
    },
    {
        path:'manager',
        element:<Administrator/>,
        children:[
            {
                path:'preview',
                element:<Preview/>
            },
            {
                path:'details',
                element:<AContent/>
            },
            {
                path:'user',
                element:<UserContent/>,
            },
            {
                path:'plus',
                element:<Plus/>
            }
        ]
    },
    {
        path:'empty',
        element:<MyEmpty/>
    }
]

export default routes;