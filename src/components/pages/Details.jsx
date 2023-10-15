import { useContext } from "react"
import { Footer } from "../shared/Footer"
import { Header } from "../shared/Header"
import { DataContext } from "../Root"
import { Link, useParams } from "react-router-dom"
import { BookmarkIcon } from "../utils/SvgIcon"
import { saveToLocale } from "../utils/localstorage"
import { AuthContext } from "../providers/authProviders"

export const Details = () => {
    const params = useParams()
    const { data } = useContext(DataContext)
    const { user } = useContext(AuthContext)
    const event = data.find(e => e.id === params.id) 

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-2 pt-40 md:pt-0">
        <div className="xl:min-h-screen">
            <img src={event.cover} className="w-full h-full object-cover" alt="" />
        </div>
        <div className="md:col-span-2 xl:col-auto">
            <Header className="max-md:fixed w-full top-0 bg-white"></Header>
            <div className="py-6 md:px-10 px-5 my-12">
                <div>
                    <h1 className="font-bold text-xl">{event.name}</h1>
                    <p className="mt-4 text-sm">{event.description}</p>
                </div>
                <div className="mt-16 pb-2 text-sm border-b border-[#ddd]">
                    <h4>Details</h4>
                </div>
                <ul className="mt-8 grid gap-8">
                    <li>
                        <h4 className="font-bold mb-1 text-sm">Price</h4>
                        <h2>${event.price}</h2>
                    </li>
                    <li>
                        <h4 className="font-bold mb-1 text-sm">Location</h4>
                        <h2>{event.location}</h2>
                    </li>
                    <li>
                        <h4 className="font-bold mb-1 text-sm">Category</h4>
                        <h2>{event.category}</h2>
                    </li>
                    <li>
                        <h4 className="font-bold mb-1 text-sm">Special Features</h4>
                        <div className="flex gap-x-4 flex-wrap">
                            {event.specialFeatures.map((f, i) => <h2 key={i}>{f}</h2>)}
                        </div>
                    </li>
                </ul>

                <div className="grid grid-cols-[1fr_auto] gap-4 mt-8 mb-16">
                    <Link className="w-full h-full" to={`/payment/${event.id}`}><button className="bg-black py-4 md:px-24 w-full px-0 text-white font-bold rounded h-full active:scale-[.99] transition-transform">Book an Event</button></Link>
                    <button onClick={() => saveToLocale(event.id, user.uid)} className="w-16 h-16 p-5 border border-[#ddd] rounded active:scale-95 transition-transform">
                        <BookmarkIcon></BookmarkIcon>
                    </button>
                </div>
            </div>
            <Footer></Footer>
        </div>
    </div>
  )
}
