import React from 'react';
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { useEffect } from 'react';

export const UserAvatar = ({ avatarVal }) => {
    useEffect(()=>{
        if (!avatarVal) {
            return
        }
        console.log(avatarVal)
    },[avatarVal])

  return (
    avatarVal ? (
<div>
    <span>hi</span>
        <Avatar size="2xl" src={avatarVal} />
    </div>
    ) : (
        <Avatar/>
    )
    
  )
}
