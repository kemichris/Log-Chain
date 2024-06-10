import { ethers } from 'ethers'
import React, {useState} from 'react'
import { NavLink } from 'react-router-dom';
import {useSnackbar } from 'notistack';

export const Navbar = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const [connected, setConnected] = useState(false);
    const [address, setAddress] = useState("");

    const {link, linkPage} = props;


    //Connect wallet 
    const ConnectWallet = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const chainId = await provider.getNetwork();

            if (chainId !== "0x98a") {
                try {
                    await provider.send("wallet_switchEthereumChain", [{ chainId: "0x98a" },]);
                } catch (error) {
                    console.log("Error requesting account switch:", error);
                    return;
                }
            }

            const address = await signer.getAddress();
            const truncatedAddress = address.slice(0, 4) + "..." + address.slice(-2);

            setConnected(signer);
            setAddress(truncatedAddress);

            enqueueSnackbar("Wallet Connected", {variant: "success"});

        } catch (error) {
            // catch error
            console.log("Error Conneting:", error)
            enqueueSnackbar("Error Conneting", error, {variant: "error"});
          }
    }
    return (
        <div>
            <nav>
                <p>Log Chain</p>
                <NavLink className="admin" to={linkPage} >{link}</NavLink>
                
                <button onClick={ConnectWallet}>{connected? address: "Connect wallet"}</button>
            </nav>
        </div>
    )
}
