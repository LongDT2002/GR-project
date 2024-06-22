import Activate from '@/components/Authen/Activate'
import React from 'react'

const ActivatePage = ({ params }: { params: {uid: string, token: string }}) => {
  return (
    <div>
        <Activate uid={params.uid} token={params.token}/>
    </div>
  )
}

export default ActivatePage
