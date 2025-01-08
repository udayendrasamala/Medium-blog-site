import { Link } from "react-router-dom"

export const Header=()=>{
    return <div className="border-b border-black">
        <div className="flex items-center justify-between px-10 pt-4 pb-4">
            <div className="flex justify-center font-serif text-3xl font-extrabold">
                Medium
            </div>
            <div className="flex items-center space-x-10">
                
                <Link to={'/signup'}>
                    <div className="font-mono  bg-black text-white py-2 px-4 rounded-full">
                        Get started
                    </div>
                </Link>
            </div>
        </div>
    </div>
}