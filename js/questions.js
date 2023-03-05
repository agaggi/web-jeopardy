/**
 * Gets a random question based of the criteria provided (category & value).
 *
 * @param {object[]} json_data The JSON dataset
 * @param {string} category The category of which we want a question for
 * @param {number} value The value (i.e. $200) of which we want a question for
 *
 * @returns A question that fits the desired criteria
 */
export function get_random(json_data, category, value) {

    const selection = json_data.filter((entry) => {

        return entry.Value === value && entry.Category === category
    });
    const rand_index = Math.floor(Math.random() * selection.length);

    return selection[rand_index];
}


/**
 * Checks whether the provided answer is correct. If so, the button is disabled and
 * turned green.
 *
 * @param {HTMLElement} active_button The question button that was clicked
 */
export function check_answer(active_button) {

    const answer = document.getElementById('answer').value.toLowerCase();

    if (answer === active_button.dataset.answer.toLowerCase()) {

        active_button.style.background = '#008040';
        active_button.disabled = true;
    }

    document.getElementById('answer').value = '';
}
