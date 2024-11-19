import React from 'react';
import { Slot } from '@radix-ui/react-slot';

const Button = React.forwardRef(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot : 'button';
  return <Component ref={ref} {...props} />;
});

Button.displayName = 'Button';

export default Button;
