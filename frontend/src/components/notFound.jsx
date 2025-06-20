import { NotebookIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-between py-16 space-y-6 max-w-md mx-auto text-center'>
      <div className="bg-primary/10 rounded-full p-8">
      <NotebookIcon className='size-10 text-primary'/>

      </div>
      <h3 className="text-2xl font-bold ">No Note Yet</h3>
      <p className="text-base-content/70"> 
      Ready to organize your thoughts? create your first  note to get started.   on your journey.
      </p>
      <Link to='/create' className='btn btn-primary'>
      Create your First Note
      </Link>
    </div>
  )
}
