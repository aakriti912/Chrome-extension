
function checkForScholarship() {
    // Define your regular expression for identifying scholarship-related content
    var scholarshipRegex = /scholarship/i;
    // Check if the regex matches the webpage content
    var isScholarshipPage = scholarshipRegex.test(document.body.innerText);
    // Return the result
    return isScholarshipPage;
}