import { Link } from "react-router-dom"
export const MidContent=()=>{
    return<div className="flex justify-center">
        <div className="flex h-screen flex-col justify-center ">
            <div className=" flex flex-col font-serif text-9xl">
                <div className="-mb-1">
                    Human
                </div>
                <div className="-mt-1">
                    stories&ideas
                </div>
            </div>
            <div className="font-medium pt-6 font-mono text-2xl">
                    A place to read, write, and deepen your understanding
            </div>
            <div className="pt-10 -ml-1">
                <Link to={"/blogs"}>
                <div className="bg-black inline-block font-mono text-white py-2 px-4  rounded-full">
                    Start reading
                </div>
                </Link>
            </div>
        </div>
        <div>
            
        </div>
    </div>
}