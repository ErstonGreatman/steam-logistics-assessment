import { create } from 'zustand';


/**
 * AssessmentFormStore: a zustand store for storing the last successful assessment form state
 */
export const useAssessmentFormStore = create(() => ({
  name:             '',
  email:            '',
  favoriteStarTrek: 'The Next Generation',
  walkIntoMordor:   false,
  returnAPIError:   false,
}));
