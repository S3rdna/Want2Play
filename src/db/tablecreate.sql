CREATE TABLE  Sessions (
    roomID : TEXT,
    createDate : DATE,
    PRIMARY KEY(roomID)
);

CREATE TABLE User_Data (
    uID INT AUTO_INCREMENT,
    roomID : TEXT,
    user : TEXT,
    List : TEXT,
    PRIMARY KEY(uID,roomID),
    FOREIGN KEY(roomID) REFERENCES Rooms(roomID) ON DELETE CASCADE
);


