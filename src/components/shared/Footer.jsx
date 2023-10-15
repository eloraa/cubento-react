import { MasterCardIcon, VisaCardIcon } from "../utils/SvgIcon"

export const Footer = () => {
  return (
    <footer className="pt-6 md:px-10 px-5">
        <div className="flex gap-8">
            <div className="h-5"><VisaCardIcon></VisaCardIcon></div>
            <div className="h-5"><MasterCardIcon></MasterCardIcon></div>
        </div>
        <div className="mt-6 flex justify-between py-4 border-t border-[#ddd] text-xs sm:text-sm">
            <div className="flex gap-3">
                <h2>Dhaka, Bangladesh</h2>
                <h2>{ new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Dhaka', hour12: false, hour: 'numeric', minute: 'numeric' }) } - Local Time</h2>
            </div>
            <h2>©2023</h2>
        </div>
    </footer>
  )
}
