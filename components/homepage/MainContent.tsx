import React from 'react'
import { data } from "@/utils/letschat/contactChatList";
import UserCard from './UserCard';

const MainContent:React.FC=()=> {
  return (
    <div className='w-4/5 m-auto my-3'>
        <div className='grid grid-cols-4 justify-between items-center'>
            {data?.map((el:any)=><UserCard key={el.id} data={el}/>)}
        </div>
    </div>
  )
}

export default MainContent