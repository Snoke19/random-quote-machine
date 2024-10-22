import React from 'react';
import './Search.css';
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function Search() {
  return (
    <div className="search-container">
      <div className="search-wrapper">
        <input className="search-input" type="text" placeholder="Search..."/>
        <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass}/>
      </div>
    </div>
  )
}