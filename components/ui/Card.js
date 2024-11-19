// components/ui/Card.js
export function Card({ children, className }) {
    return <div className={`shadow-lg p-4 rounded ${className}`}>{children}</div>;
  }
  
  export function CardHeader({ children }) {
    return <div className="mb-4">{children}</div>;
  }
  
  export function CardTitle({ children }) {
    return <h2 className="text-2xl font-bold">{children}</h2>;
  }
  
  export function CardDescription({ children }) {
    return <p className="text-gray-500">{children}</p>;
  }
  
  export function CardFooter({ children }) {
    return <div className="mt-4">{children}</div>;
  }
  
  // components/ui/Card.js
export function CardContent({ children, className }) {
    return <div className={`p-4 ${className}`}>{children}</div>;
  }
  