export const Banner = () => {
  return (
    <div className="py-6 md:px-10 px-5 mt-4">
        <div className="w-full h-[480px] bg-red bg-cover bg-center" style={{ backgroundImage: 'url(/banner-compressed.png)' }}>
            
        </div>
        <div className="mt-4 flex justify-between">
            <h1 className="font-bold">Elevating <span className="text-red">Events</span>, Defining Moments</h1>
            <button className="font-medium">Play</button>
        </div>
    </div>
  )
}
