import { useEffect, useRef, useState } from 'react'

export default function ActivityDropDown({dropdownPlaceholder, dataToMap,onDropDownValueChange}) {
    // console.log(arrayData)
//   const selected] = useRef("")
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  const [dropdownValueSelected,setDropdownValueSelected] = useState("")
//   useEffect(() => {
//     console.log(dropdownValueSelected)
//   },[dropdownValueSelected])
const handleValueSelected = (value) => {
    setDropdownValueSelected(value)
    onDropDownValueChange(value)
}
  return (
    <div>
      <div className="relative h-full">
        <button onClick={toggleMenu} className="grid w-[200px] h-full grid-flow-col items-center justify-between cursor-pointer rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 max-[974px]:w-full">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            {/* <img alt="" src={selected.avatar} className="size-5 shrink-0 rounded-full" /> */}
            <span className={`block truncate font-semibold ${dropdownValueSelected== "" ? "text-[#7f888d]" : "text-gray-900"} text-[16px]`}>{dropdownValueSelected == "" ? dropdownPlaceholder : dropdownValueSelected}</span>
          </span>
          {/* <ChevronUpDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          /> */}
          <svg onClick={(e) => {handleValueSelected(""), e.stopPropagation()}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" className="om w-[15px] h-[15px]"><path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"></path></svg>
        </button>

        <div
          className={`absolute origin-top z-10 mt-1 max-h-56 w-[200px] overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden transition data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm max-[974px]:w-full ${isOpen ? "translate-y-[5px] scale-y-100" : "translate-y-0 scale-y-0"}`}
        >
          {dataToMap?.map(({value,id}) => (
            <div
              key={id}
            //   value={authorizedDetails.}
              className="group relative cursor-pointer py-2 pr-2 pl-3 text-gray-900 select-none hover:bg-indigo-600 hover:text-white hover:outline-hidden"
            >
              <div className="flex items-center" onClick={() => {handleValueSelected(value), setIsOpen(false)}}>
                <span className="ml-3 block font-normal group-hover:font-semibold">{value}</span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-hover:text-white">
                {/* {
                    selected.id == _id && (
                        <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd"></path>
                        </svg>
                    )
                } */}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
