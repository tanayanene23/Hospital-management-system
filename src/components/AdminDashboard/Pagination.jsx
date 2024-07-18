import styles from './Pagination.module.css'
// import React from 'react'

const Pagination = (props) => {
    const {entriesPerPage, totalEntries, paginate, prevPage, nextPage} = props
    // console.log("entriesPerPage", entriesPerPage)
    // console.log("totalentries", totalEntries)

    const paginationNumbers = []

    for(let i=1; i<Math.ceil(totalEntries / entriesPerPage); i++){
        paginationNumbers.push(i)
        // console.log("i",i)
    }

    // console.log("paginationNumbers",paginationNumbers)

  return (
    <div className={styles.paginationContainer}>
        <button className={styles.prevNext} onClick={prevPage}>
            Prev
        </button>
            {paginationNumbers.map((number) => {
                return(
                <button key={number} 
                className={styles.pageNumber}
                onClick={() => {paginate(number)}}>
                    {number}
                </button>
                )
            })}
        <button className={styles.prevNext} onClick={nextPage}>
            Next
        </button>
    </div>
  )
}


export default Pagination