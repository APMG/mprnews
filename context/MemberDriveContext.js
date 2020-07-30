import React from 'react';
const MemberDriveContext = React.createContext({
  memberDriveData: {},
  updateMemberDriveData: () => {},
});

export default MemberDriveContext;
