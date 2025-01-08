import { Link } from "react-router-dom";

interface Blogcardprops{
    Authorname:string;
    title:string;
    content:string;
    publisheddate:string;
    id:string;
}


export const Blogcard=({Authorname,title,content,publisheddate,id}:Blogcardprops)=>{
    return<Link to={`/blog/${id}`}> <div className="border-b border-slate-200 pb-4 pt-2 w-screen max-w-screen-md cursor-pointer">
        
        <div className="flex">
           <div className=" pr-2 "><Avatar size="small" name={Authorname}/></div>
           <div className="font-extralight text-sm pr-2 flex justify-center flex-col">{Authorname}</div>
           <div className="flex justify-center flex-col "><Circle /></div>
           <div className="font-thin pl-2 text-sm text-slate-500 flex justify-center flex-col">{publisheddate}</div>
        </div> 
        <div className="text-xl font-semibold pt-2">
            {title}
        </div>
        <div className="text-md font-thin">
             {(content.length >100) ?content.slice(0,100)+"...":content}
        </div>
        <div className="w-full text-slate-500 pt-4 text-sm font-thin">
            {content.length>100?`${Math.ceil(content.length/100)} min read`:"1 min read"}
        </div>
    </div>
    </Link> 
}

export function Avatar({name,size="small"}:{name:string , size:"small" | "big"}){
    return(
    <div className={`relative inline-flex items-center justify-center  overflow-hidden bg-gray-600 rounded-full ${size=="small"?"w-6 h-6":"w-10 h-10"}`}>
        <span className={`${size=="small"?"text-xs":"text-md"} font-extralight text-gray-600 dark:text-gray-300`}>{name[0]}</span>
    </div>)
    
}

export function Circle(){
    return(
        <div className="h-1 w-1 rounded-full bg-slate-500">
            
        </div>
    );
}