/*
Created by: Chris Orr
Created: April 2023
*/

/*
Json for all website details:
interests: 0
values: 1
schools: 2
employers: 3
publications: 4
presentations: 5
experiences: 6
recognitions: 7
citations: 8
*/

/* Imports */


/* Constants */

const keyAuthor = "Orr";
const requestURL = 'js/json/details.json';
const request = new Request(requestURL);

/* Initial function to trigger all calls.  */
function populate(){
    populateDetails();
}


/* Main function to retrieve json with details for the website  */
async function populateDetails(){

    const response = await fetch(request);
    const details = await response.json();

/* Calling all the functions to populate the website sections  */
    
    if(document.title.includes("Education")){
        populateEducation(details);
    } else if(document.title.includes("Employment")){
        populateEmployment(details);
    } else if(document.title.includes("Publications")){
        populatePublications(details);
    } else if(document.title.includes("Presentations")){
        populatePresentations(details);
    } else if(document.title.includes("Experience")){
        populateExperience(details);
    } else if(document.title.includes("Recognitions")){
        populateRecognitions(details);
    } else {
        populateInterests(details);
        populateValues(details);
        populateEducation(details);
        populateEmployment(details);
        populatePublications(details);
        populatePresentations(details);
        populateExperience(details);
        populateRecognitions(details);
    }
}

/* Function to populate the Interests section of the website. Looks for ID=interestCards  */
function populateInterests(obj) {
    const sectionInterests = document.querySelector("#interestCards");

    for (const interest of obj[0].interests) {

        const myInterest = document.createElement('div');
        myInterest.classList.add("col-12", "col-sm-4", "pb-5", "mx-auto");
        myInterest.style = "margin-top:30px"
        
        const myFigure = document.createElement('figure');
        myFigure.classList.add("interests-card");
        
        const img = document.createElement('img');
        img.src = "";
        img.alt = "";
        img.classList.add("interests-card_image");

        myFigure.appendChild(img);

        const caption = document.createElement('figcaption');
        caption.classList.add("interests-card_body");

        const myH3 = document.createElement('h3');
        myH3.classList.add("interests-card_title");
        myH3.innerText = interest.title;
        caption.appendChild(myH3);
/*
        const myP = document.createElement('p');
        myP.classList.add("interests-card_description");
        caption.appendChild(myP);
*/
        myFigure.appendChild(caption);
        myInterest.appendChild(myFigure);

        sectionInterests.appendChild(myInterest);
 
    }
}
/* Function to populate the Values section of the website. Looks for ID=valueCards  */
function populateValues(obj) {
    const sectionValues = document.querySelector("#valueCards");

    for (const value of obj[1].values) {

        const myValue = document.createElement('div');
        myValue.classList.add("col-12", "col-sm-4", "pb-5", "mx-auto");
        
        const myFeaturette = document.createElement('div');
        myFeaturette.classList.add("featurette-icon");
        
        const myIcon = document.createElement('i');
        myIcon.classList.add("fa-solid");
        myIcon.classList.add(value.icon);

        myFeaturette.appendChild(myIcon);
        myValue.appendChild(myFeaturette);

        const myH3 = document.createElement('h3');
        myH3.innerText = value.title;
        myValue.appendChild(myH3);

        sectionValues.appendChild(myValue);
 
    }
}
/* Function to populate the Education section of the website. Looks for ID=educationCards  */
function populateEducation(obj) {
    const sectionEducation = document.querySelector("#educationCards");

    for (const school of obj[2].schools) {
        if((!document.title.includes("Education") && school.show=="main") || (document.title.includes("Education") && (school.show=="main" || school.show=="yes"))){
            const myEducation = document.createElement('div');
            myEducation.classList.add("row", "experience");
            
            const mySidePanel = document.createElement('div');
            mySidePanel.classList.add("col-auto", "text-center", "flex-column", "d-none", "d-sm-flex");
            
            const mySpacing = document.createElement('div');
            mySpacing.classList.add("row", "h-50");

            const myIconArea = document.createElement('div');
            myIconArea.classList.add("featurette-icon")

            const myIcon = document.createElement('i');
            myIcon.classList.add("fa-solid", "fa-user-graduate");
            myIconArea.appendChild(myIcon);

            const mySpacing2 = document.createElement('div');
            mySpacing2.classList.add("row", "h-50");

            mySidePanel.appendChild(mySpacing);
            mySidePanel.appendChild(myIconArea);
            mySidePanel.appendChild(mySpacing2);


            const myDegrees = document.createElement('div');
            myDegrees.classList.add("col", "py-2");

            const myCard = document.createElement('div');
            myCard.classList.add('card');

            const myCardBody = document.createElement('div');
            myCardBody.classList.add('card-body');

            const myTitle = document.createElement('div');
            myTitle.classList.add("section-subheading", "card-title", "exp-title", "text-muted", "my-0");
            myTitle.innerText = school.degree;

            const myLoc = document.createElement('div');
            myLoc.classList.add("section-subheading", "card-title", "exp-company", "text-muted", "my-0");
            myLoc.innerText = school.facility

            const myDate = document.createElement('div');
            myDate.classList.add("text-muted", "exp-meta");
            myDate.innerText = school.date;

            const mySpan = document.createElement('span');
            mySpan.classList.add("middot-divider");

            const myCity = document.createElement('span');
            myCity.innerText = school.city;

            myDate.appendChild(mySpan);
            myDate.appendChild(myCity);

            const myDesc = document.createElement('div');
            myDesc.classList.add("card-text");
            myDesc.innerHTML = school.text;

            myCardBody.appendChild(myTitle);
            myCardBody.appendChild(myLoc);
            myCardBody.appendChild(myDate);
            myCardBody.appendChild(myDesc);

            myCard.appendChild(myCardBody);
            myDegrees.appendChild(myCard);

            myEducation.appendChild(mySidePanel);
            myEducation.appendChild(myDegrees);

            sectionEducation.appendChild(myEducation);
        }
    }
}
/* Function to populate the Employment section of the website. Looks for ID=employmentCards  */
function populateEmployment(obj) {
    const sectionEmployment = document.querySelector("#employmentCards");

    var count = 0;
    for (const employer of obj[3].employers) {
        if((!document.title.includes("Employment") && employer.show=="main") || (document.title.includes("Employment") && (employer.show=="main" || employer.show=="yes"))){
            const myEmployment = document.createElement('div');
            myEmployment.classList.add("row", "experience");
            
            /* create reusable constants */ 
            const myBlank = document.createElement('div');
            myBlank.classList.add("col");
            myBlank.innerHTML = "&nbsp;";

            const myLine = document.createElement('div');
            myLine.classList.add("col", "border-right");
            myLine.innerHTML = "&nbsp;";

            const myFilledIcon = document.createElement('span');
            myFilledIcon.classList.add("badge", "badge-pill", "border", "exp-fill");
            myFilledIcon.innerHTML = "&nbsp;";

            const myEmptyIcon = document.createElement('span');
            myEmptyIcon.classList.add("badge", "badge-pill", "border");
            myEmptyIcon.innerHTML = "&nbsp;";
            
            /* determine what sidebar to use */
            if (count == 0){
            /* case: first employment (active) */

            var mySidePanel = document.createElement('div');
            mySidePanel.classList.add("col-auto", "text-center", "flex-column", "d-none", "d-sm-flex");
            
            const mySpacingTop = document.createElement('div');
            mySpacingTop.classList.add("row", "h-50");
            mySpacingTop.append (myBlank.cloneNode(true), myBlank.cloneNode(true));

            const myIconArea = document.createElement('div');
            myIconArea.classList.add("m-2");
            myIconArea.appendChild(myFilledIcon.cloneNode(true));

            const mySpacingBottom = document.createElement('div');
            mySpacingBottom.classList.add("row", "h-50");
            mySpacingBottom.append(myLine.cloneNode(true), myBlank.cloneNode(true));

            mySidePanel.append(mySpacingTop, myIconArea, mySpacingBottom);


            } else if (count == (obj[3].employers.length - 1)) {
            /* case: last employment */

            var mySidePanel = document.createElement('div');
            mySidePanel.classList.add("col-auto", "text-center", "flex-column", "d-none", "d-sm-flex");
            
            const mySpacingTop = document.createElement('div');
            mySpacingTop.classList.add("row", "h-50");
            mySpacingTop.append(myLine.cloneNode(true), myBlank.cloneNode(true));

            const myIconArea = document.createElement('div');
            myIconArea.classList.add("m-2");
            myIconArea.appendChild(myEmptyIcon.cloneNode(true));

            const mySpacingBottom = document.createElement('div');
            mySpacingBottom.classList.add("row", "h-50");
            mySpacingBottom.append(myBlank.cloneNode(true), myBlank.cloneNode(true));

            mySidePanel.append(mySpacingTop, myIconArea, mySpacingBottom);

            } else {
            /* all other employments */

            var mySidePanel = document.createElement('div');
            mySidePanel.classList.add("col-auto", "text-center", "flex-column", "d-none", "d-sm-flex");
            
            const mySpacingTop = document.createElement('div');
            mySpacingTop.classList.add("row", "h-50");
            mySpacingTop.append(myLine.cloneNode(true), myBlank.cloneNode(true));

            const myIconArea = document.createElement('div');
            myIconArea.classList.add("m-2");
            myIconArea.appendChild(myEmptyIcon.cloneNode(true));

            const mySpacingBottom = document.createElement('div');
            mySpacingBottom.classList.add("row", "h-50");
            mySpacingBottom.append(myLine.cloneNode(true), myBlank.cloneNode(true));

            mySidePanel.append(mySpacingTop, myIconArea, mySpacingBottom);

            }

            const myMainSection = document.createElement('div');
            myMainSection.classList.add("col", "py-2");

            const myCard = document.createElement('div');
            myCard.classList.add('card');

            const myCardBody = document.createElement('div');
            myCardBody.classList.add("card-body", "d-flex", "align-content-start", "exp-title", "text-muted", "my-0");

            const myCardSection = document.createElement('div');

            const myTitle = document.createElement('div');
            myTitle.classList.add("section-subheading", "card-title", "exp-title", "text-muted", "my-0");
            myTitle.innerText = employer.title;

            const myCompany = document.createElement('div');
            myCompany.classList.add("section-subheading", "card-title", "exp-company", "text-muted", "my-0");
            myCompany.innerText = employer.company;

            const myLoc = document.createElement('div');
            myLoc.classList.add("section-subheading", "card-title", "exp-company", "text-muted", "my-0");
            myLoc.innerText = employer.location;

            const myDate = document.createElement('div');
            myDate.classList.add("text-muted", "exp-meta");
            myDate.innerText = employer.date;

            const mySpan = document.createElement('span');
            mySpan.classList.add("middot-divider");

            const myCity = document.createElement('span');
            myCity.innerText = employer.city;

            myDate.append(mySpan, myCity);

            myCardSection.append(myTitle, myCompany, myLoc, myDate);

            myCardBody.appendChild(myCardSection);

            myCard.appendChild(myCardBody);
            myMainSection.appendChild(myCard);

            
            myEmployment.appendChild(mySidePanel);
            myEmployment.appendChild(myMainSection);

            sectionEmployment.appendChild(myEmployment);
    
            count++;
        }
    }
}
/* Function to populate the Publications section of the website. Looks for ID=publicationCards  */
function populatePublications(obj) {
    const sectionPublications = document.querySelector("#publicationCards");
    const citations = obj[8].citations;

    for (const publication of obj[4].publications) {
        if((!document.title.includes("Publications") && publication.show=="main") || (document.title.includes("Publications") && (publication.show=="main" || publication.show=="yes"))){
            const myPublication = document.createElement('div');
            myPublication.classList.add("pub-list-item");
            
            const myPubIcon = document.createElement('i');
            myPubIcon.classList.add("far", "fa-file-alt", "pub-icon");
            myPublication.appendChild(myPubIcon);

            const mySpanClass = document.createElement('span');
            mySpanClass.classList.add("article-metadata", "li-cite-author");
            myPublication.appendChild(mySpanClass);

                var count = 0;
                const maxCount = publication.authors.length;
            
                for(const author of publication.authors){
                    
                    count++;
                    const mySpan = document.createElement('span');
                    var boldName = author.name;

                    if(count == maxCount){
                        boldName = boldName + " ";
                    } else {
                        boldName = boldName + "; ";
                    }
                    if (boldName.includes(keyAuthor)){
                        const myBold = document.createElement('b');
                        myBold.textContent = boldName;
                        mySpan.appendChild(myBold);
                    } else {
                        mySpan.textContent = boldName;
                    }
                    

                    myPublication.appendChild(mySpan);
                }
            const myYear = document.createElement('a');
            myYear.textContent = " (" + publication.year + "). ";
            myPublication.appendChild(myYear);

            const myPub = document.createElement('a');
            myPub.href = publication.article_link;
            myPub.target="_blank";
            myPub.innerText = publication.article + " ";
            myPublication.appendChild(myPub);

            const myNewEm = document.createElement('em');
            myNewEm.textContent = publication.journal;
            myPublication.appendChild(myNewEm);

            const myPara = document.createElement('p');
            const myCite = myPara.appendChild(document.createElement('a'));
            myCite.href = '#';
            myCite.setAttribute("data-modal",".id"+ publication.pmid);
            myCite.classList.add("btn", "btn-outline-primary", "btn-page-header", "btn-sm");
            
            myCite.addEventListener("click", event => {
                event.preventDefault();
                var myCitation = citations.filter(a => a.pmid === publication.pmid);
                let data = "@" + myCitation[0].type + "{" + myCitation[0].pmid + ",<br>" 
                    + "AUTHOR = " + myCitation[0].author + ",<br>"
                    + "TITLE = " + myCitation[0].title + ", <br>"
                    + "YEAR = " + myCitation[0].year + ", <br>"
                    + "JOURNAL = " + myCitation[0].journal + ", <br>";
                    if (myCitation[0].volume != null){
                        data = data + "VOLUME = " + myCitation[0].volume + ", <br>";
                    };
                    if (myCitation[0].issue != null){
                        data = data + "ISSUE = " + myCitation[0].issue + ", <br>";
                    };
                    if (myCitation[0].pages != null){
                        data = data + "PAGES = " + myCitation[0].pages + ", <br>"
                    };
                    data = data + "}";


                let modal = new Modal({ 
                    //element: myCite,
                    effect: 'zoom', // zoom|slide
                    size: 'medium', // small|medium|large|full
                    id: publication.pmid,
                    title: 'Citation - ' + publication.pmid,
                    content: data,
/*
                    onOpen: function() {
                        console.log('modal open');
                    },
                    onClose: function() {
                        console.log('modal closed');
                    }
*/
                });
                         
                modal.open();
            });
            myCite.innerHTML = "Cite";
            myPara.appendChild(myCite);
            myPublication.appendChild(myPara);

            sectionPublications.appendChild(myPublication);
        }   
    }

}
/* Function to populate the Presentation section of the website. Looks for ID=presentationCards  */
function populatePresentations(obj) {
    const sectionPresentations = document.querySelector("#presentationCards");
    
    for (const presentation of obj[5].presentations) {
        if((!document.title.includes("Presentations") && presentation.show=="main") || (document.title.includes("Presentations") && (presentation.show=="main" || presentation.show=="yes"))){
            const myPresentation = document.createElement('div');
            myPresentation.classList.add("pub-list-item", "exp-box");
            myPresentation.style = "margin:20px";

            const myTitleRow = document.createElement('div');
            myTitleRow.classList.add("row");

            
            const myTitle = document.createElement('a');
            myTitle.href = presentation.link;
            myTitle.target= "_blank";
            myTitle.innerText = presentation.conference;
            myTitle.style = "padding-left:15px";
            myTitleRow.appendChild(myTitle);
            myPresentation.appendChild(myTitleRow);
            
            const myRow = document.createElement('div');
            myRow.classList.add("row");

            const myDescCol = document.createElement('div');
            myDescCol.classList.add('col-8');

            const myTypeSpan = document.createElement('span');
            myTypeSpan.style = "font-weight: bold";
            myTypeSpan.innerText = presentation.type + " Presentation";
            myDescCol.appendChild(myTypeSpan);

            const myTypePara = document.createElement('p');
            myTypePara.innerHTML = presentation.title;
            const myNotePara = document.createElement('p');
            myNotePara.classList.add("award");
            myNotePara.innerText = presentation.notes;
            myDescCol.append(myTypePara, myNotePara);
            myRow.appendChild(myDescCol);

            const myLocCol = document.createElement('div');
            myLocCol.classList.add('col-4', 'text-center');

            const myDate = document.createElement('p');
            myDate.classList.add("mb-0")
            myDate.innerText = presentation.date;

            myLocCol.appendChild(myDate);

            const myMidDot = document.createElement('i');
            myMidDot.classList.add("fa-solid", "fa-ellipsis");
            myLocCol.appendChild(myMidDot);
            
            const myLoc = document.createElement('p');
            myLoc.innerText = presentation.location;
            
            myLocCol.appendChild(myLoc);

            myRow.appendChild(myLocCol);
            
            myPresentation.appendChild(myRow);

            sectionPresentations.appendChild(myPresentation);


        }
    }
}
/* Function to populate the Experience section of the website. Looks for ID=experienceCards  */
function populateExperience(obj) {
    const sectionExperiences = document.querySelector("#experienceCards");

    for (const experience of obj[6].experiences) {
        if((!document.title.includes("Experience") && experience.show=="main") || (document.title.includes("Experience") && (experience.show=="main" || experience.show=="yes"))){
            const myExperience = document.createElement('div');
            myExperience.classList.add("media", "stream-item", "exp-box");
           
            const myMedia = document.createElement('div');
            myMedia.classList.add("media-body");
            
            
            const myDiv = document.createElement('div');
            myDiv.classList.add("section-subheading", "article-title", "mb-0", "mt-0")
            myMedia.appendChild(myDiv);


            const myExperienceTitle = document.createElement('a');
            myExperienceTitle.href = experience.link;
            myExperienceTitle.target="_blank";
            myExperienceTitle.innerText = experience.title + " ";
            myMedia.appendChild(myExperienceTitle);
/*
            const myExpDate = document.createElement('span');
            myExpDate.style = "float: right", "font-size: .8rem";
            myExpDate.innerText = experience.date + " | " + experience.city
            myMedia.appendChild(myExpDate);
*/
            const myExperienceCompany = document.createElement('div');
            myExperienceCompany.classList.add("article-style");
            myExperienceCompany.textContent = experience.company;
            const myExperienceLocation = document.createElement('p');
            myExperienceLocation.textContent = experience.location;
            myExperienceCompany.appendChild(myExperienceLocation);
            const myExperienceDate = document.createElement('p');
            myExperienceDate.innerText = experience.date + " | " + experience.city;
            myExperienceCompany.appendChild(myExperienceDate);
            myMedia.appendChild(myExperienceCompany);

            const myExperienceText = document.createElement('div');
            myExperienceText.classList.add("article-style");
            myExperienceText.textContent = experience.text;
            myMedia.appendChild(myExperienceText);



            myExperience.appendChild(myMedia);


            sectionExperiences.appendChild(myExperience);
        }   
    }
}
/* Function to populate the Recognitions section of the website. Looks for ID=recognitionCards  */
function populateRecognitions(obj) {
    const sectionRecognitions = document.querySelector("#recognitionCards");

    for (const recognition of obj[7].recognitions) {
        if((!document.title.includes("Recognitions") && recognition.show=="main") || (document.title.includes("Recognitions") && (recognition.show=="main" || recognition.show=="yes"))){
            const myRecognition = document.createElement('div');
            myRecognition.classList.add("card", "experience", "course");
           
            const myCard = document.createElement('div');
            myCard.classList.add("card-body");
            
            
            const myDiv = document.createElement('div');
            myDiv.classList.add("section-subheading", "card-title", "exp-title", "text-muted", "mt-0")
            myDiv.innerText = recognition.title;
            myCard.appendChild(myDiv);


            const myKudoBody = document.createElement('div');
            myKudoBody.classList.add("card-subtitle", "my-0", "article-metadata");

            const myKudoOrg = document.createElement('a');
            myKudoOrg.href = recognition.link;
            myKudoOrg.target="_blank";
            myKudoOrg.innerText = recognition.organization + " ";
            myKudoBody.appendChild(myKudoOrg);

            const mySpan = document.createElement('span');
            mySpan.classList.add("fa-solid", "fa-ellipsis-vertical");
            myKudoBody.appendChild(mySpan);
            
            const myDate = document.createElement('span');
            myDate.innerText = " " + recognition.date;
            myKudoBody.appendChild(myDate);

            myCard.appendChild(myKudoBody);

            myRecognition.appendChild(myCard);

            sectionRecognitions.appendChild(myRecognition);
        }   
    }
}

/* Smooth Scrolling */
window.onload=function(){
    document.getElementById('navigation').addEventListener('click', function (e) {
        e.preventDefault();
        const target = e.target;
        if (target.classList.contains('nav-link')) {
            const id = target.getAttribute('href').slice(1);
            document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
        }
    });
}

function todayDate(){
    var d = new Date();
    var n = d.getFullYear() + "  ";
    return document.getElementById("date").innerHTML = n;
}

