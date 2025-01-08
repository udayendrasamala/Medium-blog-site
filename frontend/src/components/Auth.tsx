import { SignupInput } from "@aerospace/medium-common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config";

export const Auth=({type}:{type:"signup" | "signin"})=>{
    const [postInputs,setPostInputs]=useState<SignupInput>({
        name:"",
        username:"",
        password:""
    });
    const navigate=useNavigate();
    async function sendRequest() {
        try{
            const response=await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs);
            const jwt=response.data;
            localStorage.setItem("token",jwt.jwt);
            navigate("/blogs");
        }
        catch(e)
        {
            console.log(e);/////////need to set neat alerts  
            alert(e);///////////////need to set neat alerts and how to take response returned from backend
        }
    }

    return(
        <div>
            <div className="h-screen flex justify-center flex-col">
               <div className="flex justify-center">
                <div>
                <div className="px-10">
                <div className="font-extrabold text-2xl">
                    {type==="signup"?"Create an account":"Access your account"}
                </div>
                <div className="text-slate-400">
                    {type==="signup"?"Already have an account?":"Don't have an account?"}
                    <Link to={type==="signin"?"/signup":"/signin"} className="underline pt=2"> {type==="signin"?"Create account":"Login"} </Link>
                </div>
                </div>
                <div className="pt-6">
                   {type==="signup" ?<LabelledInput label="Name" placeholder="udayendra" onchange={(e)=>
                        {
                            setPostInputs({
                                ...postInputs,
                                name:e.target.value
                            })
                        }
                    }/>:null}
                    <LabelledInput label="Username" placeholder="yourname@gmail.com" onchange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            username:e.target.value,
                        })
                    }}/>
                    <LabelledInput label="Password" type="password" placeholder="123456" onchange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            password:e.target.value
                        })
                    }}/>
                </div>
                <div>
                <button type="button" onClick={sendRequest} className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup"?"Sign up":"Sign in"} </button>
                </div>
                </div>
               </div>
            </div>
        </div>
    )
}

interface LabelledInputType{
    label: string;
    placeholder:string;
    onchange:(e:ChangeEvent<HTMLInputElement>)=>void,
    type?:string

}
function LabelledInput({label,placeholder,onchange,type}:LabelledInputType){
    return(
        <div >
            <div>
            <label className="block mb-2 text-sm font-semibold text-black pt-4">{label}</label>
            <input onChange={onchange} type={type || "text"} id={label} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
            </div>
        </div>
    )
}