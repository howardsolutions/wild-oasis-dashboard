# Wild Oasis Dashboard

This is the internal app of a Boutique Hotel, used like an internal tools for hotel Employees.

This hotel has a public website for Users, including all cabin details, price, booking information...

## Application Requirements 👀

<details>

<summary>Open to read (Long List) 😵 😵</summary>

<br />

👉 Employee NEED to logged into the application to Perform any tasks.

👉 New users can only be signed up from the inside the applications - to guarentee that only actual hotel employees can get Accounts.

👉 Needs a Table View with cabins, showing cabin photo, name, capacity, price, current discount...

👉 Users should be able to update or delete the cabin, and create the cabins (uploading cabin photo)

👉 Needs table view for all the bookings, showing Arrival, departure dates, status, and paid amount, as well as cabin and guest data.

👉 Booking status can be `Unconfirmed` (booked, but not checked in), `Checked in`, `Checked out`.
Booking table should be able to filter by these statuses.

👉 Other booking data incluese: number of guests, nights, guest observation, breakfast or not, breakfast price.

👉 Users should be able to delete, checkin, checkout a booking as the guest arrives (no editting necessary for now)

👉 Bookings may not have been paid yet, on guest arival. Thereby, on checkin, users need to accept payment (outside of the app scope), and then CONFIRM manually, payment has been received (inside the application)

👉 On Checkin, guest should have the ability to add breakfast for the entire stay, if they hadn't already.

👉 Guest data : fullname, email, national ID, nationality, country flag

---

👍 The initial app screen should be a dashboard, to display important information for the Last 7 days, 30, 90 days.

👉 A list of guest checking in and out on the current day. Users should be able to perform these tasks from here.

👉 Statistics on recent booking, sales, checkins, occupancy rate

👉 A chart showing all daily Hotel sales, showing both "total" and "extra" sales (extra sales - is only breakfast at the moment!)

👉 A chart showing statistics on stay durations, as this is an important metric for the hotel.

👍 Users should be able to define a few application-wide settings: price for breakfast, min max nights stay, max guest per booking

👍 App needs Dark Mode.

</details>

<br />

<hr />

## Main Features & API Design 📡

## Authentication
- AUTHENTICATION
    - SIGNUP, LOGIN and LOGOUT
- USER
    - GET Current user information
    - UPDATE  Current user information: name, password, avatar

## Booking
- GET all bookings information
    - Filtering, Sorting, Pagination on Bookings List

- GET Booking Details by ID - return all booking details and cabins, guests information related to this booking ID.

- DELETE a booking with ID

## Checkin - Checkout
- UPDATE Checkin / Checkout information on a booking with a ID

## Dashboard
- Filter, Display recent bookings information by last 7, 30 and 90 days with Charts
- Display statistic information such as: Bookings, Sales, Checkins, Occupancy Rate


## Cabins
- GET ALL cabins information
- CREATE and UPDATE Cabin Information
- DELETE a cabin with an ID

## Settings
- Including Form to update min, max booking length, max guest per booking, break fast price information on a cabin

## What I gained from building this project 😎
<details> 

<summary>Open to read (Long List) 😵 😵</summary>

🔵 LITERRALY, this project is the single place I bundled EVERY SINGLE KNOWLEDGE I GAINNED about React into ONCE PLACE.

🔵 Professional large frontend application planning.

From gather business requirements, frontend architecture, thinking about the data flow through the entire application

and then Break the application into categories of features.

Choosing suitable Technology Stack for high quality frontend development.

🔵 Relational Data modeling with Supabase

🔵 Building large React application with best libraries in React Ecosystem

🔵 Managing Remote Server state in application with React Query, there's no Redux in this application

🔵 Managing Complex Form Fields State & validation with React Hook Form.

🔵 Write highly reusable React Functional Component, with custom styling by leveraging `styled-component`

Examples: Reusable Modal Component, Confirm Component, and Table Component with custom styling, and Compount Pattern, Select, Client Side Sort, Filter, Pagination...

🔵 This application built with `Performance and Accessibility` in mind.

🔵 Applied Advanced React Patterns likes Custom Hooks, High Order Component (HOC), Render Props, Compound components.

🔵 Error Boundaries for production

</details>
