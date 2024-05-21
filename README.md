- yarn lock and package-lock files. npm can't install due to problem with dependencies
- you are using features, but still have some typed directories (constants, redux, libs/yup)
- I wouldn't use formik - it has more errors that lines of code
- missing useCallbacks
- too big forms (and sometimes components) - split them into logic and presentation
- unused code not removed
- css styles mixed with js (sx and styling using css)
- there are a lot of indent (few lvls sometime)
- I would hide usage of redux via abstraction (function/class)
- configuration inside copmonents (eg column configuration)



# Care Point

Dashboard application for tracking and managing appointments

Care Point allows users to quickly make an appointment with a doctor and track their upcoming visits.

Doctors are allowed to add new clinics to the database and assign them as their workplaces by providing informations
like: consultation fee, consultation time, working hours

Patients can find their most suitable doctor and make an appointment in one of the doctor's workplaces

## Motivation

My motivation to do this project was to demonstrate my fullstack skills by creating various complex components, managing
private routes, authorization and authentication, dealing with date objects, handling forms, creating feature based
architecture, creating REST API with JWT/role protected endpoints, communication with MongoDB database, file uploads and
more...

## Tech Stack

**Client:** React, TypeScript, Redux, React-Router, Styled-Components, Axios, Formik, Yup, i18n, Dayjs, React-Toastify,
Husky,

**Server:** Node, Express, TypeScript, moment.js, Bcryptjs, joi, JWT, Morgan, Validator

## Features

### Common features

- Patient / Doctor registration and login
- Handling private routes, authorization and authentication via JWT
- Account management (updating user info, photo, password, account deletion)
- Dashboard with information about appointments
- Two languages (English, Polish) thanks to I18n library
- Pre-commit hooks via Husky
- Patient / Doctor demo accounts

### Patient features

- Ability to search for doctors in the table
- Doctor's profile view
- Making and canceling appointments
- Information about upcoming and completed appointments

### Doctor features

- Ability to search for patients in the table
- Patient's profile view
- Information about upcoming and completed appointments
- Cancelng appointments
- Adding clinics to the database
- Assign clinic as a workplace (including consultation time, consultation fee, creating doctor's working time for
  certain clinics)
- Adding doctor's specializations
- Ability to search for clinics in the table
- Single clinic view
- Doctor's clinics assignments view

## Demo

* Live: https://care-point.vercel.app/
* Backend: https://github.com/HubertSajdak/quick-care-backend

## Screenshots

![App Screenshot](https://i.postimg.cc/gJHr0Ln1/image.png)

![App Screenshot](https://i.postimg.cc/gkpgxCrh/doctors-care-point.png)

![App Screenshot](https://i.postimg.cc/1txjJfRC/image.png)

![App Screenshot](https://i.postimg.cc/tTHBFwD8/image.png)

![App Screenshot](https://i.postimg.cc/QtsqF5d3/image.png)
