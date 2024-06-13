import React from 'react'

export const AddWorkers = () => {
    return (
        <div className='addWorkers'>
            <h2>Add Workers</h2>
            <div className="addWorkers">
                <form action="">
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" id="address" required />
                    <label htmlFor="name">Address</label>
                    <input type="text" name="name" id="name" required />
                    <label htmlFor="id">Address</label>
                    <input type="text" name="id" id="id" required />

                    <button>Add</button>
                </form>
            </div>
        </div>
    )
}
