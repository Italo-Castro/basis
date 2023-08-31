CREATE PROCEDURE findById
    @id int
AS
BEGIN
    SELECT  
		* from pessoa
    WHERE id = @id;
END;