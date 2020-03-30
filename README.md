# mother-project

## TO DO

- [ ] Create Delivery notes form 

      Fields: 
        - Date 
          [ 
             - Code 
             - quantity 
             - production plan should be automatically selected and displayed. It should be the oldest production plan to have             quantity > 0 for the specified code 
          ]  
- [ ] Creating a new delivery note should decrease the quantities in the production plan 

      The production plan should have two different columns: 'original quantity' and 'available quantity' 
      Every time a delivery note is created, we reduce the available quantity for each code, adding a new line with the             quantity delivered and the id and date of the delivery note.
      Example:
      
          CODE | ORIGINAL QUANTITY | AVAILABLE QUANTITY |       DELIVERY NOTES              | 
          001  |         100       |          70        |  DATE  | DELIVERY NOTE ID|QUANTITY|                                                                                         |30/03/20|       A123      |    10. |
                                                        |01/04/20|       B456      |    20  |
          ___________________________________________________________________________________
          002  |        50         |          20        |30/03/20|       A123      |    20  |
       
      
