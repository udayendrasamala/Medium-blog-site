import { Appbar } from "../components/Appbar"
import { Blogcard } from "../components/Blogcard"
import { Blogskeleton } from "../components/Blogskeleton";
import { useBlogs } from "../hooks"

export const Blogs=()=>{

    const {loading,blogs}=useBlogs();

    if (loading) {
        return <div>
            <Appbar /> 
            <div  className="flex justify-center">
                <div>
                    <Blogskeleton />
                    <Blogskeleton />
                    <Blogskeleton />
                    <Blogskeleton />
                    <Blogskeleton />
                </div>
            </div>
        </div>
    }
    return <div>
        <Appbar />
        <div  className="flex justify-center">
            <div>
                {blogs.map(blog =>  <Blogcard
                key={blog.id}//my new intervention
                    id={blog.id}
                    Authorname={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publisheddate={"2nd Feb 2024"}
                />)}
            </div>
        </div>
    </div>
}