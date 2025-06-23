import {Link, NavLink} from "react-router-dom";
import {bottomNavItems, navItems} from "../../helpers/constants";
import Logo from "../common/logo";
import {useLogout} from "../../hooks/api_hooks/useAuth.js"
import {LogOut} from "lucide-react";


const Sidebar = () => {
    const {mutate, isPending} = useLogout();
    const activeLinkClass = "bg-[#10062b] bg-opacity-20 font-medium";
    const inactiveLinkClass = "hover:bg-gray-400 hover:bg-opacity-10";

   
    const filteredLinks = navItems.filter(link => {
        if (!link.allowedRoles || link.allowedRoles.length === 0) return true;
        if (!user || !user.roles) return false;
        
    });


    return (
        <div
            className="w-72 min-h-screen bg-gradient-to-r from-[#10062b] to-[#420129] text-white   p-4 flex flex-col fixed">
            <Link to="/dashboard/home">
                <Logo/>
            </Link>
            <nav className="flex-1">
                <ul className="space-y-2">
                    {filteredLinks.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                end={item.path === "/dashboard"}
                                className={({isActive}) =>
                                    `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                                        isActive ? activeLinkClass : inactiveLinkClass
                                    }`
                                }
                            >
                                <item.icon size={20}/>
                                <span className="text-sm">{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <nav className="mt-auto pt-4 ">
                <ul className="space-y-2">
                    {bottomNavItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({isActive}) =>
                                    `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                                        isActive ? activeLinkClass : inactiveLinkClass
                                    }`
                                }
                            >
                                <item.icon size={20}/>
                                <span className="text-sm">{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                    <button className="flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer hover:bg-gray-400 hover:bg-opacity-10 w-full" onClick={mutate}>
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
