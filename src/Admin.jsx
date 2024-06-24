import React from 'react'

import "./styles/Admin.css"

import contractAbi from "./contract/contractABI.json";
import { useSnackbar } from 'notistack';
import { ethers } from 'ethers';

import { Navbar } from './components/Navbar'
import { WorkersList } from './components/WorkersList'
import { SignedInWorkers } from './components/SignedInWorkers'
import { AddWorkers } from './components/AddWorkers'
import { RemoveWorkers } from './components/RemoveWorkers'
import { ProfileUpdate } from './components/ProfileUpdate'
import { GetWorkersData } from './components/GetWorkersData'

import { SnackbarProvider } from 'notistack';

export const Admin = () => {
    const { enqueueSnackbar } = useSnackbar();
    const contractAddress = "0x68B3893355F6592b2C430d8bccAc495071639d43";

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
        } catch (error) {
            console.log("Error resetting sign in:", error);
            enqueueSnackbar("Error resetting sign in:," + error, { variant: "error" });
        }
    }

    return (
        <div>

            <SnackbarProvider>
                <Navbar linkPage="/" link="Sign in as worker" />
                <div className="workersSection">
                    <WorkersList />
                    <SignedInWorkers />
                </div>
                <div className="workerSetting">
                    <AddWorkers />
                    <RemoveWorkers />
                </div>
                <div className="workersProfile">
                    <ProfileUpdate />
                    <GetWorkersData />
                </div>

                <button className='reset' onClick={resetUserSignIn}>Reset Sign in</button>
            </SnackbarProvider>




            
        </div>
    )
}
