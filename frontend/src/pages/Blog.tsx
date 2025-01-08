import { Appbar } from "../components/Appbar";
import { Fullblog } from "../components/Fullblog";
import { Spinner } from "../components/Spinner";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";
export const Blog=()=>{
    const {id}=useParams();
    const {blog,loading}=useBlog({
        id: id || ""
    });


    if(loading || !blog){
        return(
            <div>
                <Appbar />
                <div className="h-screen flex flex-col justify-center">
                    <div className="flex justify-center">
                        <Spinner/>
                    </div>
                </div>
            </div>
        )
    }

    return(

        <div className="bg-primary">
            <Fullblog blog={blog} />
        </div>
    )
}