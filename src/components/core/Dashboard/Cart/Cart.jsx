import { useSelector } from "react-redux"

import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)
  
  return (
    <>
      <h1 className="mb-14 text-xl sm:text-3xl  font-medium text-white font-wadik text-center sm:text-left">Cart</h1>
      <p className="border-b border-b-richblack-400 pb-2 font-semibold ">
        {totalItems} Courses in Cart
      </p>
      {totalItems > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="mt-14 text-center text-xl sm:text-3xl  ">
          Your cart is empty
        </p>
      )}
    </>
  )
}