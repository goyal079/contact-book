import { useEffect, useState } from 'react';
import { ContactSelectorDropdown } from '../components/ContactSelectorDropdown';

interface Contact {
  id: string;
  name: string;
  email: string;
}

// Generate realistic sample contacts
const generateContacts = (): Contact[] => {
  const firstNames = [
    'Aarav', 'Aditi', 'Akshay', 'Ananya', 'Arjun', 'Bhavya', 'Chirag', 'Deepika',
    'Dhruv', 'Divya', 'Gaurav', 'Ishaan', 'Kavya', 'Krishna', 'Manish', 'Meera',
    'Neha', 'Nikhil', 'Pooja', 'Pranav', 'Priya', 'Rahul', 'Riya', 'Rohan',
    'Sahil', 'Sanjana', 'Shreya', 'Siddharth', 'Tanvi', 'Varun', 'Vidya', 'Vikram'
  ];

  const lastNames = [
    'Agarwal', 'Bansal', 'Chauhan', 'Desai', 'Gupta', 'Jain', 'Kapoor', 'Malhotra',
    'Mehta', 'Patel', 'Reddy', 'Shah', 'Sharma', 'Singh', 'Verma', 'Yadav'
  ];

  const companies = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com',
    'protonmail.com', 'zoho.com', 'mail.com'
  ];

  const contacts: Contact[] = [];
  let id = 1;

  for (const firstName of firstNames) {
    for (const lastName of lastNames) {
      if (contacts.length >= 100) break;
      
      const name = `${firstName} ${lastName}`;
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${
        companies[Math.floor(Math.random() * companies.length)]
      }`;
      
      contacts.push({
        id: `contact-${id++}`,
        name,
        email,
      });
    }
  }

  // Sort contacts alphabetically by name
  return contacts.sort((a, b) => a.name.localeCompare(b.name));
};

export const ContactSelectorDemo = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const contacts = generateContacts();
  useEffect(()=>{
    console.log(selectedContact)
  },[selectedContact])
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-visible min-h-[500px]">
          <div className="p-8 border-b border-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Contact Selector</h1>
            <p className="text-gray-600">Search and select from your contacts</p>
          </div>
          
          <div className="p-8 relative">
            <div className="mb-6">
              <ContactSelectorDropdown
                contacts={contacts}
                onSelect={setSelectedContact}
                placeholder="Search by name or email..."
              />
            </div>

            <div className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-100 transition-all duration-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Selected Contact</h2>
              {selectedContact?.id ? (
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-gray-600 w-20">Name:</span>
                    <span className="font-medium text-gray-800">{selectedContact.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 w-20">Email:</span>
                    <span className="font-medium text-gray-800">{selectedContact.email}</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 italic">No contact selected</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 