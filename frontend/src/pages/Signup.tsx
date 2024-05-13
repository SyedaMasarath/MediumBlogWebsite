import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signup = () => {
    return <div>
        {/* By default we have a single cols, but if its larger we have 2 cols */}
       <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
            <Auth type={"signup"}></Auth>
        </div>
        {/* when screen is small div is invisible */}
        <div className="hidden lg:block">
        <Quote></Quote>
        </div>
       </div>
    </div>
}