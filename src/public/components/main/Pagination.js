import React from "react";

const pageNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

export const Pagination = props =>{
    
    const renderPageNumbers = pageNumbers.map(number =>{
        const numberColor = props.currentPage === number ? "#8b0000" : "#777";
        return <li 
                key={number} 
                style = {{"color": numberColor, "margin":"0.2rem", "fontSize": "1.25rem"}} 
                onClick={props.changePage} 
                id={number}> {number} </li>
    })

    return(
        <ul style = {paginationStyle}>{renderPageNumbers}</ul>
    ) 
}; 

const paginationStyle = {
    "width": "70%",
    "display": "flex",
    "justifyContent": "space-evenly",
    "margin": "1rem auto"
};

