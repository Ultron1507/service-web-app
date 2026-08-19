require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const { connectDB } = require('../config/db');
const Service = require('../models/Service');

const services = [
  ['AC Servicing', 'ac-general-service', 'Cleaning and performance check for your AC'],
  ['AC Complaint', 'ac-gas-refill', 'Help with cooling, leakage, noise, or other AC issues'],
  ['AC Installation', 'ac-installation', 'Professional AC installation at your home'],
  ['Washing Machine Servicing', 'washer-service', 'Routine maintenance and cleaning for your machine'],
  ['Washing Machine Complaint', 'washer-repair', 'Help with washing, draining, or spin issues'],
  ['Washing Machine Installation', 'washer-installation', 'Set up your washing machine safely'],
  ['Fridge Servicing', 'fridge-service', 'Cleaning and health check for your fridge'],
  ['Fridge Complaint', 'fridge-repair', 'Help with cooling, compressor, or noise issues'],
  ['Fridge Installation', 'fridge-installation', 'Careful fridge setup at your home'],
  ['Cooler Servicing', 'cooler-service', 'Cleaning and maintenance to keep your cooler running well'],
  ['Cooler Complaint', 'cooler-complaint', 'Help with cooling, fan, pump, or other cooler issues'],
  ['Cooler Installation', 'cooler-installation', 'Professional cooler setup at your home'],
  ['AC Renting and Installation', 'ac-yearly-rent-installation', 'Rent and install an AC for 1 year, as per Terms & Conditions'],
].map(([name, slug, description]) => ({ name, slug, description, isActive: true }));

(async () => {
  await connectDB();
  for (const service of services) await Service.updateOne({ slug: service.slug }, { $set: service }, { upsert: true });
  console.log(`Seeded ${services.length} services.`);
  await mongoose.disconnect();
})().catch(async (error) => { console.error(error); await mongoose.disconnect(); process.exit(1); });
