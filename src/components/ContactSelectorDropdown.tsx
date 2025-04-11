import { useState, useRef, useEffect, KeyboardEvent, useMemo } from 'react';
import { useDebounce } from '../hooks/useDebounce';

interface Contact {
  id: string;
  name: string;
  email: string;
}

interface ContactSelectorDropdownProps {
  contacts: Contact[];
  onSelect: (contact: Contact) => void;
  placeholder?: string;
  defaultSelected?: Contact;
}

// Helper function to highlight text
const highlightText = (text: string, searchTerm: string) => {
  if (!searchTerm) return text;
  
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.split(regex).map((part, i) => 
    regex.test(part) ? (
      <span key={i} className="text-blue-600 font-semibold">{part}</span>
    ) : (
      part
    )
  );
};

export const ContactSelectorDropdown = ({
  contacts,
  onSelect,
  placeholder = 'Search contacts...',
  defaultSelected,
}: ContactSelectorDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(
    defaultSelected || null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Only filter when there's a search term
  const filteredContacts = useMemo(() => {
    // If no search term, return all contacts
    if (!debouncedSearchTerm.trim()) {
      return contacts;
    }
    
    // Only filter if there's a search term
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [contacts, debouncedSearchTerm]);

  const handleSelect = (contact: Contact) => {
    setSelectedContact(contact);
    onSelect(contact);
    setIsOpen(false);
    setSearchTerm('');
  };

  const scrollToItem = (index: number) => {
    if (listRef.current && index >= 0) {
      const items = listRef.current.getElementsByTagName('li');
      if (items[index]) {
        items[index].scrollIntoView({ block: 'nearest' });
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = selectedIndex < filteredContacts.length - 1 ? selectedIndex + 1 : selectedIndex;
        setSelectedIndex(nextIndex);
        scrollToItem(nextIndex);
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : 0;
        setSelectedIndex(prevIndex);
        scrollToItem(prevIndex);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && filteredContacts[selectedIndex]) {
          handleSelect(filteredContacts[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'Backspace':
        if (selectedContact && !searchTerm) {
          e.preventDefault();
          handleClear();
        }
        break;
    }
  };

  const handleClear = () => {
    setSelectedContact(null);
    setSearchTerm('');
    onSelect({ id: '', name: '', email: '' });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={selectedContact ? selectedContact.name : searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          role="combobox"
        />
        {selectedContact && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="Clear selection"
          >
            ×
          </button>
        )}
      </div>

      {isOpen && (
        <div className="relative">
          <ul
            ref={listRef}
            className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto transition-all duration-200"
            role="listbox"
            style={{ 
              top: '100%',
              left: 0,
              right: 0,
              transform: 'translateY(0)'
            }}
          >
            {filteredContacts.length === 0 ? (
              <li className="px-4 py-3 text-gray-500 text-left">No contacts found</li>
            ) : (
              filteredContacts.map((contact, index) => (
                <li
                  key={contact.id}
                  onClick={() => handleSelect(contact)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`px-4 py-3 cursor-pointer hover:bg-blue-100 text-left transition-colors duration-200 ${
                    index === selectedIndex ? 'bg-blue-100 border-l-4 border-blue-500' : ''
                  }`}
                  role="option"
                  aria-selected={index === selectedIndex}
                >
                  <div className="font-medium text-gray-800">
                    {highlightText(contact.name, debouncedSearchTerm)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {highlightText(contact.email, debouncedSearchTerm)}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}; 