import React, { useState, useEffect } from "react";
import contractAbi from "../contract/contractABI.json";

import { ethers } from "ethers";

export const SignedInWorkers = () => {
    const contractAddress = "0x68B3893355F6592b2C430d8bccAc495071639d43";
    const [workers, setWorkers] = useState([]);

    const truncateAddress = (address)=> {
        return `${address.slice(0, 4)}....${address.slice(-4)}`
    }


    const fetchSignedWorkers = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const logBookContract = new ethers.Contract(
                contractAddress,
                contractAbi,
                signer
            );

            const transaction = await logBookContract.getSignedInWorkers();
            let receipt;
            receipt = await transaction;
            
            setWorkers(receipt);
        } catch (error) {
            console.log("Error getting workers data:", error);
        }
    };

    useEffect(() => {
        fetchSignedWorkers()
    })

    return (
        <div className='signedInWorkers'>
            <h2>Signed in workers</h2>
            <table>
                <thead>
                    <tr>
                        <th>Address</th>
                        <th>Name</th>
                        <th>ID</th>
                        {/* <th>Time</th> */}
                    </tr>
                </thead>

                <tbody>
                    {workers.map((worker, index) => (
                        <tr key={index}>
                            <td>{truncateAddress(worker.workerAddress)}</td>
                            <td>{worker.name}</td>
                            <td>{(worker.Id).toString()}</td>
                            {/* <td>{}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
