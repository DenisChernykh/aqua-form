import {
    resetError,
    resetErrors,
    checkPage,
    handlePage,
    validateResidentsCount,
    renderPage,
    updateButtonStates,
    pages,
    showError,
    validateEnterAnalysis,
    errorMessageEnterAnalysis,
    getAndStoreSelectValues,
} from './main';
import { addShakeAnimation } from './animation';
import { displayOffer, selectVariant, setVariant } from './equipment';

import {
    formInputError,
    waterUsageInputError,
    analysisInputError,
    addAnalysisInputError,
} from './error-messages';

import { appState, userWaterQualityData, typeOfPages } from './constants';

export function showNextPage() {
    resetErrors();

    let currentPage = checkPage();

    if (currentPage === 'form' && !handlePage(formInputError, currentPage))
        return;

    if (
        currentPage === 'analysis' &&
        !handlePage(analysisInputError, currentPage)
    ) {
        return;
    } else if (appState.selectedAction) {
        appState.currentPageIndex = typeOfPages.findIndex(
            (item) => item === appState.selectedAction
        );
        renderPage(appState.currentPageIndex);
        appState.selectedAction = null;

        return;
    }
    if (currentPage === 'water-usage' && !validateResidentsCount()) {
        showError(
            'Введите количество проживающих человек',
            waterUsageInputError
        );
        return;
    }

    if (currentPage === 'choise-observations') {
        getAndStoreSelectValues();
        appState.selectedAction = typeOfPages.findIndex((item) => {
            return item === 'contact';
        });
        console.log(appState.selectedAction);
        renderPage(appState.selectedAction);
        appState.selectedAction = null;
    }
    if (
        currentPage === 'add-analysis' &&
        !handlePage(addAnalysisInputError, currentPage)
    ) {
        showError('Выберите вариант', addAnalysisInputError);
        return;
    }
    if (currentPage === 'equipment') {
        renderPage(appState.selectedAction);
        appState.selectedAction = null;
    }

    if (
        currentPage === 'add-analysis' &&
        handlePage(addAnalysisInputError, currentPage)
    ) {
        renderPage(appState.selectedAction);
        appState.selectedAction = null;
    }
    if (currentPage === 'enter-analysis') {
        const inputs = document.querySelectorAll('.enter-analysis__input'); // Замените на ваш селектор
        let allValid = true;

        inputs.forEach((input) => {
            if (!validateEnterAnalysis(input.value, input)) {
                allValid = false;
                addShakeAnimation(input);
                input.previousElementSibling.classList.add('error');
                input.classList.add('error');
                // Можно также установить фокус на первый неверный инпут
                input.focus();
            }
        });

        if (!allValid) {
            errorMessageEnterAnalysis.style.display = 'inline-block';
            errorMessageEnterAnalysis.style.flex = '100%';
            errorMessageEnterAnalysis.textContent =
                'Заполните все поля числами или "-"';
            return;
        } else {
            console.log(1);
            const selectSulfide = document.querySelector('#isSulfide');
            const selectSmell = document.querySelector('#isSmell');
            userWaterQualityData.parameters.push({
                isSulfide: selectSulfide.value,
            });
            userWaterQualityData.parameters.push({
                isSmell: selectSmell.value,
            });
            if (selectVariant(userWaterQualityData) === 10) {
                console.log(2);
                renderPage(7);
            } else {
                console.log(3);
                renderPage(5);
                displayOffer();
            }
        }
    }
    if (appState.currentPageIndex < pages.length - 1) {
        renderPage(appState.currentPageIndex + 1);

        updateButtonStates();
    }
}

export function showPrevPage() {
    if (appState.currentPageIndex > 0) {
        renderPage(appState.currentPageIndex - 1);
        updateButtonStates();
    }
}
