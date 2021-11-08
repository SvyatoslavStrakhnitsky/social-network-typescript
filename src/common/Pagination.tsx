import s from '../components/Users/Users.module.css'
import React, {useState} from "react";

type PaginationPropsType = {
    currentPage: number
    totalCount: number
    pageSize: number
    onPageChange: (page: number) => void
    portionSize?: number
}

export const Pagination: React.FC<PaginationPropsType> = ({
                                                              currentPage,
                                                              onPageChange,
                                                              totalCount,
                                                              pageSize,
                                                              portionSize = 10
                                                          }) => {

    let pageAmount = Math.ceil(totalCount / pageSize)
    const pages = []

    for (let i = 1; i <= pageAmount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pageAmount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortion = (portionNumber - 1) * portionSize + 1
    const rightPortion = portionNumber * portionSize
    const [currPage, setCurrPage] = useState(1)

    const getPage = (page: number) => {
        onPageChange(page)
        setCurrPage(page)
    }

    console.log(currPage)

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            {
                portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber - 1)}>Prev</button>

            }
            {
                pages.filter(page => page >= leftPortion && page <= rightPortion).map((page, index) =>
                        <span key={index} className={currPage === page ? s.selected : ''}
                              onClick={() => getPage(page)}>
                            {page}
            </span>
                )}
            {
                portionCount > portionNumber
                    && <button onClick={() => setPortionNumber(portionNumber + 1)}>Next</button>

            }
        </div>
    )
}