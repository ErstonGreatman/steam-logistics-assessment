import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';


const styles = {
  root:          {
    position:     'absolute',
    top:          '50%',
    left:         '50%',
    transform:    'translate(-50%, -50%)',
    bgcolor:      'background.default',
    padding:      '1rem 2rem',
    borderRadius: '1rem',
    border:       '1px solid',
    borderColor:  '.divider',
    width:        'fit-content',
    boxShadow:    '0 0 1rem .5rem .5rem .5rem .5rem',
    zIndex:       '1',
  },
  headerWrapper: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  closeButton:   { cursor: 'pointer', width: '1.5rem', height: '1.5rem' },
  content:       { mt: 2 },
};


type Props = {
  errors: string[];
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

/**
 * ErrorModal: a modal component that lists errors in validation or in a form submission
 * @param errors {string[]} the list of errors
 * @param isOpen {boolean} whether the modal is open
 * @param onClose {() => void} the function to call when the modal is closed
 * @param [className] {string} the className to apply to the modal
 * @constructor
 */
const ErrorModal: React.FC<Props> = ({ errors, isOpen, onClose, className }: Props) => (
  <Modal
    open={isOpen}
    onClose={onClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    className={className}
  >
    <Box sx={styles.root}>
      <Box sx={styles.headerWrapper}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Errors
        </Typography>
        <CloseOutlined onClick={onClose} sx={styles.closeButton} />
      </Box>

      <Typography id="modal-modal-description" sx={styles.content}>
        The following errors were found:
      </Typography>

      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </Box>
  </Modal>
);

export default ErrorModal;
