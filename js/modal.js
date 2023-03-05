const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');

const details = document.querySelector('details');

const question_header = document.getElementById('question_header');
const question_body = document.getElementById('question_body');
const question_solution = document.getElementById('solution');

/**
 * Displays the modal a.k.a. the question prompt.
 *
 * @param {object} question A JSON entry containing question data
 */
export function open(question) {

    modal.classList.add('active');
    overlay.classList.add('active');

    question_header.textContent = `${question.Category} - $${question.Value}`;
    question_body.textContent = question.Question;
    question_solution.textContent = question.Answer;
}


/**
 * Closes the modal window.
 */
export function close() {

    // Hide answer dropdown
    details.open = false;

    modal.classList.remove('active');
    overlay.classList.remove('active');
}
