import { Search } from "lucide-react";
import "./InputSearch.sass"

export default function InputSearch({ name, type="text", value, onChange, placeholder }){
    return (
        <div className="inputSearch">
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            <Search className="icon" size="26"/>
        </div>
    )
}