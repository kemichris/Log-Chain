import React, { useState, useEffect } from "react";
import contractAbi from "../contract/contractABI.json";
import { useSnackbar } from 'notistack';
import { ethers } from "ethers";

export const SignedInWorkers = () => {
    const contractAddress = "0x7b0629C461331ed5156fB64dD88f72cc70A355C8";
    const { enqueueSnackbar } = useSnackbar();
    const [workers, setWorkers] = useState([]);

    const truncateAddress = (address)=> {
        return `${address.slice(0, 4)}....${address.slice(-4)}`
    }

    const copyAddress = (address)=>{
        navigator.clipboard.writeText(address)
        enqueueSnackbar("Address copied", {variant: "success"});
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
    });

    const resetUserSignIn = async ()=> {
        try{
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const logBookContract = new ethers.Contract(contractAddress, contractAbi, signer);

            const transaction = await logBookContract.resetSignIn();
            let receipt;
            receipt = await transaction.wait()
            console.log(receipt);

            console.log(`Reset successful`);
            enqueueSnackbar("Reset successful", { variant: "success" });

            setWorkers([]);
        } catch (error) {
            console.log("Error resetting sign in:", error);
            enqueueSnackbar("Error resetting sign in:," + error, { variant: "error" });
        }
    }

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
                            <td className="tableAddress" onClick={()=>copyAddress(worker.workerAddress)}>{truncateAddress(worker.workerAddress)}</td>
                            <td>{worker.name}</td>
                            <td>{(worker.Id).toString()}</td>
                            {/* <td>{}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className='reset' onClick={resetUserSignIn}>Reset Sign in</button>
        </div>
    )
}
