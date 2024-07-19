export function addShakeAnimation(input) {
    input.classList.add('shake');
    setTimeout(() => {
        input.classList.remove('shake');
    }, 500);
}
