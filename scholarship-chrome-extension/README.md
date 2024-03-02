# Scholarship Analyzer Chrome Extension
This is an extension for allowing students to analyze scholarship directly from the scholarship provider website using their profile in Scholarbox. They need to be signed up. And the use of extension requires signing in.

## How it works?
This makes use of Scholarbox API and OpenAI GPT model for extracting, saving, running qualifying algo using the student profile. 

For now, it is using APIs from Nextbox for analysis and qualification match.

## What to do?
- [x] Have the functionality for scholarship analysis up
-[] Besides that, we need to know if the given page is a scholarship or not on extension side before we call the API? 
  -[ ] have a regex for checking common words in scholarship webpages?
- [ ] Add sign up and sign in page and functionality like the web and mobile apps. Use same API
- [ ] Update the scholarship matching algorithm so it makes use of more details and requirements available. And it also infers information like, a us citizen may not qualify for abroad scholarship unless they are going there.
  - [ ] Update API for the matching algo. It's not using all the things it could.
- [ ] Add history of the eligibility check for the student on the extension and on scholarbox
- [ ] Need APi key that's restricted to few APIs. The API key used here is more exposed.
- [ ] Ensure the extension or API can be called from any website. Currently restricted to a specific few due to cors rules and credentials present


## Issues with functionality right now
The Extension or the matching algorithm cannot do the following things right now. We should fix these.

- Identify or infer if the student a us citizen can apply for out of country scholarship like Australia scholarship here https://www.scholars4dev.com/2053/international-scholarships-at-university-of-sydney/ because we are using requirement based matching and we do not consider this.

## Samples to test with
- Eligible: https://www.scholars4dev.com/2876/usa-fulbright-scholarships-for-international-students/
- Ineligible: https://www.scholars4dev.com/3829/turkish-government-scholarships-for-international-students/

Only works on scholars4dev.com due to API restrictions. Need to load the chrome extension locally in dev mode with nextbox running locally.
