
#Frontend

This web application allows users to submit ratings for stores registered on the platform, using a simple and intuitive interface. Users can rate stores on a scale of 1 to 5, helping to maintain quality and customer satisfaction.




## Tech Stack

**Client:** React js, Redux, TailwindCSS

**Server:** Node js, Express js,Mongodb,Razorpay


## Authors

- [@Sahil Patel](https://www.github.com/sahil99811)


## start project

To start this project run

```bash
  npm start
```


## Features

### Key Features

#### User Personas (Roles):
- **System Admin**
- **Normal User**
- **Store Owner**

#### General Functionalities:
- **Single Login:** One login page for all types of users, displaying functionalities based on the user's role after login.
- **Signup Page:** Available for normal users to register on the platform.

#### System Admin Functionalities:
- **User and Store Management:**
  - Add stores, normal users, and admin users to the system.
  - View and manage all registered stores and users.
  - **Listings include:**
    - Users: Name, Email, Address, Role.
    - Stores: Name, Email, Address, Rating.
- **Dashboard:**
  - Total Users.
  - Total Stores.
  - Total Users Submitted Rating.
- **User Addition Form:** Fields include Name, Email, Password, Address.
- **Filtering and Sorting:** Apply filters and sorting (ascending/descending) on fields such as Name, Email, Address, and Role.
- **User Details:** View detailed information for all types of users, including ratings for Store Owners.
- **Logout:** Option to log out of the system.

#### Normal User Functionalities:
- **Signup and Login:** Users can register and log in to the platform.
  - **Signup Form Fields:** Name, Email, Address, Password.
- **Password Management:** Option to change the password after login.
- **Store Listings:** View the list of all registered stores with details:
  - Name
  - Address
  - Overall Ratings
  - My Submitted Rating
- **Store Search:** Search stores based on Name and Address.
- **Rating Submission:** Submit ratings between 1 to 5 for individual stores.
- **Rating Modification:** Option to modify submitted ratings.
- **Logout:** Option to log out of the system.

#### Store Owner Functionalities:
- Login and Password Management:
Log in and change the password after login.
- Dashboard:
  - List of users who have submitted ratings to the store.
  - Average total submitted ratings for the store.
- Logout: Option to log out of the system.


## Demo

Insert gif or link to demo

https://roxiler-system-ass-frontend-nxpjj7olp.vercel.app/
## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```
    
