import PropTypes from "prop-types"
import { ExternalIcon } from "../utils/SvgIcon"
import { Link } from "react-router-dom"

export const EventCard = ({ event }) => {
  return (
    <div>
        <figure className="w-full h-[320px]">
            <img className="w-full h-full object-cover" src={event.cover} alt="" />
        </figure>
        <div className="font-bold mt-3">
            <h1>{event.name}</h1>
            <h4>${event.price}</h4>
        </div>
        <Link to={`/event/${event.id}`}><button className="mt-8 text-red border-red border-b flex items-center gap-2 active:scale-[.98] transition-transform">Book an Event <span className="w-2 h-2 block"><ExternalIcon></ExternalIcon></span></button></Link>
    </div>
  )
}

EventCard.propTypes = {
    event: PropTypes.object
}

