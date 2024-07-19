import './styles/style.scss';
import {
    typeOfPages,
    userObservation,
    userWaterQualityData,
    analysisPageActions,
    appState,
} from './constants';

import { selectVariant, setVariant, displayOffer } from './equipment';

import { showNextPage, showPrevPage } from './navigation';

import { addShakeAnimation } from './animation';

import {
    waterUsageInputError,
    analysisInputError,
    formInputError,
    addAnalysisInputError,
    enterAnalysisInputError,
} from './error-messages';

const waterUsageInput = document.querySelector('#waterUsage');
export const pages = document.querySelectorAll('.choise-form');
const formCheckboxes = document.querySelectorAll('.form input[type="radio"]');
const enterAnalysisInputs = document.querySelectorAll(
    '.enter-analysis input[type="text"]'
);
export const errorMessageEnterAnalysis = document.querySelector(
    '.enter-analysis__input-container .error-message'
);

const buttonNext = document.querySelectorAll('.button-next');
const buttonPrev = document.querySelectorAll('.button-prev');

function generateUserObservationObject() {
    userWaterQualityData.userObservation = userObservation.reduce(
        (acc, item) => {
            acc[item] = null;
            return acc;
        },
        {}
    );
}
generateUserObservationObject();

pages.forEach((page) => {
    page.classList.add('page');
});

init();

function handleWaterUsageInput() {
    resetError(waterUsageInputError);
    const residentsCount = validateResidentsCount();

    if (residentsCount !== null) {
        userWaterQualityData.residentsCount = residentsCount;
    }
}

export function validateResidentsCount() {
    const residentsCount = waterUsageInput.value.trim();
    const numberCount = Number(residentsCount);
    resetError(waterUsageInputError);

    if (residentsCount === '') {
        showError(
            'Введите количество проживающих человек',
            waterUsageInputError
        );
        addShakeAnimation(waterUsageInput);

        return null;
    }

    if (!isNaN(numberCount) && numberCount > 0) {
        resetError(waterUsageInputError);
        return numberCount;
    } else {
        showError(
            'Введите корректное число проживающих человек',
            waterUsageInputError
        );
        return null;
    }
}

export function showError(message, errorElement) {
    errorElement.textContent = message;
    errorElement.parentNode.classList.add('error');
}

export function resetError(error) {
    error.textContent = '';
    error.parentNode.classList.remove('error');
}

function init() {
    setupAddEventListener();
    renderPage(0);
    updateButtonStates();
}

function setupAddEventListener() {
    buttonNext.forEach((button) =>
        button.addEventListener('click', showNextPage)
    );
    buttonPrev.forEach((button) =>
        button.addEventListener('click', showPrevPage)
    );
    waterUsage.addEventListener('input', handleWaterUsageInput);

    waterUsage.addEventListener('keydown', handleWaterUsageEnter);
    formCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            resetError(formInputError);
        });
    });
    enterAnalysisInputs.forEach((input) => {
        input.addEventListener('input', handleEnterAnalysisInput);
    });
}

function handleWaterUsageEnter(event) {
    if (event.key !== 'Enter') return;

    const numberCount = validateResidentsCount();
    if (numberCount === null) {
        addShakeAnimation(waterUsageInput);
    } else {
        removeShakeAnimation(waterUsageInput);
        userWaterQualityData.residentsCount = numberCount; // Сохраняем корректное значение
        renderPage(appState.currentPageIndex + 1); // Переход на следующую страницу
    }
}

function removeShakeAnimation(input) {
    input.classList.remove('shake');
}

function getValidatedValue(value, parsedValue) {
    if (value.trim() === '-') {
        return '-';
    }
    return isNaN(parsedValue) ? null : parsedValue;
}

function handleEnterAnalysisInput() {
    userWaterQualityData.parameters = [];

    enterAnalysisInputs.forEach((input) => {
        const name = input.name;
        const value = input.value;
        const parsedValue = parseFloat(value);
        if (validateEnterAnalysis(value, input)) {
            userWaterQualityData.parameters.push({
                name: name,
                value: value === '' ? null : parsedValue,
            });
        }
    });
}

window.validateAndSanitizeInput = function (input) {
    const value = input.value;
    const sanitizedValue = value.replace(/[^0-9.-]/g, ''); // Удаление всех символов кроме цифр, точек и прочерков

    // Если очищенное значение отличается от введённого
    if (value !== sanitizedValue) {
        input.value = sanitizedValue; // Обновление значения инпута на очищенное
    }

    // Проверяем валидность очищенного значения
    if (sanitizedValue === '') {
        input.classList.add('error');
        input.previousElementSibling.classList.add('error');
        errorMessageEnterAnalysis.style.display = 'inline-block';
        errorMessageEnterAnalysis.style.flex = '100%';
        errorMessageEnterAnalysis.textContent = 'Введите число или "-"';
    } else {
        // Убираем ошибки, если ввод валиден
        input.classList.remove('error');
        input.previousElementSibling.classList.remove('error');
        errorMessageEnterAnalysis.style.display = 'none';
    }
};

export function validateEnterAnalysis(value, input) {
    let trimmedValue = value.trim();
    const num = parseFloat(trimmedValue);

    if (trimmedValue.value === '') {
        return false; // Accept empty value and handle as null
    }

    if (trimmedValue === '-') {
        return true;
    }

    if (!isNaN(num) && isFinite(num)) {
        return true; // Accept valid numbers
    }
    return false; // Reject non-numeric values
}

export function renderPage(index) {
    pages.forEach((page, i) => {
        page.classList.toggle('active', i === index);
        appState.currentPageIndex = index;
    });
    const page = checkPage();

    if (page === 'analysis') {
        addAnalysisChoiceListener('analysis');
    }
    if (page === 'add-analysis') {
        addAnalysisChoiceListener('add-analysis');
    }
    if (page === 'contacts') {
        1;
    }
}

function addAnalysisChoiceListener(name) {
    const choises = document.querySelectorAll(`input[name="${name}"]`);

    choises.forEach((choise) => {
        choise.addEventListener('change', handleAnalysisChoiseChange);
    });
}

function handleAnalysisChoiseChange(event) {
    console.log(event.target);
    const action = analysisPageActions[event.target.value];
    const fileUploadElement = document.querySelector(
        '.add-analysis__file-upload'
    );

    const errorElement = analysisInputError.parentNode;
    resetError(addAnalysisInputError);
    if (action !== 'contact') {
        fileUploadElement.classList.remove('has-file-analysis');
        appState.selectedAction = action;
    } else {
        appState.selectedAction = 'contact';
        fileUploadElement.classList.add('has-file-analysis');
    }
}
export function resetErrors() {
    resetError(analysisInputError);
    resetError(waterUsageInputError);
    resetError(formInputError);
}
function updateWaterSupply() {
    const selectedValue =
        Array.from(formCheckboxes).find((checkbox) => checkbox.checked)
            ?.value || null;

    userWaterQualityData.waterSuplay = selectedValue;
}
// function handleFormPage() {
//     if (!checkChoices()) {
//         showError('Выберите вариант', formInputError);

//         updateButtonStates();
//         return false;
//     }
//     updateWaterSupply();
//     return true;
// }

export function handlePage(input, currentPage) {
    if (!checkChoices()) {
        showError('Выберите вариант', input);
        updateButtonStates();
        return false;
    }
    if (checkChoices && currentPage === 'form') {
        updateWaterSupply();
        return true;
    }
    return true;
}

export function updateButtonStates() {
    const isFormPage =
        pages[appState.currentPageIndex].classList.contains('form');
    const isContactPage =
        pages[appState.currentPageIndex].classList.contains('contact');

    buttonPrev.forEach((button) => {
        button.style.visibility = isFormPage ? 'hidden' : 'visible';
    });
    buttonNext.forEach((button) => {
        button.style.display = isContactPage ? 'none' : 'block';
    });
}

export function checkPage() {
    return typeOfPages[appState.currentPageIndex];
}

function checkChoices() {
    const choises = pages[appState.currentPageIndex].querySelectorAll(
        "input[type='radio']"
    );

    return Array.from(choises).some((radio) => {
        return radio.checked;
    });
}

function checkTextInputs() {
    const textInputs =
        pages[appState.currentPageIndex].querySelectorAll("input[type='text']");

    return Array.from(textInputs).some((input) => {
        return input.value.trim() !== '';
    });
}

export function getAndStoreSelectValues() {
    const selects = pages[appState.currentPageIndex].querySelectorAll('select');
    selects.forEach((select, index) => {
        const observationKey = userObservation[index];
        if (observationKey) {
            userWaterQualityData.userObservation[observationKey] = select.value;
        }
    });
}

renderPage(0);
updateButtonStates();
