import Avatar from "@mui/material/Avatar";
import React from "react";

export default function TaskCommentItem(){
    return (
        <div className={'bg-[#F8F8F8] py-5 px-5 rounded-lg flex justify-between'}>
            <div className={'flex items-start gap-5'}>
                <div>
                    <Avatar sx={{bgcolor: "#A8B0D7", color: "#30385E"}}>TU</Avatar>
                </div>
                <div className={'text-app-blue'}>
                    <div className={'text-lg font-semibold'}>Test User</div>
                    <div>hello World</div>
                </div>
            </div>
            <div>2 d</div>
        </div>
    )
}