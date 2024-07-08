import Reset from '@/components/Authen/Reset';
import React from 'react';

const ResetPage = ({ params }: { params: {uid: string, token: string }}) => {
  return (
    <div>
        <Reset uid={params.uid} token={params.token}/>
    </div>
  )
}

export default ResetPage;
