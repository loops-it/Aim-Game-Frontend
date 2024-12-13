import {FlagIcon,PaperClipIcon,ChatBubbleBottomCenterIcon} from "@heroicons/react/24/solid";
import Avatar from "@mui/material/Avatar";
// eslint-disable-next-line react/prop-types
export default function TaskCard({onClick, name, date}){
    const formattedDate = new Date(date).toLocaleDateString();
    return (
        <div onClick={onClick} className={'text-app-blue-3 px-5 py-5 bg-[#BBBDC936]'}>
            <div className={'flex justify-between items-center mb-5'} >
                <div>{name}</div>
                <input type={'radio'} className={'w-6 h-6 accent-app-blue'} />
            </div>
            <div className={'flex items-center justify-between'} >
                <div className={'text-app-blue-2 font-semibold text-sm'} >{formattedDate}</div>
                <div className={'flex items-center gap-5'}>
                    <FlagIcon className={"w-5 h-5 text-[#3AB51D]"}/>
                    <Avatar sx={{width: 24, height: 24}} src={"https://mui.com/static/images/avatar/1.jpg"}/>
                    <div className={'text-[#C1C1C1] flex items-center '}>
                        <PaperClipIcon className={'w-5 h-5'}/>
                        <div>2</div>
                    </div>

                    <div className={'text-[#C1C1C1] flex items-center '}>
                        <ChatBubbleBottomCenterIcon className={'w-5 h-5'}/>
                        <div>2</div>
                    </div>
                </div>
            </div>
        </div>
    )
}