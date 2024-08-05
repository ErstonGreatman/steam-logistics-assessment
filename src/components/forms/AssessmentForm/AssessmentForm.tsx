import React, { useState } from 'react';
import {
  FormControlLabel,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Button, ToggleButton, ToggleButtonGroup, Checkbox,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import CheckIcon from '@mui/icons-material/Check';
import { AssessmentFormValues, AssessmentFormSchema } from './AssessmentFormValues.ts';
import { StarTrekSeries } from '../../../utils/StarTrekSeries.ts';
import { zodResolver } from '@hookform/resolvers/zod';


/**
 * AssessmentForm: a component that shows an assessment form and manages the validation and API submission
 */
const AssessmentForm: React.FC = () => {
  const submitStatus                        = useMutation({
    mutationFn: ({ data, returnError }: { data: AssessmentFormValues, returnError: boolean }) => {
      console.log(data);

      if (returnError) {
        return Promise.reject('There was an API error of the most grievous kind!');
      }

      return Promise.resolve();
    },
  });

  const { handleSubmit, control, formState: { errors } } = useForm<AssessmentFormValues>({
    defaultValues: {
      name:             '',
      email:            '',
      favoriteStarTrek: 'The Next Generation',
      walkIntoMordor:   false,
      returnAPIError:   false,
    },
    resolver:      zodResolver(AssessmentFormSchema),
  });

  const onSubmit = (data: AssessmentFormValues) => {
    submitStatus.mutate({ data, returnError: data.returnAPIError });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="assessment-form">
        <h2>Assessment Form</h2>

        <p>
          Please fill out this form and we will get back to you soon.
        </p>

        <Box
          component="section"
          sx={{
            display:       'flex',
            flexDirection: 'column',
            alignItems:    'center',
            gap:           '2rem',
            maxWidth:      '400px',
            minWidth:      '300px',
            mt:            '4rem',
          }}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField {...field} fullWidth InputLabelProps={{ shrink: true }} label="Name" />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField {...field} fullWidth InputLabelProps={{ shrink: true }} type="email" label="Email" />
            )}
          />

          <Controller
            name="favoriteStarTrek"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id="favorite-star-trek-label">Favorite Star Trek Series</InputLabel>
                <Select
                  {...field}
                  labelId="favorite-star-trek-label"
                  label="Favorite Star Trek Series"
                  id="favorite-star-trek"
                  value={field.value}
                  onChange={(event) => field.onChange(event.target.value)}
                  sx={{ display: 'block', textAlign: 'left' }}
                >
                  {StarTrekSeries.map((series => <MenuItem key={series} value={series}>
                    {series}
                  </MenuItem>))}
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name="walkIntoMordor"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <ToggleButtonGroup
                    {...field}
                    color="primary"
                    value={field.value ? 'yes' : 'no'}
                    exclusive
                    onChange={(event, value) => field.onChange(value === 'yes')}
                    aria-label="Will take the Ring to Mordor?"
                    sx={{ mt: '1rem' }}
                  >
                    <ToggleButton value="yes">Yes</ToggleButton>
                    <ToggleButton value="no">No</ToggleButton>
                  </ToggleButtonGroup>
                }
                label="Will take the Ring to Mordor?"
                labelPlacement="top"
              />
            )}
          />

          <Controller
            name="returnAPIError"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox
                  value={field.value}
                  onChange={(event, value) => field.onChange(value)}
                  sx={{ marginRight: '1rem', width: '1.5rem', height: '1.5rem' }}
                >
                  {field.value ? <CheckIcon sx={{ color: 'green', width: '1.25rem', height: '1.25rem' }} /> : null}
                </Checkbox>}
                label="Return API Error?"
                sx={{ userSelect: 'none' }}
              />
            )}
          />
        </Box>

        <Button variant="contained" type="submit" sx={{ marginTop: '2rem' }}>Submit</Button>

        {errors && (
          <div style={{ textAlign: 'left' }}>
            <h4>Validation Errors</h4>
            <ul>
              {Object.entries(errors).map(([key, value]) => <li key={key}>{value.message}</li>)}
            </ul>
          </div>
        )}
        {submitStatus.isError && <p>API Error: {submitStatus.error}</p>}
        {submitStatus.isSuccess && <p>Form submitted successfully!</p>}
      </form>
    </div>
  );
};

export default AssessmentForm;
