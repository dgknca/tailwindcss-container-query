export default function Home() {
  return (
    <div className="container-type-size w-80 h-80 overflow-auto resize">
      <div className="bg-yellow-100 h-full w-full border-4 border-gray-100 cq-w-22:bg-blue-200 cq-h-22:border-red-400 flex justify-end items-end">
        <div className="inline-flex items-end">
          <div className="pb-12">Resize the container</div>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fillOpacity="0.01"/><path d="M37 19V37H19" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M11.5441 11.5442L36.9999 37" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
    </div>
  )
}
