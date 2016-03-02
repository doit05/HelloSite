var fortueCookies = [
    'Conquer your fears or they will Conquer you.',
    'Rivers need spring.',
    'Do not fear with you don\'t know',
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple"
];

exports.getFortue = function(){
    var idx = fortueCookies[Math.floor(Math.random() * fortues.length)];
    return idx;
};
