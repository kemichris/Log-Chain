import React, { useState } from "react";
import contractAbi from "../contract/contractABI.json";

import { ethers } from "ethers";

export const WorkersList = () => {
    const contractAddress = "0x3541AAC732025c6df90faCd5aA9fe7EC397f23Ab";

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
            console.log(receipt);

            // const name = receipt[0] !== undefined ? receipt[0] : "";
            // const id = receipt[1] !== undefined ? receipt[1].toString() : "";
            // const signed = receipt[2] !== undefined ? receipt[2] : false;

            // const [name, id, signed] = receipt;

            // setWorkerName(name);
            // setWorkerId(id);
            // setSignedIn(signed);

            // console.log(`Worker details: ${name}, ${id}, ${signed}`);

            setWorkers(receipt);
        } catch (error) {
            console.log("Error getting workers data:", error);
        }
    };

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
                            <td>{worker.id}</td>
                            <td>{worker.signedIn? "Yes": "No"}</td>
                        </tr>
                    ))}
                </tbody>

                <button onClick={fetchWorkers}></button>
            </table>
        </div>
    );
};
