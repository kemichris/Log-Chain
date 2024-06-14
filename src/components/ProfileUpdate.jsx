import React from 'react'

import contractAbi from "../contract/contractABI.json"
import { useSnackbar } from 'notistack';
import { ethers } from 'ethers';
import { wait } from '@testing-library/user-event/dist/utils';

export const ProfileUpdate = () => {
    const {enqueueSnackbar} = useSnackbar();
    const contractAddress = "0xF8CDd77CA1e8E0FceF63efaB67F0EC6F636b1e14";

    const [workerAddress, setWorkerAddress] = useState("");
    const [newName, setnNewName] = useState("");
    const [newId, setNewId] = useState("");

    const updateProfile = async (event)=> {
        event.preventDefault()
        try{
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const logBookContract = new ethers.Contract(contractAddress, contractAbi, signer);

            const transaction = await logBookContract.updateProfile(workerAddress, newName, newId);
            let receipt;
            receipt = await transaction.wait()
            console.log(wait);

            setWorkerAddress("")

            console.log(`profile updated successfully`);
            enqueueSnackbar("Worker profile updated", { variant: "success" });
        } catch (error) {
            console.log("Error updating profile:", error);
            enqueueSnackbar("Error updating profile:," + error, { variant: "error" });
        }
    }


    return (
        <div className='profileUpdate'>
            <h2>Profile Update</h2>
            <form className='form' onSubmit={updateProfile}>

                <input type="text" name="address" placeholder='Workers Address' value={workerAddress} required />
                <input type="text" name="name" placeholder='New Name' id="name" required />
                <input type="text" name="id" placeholder='New ID' id="id" required />

                <button className='btn'> submint</button>
            </form>
        </div>
    )
}
