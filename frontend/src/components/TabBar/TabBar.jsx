import { NavLink } from "react-router-dom";
import { House, Settings, SquarePlus, Star, CircleUserRound } from "lucide-react";
import "./TabBar.sass"


export default function TabBar(){
    return (
        <nav className="containerTabBar">
            <NavLink to="/dashboard">
                <House className="icon" size="42"/>
            </NavLink>
            <NavLink to="/settings">
                <Settings className="icon" size="42"/>
            </NavLink>
            <NavLink to="/publish">
                <SquarePlus className="icon" size="42"/>
            </NavLink>
            <NavLink to="/favorites">
                <Star className="icon" size="42"/>
            </NavLink>
            <NavLink to="/profile">
                <CircleUserRound className="icon" size="42"/>
            </NavLink>
        </nav>
    )
}