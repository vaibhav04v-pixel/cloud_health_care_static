const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cloudcare_hospital';
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:qwrty@localhost:27017/cloudcare_hospital?authSource=admin';
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:qwrty@localhost:27017/';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:qwrty@mongo:27017/';

// Middleware
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Schemas
const appointmentSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	phone: { type: String, required: true },
	dateOfBirth: { type: String, required: true },
	gender: { type: String, required: true },
	department: { type: String, required: true },
	doctor: { type: String },
	appointmentDate: { type: String, required: true },
	appointmentTime: { type: String, required: true },
	reason: { type: String, required: true },
	emergency: { type: Boolean, default: false },
	insurance: { type: Boolean, default: false }
}, { timestamps: true });

const contactSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	phone: { type: String },
	subject: { type: String, required: true },
	message: { type: String, required: true },
	urgent: { type: Boolean, default: false }
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);
const Contact = mongoose.model('Contact', contactSchema);

// API routes
app.post('/api/appointments', async (req, res) => {
	try {
		const appointment = new Appointment(req.body);
		await appointment.validate();
		await appointment.save();
		return res.status(201).json({ success: true, id: appointment._id });
	} catch (err) {
		return res.status(400).json({ success: false, error: err.message });
	}
});

app.post('/api/contact', async (req, res) => {
	try {
		const contact = new Contact(req.body);
		await contact.validate();
		await contact.save();
		return res.status(201).json({ success: true, id: contact._id });
	} catch (err) {
		return res.status(400).json({ success: false, error: err.message });
	}
});

// Health check
app.get('/api/health', (req, res) => {
	res.json({ status: 'ok', timestamp: Date.now() });
});

// Serve static files
app.use(express.static(path.join(__dirname)));

// Fallback to index.html for root
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 handler for API
app.use('/api/*', (req, res) => {
	res.status(404).json({ success: false, error: 'Not found' });
});

async function start() {
	try {
		await mongoose.connect(MONGODB_URI, {
			serverSelectionTimeoutMS: 5000
		});
		console.log('Connected to MongoDB');
		app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
	} catch (err) {
		console.error('Failed to start server:', err);
		process.exit(1);
	}
}

start();
