import React from 'react'

export const GetWorkersData = () => {
  return (
    <div className='getWorkersData'>
      <h2>Get Workers Data</h2>
        <form className='form' action="">
            <input type="search" placeholder='workers address' name="" id="" />

            <p>Name: </p>
            <p>ID: </p>

            <button className='btn'>Search</button>
        </form>
    </div>
  )
}
