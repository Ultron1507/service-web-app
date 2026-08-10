export const serviceCategories = {
  ac: {
    name: 'AC', icon: 'ri-temp-cold-line',
    services: [
      { id: 'ac-general-service', serviceName: 'AC Servicing',  icon: 'ri-tools-line', description: 'Cleaning and performance check for your AC' },
      { id: 'ac-gas-refill', serviceName: 'AC Complaint',  icon: 'ri-error-warning-line', description: 'Help with cooling, leakage, noise, or other AC issues' },
      { id: 'ac-installation', serviceName: 'AC Installation', icon: 'ri-home-gear-line', description: 'Professional AC installation at your home' },
    ],
  },
  washing: {
    name: 'Washing Machine', icon: 'ri-settings-3-line',
    services: [
      { id: 'washer-service', serviceName: 'Washing Machine Servicing',  icon: 'ri-tools-line', description: 'Routine maintenance and cleaning for your machine' },
      { id: 'washer-repair', serviceName: 'Washing Machine Complaint',  icon: 'ri-error-warning-line', description: 'Help with washing, draining, or spin issues' },
      { id: 'washer-installation', serviceName: 'Washing Machine Installation',  icon: 'ri-home-gear-line', description: 'Set up your washing machine safely' },
    ],
  },
  fridge: {
    name: 'Fridge', icon: 'ri-fridge-line',
    services: [
      { id: 'fridge-service', serviceName: 'Fridge Servicing',  icon: 'ri-tools-line', description: 'Cleaning and health check for your fridge' },
      { id: 'fridge-repair', serviceName: 'Fridge Complaint',  icon: 'ri-error-warning-line', description: 'Help with cooling, compressor, or noise issues' },
      { id: 'fridge-installation', serviceName: 'Fridge Installation',  icon: 'ri-home-gear-line', description: 'Careful fridge setup at your home' },
    ],
  },
  cooler: {
    name: 'Cooler', icon: 'ri-temp-cold-line',
    services: [
      { id: 'cooler-service', serviceName: 'Cooler Servicing', icon: 'ri-tools-line', description: 'Cleaning and maintenance to keep your cooler running well' },
      { id: 'cooler-complaint', serviceName: 'Cooler Complaint', icon: 'ri-error-warning-line', description: 'Help with cooling, fan, pump, or other cooler issues' },
      { id: 'cooler-installation', serviceName: 'Cooler Installation', icon: 'ri-home-gear-line', description: 'Professional cooler setup at your home' },
    ],
  },
  renting: {
    name: 'Renting', icon: 'ri-home-wifi-line',
    services: [
      { id: 'ac-yearly-rent-installation', serviceName: 'AC Renting and Installation', price: '15000', icon: 'ri-home-wifi-line', description: 'Rent and install an AC for 1 year, as per Terms & Conditions', variant: 'rental' },
    ],
  },
}

export const serviceCategoryList = Object.entries(serviceCategories).map(([id, category]) => ({ id, ...category }))
export const allServices = serviceCategoryList.flatMap(({ id: categoryId, name: categoryName, services }) => services.map((service) => ({ ...service, categoryId, categoryName })))
