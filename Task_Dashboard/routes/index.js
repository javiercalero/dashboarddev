"use strict";
function index(req, res) {
    res.render('index', { title: 'Express', year: new Date().getFullYear() });
}
exports.index = index;
;
function about(req, res) {
    res.render('about', { title: 'About', year: new Date().getFullYear(), message: 'Your application description page' });
}
exports.about = about;
;
function contact(req, res) {
    res.render('contact', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page' });
}
exports.contact = contact;
;
function tasklist(req, res) {
    res.render('tasklist', { title: 'Task List', year: new Date().getFullYear(), message: 'All tasks' });
}
exports.tasklist = tasklist;
;
//# sourceMappingURL=index.js.map