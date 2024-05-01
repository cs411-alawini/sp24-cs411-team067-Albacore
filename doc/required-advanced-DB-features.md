# DB Features for Requirements

## Transactions
### Another Transaction With Advanced Query:
```SQL
```

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
## Stored Procedure
## TODO:
### Insert stored procedures with 2 advanced queries

## Triggers
### Update Computer After Inventory is Updated
```SQL
DELIMITER //
CREATE TRIGGER inventoryUpdated AFTER UPDATE ON Inventory
FOR EACH ROW
BEGIN
	IF NEW.Availability <> OLD.Availability OR NEW.`Condition` <> OLD.`Condition` THEN
    IF @updating IS NULL THEN
		SET @updating = TRUE;
		UPDATE Computers
		SET Availability = NEW.Availability, `Condition` = NEW.`Condition`
		WHERE ItemID = New.ItemID;
        SET @updating = NULL;
	END IF;
	END IF;
END//
DELIMITER ;    
```

### Update Inventory After Computer is Updated
```SQL
DELIMITER //
CREATE TRIGGER computerUpdated AFTER UPDATE ON Computers
FOR EACH ROW
BEGIN
	IF NEW.Availability <> OLD.Availability OR NEW.`Condition` <> OLD.`Condition` THEN
    IF @updating IS NULL THEN
		SET @updating = TRUE;
		UPDATE Inventory
		SET Availability = NEW.Availability, `Condition` = NEW.`Condition`
		WHERE ItemID = New.ItemID;
        SET @updating = NULL;
	END IF;
	END IF;
END//
DELIMITER ;
```
## Constraints
### We used the primary and foreign keys as our constraints