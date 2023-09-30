const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; //port for server

// Middleware to parse JSON requests and responses
app.use(bodyParser.json());

// Dummy data for doctors
const doctors = [
  {
    id: 1,
    name: 'Dr. John Doe',
    specialty: 'Cardiologist',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    maxPatients: 10,
  },
  {
    id: 2,
    name: 'Dr. Leo',
    specialty: 'Gynaecologist',
    availableDays: ['Monday', 'Wednesday', 'Saturday'],
    maxPatients: 15,
  },
  {
    id: 3,
    name: 'Dr. Arpita',
    specialty: 'Oncologists',
    availableDays: ['Wednesday', 'Saturday'],
    maxPatients: 5,
  },
  
  
];

// Dummy data for appointments
const appointments = [];

// Define API endpoints 

// Get a list of all doctors
app.get('/api/doctors', (req, res) => {
  res.json(doctors);
});

// Get details of a specific doctor by ID
app.get('/api/doctors/:id', (req, res) => {
  const doctorId = parseInt(req.params.id);
  const doctor = doctors.find((doc) => doc.id === doctorId);

  if (!doctor) {
    return res.status(404).json({ message: 'Doctor not found' });
  }

  res.json(doctor);
});

// Book an appointment with a doctor
app.post('/api/appointments', (req, res) => {
  const { doctorId, patientName } = req.body;

  const doctor = doctors.find((doc) => doc.id === doctorId);

  if (!doctor) {
    return res.status(404).json({ message: 'Doctor not found' });
  }

  // Check if the doctor has available slots for appointments
  if (appointments.filter((app) => app.doctorId === doctorId).length >= doctor.maxPatients) {
    return res.status(400).json({ message: 'No available appointments with this doctor' });
  }

  // Create a new appointment
  const appointment = {
    id: appointments.length + 1,
    doctorId: doctor.id,
    patientName,
  };

  appointments.push(appointment);

  res.status(201).json(appointment);
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
