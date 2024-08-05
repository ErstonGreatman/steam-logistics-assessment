import { ErrorOutline } from '@mui/icons-material';
import ErrorModal from '../ErrorModal.tsx';
import { Button, CircularProgress, Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { FieldErrors } from 'react-hook-form';
import { AssessmentFormValues } from './AssessmentFormValues.ts';


const iconSize       = '1.25rem';
const iconDimensions = { width: iconSize, height: iconSize };


export const getFormSubmitProps = (
  isDirty: boolean,
  dirtyFields: Record<string, boolean>,
  errors: FieldErrors<AssessmentFormValues>,
  submitStatus: { isPending: boolean, isError: boolean, isSuccess: boolean, error: Error | null },
  openErrorModal: () => void,
  closeErrorModal: () => void,
  showErrorModal: boolean,
) => {
  // Has validation errors
  if (Object.keys(errors).length > 0) {
    return {
      icon:             <ErrorOutline sx={{ color: 'error.main', ...iconDimensions }} />,
      status:           <>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            Errors:
                            <Button onClick={openErrorModal} color="error">{Object.keys(errors).length}</Button>
                          </Box>
                          <ErrorModal
                            errors={Object.values(errors).filter(Boolean).map((error) => error?.message ?? '')}
                            isOpen={showErrorModal}
                            onClose={closeErrorModal}
                          />
                        </>,
      isSubmitDisabled: true,
      isResetDisabled:  false,
    };
  }

  // Form is submitting
  if (submitStatus.isPending) {
    return {
      icon:             <CircularProgress size={iconSize} />,
      status:           <span>Submitting...</span>,
      isSubmitDisabled: true,
      isResetDisabled:  false,
    };
  }

  // Submit has failed
  if (submitStatus.isError) {
    return {
      icon:             <ErrorOutline sx={{ color: 'error.main', ...iconDimensions }} />,
      status:           <>
                          <Button onClick={openErrorModal}>Error: Failed to save...</Button>
                          <ErrorModal
                            errors={[
                              submitStatus.error?.message ? submitStatus.error.message : submitStatus.error?.toString()
                                ?? '',
                            ]}
                            isOpen={showErrorModal}
                            onClose={closeErrorModal}
                          />
                        </>,
      isSubmitDisabled: true,
      isResetDisabled:  false,
    };
  }

  // Form has been submitted
  if (submitStatus.isSuccess) {
    return {
      icon:             <CheckIcon sx={{ color: 'success.main', ...iconDimensions }} />,
      status:           <span>Submitted</span>,
      isSubmitDisabled: true,
      isResetDisabled:  true,
    };
  }

  // Has Changes, show count
  if (isDirty) {
    return {
      icon:             null,
      status:           (
                          <span>
          {Object.keys(dirtyFields).length} change{Object.keys(dirtyFields).length === 1 ? '' : 's'}
        </span>
                        ),
      isSubmitDisabled: false,
      isResetDisabled:  false,
    };
  }

  // No changes
  return {
    icon:             null,
    status:           <span>No changes</span>,
    isSubmitDisabled: true,
    isResetDisabled:  true,
  };
};
