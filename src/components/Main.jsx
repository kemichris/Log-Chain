import React, {useState} from 'react'
import contractAbi from "../contract/contractABI.json"

import { useSnackbar } from 'notistack';
import { ethers } from 'ethers';
import { wait } from '@testing-library/user-event/dist/utils';

export const Main = () => {
    const {enqueueSnackbar} = useSnackbar();
    const contractAddress = "0xe941973Cb5758a11F1662D1e826a98AE9463cb12";

    const [signedIn, setSignedIn] = useState(false);

    const signIn = async ()=> {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const logbookContract = new ethers.Contract(contractAddress, contractAbi, signer);

            let receipt;
            const transaction = await logbookContract.signIn();
            receipt = await wait(transaction)
            setSignedIn(!signedIn);
            console.log(receipt);
            enqueueSnackbar("Sign in successful", {variant: "success"});
        } catch(error) {
            enqueueSnackbar(error, {variant: "error"});
            console.log("Failed, reason", error);
        }
    }

    const signOut = async ()=> {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const logbookContract = new ethers.Contract(contractAddress, contractAbi, signer);

            let receipt;
            const transaction = await logbookContract.logOut();
            receipt = await wait(transaction)
            setSignedIn(signedIn);
            console.log(receipt);
            enqueueSnackbar("Log out successful", {variant: "success"});
        } catch(error) {
            enqueueSnackbar(error, {variant: "error"});
            console.log("Failed, reason", error);
        }
    }

    return (
        <div className='main'>
            <div className="mainContainer">
                <h1>NovaWave Workers Logbook</h1>
                <p>Each worker is expected to sign in at the time of arrival and endeavor to sign out when leaving </p>

                <div className="buttons">
                    <button onClick={ signedIn ? null : signIn} disabled={signedIn} 
                        className={signedIn ? "disabledButton": "enabledButton"}
                    >Sign in</button>

                    <button onClick={signedIn ? signOut : null} className={signedIn ? "enabledButton": "disabledButton"}>Sign out</button>
                </div>

            </div>
        </div>
    )
}
