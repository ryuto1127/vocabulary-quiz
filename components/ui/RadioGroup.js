// components/ui/RadioGroup.js
export function RadioGroup({ children, value, onChange }) {
    return (
      <div onChange={(e) => onChange(e.target.value)}>
        {children}
      </div>
    );
  }
  
  export function RadioGroupItem({ children, id, value }) {
    return (
      <div className="flex items-center space-x-2">
        <input type="radio" id={id} name="radio-group" value={value} />
        <Label htmlFor={id}>{children}</Label>
      </div>
    );
  }
  