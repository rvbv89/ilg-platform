import React from 'react';
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react';

export const UserAvatar = ({ avatarVal, avatarPreviewVal }) => {
  return avatarVal ? (
    <Avatar size="2xl" src={avatarPreviewVal} />
  ) : (
    <Avatar size="2xl" src={avatarPreviewVal} />
  );
};
