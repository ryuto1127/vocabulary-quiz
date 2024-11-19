// components/ui/Label.js
export default function Label({ children, htmlFor }) {
    return (
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
        {children}
      </label>
    );
  }
  