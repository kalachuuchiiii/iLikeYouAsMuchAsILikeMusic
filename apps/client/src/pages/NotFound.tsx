import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@src/components/ui/empty'
import React from 'react'

const NotFound = () => {
  return (
    <div className='w-full h-full bg-'>
      <Empty>
        <EmptyHeader>
          <EmptyTitle>
            404 Page not found.
          </EmptyTitle>
          <EmptyDescription>
            This page might've been removed or had never existed.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  )
}

export default NotFound