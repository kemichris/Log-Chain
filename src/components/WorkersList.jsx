import React, { useState,useEffect } from "react";
import contractAbi from "../contract/contractABI.json";

import { ethers } from "ethers";

export const WorkersList = () => {
    const contractAddress = "0x68B3893355F6592b2C430d8bccAc495071639d43";

    const [workers, setWorkers] = useState([]);
    

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
                            <td>{worker.workerAddress}</td>
                            <td>{worker.name}</td>
                            <td>{(worker.Id).toString()}</td>
                            <td>{worker.signedIn? "Yes": "No"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
