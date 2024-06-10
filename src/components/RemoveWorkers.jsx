import React from "react";

export const RemoveWorkers = () => {
    return (
        <div className="removeWorkers">
            <form action="">
                <label htmlFor="address">Address</label>
                <input type="text" name="address" id="address" required />
            </form>
        </div>
    );
};
