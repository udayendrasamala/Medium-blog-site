import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./Blogcard"

    export const Fullblog=({ blog } :{ blog :Blog})=>{
        return(
         <div>
            <div>
                <Appbar />
            </div>
            <div>
                <div className="grid grid-cols-8 lg:grid-cols-12 px-14 w-full h-screen max-w-screen-xl pt-8">
                    <div className="col-span-8 mr-4">
                        <div className="text-5xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-500 pt-2">
                            Posted on 1st jan 2025
                        </div>
                        <div className="pt-4">
                            {blog.content}
                        </div>
                    </div>
                    <div className=" hidden lg:block col-span-4 ml-4">
                        <div className="text-slate-600 text-lg ">
                            Author
                        </div>
                        <div className="flex max-w-full pt-2">
                            <div className="pr-4 flex flex-col justify-center">
                                <Avatar size="big" name={blog.author.name || "Anonymous"} />
                            </div>
                            <div>
                                <div className="text-xl font-bold">
                                    {blog.author.name|| "Anonymous"}
                                </div>
                                <div className="pt-2 text-slate-500">
                                    Random catch phrase about authors ability to grab users attention
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}