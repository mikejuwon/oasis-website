


const homepage = (req, res) => {
    res.render('pages/index', { title: 'Home Page' });
}

const about = (req, res) => {
    res.render('about', { title: 'About Page' });
}

const contact = (req, res) => {
    res.render('contact', { title: 'Contact Page' });
}


module.exports = {
    homepage, about, contact
}