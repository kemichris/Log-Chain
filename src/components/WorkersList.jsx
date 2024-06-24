import React, { useEffect, useState } from 'react'
import contractAbi from "../contract/contractABI.json"

import { ethers } from 'ethers';

export const WorkersList = () => {
    
    const contractAddress = "0x3541AAC732025c6df90faCd5aA9fe7EC397f23Ab";


    const [workers, setWorkers] = useState([]);

    useEffect(() => {
        const fetchWorkers = async () => {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const logBookContract = new ethers.Contract(contractAddress, contractAbi, signer);

            const workersList = await logBookContract.workersList();
            const workersData = workersList.map((worker) => {
                return {
                    address: worker.workerAddress,
                    name: worker.name,
                    id: worker.Id.toString(),
                };
            });
            setWorkers(workersData);
        };
        fetchWorkers();
    }, []);

    return (
        <div className='workersList'>
            <h2>Workers List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Address</th>
                        <th>Name</th>
                        <th>ID</th>
                    </tr>
                </thead>

                <tbody>
                    {workers.map((worker, index) => (
                        <tr key={index}>
                            <td>{worker.address}</td>
                            <td>{worker.name}</td>
                            <td>{("link unvailaible")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
