import React, { useState } from "react";

import contractAbi from "../contract/contractABI.json"
import { useSnackbar } from 'notistack';
import { ethers } from 'ethers';

export const RemoveWorkers = () => {

    const { enqueueSnackbar } = useSnackbar();
    const contractAddress = "0x78d3516cA69Ee0cef4Fb968B96153b5f546970B4";

    const [workerAddress, setWorkerAddress] = useState("");

    const removeWorkers = async (event) => {
        event.preventDefault();
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const logBookContract = new ethers.Contract(contractAddress, contractAbi, signer);

            const transaction = await logBookContract.removeWorkers(workerAddress);
            let receipt;
            receipt = await transaction.wait();
            console.log(receipt);

            setWorkerAddress("");

            console.log(`${workerAddress} removed successfully`);
            enqueueSnackbar("Worker profile Deleted", { variant: "success" });
        } catch (error) {
            console.log("Error deleting profile:", error);
            enqueueSnackbar("Error deleting profile:," + error, { variant: "error" });
        }
    }

    const handleworkerAddress = (event) => {
        setWorkerAddress(event.target.value);
    }

    return (
        <div className="removeWorkers">
            <h2>Remove Workers</h2>
            <form className="form" onSubmit={removeWorkers}>
                <label htmlFor="address">Address</label>
                <input type="text" name="address" value={workerAddress} onChange={handleworkerAddress} required />

                <button type="submit">Remove</button>
            </form>
        </div>
    );
};
