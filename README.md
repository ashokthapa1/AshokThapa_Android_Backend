# Your Project Title Here
Name: Ashok Thapa

CollegeID: 160098

Batch: nov 22A

Online Hospital Finder : Search the hospital according to the location, diseases and hospital name. Can view more details of the hospital only for logged in users get get recommendation of the most viewed hospitals. Un-registered members can search emergency purpose but cannot see whole information.


## List of Main Features

i. Login and Register

ii. Search the hospital by its:
- Name
- Location
- Diseases

iii. Emergency Search Hospital

iv. View more hospital details and doctors

v. View nearest hospital and its details

vi. Get recommendation of most viewed hospital and details of it

vii. Add,Edit and deleted hospital if necessary (Admin)

vii. "Online Hospital Finder' API

## API Documentation

#Users API

- register user
   ```` /api/user/```

- authenticate user
  `````/api/auth/users/````


#Search

- search By:
    - hospital name : 
      `````/api/search/hospital/:(Search Keywords)````
      
    - location : 
      `````/api/search/location/:(Search Keywords)```
      
    - diseases : 
      ````/api/search/diseaseName/:(search Keywords)```
    
 #View
 
 - View Hospital
    ````/api/view_hospital/````
    
 - View Recommended Hospital
    ````/api/recommend/mostviewed/````
    
  #Admin
  
  - Add Hospital :
      `````/api/hospital/````
  
  - Edit :
     `````/api/hospital/(hospital id)````
  
  - Delete :
     `````/api/hospital/(hospital id)````
 


