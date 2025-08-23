import Articles from "../components/Articles/Articles"
import NavSearch from "../components/NavSearch/NavSearch"
import TabBar from "../components/TabBar/TabBar"
import "./Dashboard.sass"

export default function Dashboard(){
    return (
        <>
            <NavSearch/>
            <TabBar/>
            <Articles/>
        </>
    )
}