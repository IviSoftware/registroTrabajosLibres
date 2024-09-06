import { TitleQuest } from "../TitleQuests"
import { ProgressBar } from "../ProgressBar"
import { NavbarQuest } from "../NavBarQuest"
import './ContainerQuest.css'


function ContainerQuest({children,percentageState,title}) {

    
    return (
        <div>
        <NavbarQuest />
        <div className="w-full h-full flex justify-center items-center bg-slate-300" >
            <div style={{ maxWidth: "700px", fontSize: "" }} className="containerQuest w-full rounded-md p-8 relative bottom-12 md:bottom-52">
                <TitleQuest title={title} />
                <ProgressBar percentage={percentageState} />
                <div className="flex flex-col gap-6">
                    {children}
                </div>
            </div>
        </div>
        </div>
    )
}

export { ContainerQuest }