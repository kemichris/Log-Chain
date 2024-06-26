import React, { useState,useEffect } from "react";
import contractAbi from "../contract/contractABI.json";

import { ethers } from "ethers";
import { enqueueSnackbar } from "notistack";

export const WorkersList = () => {
    const contractAddress = "0x78d3516cA69Ee0cef4Fb968B96153b5f546970B4";
    const [workers, setWorkers] = useState([]);
    
    const truncateAddress = (address)=> {
        return `${address.slice(0, 4)}....${address.slice(-4)}`
    }

    const copyAddress = (address)=>{
        navigator.clipboard.writeText(address)
        enqueueSnackbar("Address copied", {variant: "success"});
    }

    const fetchWorkers = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const logBookContract = new ethers.Contract(
                contractAddress,
                contractAbi,
                signer
            );

            const transaction = await logBookContract.getWorkersList();
            let receipt;
            receipt = await transaction;       
            setWorkers(receipt);
        } catch (error) {
            console.log("Error getting workers data:", error);
        }
    };

    useEffect(()=>{
        fetchWorkers()
    })

    return (
        <div className="workersList">
            <h2>Workers List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Address</th>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Signed</th>
                    </tr>
                </thead>

                <tbody>
                    {workers.map((worker, index) => (
                        <tr key={index}>
                            <td className="tableAddress" onClick={()=>copyAddress(worker.workerAddress)}>{truncateAddress(worker.workerAddress)}</td>
                            <td>{worker.name}</td>
                            <td>{(worker.Id).toString()}</td>
                            <td>{worker.signed? "Yes": "No"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
