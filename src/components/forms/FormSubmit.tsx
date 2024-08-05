import React from 'react';


type Props = {

  className?: string;
}

/**
 * FormSubmit: a component that displays the form status with icon to the user and handles reset and submit events
 */
const FormSubmit: React.FC<Props> = ({ className }: Props) => (
  <div className={` ${className}`}>
    <p>FormSubmit works!</p>
  </div>
);

export default FormSubmit;
