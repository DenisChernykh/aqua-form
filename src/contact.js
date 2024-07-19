import { userWaterQualityData } from './constants';
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
