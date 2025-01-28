import React from 'react'
import Button from './Button'

const Pagination = ({fetchDataDetail,passedListingFunction}) => {
    console.log(fetchDataDetail)
    // const {token} = useAuthStore();
    const handlePageChange = (gotNumber) => {
        console.log(gotNumber)
        // isCreateEditModel.current = true;
        passedListingFunction(gotNumber); 
    }
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
            <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
            Previous
            </a>
            <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
            Next
            </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
                <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{fetchDataDetail && fetchDataDetail.skipDataCount + 1 || 1}</span> to <span className="font-medium">{fetchDataDetail && fetchDataDetail.skipDataCount * 2 || fetchDataDetail && fetchDataDetail.data && fetchDataDetail.data.length}</span> of{' '}
                    <span className="font-medium">{fetchDataDetail && fetchDataDetail.data && fetchDataDetail.total_records}</span> results
                </p>
            </div>
            <div>
                <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm gap-[5px]">
                    <Button btn_title="Previous" classes="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0" onclickFn={() => {handlePageChange(fetchDataDetail.current_page - 1)}} disbaledLogic={fetchDataDetail.current_page == 1} />
                    {Array.from(
                        { length: fetchDataDetail.total_page },
                        (_, index) => index + 1
                        )
                        .filter(
                            (pageNumber) =>
                            // Display only a range of pages(e.g., 2 pages before and 2 pages after the current page)
                            pageNumber >= Math.max(1, fetchDataDetail.current_page - 2) &&
                            pageNumber <=
                                Math.min(fetchDataDetail.total_page, fetchDataDetail.current_page + 2)
                        )
                        .map((pageNumber) => (
                            <Button
                            key={pageNumber}
                            onclickFn={() => handlePageChange(pageNumber)}
                            btn_title={pageNumber}
                            classes="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 h-full"
                            />
                    ))}
                    <Button classes={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${fetchDataDetail.total_page == fetchDataDetail.current_page ? "cursor-not-allowed" : ""}`} btn_title="Next" onclickFn={() => {handlePageChange(fetchDataDetail.current_page + 1)}} disbaledLogic={fetchDataDetail.total_page == fetchDataDetail.current_page} />
                </nav>
            </div>
        </div>
    </div>
  )
}

export default Pagination
