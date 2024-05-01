### Create Reservations:
```SQL
CREATE DEFINER=`albacore`@`%` PROCEDURE `CreateReservation`(
	IN userNetID VARCHAR(100),
    IN reservationStartTime DATETIME,
    IN reservationItemID INT
)
BEGIN
	DECLARE reservationDuration INT;
	DECLARE reservationDeadline DATETIME;
    START TRANSACTION;
	
-- check that item is able to be reserved by user
    IF reservationItemID IN (
		SELECT ItemID
		FROM Inventory NATURAL JOIN Facilities
		WHERE ItemID NOT IN (
			SELECT DISTINCT ItemID
			FROM MajorRestriction
			WHERE ItemID NOT IN (
				SELECT DISTINCT ItemID
				FROM MajorRestriction NATURAL JOIN (
					SELECT MajorID
					FROM Has
					WHERE Has.NetID = userNetID) AS UserMajors)))
-- check that item is available
	AND 1 = (
		SELECT Availability
        FROM Inventory
        WHERE ItemID = reservationItemID)
	THEN
-- make the item be taken
		UPDATE Inventory
		SET Availability = 0
		WHERE ItemID = reservationItemID;

-- get the duration and make the deadline with it
		SELECT Duration
		INTO reservationDuration
		FROM Inventory
        WHERE reservationItemID = ItemID;
		SET reservationDeadline = DATE_ADD(reservationStartTime, INTERVAL reservationDuration HOUR);

-- add the reservation
        INSERT INTO Reservations(NetID, ItemID, StartTime, Deadline, ReturnTime)
        VALUES (userNetID, reservationItemID, reservationStartTime, reservationDeadline, NULL);
		COMMIT;
        
    ELSE
		ROLLBACK;
    END IF;
END
```