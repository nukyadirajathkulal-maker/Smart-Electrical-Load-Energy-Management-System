\# Smart Electrical Load \& Energy Management System



A full-stack web application designed to monitor electrical appliance consumption, calculate energy usage, and estimate electricity bills. The system helps users manage their household electrical loads through an interactive dashboard.



\## Project Overview



The Smart Electrical Load \& Energy Management System allows users to register, log in, manage their electrical appliances, and monitor their daily and monthly electricity consumption.



The application provides a centralized dashboard to help users understand their energy usage and estimated electricity expenses.



\## Features



\- \*\*User Authentication:\*\* Secure user registration and login using JWT authentication and password hashing.

\- \*\*Dashboard:\*\* View total appliances, connected power, daily energy consumption, monthly consumption, and estimated electricity bills.

\- \*\*Appliance Management:\*\* Add, view, update, and delete electrical appliances.

\- \*\*Energy Calculation:\*\* Calculate energy consumption based on appliance power, operating hours, and quantity.

\- \*\*Electricity Bill Estimation:\*\* Estimate monthly electricity costs using a configurable electricity rate.

\- \*\*Responsive Interface:\*\* User-friendly frontend for managing appliances and viewing energy statistics.



\## Technologies Used



| Category | Technologies |

|---|---|

| Frontend | React.js, JavaScript, HTML, CSS |

| Backend | Node.js, Express.js |

| Database | MySQL |

| Authentication | JWT, bcrypt |

| API Testing | Thunder Client |

| Development Tools | VS Code, Git, GitHub |



\## Project Structure



```text

Smart-Electrical-Load-Energy-Management-System/

│

├── client/

│   ├── public/

│   └── src/

│       ├── assets/

│       ├── components/

│       ├── pages/

│       ├── services/

│       ├── App.jsx

│       └── main.jsx

│

├── server/

│   ├── config/

│   ├── controllers/

│   ├── middleware/

│   ├── routes/

│   ├── server.js

│   └── package.json

│

├── database/

│   └── schema.sql

│

├── .gitignore

└── README.md

```



\## Installation and Setup



\### 1. Clone the Repository



```bash

git clone https://github.com/nukyadirajathkulal-maker/Smart-Electrical-Load-Energy-Management-System.git

```



Navigate into the project:



```bash

cd Smart-Electrical-Load-Energy-Management-System

```



\### 2. Database Setup



1\. Install MySQL Server and MySQL Workbench.

2\. Open MySQL Workbench and connect to your local MySQL server.

3\. Open the `database/schema.sql` file.

4\. Execute the SQL script.



This creates the database:



```sql

smart\_energy\_management

```



And the following tables:



\- `users`

\- `appliances`



\### 3. Backend Setup



Open a terminal:



```bash

cd server

npm install

```



Create a `.env` file inside the `server` folder:



```env

PORT=5000

DB\_HOST=localhost

DB\_USER=your\_mysql\_username

DB\_PASSWORD=your\_mysql\_password

DB\_NAME=smart\_energy\_management

JWT\_SECRET=your\_secure\_jwt\_secret

```



Replace the example values with your local MySQL credentials and a secure JWT secret.



Start the backend:



```bash

npm start

```



Backend runs at:



`http://localhost:5000`



\### 4. Frontend Setup



Open another terminal:



```bash

cd client

npm install

npm run dev

```



Open the local frontend URL displayed in your terminal, usually:



`http://localhost:5173`



\## Database Design



\### Users Table



Stores registered user information.



| Column | Description |

|---|---|

| id | Unique user ID |

| name | User name |

| email | User email |

| password | Hashed password |



\### Appliances Table



Stores electrical appliance details associated with each user.



| Column | Description |

|---|---|

| id | Unique appliance ID |

| user\_id | Associated user ID |

| appliance\_name | Appliance name |

| power | Power rating in watts |

| hours\_per\_day | Daily operating hours |

| quantity | Number of appliances |

| room | Room where appliance is located |



\## Energy Calculation



\*\*Daily Energy Consumption:\*\*



```text

Daily Units (kWh) =

(Power × Hours per Day × Quantity) / 1000

```



\*\*Monthly Energy Consumption:\*\*



```text

Monthly Units = Daily Units × 30

```



\*\*Estimated Electricity Bill:\*\*



```text

Estimated Bill = Monthly Units × Electricity Rate

```



The current backend calculation uses an estimated rate of ₹7.50 per unit.



\## Future Enhancements



\- Real-time electricity monitoring through IoT sensors.

\- Energy consumption graphs and historical reports.

\- Configurable electricity tariff rates.

\- Appliance-wise energy cost analysis.

\- Monthly energy usage comparison.

\- Smart energy-saving recommendations.



\## Author



\*\*Rajath B Kulal\*\*



B.Tech – Electrical \& Electronics Engineering



\- GitHub: https://github.com/nukyadirajathkulal-maker

\- LinkedIn: https://www.linkedin.com/in/rajathbkulal/



\---



\*Developed as a full-stack project to explore web development, database management, authentication, and electrical energy monitoring.\*



