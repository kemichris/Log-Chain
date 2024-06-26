import React, { useState } from 'react'
import contractAbi from "../contract/contractABI.json"
import { useSnackbar } from 'notistack';
import { ethers } from 'ethers';

export const GetWorkersData = () => {
  const { enqueueSnackbar } = useSnackbar();
  const contractAddress = "0x78d3516cA69Ee0cef4Fb968B96153b5f546970B4";

  const [workerAddress, setWorkerAddress] = useState("");
  const [workerName, setWorkerName] = useState("");
  const [workerId, setWorkerId] = useState()
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

      const name = receipt[0] !== undefined ? receipt[0] : "";
      const id = receipt[1] !== undefined ? receipt[1].toString() : "";
      const signed = receipt[2] !== undefined ? receipt[2] : false;

      // const [name, id, signed] = receipt;
      
      // setWorkerName(name);
      // setWorkerId(id);
      // setSignedIn(signed);

      console.log(`Worker details: ${name}, ${id}, ${signed}`);

      let alert = "Worker details displayed"

      if (receipt[0] !== "") {
        alert = "Worker details displayed"
        setWorkerName(name);
        setWorkerId(id);
        setSignedIn(signed);
      } else {
        alert = "User does not exist"
        setWorkerName("");
        setWorkerId("");
        setSignedIn("");
      }

      setWorkerAddress("");

     
    enqueueSnackbar(alert, { variant: "success" });
     
    } catch (error) {
      console.log("Error getting workers data:", error);
      enqueueSnackbar("Error getting workers data:," + error, { variant: "error" });
    }
  }

  const handleAddress = (event) => {
    setWorkerAddress(event.target.value)
  }

  return (
    <div className='getWorkersData' onSubmit={getWorkerData}>
      <h2>Get Workers Data</h2>
      <form className='form' action="">
        <input type="search" placeholder='workers address' required value={workerAddress} onChange={handleAddress} />

        <p>Name: {workerName} </p>
        <p>ID: {workerId} </p>
        <p>Signed In: {signedIn? "Yes": "No"}</p>

        <button type='submit' className='btn'>Search</button>
      </form>
    </div>
  )
}
