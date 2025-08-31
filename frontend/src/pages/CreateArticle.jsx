import FormCreateArticle from "../components/FormCreateArticle/FormCreateArticle"
import Navbar from "../components/Navbar/Navbar";
import TabBar from "../components/TabBar/TabBar";

export default function CreateArticle(){
    return (
        <>  
            <FormCreateArticle userId={loggedUserId} />
        </>
    )
}