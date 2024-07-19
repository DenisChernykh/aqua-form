import { appState, typeOfPages, userWaterQualityData } from './constants.js';
import { renderPage } from './main.js';
const variation = [
    {
        preFilterModule: 'BB20 + модуль предфильтрации (РР)',
        softenerModule: 'ws-500',
        postFilterModule: 'BB20 + модуль постфильтрации (карбон-блок)',
        srcImg: '1-6.jpeg',
    },
    {
        preFilterModule: 'BB20 + модуль предфильтрации (РР)',
        softenerModule: 'ws-500 P1',
        postFilterModule: 'BB20 + модуль постфильтрации (карбон-блок)',
        srcImg: '1-6.jpeg',
    },
    {
        preFilterModule: 'BB20 + модуль предфильтрации (РР)',
        softenerModule: 'ws-800',
        postFilterModule: 'BB20 + модуль постфильтрации (карбон-блок)',
        srcImg: '1-6.jpeg',
    },
    {
        preFilterModule: 'BB20 + модуль предфильтрации (РР)',
        softenerModule: 'ws-800 P1',
        postFilterModule: 'BB20 + модуль постфильтрации (карбон-блок)',
        srcImg: '1-6.jpeg',
    },
    {
        preFilterModule: 'BB20 + модуль предфильтрации (РР)',
        softenerModule: 'ws-1000',
        postFilterModule: 'BB20 + модуль постфильтрации (карбон-блок)',
        srcImg: '1-6.jpeg',
    },
    {
        preFilterModule: 'BB20 + модуль предфильтрации (РР)',
        softenerModule: 'ws-1000 P1',
        postFilterModule: 'BB20 + модуль постфильтрации (карбон-блок)',
        srcImg: '1-6.jpeg',
    },
    {
        filter: 'Фильтр дисковый Jimten 3/4" 100 мкм',
        softenerModule: 'Комплект умягчителя F65P3 корпус 1054 Canature HY',
        sltTank: 'Бак солевой 70 л.',
        srcImg: 'v7.jpeg',
    },
    {
        filter: 'Фильтр дисковый Jimten 3/4" 100 мкм',
        softenerModule: 'Комплект умягчителя F65P3 корпус 1252 Canature HY',
        saltTank: 'Бак солевой 70 л.',
        srcImg: 'v8.jpeg',
    },
    {
        filter: 'Фильтр дисковый Jimten 3/4" 100 мкм',
        softenerModule: 'Комплект умягчителя F65P3 корпус 1354 Canature HY',
        saltTank: 'Бак солевой 70 л.',
        srcImg: 'v9.jpeg',
    },
    {
        filter: 'Фильтр дисковый Jimten 3/4" 100 мкм',
        softenerModule: 'Комплект умягчителя F65P3 корпус 1465 Canature HY',
        saltTank: 'Бак солевой 70 л.',
        srcImg: 'v10.jpeg',
    },

    {
        cosultation: 'Проконсультируйтесь со специалистом',
    },
];

const firstRangeIronMin = 0.3;
const firstRangeIronMax = 8;

const secondRangeIronMin = 8;
const secondRangeIronMax = 20;

const phMin = 6;
const phMax = 9;

const totalHardnessMin = 2;
const totalHardnessMax = 15;

const ironMin = 0.3;
const ironMax = 20;

const permanganateIndexMin = 0;
const permanganateIndexMax = 5;

const manganeseMin = 0;
const manganeseMax = 5;

const colorIntensityMin = 0;
const colorIntensityMax = 500;

const turbidityMin = 0;
const turbidityMax = 200;

const requestButton = document.querySelector('.equipment__button');

requestButton.addEventListener('click', goToRequestForm);
function goToRequestForm() {
    appState.selectedAction = typeOfPages.findIndex((item) => {
        return item === 'contact';
    });
    renderPage(appState.selectedAction);
    appState.selectedAction = null;
}
export function selectVariant(userData) {
    const parameters = userData.parameters;
    const isSulfide = findBooleanParameterValue(parameters, 'isSulfide');
    const phValue = findParameterValue(parameters, 'ph');
    const totalHardnessValue = findParameterValue(parameters, 'totalHardness');
    const ironValue = findParameterValue(parameters, 'iron');
    const permanganateIndexValue = findParameterValue(
        parameters,
        'permanganateIndex'
    );
    const manganeseValue = findParameterValue(parameters, 'manganese');
    const colorIntensityValue = findParameterValue(
        parameters,
        'colorIntensity'
    );
    const turbidityValue = findParameterValue(parameters, 'turbidity');

    const residentsCount = userData.residentsCount;

    // Проверка диапазонов параметров
    if (
        !(phMin < phValue && phValue < phMax) ||
        !(
            totalHardnessMin < totalHardnessValue &&
            totalHardnessValue < totalHardnessMax
        ) ||
        !(ironMin < ironValue && ironValue < ironMax) ||
        !(
            permanganateIndexMin < permanganateIndexValue &&
            permanganateIndexValue < permanganateIndexMax
        ) ||
        !(manganeseMin < manganeseValue && manganeseValue < manganeseMax) ||
        !(
            colorIntensityMin < colorIntensityValue &&
            colorIntensityValue < colorIntensityMax
        ) ||
        !(turbidityMin < turbidityValue && turbidityValue < turbidityMax)
    ) {
        return 10;
    }

    // Проверка значения железа в пределах firstRangeIronMin и firstRangeIronMax
    if (firstRangeIronMin <= ironValue && ironValue < firstRangeIronMax) {
        if (isSulfide === 'No') {
            if (residentsCount === 1 || residentsCount === 2) return 0;
            if (residentsCount === 3 || residentsCount === 4) return 2;
            if (residentsCount === 5 || residentsCount === 6) return 4;
            if (residentsCount > 6) return 10;
        } else if (isSulfide === 'Yes') {
            if (residentsCount === 1 || residentsCount === 2) return 1;
            if (residentsCount === 3 || residentsCount === 4) return 3;
            if (residentsCount === 5 || residentsCount === 6) return 5;
            if (residentsCount > 6) return 10;
        }
    }

    // Проверка значения железа в пределах firstRangeIronMin и firstRangeIronMax
    if (secondRangeIronMin < ironValue && ironValue < secondRangeIronMax) {
        if (isSulfide === 'No') {
            if (residentsCount === 1 || residentsCount === 2) return 6;
            if (residentsCount === 3 || residentsCount === 4) return 7;
            if (residentsCount === 5 || residentsCount === 6) return 8;
            if (residentsCount > 6) return 9;
        } else if (isSulfide === 'Yes') {
            return 10;
        }
    }
    // Проверка значения железа в пределах secondRangeIronMin и secondRangeIronMax

    // Если ни одно условие не выполнено, возвращаем -1 или другое значение по умолчанию
    return -1;
}

function findParameterValue(parameters, paramName) {
    const parameter = parameters.find((param) => param.name === paramName);
    return parameter ? parameter.value : null;
}

function findBooleanParameterValue(parameters, paramName) {
    const parameter = parameters.find((param) =>
        param.hasOwnProperty(paramName)
    );
    return parameter ? parameter[paramName] : null;
}

export function displayOffer() {
    console.log(userWaterQualityData);
    const variant = setVariant();
    console.log(variant);
    const equipmentList = document.querySelector('.equipment__list');
    const img = equipmentList.previousElementSibling;

    const variantObjectKeys = Object.entries(variant);
    console.log(variantObjectKeys);
    console.log(variant);

    img.src = `${import.meta.env.BASE_URL}/${variantObjectKeys[3][1]}`;
    equipmentList.innerHTML = `<li>1. ${variantObjectKeys[0][1]}</li>
		<li>2. ${variantObjectKeys[1][1]}</li>
		<li>3. ${variantObjectKeys[2][1]}</li>`;

    console.log(img);
}

export function setVariant() {
    return variation[selectVariant(userWaterQualityData)];
}

console.log('Script loaded');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    const form = document.getElementById('applicationForm');
    if (form) {
        console.log('Form found');
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            console.log('Form submit event prevented');

            // Получение значений инпутов
            const name = document.getElementById('contactName').value;
            const phone = document.getElementById('contactPhone').value;
            console.log('Name:', name, 'Phone:', phone);

            userWaterQualityData.user = {
                name: name,
                phone: phone,
            };

            console.log('UserWaterQualityData:', userWaterQualityData);
        });
    } else {
        console.log('Form not found');
    }
});
