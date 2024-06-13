import React from 'react'

export const ProfileUpdate = () => {
    return (
        <div className='profileUpdate'>
            <h2>Profile Update</h2>
            <form className='form' action="">

                <input type="text" name="address" placeholder='Workers Address' id="address" required />
                <input type="text" name="name" placeholder='New Name' id="name" required />
                <input type="text" name="id" placeholder='New ID' id="id" required />

                <button className='btn'> submint</button>
            </form>
        </div>
    )
}
