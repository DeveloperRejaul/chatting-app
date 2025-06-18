export default function Intro() {
  return (
    <div className='flex flex-1 justify-center items-center flex-col'>
        <h1 className="text-4xl font-bold text-teal-400 mb-6 text-center">Welcome to the Python Chatting App!</h1>
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            height={200}
            width={200}
        >
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#CCCCCC"
            strokeWidth={0.048}
            />
            <g id="SVGRepo_iconCarrier">
            <path
                d="M8 10.5H16M8 14.5H11M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21C9.9675 21 3.00463 21 3.00463 21C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3C16.9745 3 21.0039 7.02944 21.0039 12Z"
                stroke="#23e7d0"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            </g>
        </svg>
    </div>
  )
}
