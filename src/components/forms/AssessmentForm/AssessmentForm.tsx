import React, { useState, useMemo, useEffect } from 'react';
import {
  FormControlLabel,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Checkbox,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { AssessmentFormValues, AssessmentFormSchema } from './AssessmentFormValues.ts';
import { StarTrekSeries } from '../../../utils/StarTrekSeries.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import FormSubmit, { FormSubmitProps } from '../FormSubmit.tsx';
import { getFormSubmitProps } from './formUtils.tsx';
import { useAssessmentFormStore } from './assessmentFormStore.ts';


const styles = {
  root:        {
    display:       'flex',
    flexDirection: 'column',
    alignItems:    'center',
    position:      'relative',
    paddingBottom: '4rem',
  },
  formContent: {
    wrapper:       {
      display:       'flex',
      flexDirection: 'column',
      alignItems:    'center',
      gap:           '2rem',
      maxWidth:      '400px',
      minWidth:      '300px',
      mt:            '4rem',
    },
    starTrek:      { display: 'block', textAlign: 'left' },
    mordor:        { mt: '1rem' },
    apiError:      { marginRight: '1rem', width: '1.5rem', height: '1.5rem' },
    apiErrorCheck: { color: 'green', width: '1.25rem', height: '1.25rem' },
  },
};


/**
 * AssessmentForm: a component that shows an assessment form and manages the validation and API submission
 */
const AssessmentForm: React.FC = () => {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const openErrorModal                      = () => setShowErrorModal(true);
  const closeErrorModal                     = () => setShowErrorModal(false);

  const formStore = useAssessmentFormStore();
  const [tempFormValues, setTempFormValues] = useState<AssessmentFormValues>(formStore);

  const submitStatus = useMutation({
    mutationFn: ({ data, returnError }: { data: AssessmentFormValues, returnError: boolean }) => {
      console.log(data);

      // Simulate a delay
      return new Promise((resolve, reject) => setTimeout(() => {
          // Simulate an API error
          if (returnError) {
            return reject('There was an API error of the most grievous kind!');
          }

          return resolve('Form submitted successfully!');

        }
        , 2000));
    },
  });

  const { handleSubmit, reset, control, getValues, formState: { errors, isDirty, dirtyFields } } = useForm<AssessmentFormValues>({
    defaultValues: formStore,
    resolver:      zodResolver(AssessmentFormSchema),
  });

  const onSubmit = (data: AssessmentFormValues) => {
    submitStatus.mutate({ data, returnError: data.returnAPIError });
    setTempFormValues(data);
    reset(data);
  };

  const onReset = () => {
    reset(formStore);
    submitStatus.reset();
  }

  const formSubmitProps: Omit<FormSubmitProps, 'onSubmit' | 'onReset'> = useMemo(() => getFormSubmitProps(
    isDirty,
    dirtyFields,
    errors,
    submitStatus,
    openErrorModal,
    closeErrorModal,
    showErrorModal,
  ), [dirtyFields, errors, isDirty, showErrorModal, submitStatus]);

  useEffect(() => {
    // If the submission is successful, maintain the success state until the form is dirty again
    if (submitStatus.isSuccess) {
      useAssessmentFormStore.setState(tempFormValues);

      // The data become the new default values
      reset(tempFormValues);
      submitStatus.reset();
    }
    // Clear API errors once the form is dirty again
    if (isDirty) {
      submitStatus.reset();
    }
  }, [getValues, isDirty, reset, submitStatus, tempFormValues]);

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={styles.root}
    >
      <h2>Assessment Form</h2>

      <p>
        Please fill out this form and we will get back to you soon.
      </p>

      <Box
        component='section'
        sx={styles.formContent.wrapper}
      >
        <Controller
          name='name'
          control={control}
          render={({ field }) => (
            <TextField {...field} fullWidth InputLabelProps={{ shrink: true }} label='Name' />
          )}
        />

        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <TextField {...field} fullWidth InputLabelProps={{ shrink: true }} type='email' label='Email' />
          )}
        />

        <Controller
          name='favoriteStarTrek'
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id='favorite-star-trek-label'>Favorite Star Trek Series</InputLabel>
              <Select
                {...field}
                labelId='favorite-star-trek-label'
                label='Favorite Star Trek Series'
                id='favorite-star-trek'
                value={field.value}
                onChange={(event) => field.onChange(event.target.value)}
                sx={styles.formContent.starTrek}
              >
                {StarTrekSeries.map((series => <MenuItem key={series} value={series}>
                  {series}
                </MenuItem>))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name='walkIntoMordor'
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <ToggleButtonGroup
                  {...field}
                  color='primary'
                  value={field.value ? 'yes' : 'no'}
                  exclusive
                  onChange={(_, value) => field.onChange(value === 'yes')}
                  aria-label='Will you take the Ring to Mordor?'
                  sx={styles.formContent.mordor}
                >
                  <ToggleButton value='yes'>Yes</ToggleButton>
                  <ToggleButton value='no'>No</ToggleButton>
                </ToggleButtonGroup>
              }
              label='Will you take the Ring to Mordor?'
              labelPlacement='top'
            />
          )}
        />

        <Controller
          name='returnAPIError'
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox
                checked={field.value}
                onChange={(_, value) => field.onChange(value)}
                sx={styles.formContent.apiError}
              />}
              label='Return API Error?'
              sx={{ userSelect: 'none' }}
            />
          )}
        />
      </Box>

      <FormSubmit
        onReset={onReset}
        onSubmit={handleSubmit(onSubmit)}
        {...formSubmitProps}
      />
    </Box>
  );
};

export default AssessmentForm;
