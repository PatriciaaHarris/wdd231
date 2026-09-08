javascript
const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        completed: false
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 2,
        completed: false
    }
];

const courseContainer = document.querySelector("#course-container");
const totalCredits = document.querySelector("#total-credits");

const allCoursesButton = document.querySelector("#all-courses");
const wddCoursesButton = document.querySelector("#wdd-courses");
const cseCoursesButton = document.querySelector("#cse-courses");

function displayCourses(courseList) {

    courseContainer.innerHTML = "";

    courseList.forEach((course) => {

        const card = document.createElement("div");

        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p>Credits: ${course.credits}</p>
            <p>${course.completed ? "Completed" : "Not Completed"}</p>
        `;

        courseContainer.appendChild(card);
    });

    const credits = courseList.reduce(
        (total, course) => total + course.credits,
        0
    );

    totalCredits.textContent = credits;
}

allCoursesButton.addEventListener("click", () => {
    displayCourses(courses);
});

wddCoursesButton.addEventListener("click", () => {

    const wddCourses = courses.filter(
        (course) => course.subject === "WDD"
    );

    displayCourses(wddCourses);
});

cseCoursesButton.addEventListener("click", () => {

    const cseCourses = courses.filter(
        (course) => course.subject === "CSE"
    );

    displayCourses(cseCourses);
});

displayCourses(courses);
