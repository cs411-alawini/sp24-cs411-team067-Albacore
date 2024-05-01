### DDL for GetInventoryDetails
```
CREATE DEFINER=`albacore`@`%` PROCEDURE `GetInventoryDetails`(IN UserNetID VARCHAR(255))
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

    
    START TRANSACTION;

    CREATE TEMPORARY TABLE IF NOT EXISTS TempReservations
    SELECT itemID, itemName, AVG(TIMESTAMPDIFF(MINUTE, StartTime, ReturnTime)) AS AverageTime
    FROM Reservations
    NATURAL JOIN Inventory
    WHERE ReturnTime IS NOT NULL
    GROUP BY itemID;

    CREATE TEMPORARY TABLE IF NOT EXISTS TempInventory
    SELECT DISTINCT *
    FROM Inventory
    NATURAL JOIN Facilities
    WHERE ItemID NOT IN (
        SELECT DISTINCT ItemID
        FROM MajorRestriction
        WHERE ItemID NOT IN (
            SELECT DISTINCT ItemID
            FROM MajorRestriction
            NATURAL JOIN (
                SELECT MajorID
                FROM Has
                WHERE Has.NetID = UserNetID
            ) AS UserMajors
        )
    );

    SELECT i.*, r.AverageTime
    FROM TempInventory i
    JOIN TempReservations r ON i.itemID = r.itemID;

    DROP TEMPORARY TABLE IF EXISTS TempReservations;
    DROP TEMPORARY TABLE IF EXISTS TempInventory;

    COMMIT;
END```