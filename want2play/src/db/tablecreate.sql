CREATE TABLE  Rooms (
    roomID : TEXT,
    createDate : DATE,
    userDataID : INT,
    PRIMARY KEY(roomName)
);

CREATE TABLE User_Data (
    userDataID INT AUTO_INCREMENT,
    roomID : TEXT,
    user : TEXT,
    userData : TEXT,
    PRIMARY KEY(userDataID,roomID),
    FOREIGN KEY(roomID) REFERENCES Rooms(roomID) ON DELETE CASCADE
);


