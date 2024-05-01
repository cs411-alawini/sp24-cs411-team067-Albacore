### DDL for GetInventoryDetails
```
CREATE DEFINER=`albacore`@`%` PROCEDURE `GetInventoryDetails`(IN UserNetID VARCHAR(255))
BEGIN
    -- Declare a handler for any SQL exceptions
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback if any errors occur
        ROLLBACK;
    END;

    -- Set the isolation level to REPEATABLE READ for this transaction
    SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

    -- Start the transaction
    START TRANSACTION;

    -- Temporary table to hold first query results
    CREATE TEMPORARY TABLE IF NOT EXISTS TempReservations
    SELECT itemID, itemName, AVG(TIMESTAMPDIFF(MINUTE, StartTime, ReturnTime)) AS AverageTime
    FROM Reservations
    NATURAL JOIN Inventory
    WHERE ReturnTime IS NOT NULL
    GROUP BY itemID;

    -- Temporary table to hold second query results
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

    -- Selecting from both temporary tables to combine results
    SELECT i.*, r.AverageTime
    FROM TempInventory i
    JOIN TempReservations r ON i.itemID = r.itemID;

    -- Drop temporary tables
    DROP TEMPORARY TABLE IF EXISTS TempReservations;
    DROP TEMPORARY TABLE IF EXISTS TempInventory;

    -- Commit the transaction
    COMMIT;
END```