# Contact Selector Dropdown Component

A reusable React component for searching and selecting contacts from a list. Built with TypeScript, React, and Tailwind CSS.

## Features

- 🔍 Real-time search filtering
- ⌨️ Keyboard navigation support
- 🎯 Text highlighting for matches
- 🧹 Clear selection option
- ♿ Accessibility support
- �� Responsive design
- ⚡ Pre-selected contact support

## Component Design

The component is built with a modular architecture:

### ContactSelectorDropdown
The main component that handles:
- Input field for search
- Dropdown list for results
- Selection handling
- Keyboard navigation
- Text highlighting
- Pre-selected contact initialization

Props:
```typescript
interface ContactSelectorDropdownProps {
  contacts: Contact[];          // Array of contacts to display
  onSelect: (contact: Contact) => void;  // Callback when contact is selected
  placeholder?: string;         // Optional input placeholder
  defaultSelected?: Contact;    // Optional pre-selected contact
}
```

### ContactSelectorDemo
A demo page showcasing the component with:
- Sample contact data generation
- Component usage example
- Selected contact display

## State Handling

The component manages several pieces of state:

```typescript
// Search and selection states
const [searchTerm, setSearchTerm] = useState('');
const [selectedContact, setSelectedContact] = useState<Contact | null>(
  defaultSelected || null  // Initialize with defaultSelected if provided
);
const [selectedIndex, setSelectedIndex] = useState(-1);
const [isOpen, setIsOpen] = useState(false);

// Debounced search term for performance
const debouncedSearchTerm = useDebounce(searchTerm, 300);
```

State updates are handled through:
- Input changes for search
- Click events for selection
- Keyboard navigation
- Focus/blur events for dropdown visibility
- Initialization with defaultSelected prop

## Keyboard Support

The component supports full keyboard navigation:

- ⬆️ Up Arrow: Move selection up
- ⬇️ Down Arrow: Move selection down
- ↵ Enter: Select current item
- ⎋ Escape: Close dropdown
- ⌫ Backspace: Clear selection

Keyboard navigation includes:
- Automatic scrolling to keep selected item in view
- Visual feedback for current selection
- Proper focus management

## Potential Improvements

1. **Performance Optimizations**
   - Implement virtual scrolling for large lists
   - Add memoization for filtered results
   - Optimize re-renders with useMemo/useCallback

2. **Enhanced Features**
   - Add multi-select support
   - Implement grouping/categorization of contacts
   - Add loading states for async data
   - Include contact avatars/images

3. **Accessibility Enhancements**
   - Add ARIA live regions for dynamic updates
   - Improve screen reader announcements
   - Add more keyboard shortcuts
   - Include focus trap for dropdown

4. **UX Improvements**
   - Add loading skeletons
   - Implement error states
   - Add animations for transitions
   - Include tooltips for actions

5. **Testing**
   - Add unit tests for core functionality
   - Include accessibility testing
   - Add integration tests
   - Implement visual regression testing

## Usage Example

```typescript
import { ContactSelectorDropdown } from './components/ContactSelectorDropdown';

const contacts = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  // ... more contacts
];

// Example with defaultSelected
const defaultContact = contacts[0];

function App() {
  const [selectedContact, setSelectedContact] = useState(null);

  return (
    <ContactSelectorDropdown
      contacts={contacts}
      onSelect={setSelectedContact}
      placeholder="Search contacts..."
      defaultSelected={defaultContact}  // Pre-selects the first contact
    />
  );
}
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Dependencies

- React
- TypeScript
- Tailwind CSS
- Vite
