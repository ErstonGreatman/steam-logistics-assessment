import React from 'react';
import { Box, Button } from '@mui/material';


const styles = {
  root:          {
    position:       'fixed',
    display:        'flex',
    justifyContent: 'space-between',
    alignItems:     'center',
    bottom:         '.5rem',
    left:           '50%',
    width:          'fit-content',
    transform:      'translateX(-50%)',
    gap:            '2rem',
    bgcolor:        'background.default',
    padding:        '.5rem 1rem',
    borderRadius:   '1rem',
    border:         '1px solid',
    borderColor:    '.divider',
    minWidth:       400,
    boxShadow:      '0 0 1rem .5rem .5rem .5rem .5rem',
    zIndex:         '1',
  },
  iconAndStatus: {
    display:    'flex',
    alignItems: 'center',
    gap:        '0.5rem',
  },
  buttons:       {
    display:    'flex',
    alignItems: 'center',
    gap:        '1rem',
  },
};


export type FormSubmitProps = {
  onReset: () => void;
  isResetDisabled: boolean;
  onSubmit: () => void;
  isSubmitDisabled: boolean;
  icon?: React.ReactNode;
  status?: React.ReactNode;
  className?: string;
};

/**
 * FormSubmit: a component that displays the form status with icon to the user and handles reset and submit events
 */
const FormSubmit: React.FC<FormSubmitProps> = ({
  status,
  onReset,
  isResetDisabled,
  onSubmit,
  isSubmitDisabled,
  icon,
  className,
}: FormSubmitProps) => (
  <Box className={className} sx={styles.root}>
    <Box sx={styles.iconAndStatus}>
      {icon}
      {status}
    </Box>
    <Box sx={styles.buttons}>
      <Button type='reset' variant='contained' color='secondary' onClick={onReset} disabled={isResetDisabled}>
        Reset
      </Button>
      <Button type='submit' variant='contained' color='primary' onClick={onSubmit} disabled={isSubmitDisabled}>
        Submit
      </Button>
    </Box>
  </Box>
);

export default FormSubmit;
