export const typeOfPages = [
    'form',
    'water-usage',
    'analysis',
    'add-analysis',
    'enter-analysis',
    'choise-observations',
    'equipment',
    'contact',
];

export const userObservation = [
    'scale',
    'limescale',
    'yellowStains',
    'sulfide',
];
export const userWaterQualityData = {};
export const analysisPageActions = {
    no: 'choise-observations',
    yes: 'add-analysis',
    add: 'contact',
    enter: 'enter-analysis',
};

export const appState = {
    currentPageIndex: 0,
    errorEmptyInput: false,
    selectedAction: null,
};
