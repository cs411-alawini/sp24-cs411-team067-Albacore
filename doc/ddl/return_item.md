### DDL For Returning Items

```SQL
CREATE DEFINER=`albacore`@`%` PROCEDURE `return_item`(IN p_ItemID INT)
BEGIN
    -- Update the returnTime only if the reservation belongs to the user with the provided netID
    DECLARE reservationReturnTime DATETIME;
    START TRANSACTION;
    SELECT CONVERT_TZ(UTC_TIMESTAMP(), '+00:00', 'America/Chicago') INTO reservationReturnTime;
    UPDATE Reservations
    SET ReturnTime = reservationReturnTime
    WHERE ItemID = p_ItemID AND ReturnTime IS NULL;
    
    UPDATE Inventory
    SET Availability = 1
    WHERE ItemID = p_ItemID;
    COMMIT;
END
```