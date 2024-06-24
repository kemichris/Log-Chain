import React, { useState } from 'react'

import contractAbi from "../contract/contractABI.json"
import { useSnackbar } from 'notistack';
import { ethers } from 'ethers';


export const AddWorkers = () => {
    const {enqueueSnackbar} = useSnackbar();
    const contractAddress = "0x3541AAC732025c6df90faCd5aA9fe7EC397f23Ab";

    const [workerAddress, setWorkerAddress] = useState("");
    const [workerName, setWorkerName] = useState("")
    const [workerId, setWorkerId] = useState(0)

    const addWorkers = async (event)=> {
       event.preventDefault();
       try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const logBookContract = new ethers.Contract(contractAddress, contractAbi, signer);

        const transaction = await logBookContract.addWorkers(workerAddress, workerName, workerId);
        let receipt;
        receipt = await transaction.wait();
        console.log(receipt)

      // Optionally, reset the input field after submission
      setWorkerAddress('');
      setWorkerName('')
      setWorkerId(0)

      console.log(`This address > ${workerAddress} with name ${workerName} and  ID: ${workerId} has been added succesfully`)
      enqueueSnackbar("Worker Added succesfully", {variant: "success"});
       } catch (error) {
        console.error('Error adding user:', error);
      enqueueSnackbar("Error adding user:," + error, {variant: "error"});

       }

    }

    

    const handleworkerAddress = (event) => {
        setWorkerAddress(event.target.value);
    }

    const handleWorkerName = (event) => {
        setWorkerName(event.target.value);
    }

    const handleWorkerId = (event) => {
        setWorkerId(event.target.value);
    }


    return (
        <div className='addWorkers'>
            <h2>Add Workers</h2>

            <form className='form' onSubmit={addWorkers}>
                <label htmlFor="address">Address</label>
                <input type="text" value={workerAddress} onChange={handleworkerAddress} name="address"  required />
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={workerName} onChange={handleWorkerName} required />
                <label htmlFor="id">Address</label>
                <input type="text" name="id" value={workerId} onChange={handleWorkerId} required />

                <button type='submit' className='addBtn'>Add</button>
            </form>
        </div>
    )
}
