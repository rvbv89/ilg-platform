import React from 'react';
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react';

export const UserAvatar = ({ avatarVal }) => {
  return avatarVal ? (
    <Avatar size="2xl" src={avatarVal} />
  ) : (
    <Avatar size="2xl" src={''} />
  );
};
