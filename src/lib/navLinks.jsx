import { RxDashboard } from "react-icons/rx";
import { LuBox, LuUsers } from "react-icons/lu";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TbMessage } from "react-icons/tb";

const links=[
    {id:"dashboard", linkName:"dashboard",path:"/", icon:<RxDashboard />},
    {id:"products", linkName:"products",path:"/products", icon:<LuBox />},
    {id:"orders", linkName:"orders",path:"/orders", icon:<AiOutlineShoppingCart/>},
    {id:"messages", linkName:"messages",path:"/messages", icon:<TbMessage/>},
    {id:"customers", linkName:"clients",path:"/customers", icon:<LuUsers/>}
]

export default links
