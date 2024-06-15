import React, { useState } from 'react'
import contractAbi from "../contract/contractABI.json"
import { useSnackbar } from 'notistack';
import { ethers } from 'ethers';

export const GetWorkersData = () => {
  const { enqueueSnackbar } = useSnackbar();
  const contractAddress = "0xF8CDd77CA1e8E0FceF63efaB67F0EC6F636b1e14";

  const [workerAddress, setWorkerAddress] = useState("");
  const [workerName, setWorkerName] = useState("");
  const [workerId, setWorkerId] = useState(0)
  const [signedIn, setSignedIn] = useState();

  const getWorkerData = async (event) => {
    event.preventDefault();
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const logBookContract = new ethers.Contract(contractAddress, contractAbi, signer);

      const transaction = await logBookContract.getWorkersData(workerAddress);

      let receipt;
      receipt = await transaction;
      console.log(receipt);

      const [name, id, signed] = receipt;
      
      setWorkerName(name);
      setWorkerId(id);
      setSignedIn(signed);

      console.log(`Worker details: ${name}, ${id}, ${signed}`);

      setWorkerAddress("");

      console.log(`Worker details displayed`);
      enqueueSnackbar("Worker details displayed", { variant: "success" });
    } catch (error) {
      console.log("Error getting workers data:", error);
      enqueueSnackbar("Error getting workers data:," + error, { variant: "error" });
    }
  }

  const handleAddress = (event) => {
    setWorkerAddress(event.target.value)
  }

  return (
    <div className='getWorkersData'>
      <h2>Get Workers Data</h2>
      <form className='form' action="">
        <input type="search" placeholder='workers address' value={workerAddress} onChange={handleAddress} />

        <p>Name: {workerName} </p>
        <p>ID: {workerId} </p>
        <p>Signed In: {signedIn? "Yes": "No"}</p>

        <button onClick={getWorkerData} className='btn'>Search</button>
      </form>
    </div>
  )
}
