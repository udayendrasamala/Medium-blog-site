import { Link,useNavigate } from "react-router-dom";



export const Appbar=()=>{

    const navigate=useNavigate();
    const handleSignout=()=>{
    localStorage.removeItem("token");
    navigate('/');
    alert("You are Logged out");
}

    return (
        <div className=" border-b py-4 flex justify-between px-10 font-bold">
            <Link to={"/blogs"} className="flex flex-col justify-center cursor-pointer">
                Medium
            </Link>
            <div>
                <Link to={`/publish`}>
                    <button type="button" className="mr-8 text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">New</button>
                </Link>
                <button onClick={handleSignout} className="mr-8 text-white bg-[#475569] hover:bg-[#020617] focus:outline-none focus:ring-4 focus:ring-black-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Logout</button>
            </div>
        </div>
    );
}