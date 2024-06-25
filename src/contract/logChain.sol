// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract logChain {
    address private owner;
    uint256 private lastResetTime;
    uint256 private constant resetInterval = 20 hours;

    struct Worker {
        address workerAddress;
        string name;
        uint256 Id;
        bool signed;
    }

    constructor() {
        owner = msg.sender;
        lastResetTime = block.timestamp;
    }

    event Signed(uint256 indexed time, address indexed signer);
    event ProfileUpdated(address indexed workerAddress_, string newName);

    mapping(address => Worker) public workers;

    modifier onlyOwner() {
        require(msg.sender == owner, "Authorised personel only");
        _;
    }

    // List of workers in the company
    Worker[] public workersList;

    // Signed in workers for the day
    Worker[] public loggedInWorkers;

    //Get workers list
    function getWorkersList() public view returns(Worker[]memory) {
        return workersList;
    }

    function getSignedInWorkers() public view returns(Worker[]memory) {
        return loggedInWorkers;
    }

    // Add workers to list
    function addWorkers(
        address _address,
        string memory _name,
        uint256 _id
        ) public onlyOwner {
        for (uint256 i = 0; i < workersList.length; i++) {
            require(
                workersList[i].Id != _id,
                "Worker with this ID already exists"
            );

            require(
                workersList[i].workerAddress != _address,
                "Worker with this address already exists"
            );
        }

        Worker memory newWorker = Worker(_address, _name, _id, false);
        workers[_address] = newWorker;
        workersList.push(newWorker);
    }

    // Remove staffs that no longer works in the company
    function removeWorkers(address _address) public onlyOwner {
        uint256 indexToRemove;
        bool found = false;

        for (uint256 i = 0; i < workersList.length; i++) {
            if (workersList[i].workerAddress == _address) {
                indexToRemove = i;
                found = true;
                break ;
            }   
        }
        require(found, "Worker does not exists");

        // Remove the worker from the workersList array
        for (uint256 i = indexToRemove; i < workersList.length - 1; i++) {
            workersList[i] = workersList[i + 1];
        }
        workersList.pop();

        // Remove the worker from the loggedInWorkers array
        for (uint256 i = 0; i < loggedInWorkers.length; i++) {
            if (loggedInWorkers[i].workerAddress == _address) {
                loggedInWorkers[i] = loggedInWorkers[loggedInWorkers.length - 1];
                loggedInWorkers.pop();
                break;
            }       
        }

        // Remove the worker from the workers mapping
        delete workers[_address];
    }

    // Get workers data
    function getWorkersData(address _workersAddress)
        public
        view
        onlyOwner
        returns (
            string memory,
            uint256,
            bool
        )
        {
        for (uint256 i = 0; i < workersList.length; i++) {
            if (_workersAddress == workersList[i].workerAddress) {
                return (
                    workersList[i].name,
                    workersList[i].Id,
                    workersList[i].signed
                );
            }
        }
        // Return default values if no matching worker is found
        return ("", 0, false);
    }

    // Function to update workers profile information
    function updateProfile(
        address _address,
        string memory newName
        ) public onlyOwner {
        bool workerFound = false;
        for (uint256 i = 0; i < workersList.length; i++) {
            if (workersList[i].workerAddress == _address) {
                workerFound = true;
                workers[_address].name = newName;
                workersList[i].name = newName;
                break;
            }
            
        }
        for (uint256 i = 0; i < loggedInWorkers.length; i++) {
            if (loggedInWorkers[i].workerAddress == _address) {
                loggedInWorkers[i].name = newName;
                break;
            }        
        }
        require(workerFound,"Worker does not exists");

        // Emit event
        emit ProfileUpdated(msg.sender, newName);
    }

    // Sign in for the day
    function signIn() public {
        bool found = false; // Variable to track if the worker is found

        for (uint256 i = 0; i < workersList.length; i++) {
            if (msg.sender == workersList[i].workerAddress) {
                require(
                    workersList[i].signed == false,
                    "User already signed in"
                );

                workersList[i].signed = true;
                loggedInWorkers.push(workersList[i]);
                emit Signed(block.timestamp, msg.sender);

                found = true; // Set found to true when the worker is found
                break; // Exit the loop once a match is found
            }
        }

        require(found, "Not a member of the company"); // Check if the worker is found
    }

    //Log out for the day
    function logOut() public {
        bool found = false; // Variable to track if the worker is found

        for (uint256 i = 0; i < workersList.length; i++) {
            if (msg.sender == workersList[i].workerAddress) {
                require(
                    workersList[i].signed == true,
                    "Didn't sign in for the day"
                );

                emit Signed(block.timestamp, msg.sender);

                found = true; // Set found to true when the worker is found
                break; // Exit the loop once a match is found
            }
        }

        require(found, "Not a member of the company"); // Check if the worker is found
    }

    // Reset users sign in
    function resetSignIn() public onlyOwner {
        require(
            block.timestamp >= lastResetTime + resetInterval,
            "Reset interval has not elapsed yet"
        );
        for (uint256 i = 0; i < workersList.length; i++) {
            workersList[i].signed = false;
        }

        for (uint256 i = 0; i < loggedInWorkers.length; i++) {
            delete loggedInWorkers[i];
        }

        lastResetTime = block.timestamp;
    }
}
