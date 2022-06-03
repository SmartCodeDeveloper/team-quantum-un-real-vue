/**
* Module dependencies.
*/

export function render({user}, res) {
    res.render('index', {
        user: user ? JSON.stringify(user) : 'null'
    });
}