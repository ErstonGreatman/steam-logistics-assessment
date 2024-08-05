import { create } from 'zustand';

export const useAssessmentFormStore = create(() => ({
  name:             '',
  email:            '',
  favoriteStarTrek: 'The Next Generation',
  walkIntoMordor:   false,
  returnAPIError:   false,
}));
