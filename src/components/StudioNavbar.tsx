'use client'

export function StudioNavbar(props: any) {
  return (
    <div className="flex flex-col">
      <div className="bg-blue-900 px-4 py-3 flex items-center justify-between border-b border-blue-800">
        <div className="flex items-center">
          <a 
            href="/" 
            className="flex items-center gap-2 text-white hover:text-blue-200 transition font-medium text-sm"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return to Website
          </a>
        </div>
      </div>
      {props.renderDefault(props)}
    </div>
  )
}
