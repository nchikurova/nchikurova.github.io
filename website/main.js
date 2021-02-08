const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
})

// const secondSection = document.getElementsByClassName('second-section')[0]
// const projectsButton = document.getElementsByClassName('projects-button')[0]

// projectsButton.addEventListener('click', () => {
//     secondSection.classList.toggle('active')
// })
