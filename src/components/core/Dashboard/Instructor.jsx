import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import { getInstructorData } from "../../../services/operations/profileAPI"
import InstructorChart from "./InstructorDashboard/InstructorChart"
import Img from './../../common/Img';



export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)

  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses] = useState([])

 const navigate = useNavigate()
  // get Instructor Data
  useEffect(() => {
    ; (async () => {
      setLoading(true)
      const instructorApiData = await getInstructorData(token)
      const result = await fetchInstructorCourses(token)
      // console.log('INSTRUCTOR_API_RESPONSE.....', instructorApiData)
      if (instructorApiData.length) setInstructorData(instructorApiData)
      if (result) {
        setCourses(result)
      }
      setLoading(false)
    })()
  }, [])

  const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0)

  const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0)


  // skeleton loading
  const skItem = () => {
    return (
      <div className="mt-5 w-full flex flex-col justify-between  rounded-xl ">
        <div className="flex border p-4 border-richblack-600 ">
          <div className="w-full">
            <p className="w-[100px] h-4 rounded-xl skeleton"></p>
            <div className="mt-3 flex gap-x-5">
              <p className="w-[200px] h-4 rounded-xl skeleton"></p>
              <p className="w-[100px] h-4 rounded-xl skeleton"></p>
            </div>

            <div className="flex justify-center items-center flex-col">
              <div className="w-[80%] h-24 rounded-xl mt-5 skeleton"></div>
              {/* circle */}
              <div className="w-60 h-60 rounded-full  mt-4 grid place-items-center skeleton"></div>
            </div>
          </div>
          {/* right column */}
          <div className="sm:flex hidden min-w-[250px] flex-col rounded-xl p-6 skeleton"></div>
        </div>

        {/* bottom row */}
        <div className="flex flex-col gap-y-6  mt-5">
          <div className="flex justify-between">
            <p className="text-lg font-bold text-white pl-5">Your Courses</p>
            <Link to="/dashboard/my-courses">
              <p className="text-xs font-semibold text-yellow-50 hover:underline pr-5">View All</p>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row  gap-6 ">
            <p className=" h-[201px] w-full rounded-xl  skeleton"></p>
            <p className=" h-[201px] w-full rounded-xl  skeleton"></p>
            <p className=" h-[201px] w-full rounded-xl  skeleton"></p>
          </div>
        </div>
      </div>
    )
  }

  
  return (
    <div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-white text-center sm:text-left">
          Hii {user?.firstName} 👋
        </h1>
        <p className="font-medium  text-center sm:text-left">
          Let's start something new
        </p>
      </div>


      {loading ? (
        <div>
          {skItem()}
        </div>
      )
        :
        courses.length > 0 ? (
          <>
  <div className="my-4 flex sm:flex-row flex-col-reverse flex-wrap">
    {/* Render chart / graph */}
    {totalAmount > 0 || totalStudents > 0 ? (
      <InstructorChart courses={instructorData} />
    ) : (
      <div className="flex-1 rounded-md p-6 bg-blue-500">
        <p className="text-lg font-bold text-white">Visualize</p>
        <p className="mt-4 text-xl font-medium text-white">
          Not Enough Data To Visualize
        </p>
      </div>
    )}
    {/* Total Statistics */}
    <div className="flex min-w-[250px] flex-col rounded-md p-6 border-2 border-gray  sm:ml-5">
      <p className="font-wadik text-lg font-bold text-white">Statistics</p>
      <div className="mt-4 space-y-4">
        <div>
          <p className="text-sm">Total Courses:</p>
          <p className="text-md font-semibold text-white">
            {courses.length}
          </p>
        </div>
        <div>
          <p className="text-sm">Total Students:</p>
          <p className="text-md font-semibold text-white">
            {totalStudents}
          </p>
        </div>
        <div>
          <p className="text-sm">Total Income:</p>
          <p className="text-md font-semibold text-white">
            {totalAmount} $
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Render 3 courses */}
  <div className="rounded-md p-6 bg-blue-500">
    <div className="flex items-center justify-between">
      <p className="font-wadik font-bold text-white">Your Courses</p>
      <Link to="/dashboard/my-courses">
        <p className="text-xs font-semibold text-yellow-50 hover:underline">
          View All
        </p>
      </Link>
    </div>

    <div className="my-4 flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0">
      {courses.slice(0, 3).map((course) => (
        <div key={course._id} className="sm:w-1/3 flex flex-col items-start"
          onClick={() => {
            navigate(`/dashboard/edit-course/${course._id}`)
          }}
        >
          <img
            src={course.thumbnail}
            alt={course.courseName}
            className="h-[125px] w-full rounded-2xl object-cover"
          />

          <div className="mt-3 w-full">
            <p className="text-sm font-medium text-white">
              {course.courseName}
            </p>
            <div className="mt-1 flex items-center space-x-2">
              <p className="text-xs font-medium">
                {course.studentsEnrolled.length} students
              </p>
              <p className="text-xs font-medium">|</p>
              <p className="text-xs font-medium">{course.price} $</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</>

        ) : (
          <div className="mt-20 rounded-md  p-6 py-20">
            <p className="text-center text-2xl font-bold text-white">
              You have not created any courses yet
            </p>

            <Link to="/dashboard/add-course">
              <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
                Create a course
              </p>
            </Link>
          </div>
        )}
    </div>
  )
}
