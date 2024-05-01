```
CREATE DEFINER=`albacore`@`%` PROCEDURE `GetInventoryDetailsAdmin`()
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
    GROUP BY itemID;

    CREATE TEMPORARY TABLE IF NOT EXISTS TempInventory
    SELECT DISTINCT *
    FROM Inventory
    NATURAL JOIN Facilities;

    SELECT i.*, r.AverageTime
    FROM TempInventory i
    JOIN TempReservations r ON i.itemID = r.itemID;

    DROP TEMPORARY TABLE IF EXISTS TempReservations;
    DROP TEMPORARY TABLE IF EXISTS TempInventory;
    COMMIT;
END```