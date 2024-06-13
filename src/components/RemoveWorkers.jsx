import React from "react";

export const RemoveWorkers = () => {
    return (
        <div className="removeWorkers">
            <h2>Remove Workers</h2>
            <form action="">
                <label htmlFor="address">Address</label>
                <input type="text" name="address" id="address" required />

                <button>Remove</button>
            </form>
        </div>
    );
};
