import { Header } from "../components/Header"
import { MidContent } from "../components/Landingmid"

export const LandingPage=()=>{
    return <div className="bg-[#f6f4ec]">
        <div>
            <Header />
        </div>
        <div>
            <MidContent />
        </div>
    </div>
}