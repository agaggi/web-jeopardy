import * as Modal from './modal.js';
import * as Question from './questions.js';

/**
 * Takes the content collected from the JSON dataset and creates the gameboard.
 *
 * @param {string[]} instance_categories The randomly selected categories
 * @param {object[]} questions The randomly selected questions for each category
 */
function draw_content(instance_categories, questions) {

    let category_grid = document.querySelector('.category_grid');
    let question_grid = document.querySelector('.question_grid');

    // Display the category names in the top row
    for (let category of instance_categories) {

        let category_div = document.createElement('div');

        category_div.className = 'category_title';
        category_div.textContent = category;

        category_grid.appendChild(category_div);
    }

    // Main body of the game
    for (let question of questions) {

        let question_btn = document.createElement('button');

        question_btn.className = 'question';
        question_btn.dataset.answer = question.Answer;
        question_btn.textContent = `$${question.Value}`;

        question_btn.addEventListener('click', (event) => {

            event.preventDefault();

            active_button = question_btn;
            Modal.open(question);
        });

        question_grid.appendChild(question_btn);
    }
}


let active_button;
const question_submit_btn = document.getElementById('submit_btn');

question_submit_btn.addEventListener('click', () => {

    Question.check_answer(active_button);
    Modal.close();
});

fetch('./data/jeopardy_clean.json')
    .then((response) => response.json())
    .then((json) => {

        // Get all unique categories
        const categories = [...new Set(json.map((entry) => entry.Category))];
        const instance_categories = [];

        // Getting the 6 random categories for this game instance
        while (instance_categories.length < 6) {

            const rand_index = Math.floor(Math.random() * categories.length);

            if (!instance_categories.includes(categories[rand_index])) {

                instance_categories.push(categories[rand_index]);
            }
        }

        // Getting questions for each of the instance's categories
        const questions = [];

        for (let category of instance_categories) {

            questions.push(Question.get_random(json, category, 200));
            questions.push(Question.get_random(json, category, 400));
            questions.push(Question.get_random(json, category, 600));
            questions.push(Question.get_random(json, category, 800));
            questions.push(Question.get_random(json, category, 1000));
        }

        // Make placing questions in a HTML grid easier
        questions.sort((a, b) => a.Value - b.Value);

        draw_content(instance_categories, questions);
    });
