import { useNavigate } from "react-router-dom"
import { Footer } from "./Footer"
import { Header } from "./Header"

export const NotFound = () => {

  const navigate = useNavigate()
  return (
    <>
    <Header></Header>
    <div className="h-[70vh] grid place-content-center text-center">
        <h1 className="text-9xl font-black mb-4">404</h1>
        <h2>Something isn&apos;t Found</h2>

        <button className="bg-black py-3 w-full md:w-[500px] text-white mt-6 rounded font-bold" onClick={() => navigate(-1)}>Go Back</button>

    </div>
      <Footer></Footer>
      </>

  )
}
