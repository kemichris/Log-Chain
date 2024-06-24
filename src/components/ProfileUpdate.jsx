import React, { useState } from 'react'

import contractAbi from "../contract/contractABI.json"
import { useSnackbar } from 'notistack';
import { ethers } from 'ethers';


export const ProfileUpdate = () => {
    const {enqueueSnackbar} = useSnackbar();
    const contractAddress = "0x3541AAC732025c6df90faCd5aA9fe7EC397f23Ab";

    const [workerAddress, setWorkerAddress] = useState("");
    const [newName, setnNewName] = useState("");

    const updateProfile = async (event)=> {
        event.preventDefault()
        try{
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const logBookContract = new ethers.Contract(contractAddress, contractAbi, signer);

            const transaction = await logBookContract.updateProfile(workerAddress, newName);
            let receipt;
            receipt = await transaction.wait()
            console.log(receipt);

            setWorkerAddress("");
            setnNewName("");

            console.log(`profile updated successfully`);
            enqueueSnackbar("Worker profile updated", { variant: "success" });
        } catch (error) {
            console.log("Error updating profile:", error);
            enqueueSnackbar("Error updating profile:," + error, { variant: "error" });
        }
    }

    const handleAddress = (event)=> {
        setWorkerAddress(event.target.value)
    }

    const handleNewName = (event)=> {
        setnNewName(event.target.value)
    }
    return (
        <div className='profileUpdate'>
            <h2>Profile Update</h2>
            <form className='form' onSubmit={updateProfile}>

                <input type="text" name="address" placeholder='Workers Address' value={workerAddress} onChange={handleAddress} required />
                <input type="text" name="name" placeholder='New Name' value={newName} onChange={handleNewName} required />
                

                <button className='btn'> submint</button>
            </form>
        </div>
    )
}
