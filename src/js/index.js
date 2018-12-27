import '../style/main.scss';

//___Array with all the box elements
const elArr = document.querySelectorAll('.box__content');
const elHeadingArr = document.querySelectorAll('.box__heading');
const btnCloseArr = document.querySelectorAll('.box__btn-close');
const contentInfoArr = document.querySelectorAll('.box__info');
// Square decoration array
const decorArr = document.querySelectorAll('.decoration');


// SetTimeout functions for the info section to show with delay or to clearTimeout.
let infoField;
function showInfo(el){
    infoField = setTimeout(function(){
        el.classList.add('show-info');
        // Adding a function to the shown element to stop bubbling from click events on window
        const shownElement = document.querySelector('.show-info');
        shownElement.addEventListener('click', (e)=> {
            e.stopPropagation();
        });
    }, 700);
}
function stopShowInfo(){
    clearTimeout(infoField);
}

// Click events on sections heading to add the modifiers
elHeadingArr.forEach(function(el){
    el.addEventListener('click', function(e){
        // Stopping the bubbling effect from click event on window to remove all modifier classes
        e.stopPropagation();
        // Prevents more than one click on element
        if(e.detail > 1){
            return;
        }
        // Get the parent element of the target which will be modified
        const targetEl = e.target;
        const targetParent = targetEl.parentElement.parentElement;
        // Get the name atributue of the element for further use
        const elName = targetParent.getAttribute('name');

        // If any other sections are oppened close all of them if clicked on other section
        if(targetParent.classList == `${elName}__content box__content`){
            removeModifiers(elHeadingArr);
        }
        addModifiers(el);
        
    })
});
//___Add all modifiers
function addModifiers(el){
        const elParent = el.parentElement.parentElement;
        const elName = elParent.getAttribute('name');
        const elSibling = el.parentElement.nextElementSibling;
        const elCloseBtn = el.nextElementSibling;

        elParent.classList.add(`${elName}__full-screen`, `in-front`);
        elCloseBtn.classList.add('btn-show');
        
        showInfo(elSibling);      
}

//___Remove all modifiers from all section and elements;
function removeModifiers (arr){
    arr.forEach(function(el){
        stopShowInfo();
        const elParent = el.parentElement.parentElement;
        const elName = elParent.getAttribute('name');
        const elSibling = el.parentElement.nextElementSibling;
        const elCloseBtn = el.nextElementSibling;

        elCloseBtn.classList.remove('btn-show');
        elParent.classList.remove(`${elName}__full-screen`, `in-front`);
        elSibling.classList.remove('show-info');
    });
};

// Add click events to the close button to close the section
btnCloseArr.forEach(function(el){
    el.addEventListener('click',function(){
        removeModifiers(elHeadingArr);
    });
});

//___ESC button press to take away modifier classes
window.addEventListener('keydown', function(e){
    if(e.keyCode === 27){
        stopShowInfo();
        removeModifiers(elHeadingArr);
    };
});
window.addEventListener('click', ()=>{
    removeModifiers(elHeadingArr);
})

//________________________________________________________________________________________________
//__________________________________DECORATIONS_______________________________________________
function decorMove(){
    document.addEventListener('mousemove', function(e){
        let xCord = e.clientX;
        let yCord = e.clientY;
        
        decorArr.forEach(function(el, index){
            if(el.classList.contains('decor-spinning')){
                let rotateCord = (xCord + yCord) / 50 * (index + 1);
                el.style.transform = `rotate(${rotateCord}deg)`;
            } 
        });
    });  
};

// ON LOAD EVENTS ADD ALL TO ONE
window.addEventListener('load', function(){
    // Stop decorations mousemove effects at lower than 600px screenwidth
    if(window.innerWidth > 900){
            decorArr.forEach(decor => {
                decor.classList.add('decor-spinning');
            });
        }
     // Call the decoration effect function on load
     decorMove();

    // Content boxes apearing one after the other on page load
    const boxArr = document.querySelectorAll('.box');  
    boxArr.forEach(function(el, index){
        setTimeout(() => {
            el.style.opacity = '1';
        }, 200 * index);
    });
    // Decorations apearing after some time
    setTimeout(() => {
        decorArr.forEach(function(el){
            el.style.opacity = '1';
        })
    }, 1400);
});

// Window events on resize
window.addEventListener('resize', () => {
       if(window.innerWidth <= 900 ){
            decorArr.forEach(decor => {
                decor.classList.remove('decor-spinning');
                decor.style.transform = 'rotate(0deg)';
            });
       } else {
            decorArr.forEach(decor => {
                decor.classList.add('decor-spinning');
            });
       }
});

//________________________________________________________________________________________________
// CONTACTS HOVER EFFECT
const contactsLinks = document.querySelectorAll('.contacts a');
const contactsIcons = document.querySelectorAll('.contacts__icon');

contactsLinks.forEach(function(el, index){
    el.addEventListener('mouseover', function(){
        contactsIcons[index].style.color = 'var(--color-4-dark)';
    })
    el.addEventListener('mouseout', function(){
        contactsIcons[index].style.color = 'var(--color-primary)';
    })
});

//________________________________________________________________________________________________
// UNIQUE SCROLL BAR 
// const infoCube = document.getElementById('skills__ul-cube');
// const scrollBar = document.querySelector('.skills__scrollbar--inside');

// if(infoCube){
//     infoCube.addEventListener('scroll', () => {
//         let elScrollTop = infoCube.scrollTop;
//         const elHeight = infoCube.scrollHeight - infoCube.clientHeight;
//         let scrolled = (elScrollTop / elHeight) * 100;
        
//         scrollBar.style.height = `${scrolled}%`;
    
//         //___Cancel animation when parent is scrolled
//         if(elScrollTop > 20){
//             const arrowArr = document.querySelectorAll('.skills__arrow');
//             arrowArr.forEach(function(arrow){
//                 arrow.style.animation = "none";
//             })
//         }
//     });
// }

// dynamic unique scroll NOT FINISHED (so far this is a scrollbar for projects(applications))
// const projectsContent = document.querySelector('.projects__container');
// const myScrollBar = document.querySelector('.my-scrollbar__inside');

// let scrollBarTest;

// if(projectsContent){
//     projectsContent.addEventListener('scroll', () => {
//         let projectsContentScrollTop = projectsContent.scrollTop;
//         const projectsContentHeight = projectsContent.scrollHeight - projectsContent.clientHeight;
//         let scrolled = (projectsContentScrollTop / projectsContentHeight) * 100;
    
//         myScrollBar.style.height = `${scrolled}%`;
//         if(projectsContentScrollTop > 20){
//             const arrowArr = document.querySelectorAll('.my-arrow__arrow');
//             arrowArr.forEach(function(arrow){
//                 arrow.style.animation = "none";
//             })
//         }
//     })
// }
