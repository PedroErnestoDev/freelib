import { NavLink } from "react-router-dom";
import {
  House,
  Settings,
  SquarePlus,
  Star,
  CircleUserRound,
} from "lucide-react";
import "./TabBar.sass";

export default function TabBar() {
  return (
    <nav className="containerTabBar">
      <NavLink to="/dashboard">
        <House className="icon" size="42" />
      </NavLink>
      <NavLink to="/settings">
        <Settings className="icon" size="42" />
      </NavLink>
      <NavLink to="/create">
        <SquarePlus className="icon" size="42" />
      </NavLink>
      <NavLink to="/favorites">
        <Star className="icon" size="42" />
      </NavLink>
      <NavLink to={`/profile/${localStorage.getItem("userId")}`}>
        <CircleUserRound className="icon" size="42" />
      </NavLink>
    </nav>
  );
}
